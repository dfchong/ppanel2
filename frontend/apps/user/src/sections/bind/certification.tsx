"use client";

import { useRouter, useSearch } from "@tanstack/react-router";
import { bindOAuthCallback } from "@workspace/ui/services/user/user";
import { useEffect } from "react";

interface CertificationProps {
  platform: string;
  children: React.ReactNode;
}

export default function Certification({
  platform,
  children,
}: CertificationProps) {
  const router = useRouter();
  const searchParams = useSearch({ strict: false });

  useEffect(() => {
    bindOAuthCallback({
      method: platform,
      callback: searchParams as Record<string, string>,
    })
      .then(() => {
        router.navigate({ to: "/profile" });
      })
      .catch(() => {
        router.navigate({ to: "/auth" });
      });
  }, [platform, router, searchParams]);

  return children;
}
