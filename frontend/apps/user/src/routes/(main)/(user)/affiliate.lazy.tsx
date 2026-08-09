import { createLazyFileRoute } from "@tanstack/react-router";
import Affiliate from "@/sections/user/affiliate";

export const Route = createLazyFileRoute("/(main)/(user)/affiliate")({
  component: Affiliate,
});
