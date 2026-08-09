import { createLazyFileRoute } from "@tanstack/react-router";
import Auth from "@/sections/auth";

export const Route = createLazyFileRoute("/auth/")({
  component: Auth,
});
