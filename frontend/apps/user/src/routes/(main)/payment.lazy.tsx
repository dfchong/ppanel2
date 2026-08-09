import { createLazyFileRoute } from "@tanstack/react-router";
import Payment from "@/sections/user/payment";

export const Route = createLazyFileRoute("/(main)/payment")({
  component: Payment,
});
