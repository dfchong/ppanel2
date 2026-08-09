"use client";

import type { ComponentProps } from "react";
import { lazy, Suspense } from "react";

// dotlottie-react ships a ~550KB inlined WASM player; load it on demand so
// decorative animations never block first paint.
const LazyDotLottie = lazy(() =>
  import("@lottiefiles/dotlottie-react").then((m) => ({
    default: m.DotLottieReact,
  }))
);

export function DotLottieReact(props: ComponentProps<typeof LazyDotLottie>) {
  return (
    <Suspense fallback={null}>
      <LazyDotLottie {...props} />
    </Suspense>
  );
}
