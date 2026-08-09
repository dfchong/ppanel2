// Pure constants only: this module is also imported by vite.config.ts (to
// generate locale preload hints), which cannot evaluate import.meta.env.
export const fallbackLng = "en-US";
export const supportedLngs = ["en-US", "zh-CN"];

// Namespaces loaded during i18next initialization; first render blocks on
// them, so they are also preloaded from index.html in parallel with the JS.
export const i18nNamespaces = [
  "ads",
  "announcement",
  "auth",
  "auth-control",
  "components",
  "coupon",
  "dashboard",
  "document",
  "log",
  "marketing",
  "menu",
  "nodes",
  "order",
  "payment",
  "product",
  "servers",
  "subscribe",
  "system",
  "ticket",
  "tool",
  "translation",
  "user",
];
