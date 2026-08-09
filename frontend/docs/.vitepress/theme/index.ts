// https://vitepress.dev/guide/custom-theme
import Teek from "vitepress-theme-teek";
import "vitepress-theme-teek/index.css";
import type { Theme } from "vitepress";
import ScalarIframe from "./components/ScalarIframe.vue";

const theme: Theme = {
  extends: Teek,
  enhanceApp(ctx) {
    Teek.enhanceApp?.(ctx);
    ctx.app.component("ScalarIframe", ScalarIframe);
  },
};

export default theme;
