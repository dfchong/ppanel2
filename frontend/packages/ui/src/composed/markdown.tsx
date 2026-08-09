"use client";

import { lazy, Suspense } from "react";
import type { Components } from "react-markdown";

export interface MarkdownProps {
  children: string;
  components?: Components;
}

// The markdown stack (react-markdown, katex, syntax highlighting) weighs over
// 400KB gzipped; load it on demand so routes that may render markdown don't
// pull it into their initial chunk.
const MarkdownImpl = lazy(() => import("./markdown-impl"));

export function Markdown(props: MarkdownProps) {
  return (
    <Suspense fallback={null}>
      <MarkdownImpl {...props} />
    </Suspense>
  );
}
