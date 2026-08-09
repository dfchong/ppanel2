import { createLazyFileRoute } from "@tanstack/react-router";
import Announcement from "@/sections/user/announcement/index";

export const Route = createLazyFileRoute("/(main)/(user)/announcement")({
  component: Announcement,
});
