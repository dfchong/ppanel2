package httpserver

import (
	"context"
	"net/http"
	"testing"

	appconfig "github.com/perfect-panel/server/internal/config"
	"github.com/perfect-panel/server/internal/middleware"
	"github.com/perfect-panel/server/internal/svc"
)

func TestServerSecretMiddlewareBlocksMigratedPost(t *testing.T) {
	app := newTestServer("secret")

	status, body := performNativeRequest(app, http.MethodPost, "/v1/server/online?secret_key=wrong")
	if status != http.StatusForbidden {
		t.Fatalf("expected status %d, got %d", http.StatusForbidden, status)
	}
	if body != "Forbidden" {
		t.Fatalf("expected forbidden body, got %q", body)
	}
}

func TestQueryServerProtocolConfigRejectsInvalidID(t *testing.T) {
	app := newTestServer("secret")

	status, body := performNativeRequest(app, http.MethodGet, "/v2/server/not-a-number?secret_key=secret")
	if status != http.StatusBadRequest {
		t.Fatalf("expected status %d, got %d", http.StatusBadRequest, status)
	}
	if body != "Invalid Params" {
		t.Fatalf("expected invalid params body, got %q", body)
	}
}

func TestQueryServerProtocolConfigRejectsInvalidSecret(t *testing.T) {
	app := newTestServer("secret")

	status, body := performNativeRequest(app, http.MethodGet, "/v2/server/1?secret_key=wrong")
	if status != http.StatusUnauthorized {
		t.Fatalf("expected status %d, got %d", http.StatusUnauthorized, status)
	}
	if body != "Unauthorized" {
		t.Fatalf("expected unauthorized body, got %q", body)
	}
}

// An installation whose node secret has not been provisioned yet must not
// authenticate anyone; a bare `?secret_key=` used to compare equal to it.
func TestServerSecretMiddlewareRejectsUnprovisionedSecret(t *testing.T) {
	app := newTestServer("")

	status, body := performNativeRequest(app, http.MethodPost, "/v1/server/online?secret_key=")
	if status != http.StatusForbidden {
		t.Fatalf("expected status %d, got %d", http.StatusForbidden, status)
	}
	if body != "Forbidden" {
		t.Fatalf("expected forbidden body, got %q", body)
	}
}

func TestQueryServerProtocolConfigRejectsUnprovisionedSecret(t *testing.T) {
	app := newTestServer("")

	status, body := performNativeRequest(app, http.MethodGet, "/v2/server/1?secret_key=")
	if status != http.StatusUnauthorized {
		t.Fatalf("expected status %d, got %d", http.StatusUnauthorized, status)
	}
	if body != "Unauthorized" {
		t.Fatalf("expected unauthorized body, got %q", body)
	}
}

func TestCorsPreflightBypassesServerSecretMiddleware(t *testing.T) {
	app := newTestServer("secret")

	ctx := app.Engine().NewContext()
	ctx.Request.SetRequestURI("/v1/server/online")
	ctx.Request.Header.SetMethod(http.MethodOptions)
	ctx.Request.Header.Set("Origin", "https://example.com")
	app.Engine().ServeHTTP(context.Background(), ctx)

	if status := ctx.Response.StatusCode(); status != http.StatusNoContent {
		t.Fatalf("expected status %d, got %d", http.StatusNoContent, status)
	}
	if origin := string(ctx.Response.Header.Peek("Access-Control-Allow-Origin")); origin != "https://example.com" {
		t.Fatalf("expected CORS origin header, got %q", origin)
	}
}

func newTestServer(secret string) *Server {
	// Whitelist includes the origins the existing CORS preflight test relies on.
	provider := middleware.NewCorsProviderFromConfig(middleware.CORSConfig{
		AllowOrigins: []string{"https://example.com", "http://localhost:3000"},
	})
	return New(&svc.ServiceContext{
		Config: appconfig.Config{
			Node: appconfig.NodeConfig{
				NodeSecret: secret,
			},
		},
		CORS: provider,
	}, "127.0.0.1:0", nil)
}

func performNativeRequest(server *Server, method, uri string) (int, string) {
	ctx := server.Engine().NewContext()
	ctx.Request.SetRequestURI(uri)
	ctx.Request.Header.SetMethod(method)
	server.Engine().ServeHTTP(context.Background(), ctx)
	return ctx.Response.StatusCode(), string(ctx.Response.Body())
}

func TestCorsPreflightDisallowedOriginRejected(t *testing.T) {
	app := newTestServer("secret")

	ctx := app.Engine().NewContext()
	ctx.Request.SetRequestURI("/v1/server/online")
	ctx.Request.Header.SetMethod(http.MethodOptions)
	ctx.Request.Header.Set("Origin", "https://evil.example")
	app.Engine().ServeHTTP(context.Background(), ctx)

	if status := ctx.Response.StatusCode(); status != http.StatusForbidden {
		t.Fatalf("expected status %d, got %d", http.StatusForbidden, status)
	}
	if origin := string(ctx.Response.Header.Peek("Access-Control-Allow-Origin")); origin != "" {
		t.Fatalf("expected no CORS origin header for disallowed origin, got %q", origin)
	}
}

// The CORS middleware runs at the head of the chain, so its headers are set
// regardless of how the downstream handler responds; the assertions therefore
// focus on the CORS headers, not on the business status code.
func TestCorsSimpleRequestAllowedOriginSetsHeaders(t *testing.T) {
	_, headers := performNativeRequestWithOrigin(newTestServer(""), http.MethodGet, "/v1/common/site/config", "https://example.com")
	if origin := headers["Access-Control-Allow-Origin"]; origin != "https://example.com" {
		t.Fatalf("expected CORS origin header, got %q", origin)
	}
	if headers["Access-Control-Allow-Credentials"] != "true" {
		t.Fatalf("expected credentials header true, got %q", headers["Access-Control-Allow-Credentials"])
	}
}

func TestCorsSimpleRequestDisallowedOriginGetsNoHeaders(t *testing.T) {
	_, headers := performNativeRequestWithOrigin(newTestServer(""), http.MethodGet, "/v1/common/site/config", "https://evil.example")
	if origin := headers["Access-Control-Allow-Origin"]; origin != "" {
		t.Fatalf("expected no CORS origin header for disallowed origin, got %q", origin)
	}
}

func TestCorsSimpleRequestNoOriginGetsNoHeaders(t *testing.T) {
	_, headers := performNativeRequestWithOrigin(newTestServer(""), http.MethodGet, "/v1/common/site/config", "")
	if origin := headers["Access-Control-Allow-Origin"]; origin != "" {
		t.Fatalf("expected no CORS origin header without Origin, got %q", origin)
	}
}

func performNativeRequestWithOrigin(server *Server, method, uri, origin string) (int, map[string]string) {
	ctx := server.Engine().NewContext()
	ctx.Request.SetRequestURI(uri)
	ctx.Request.Header.SetMethod(method)
	if origin != "" {
		ctx.Request.Header.Set("Origin", origin)
	}
	server.Engine().ServeHTTP(context.Background(), ctx)
	headers := make(map[string]string)
	ctx.Response.Header.VisitAll(func(k, v []byte) {
		headers[string(k)] = string(v)
	})
	return ctx.Response.StatusCode(), headers
}
