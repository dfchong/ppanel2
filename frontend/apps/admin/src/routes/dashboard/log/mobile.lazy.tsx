import { createLazyFileRoute } from "@tanstack/react-router";
import MobileLogPage from "@/sections/log/mobile";

export const Route = createLazyFileRoute("/dashboard/log/mobile")({
  component: MobileLogPage,
});
