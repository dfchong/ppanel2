<template>
  <iframe
    class="scalar-iframe"
    :src="iframeSrc"
    frameborder="0"
    loading="lazy"
    referrerpolicy="no-referrer"
    scrolling="no"
    :style="{ height: iframeHeight }"
    @wheel.stop
    @touchstart.stop
    @touchmove.stop
    @mousedown.stop
  />
</template>

<script setup lang="ts">
import { withBase } from "vitepress";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = withDefaults(
  defineProps<{
    specUrl: string;
    title?: string;
    theme?: string;
    layout?: "modern" | "classic";
    operationId?: string;
  }>(),
  {
    title: "API Reference",
    theme: "saturn",
    layout: "classic",
  }
);

const iframeHeight = ref("1000px");

const iframeSrc = computed(() => {
  const params = new URLSearchParams();
  params.set("spec", props.specUrl);
  params.set("title", props.title);
  params.set("theme", props.theme);
  params.set("layout", props.layout);
  if (props.operationId) {
    params.set("operationId", props.operationId);
  }
  return withBase(`/scalar/index.html?${params.toString()}`);
});

const handleMessage = (event: MessageEvent) => {
  if (event.origin !== window.location.origin) return;
  const data = event.data;
  if (data?.type === "scalar-height" && typeof data.height === "number") {
    iframeHeight.value = `${Math.max(data.height, 800)}px`;
  }
};

onMounted(() => {
  window.addEventListener("message", handleMessage);
});

onBeforeUnmount(() => {
  window.removeEventListener("message", handleMessage);
});
</script>

<style scoped>
.scalar-iframe {
  width: 100%;
  border: none;
  border-radius: 12px;
  background: transparent;
  overflow: hidden;
}
</style>
