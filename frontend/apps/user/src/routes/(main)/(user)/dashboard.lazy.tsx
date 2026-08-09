import { createLazyFileRoute } from "@tanstack/react-router";

import Dashboard from "@/sections/user/dashboard";

export const Route = createLazyFileRoute("/(main)/(user)/dashboard")({
  component: Dashboard,
});
