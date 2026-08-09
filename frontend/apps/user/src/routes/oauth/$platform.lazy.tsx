import { createLazyFileRoute } from "@tanstack/react-router";
import OAuthPage from "@/sections/oauth";

export const Route = createLazyFileRoute("/oauth/$platform")({
  component: () => {
    const { platform } = Route.useParams();
    return <OAuthPage platform={platform} />;
  },
});
