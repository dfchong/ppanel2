import { createLazyFileRoute } from "@tanstack/react-router";
import UserLayout from "@/sections/user/layout";

export const Route = createLazyFileRoute("/(main)/(user)")({
  component: UserLayout,
});
