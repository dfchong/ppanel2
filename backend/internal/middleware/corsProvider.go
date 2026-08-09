package middleware

import (
	"context"
	"os"
	"strconv"
	"strings"
	"sync/atomic"
	"time"

	"github.com/cloudwego/hertz/pkg/app"
	"github.com/cloudwego/hertz/pkg/protocol/consts"
	"github.com/perfect-panel/server/pkg/logger"
	"gopkg.in/yaml.v3"
)

// CORS response header defaults. They mirror the previous permissive
// middleware so that a whitelisted origin receives the same headers as before.
const (
	defaultAllowMethods  = "POST, GET, OPTIONS, PUT, DELETE, UPDATE"
	defaultAllowHeaders  = "Content-Type, Origin, X-CSRF-Token, Authorization, AccessToken, Token, Range"
	defaultExposeHeaders = "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers"
	defaultMaxAge        = "172800"

	// corsReloadInterval is how often the provider polls the config file.
	// K8s ConfigMaps are mounted through a symlinked ..data directory that is
	// atomically swapped on update, which makes fsnotify unreliable there, so
	// we poll the file mtime/size instead.
	corsReloadInterval = 10 * time.Second
)

// CORSConfig is the shape of the standalone cors.yaml file, mounted from the
// ppanel-cors ConfigMap. Keep it intentionally small: only the origin
// whitelist plus a few header overrides are supported.
type CORSConfig struct {
	AllowOrigins     []string `yaml:"AllowOrigins"`
	AllowMethods     string   `yaml:"AllowMethods"`
	AllowHeaders     string   `yaml:"AllowHeaders"`
	ExposeHeaders    string   `yaml:"ExposeHeaders"`
	AllowCredentials *bool    `yaml:"AllowCredentials"`
	MaxAge           string   `yaml:"MaxAge"`
}

// corsSnapshot is the immutable, atomically-swapped state the middleware reads
// on every request.
type corsSnapshot struct {
	origins     map[string]struct{}
	methods     string
	headers     string
	expose      string
	credentials bool
	maxAge      string

	// modTime/size track the source file so the poller can detect updates.
	modTime time.Time
	size    int64
}

// CorsProvider holds the thread-safe CORS origin whitelist and reloads it from
// disk when the mounted ConfigMap file changes. It implements
// service.Service (Start/Stop) so it can be registered in the service group to
// drive the background poller.
type CorsProvider struct {
	path string
	stop chan struct{}
	snap atomic.Pointer[corsSnapshot]
}

// NewCorsProvider creates a provider backed by the file at path and performs
// the initial load. A missing/unparseable file leaves an empty whitelist
// (deny all cross-origin) and logs a warning — the safe default.
func NewCorsProvider(path string) *CorsProvider {
	p := &CorsProvider{path: path}
	if err := p.Load(); err != nil {
		logger.Errorf("load cors config %q failed: %v; denying all cross-origin requests until a whitelist is provided", path, err)
	}
	return p
}

// NewCorsProviderFromConfig builds a provider from an in-memory config. It is
// mainly used by tests and does not start the background poller.
func NewCorsProviderFromConfig(cfg CORSConfig) *CorsProvider {
	p := &CorsProvider{}
	p.applyConfig(cfg, time.Time{}, 0)
	return p
}

// Load reads the config file and atomically swaps in a new snapshot.
func (p *CorsProvider) Load() error {
	info, err := os.Stat(p.path)
	if err != nil {
		return err
	}
	data, err := os.ReadFile(p.path)
	if err != nil {
		return err
	}
	var cfg CORSConfig
	if err := yaml.Unmarshal(data, &cfg); err != nil {
		return err
	}
	p.applyConfig(cfg, info.ModTime(), info.Size())
	return nil
}

func (p *CorsProvider) applyConfig(cfg CORSConfig, modTime time.Time, size int64) {
	snap := &corsSnapshot{
		origins:     make(map[string]struct{}, len(cfg.AllowOrigins)),
		methods:     cfg.AllowMethods,
		headers:     cfg.AllowHeaders,
		expose:      cfg.ExposeHeaders,
		credentials: true,
		maxAge:      cfg.MaxAge,
		modTime:     modTime,
		size:        size,
	}
	if snap.methods == "" {
		snap.methods = defaultAllowMethods
	}
	if snap.headers == "" {
		snap.headers = defaultAllowHeaders
	}
	if snap.expose == "" {
		snap.expose = defaultExposeHeaders
	}
	if snap.maxAge == "" {
		snap.maxAge = defaultMaxAge
	}
	if cfg.AllowCredentials != nil {
		snap.credentials = *cfg.AllowCredentials
	}
	for _, o := range cfg.AllowOrigins {
		if o = strings.TrimSpace(o); o != "" {
			snap.origins[o] = struct{}{}
		}
	}
	p.snap.Store(snap)
}

// IsAllowed reports whether origin is in the current whitelist.
func (p *CorsProvider) IsAllowed(origin string) bool {
	snap := p.snap.Load()
	if snap == nil {
		return false
	}
	_, ok := snap.origins[origin]
	return ok
}

// Middleware returns the whitelist-based CORS handler for this provider.
func (p *CorsProvider) Middleware() app.HandlerFunc {
	return func(c context.Context, ctx *app.RequestContext) {
		origin := string(ctx.GetHeader("Origin"))
		// No Origin header: same-origin or non-browser caller — nothing to do.
		if origin == "" {
			ctx.Next(c)
			return
		}
		if !p.IsAllowed(origin) {
			// Reject the preflight explicitly; for real requests leave the
			// browser to enforce the same-origin policy (no CORS headers).
			if string(ctx.Method()) == consts.MethodOptions {
				ctx.AbortWithStatus(consts.StatusForbidden)
				return
			}
			ctx.Next(c)
			return
		}
		snap := p.snap.Load()
		ctx.Header("Access-Control-Allow-Origin", origin)
		ctx.Header("Vary", "Origin")
		ctx.Header("Access-Control-Allow-Methods", snap.methods)
		ctx.Header("Access-Control-Allow-Headers", snap.headers)
		ctx.Header("Access-Control-Expose-Headers", snap.expose)
		ctx.Header("Access-Control-Allow-Credentials", strconv.FormatBool(snap.credentials))
		ctx.Header("Access-Control-Max-Age", snap.maxAge)
		if string(ctx.Method()) == consts.MethodOptions {
			ctx.AbortWithStatus(consts.StatusNoContent)
			return
		}
		ctx.Next(c)
	}
}

// Start launches the background file poller. It implements service.Starter.
func (p *CorsProvider) Start() {
	p.stop = make(chan struct{})
	go p.poll()
}

// Stop stops the background file poller. It implements service.Stopper.
func (p *CorsProvider) Stop() {
	if p.stop != nil {
		select {
		case <-p.stop:
		default:
			close(p.stop)
		}
	}
}

func (p *CorsProvider) poll() {
	ticker := time.NewTicker(corsReloadInterval)
	defer ticker.Stop()
	for {
		select {
		case <-p.stop:
			return
		case <-ticker.C:
			p.reloadIfChanged()
		}
	}
}

// reloadIfChanged reloads the config when the file mtime/size changed and
// reports whether a reload happened. It is the unit the poller drives, and is
// exported so tests can invoke it directly.
func (p *CorsProvider) reloadIfChanged() bool {
	info, err := os.Stat(p.path)
	if err != nil {
		return false
	}
	prev := p.snap.Load()
	if prev != nil && info.ModTime().Equal(prev.modTime) && info.Size() == prev.size {
		return false
	}
	if err := p.Load(); err != nil {
		logger.Errorf("reload cors config %q failed: %v (keeping previous whitelist)", p.path, err)
		return false
	}
	logger.Infof("reloaded cors config %q", p.path)
	return true
}
