import { createLazyFileRoute } from "@tanstack/react-router";
import BindPage from "@/sections/bind";

export const Route = createLazyFileRoute("/bind/$platform")({
  component: () => {
    const { platform } = Route.useParams();
    return <BindPage platform={platform} />;
  },
});
