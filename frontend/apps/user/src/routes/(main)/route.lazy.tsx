import { createLazyFileRoute, Outlet } from "@tanstack/react-router";
import Footer from "@/layout/footer";
import Header from "@/layout/header";

export const Route = createLazyFileRoute("/(main)")({
  component: () => (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  ),
});
