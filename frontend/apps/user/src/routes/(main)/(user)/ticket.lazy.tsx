import { createLazyFileRoute } from "@tanstack/react-router";
import Ticket from "@/sections/user/ticket";

export const Route = createLazyFileRoute("/(main)/(user)/ticket")({
  component: Ticket,
});
