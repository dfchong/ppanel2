import { Outlet } from "@tanstack/react-router";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";
import { getCookie } from "@workspace/ui/lib/cookies";
import { useEffect, useState } from "react";
import { Header } from "@/layout/header";
import { SidebarLeft } from "./sidebar-left";

export default function DashboardLayout() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const sidebarState = getCookie("sidebar_state");
    if (sidebarState !== undefined) {
      setOpen(sidebarState === "true");
    }
  }, []);

  return (
    <SidebarProvider defaultOpen={open}>
      <SidebarLeft />
      <SidebarInset className="relative flex-grow overflow-hidden">
        <Header />
        <div className="h-[calc(100vh-56px)] flex-grow gap-4 overflow-auto p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
