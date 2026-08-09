import { createLazyFileRoute } from "@tanstack/react-router";
import Profile from "@/sections/user/profile";

export const Route = createLazyFileRoute("/(main)/(user)/profile")({
  component: Profile,
});
