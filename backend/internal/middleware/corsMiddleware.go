package middleware

import (
	"context"

	"github.com/cloudwego/hertz/pkg/app"
	"github.com/cloudwego/hertz/pkg/protocol/consts"
)

// corsPolicy is the subset of CorsProvider consumed by CorsMiddleware. It is
// declared locally (rather than in internal/svc) to avoid an svc -> middleware
// import cycle; svc declares its own structurally identical interface and
// *CorsProvider satisfies both.
type corsPolicy interface {
	Middleware() app.HandlerFunc
}

// CorsMiddleware returns a whitelist-based CORS middleware backed by policy.
// When policy is nil (e.g. tests or setups without a whitelist) a deny-all
// handler is returned so cross-origin access stays closed by default.
func CorsMiddleware(policy corsPolicy) app.HandlerFunc {
	if policy == nil {
		return denyCORS()
	}
	return policy.Middleware()
}

// denyCORS is the safe default when no CORS whitelist is configured: preflight
// requests carrying an Origin header are refused, and no CORS response headers
// are ever emitted. Same-origin / non-browser calls are unaffected.
func denyCORS() app.HandlerFunc {
	return func(c context.Context, ctx *app.RequestContext) {
		if string(ctx.GetHeader("Origin")) != "" && string(ctx.Method()) == consts.MethodOptions {
			ctx.AbortWithStatus(consts.StatusForbidden)
			return
		}
		ctx.Next(c)
	}
}
