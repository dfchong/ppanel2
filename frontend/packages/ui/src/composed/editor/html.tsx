"use client";

import {
  MonacoEditor,
  type MonacoEditorProps,
} from "@workspace/ui/composed/editor/monaco-editor";
import { useEffect, useRef } from "react";

export function HTMLEditor(props: MonacoEditorProps) {
  return (
    <MonacoEditor
      description="Support HTML"
      title="HTML Editor"
      {...props}
      language="markdown"
      render={(value) => <HTMLPreview value={value} />}
    />
  );
}

interface HTMLPreviewProps {
  value?: string;
}

function HTMLPreview({ value }: HTMLPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframeDocument = iframeRef.current?.contentDocument;
    if (iframeDocument) {
      iframeDocument.open();
      iframeDocument.write(value || "");
      iframeDocument.close();
    }
  }, [value]);

  return (
    <iframe
      className="h-full w-full border-0"
      ref={iframeRef}
      title="HTML Preview"
    />
  );
}
