import { createLazyFileRoute } from "@tanstack/react-router";
import Purchasing from "@/sections/purchasing";

export const Route = createLazyFileRoute("/(main)/purchasing/")({
  component: Purchasing,
});
