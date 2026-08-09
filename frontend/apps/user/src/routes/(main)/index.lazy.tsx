import { createLazyFileRoute } from "@tanstack/react-router";
import Main from "@/sections/main";

export const Route = createLazyFileRoute("/(main)/")({
  component: Main,
});
