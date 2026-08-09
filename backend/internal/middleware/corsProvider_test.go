package middleware

import (
	"os"
	"path/filepath"
	"testing"
	"time"
)

func writeCorsConfig(t *testing.T, path string, origins []string) {
	t.Helper()
	data := "AllowOrigins:\n"
	for _, o := range origins {
		data += "  - \"" + o + "\"\n"
	}
	if err := os.WriteFile(path, []byte(data), 0o644); err != nil {
		t.Fatalf("write cors config: %v", err)
	}
}

func TestCorsProviderLoadAndReload(t *testing.T) {
	path := filepath.Join(t.TempDir(), "cors.yaml")
	writeCorsConfig(t, path, []string{"https://a.example"})

	p := NewCorsProvider(path)
	if !p.IsAllowed("https://a.example") {
		t.Fatal("expected https://a.example to be allowed after initial load")
	}
	if p.IsAllowed("https://b.example") {
		t.Fatal("expected https://b.example to be denied after initial load")
	}

	// Rewrite with a different origin and let the poller's unit detect it.
	time.Sleep(20 * time.Millisecond) // ensure mtime changes
	writeCorsConfig(t, path, []string{"https://b.example"})
	if !p.reloadIfChanged() {
		t.Fatal("expected reload to be triggered on changed file")
	}
	if p.IsAllowed("https://a.example") {
		t.Fatal("expected https://a.example to be denied after reload")
	}
	if !p.IsAllowed("https://b.example") {
		t.Fatal("expected https://b.example to be allowed after reload")
	}

	// Unchanged file must not trigger a reload.
	if p.reloadIfChanged() {
		t.Fatal("expected no reload on unchanged file")
	}
}

func TestCorsProviderMissingFileDeniesAll(t *testing.T) {
	// NewCorsProvider on a non-existent file logs a warning and keeps the
	// whitelist empty, so every cross-origin request is denied.
	p := NewCorsProvider(filepath.Join(t.TempDir(), "does-not-exist.yaml"))
	if p.IsAllowed("https://example.com") {
		t.Fatal("expected deny-all when config file is missing")
	}
}

func TestCorsProviderInMemoryConfig(t *testing.T) {
	p := NewCorsProviderFromConfig(CORSConfig{
		AllowOrigins: []string{"https://allowed.example"},
	})
	if !p.IsAllowed("https://allowed.example") {
		t.Fatal("expected in-memory origin to be allowed")
	}
	if p.IsAllowed("https://denied.example") {
		t.Fatal("expected non-whitelisted origin to be denied")
	}
}
