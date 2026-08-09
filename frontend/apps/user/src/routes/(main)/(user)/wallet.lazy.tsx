import { createLazyFileRoute } from "@tanstack/react-router";

import Wallet from "@/sections/user/wallet";

export const Route = createLazyFileRoute("/(main)/(user)/wallet")({
  component: Wallet,
});
