import { createLazyFileRoute } from "@tanstack/react-router";
import MarketingPage from "@/sections/marketing";

export const Route = createLazyFileRoute("/dashboard/marketing/")({
  component: MarketingPage,
});
