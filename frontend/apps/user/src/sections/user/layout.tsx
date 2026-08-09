"use client";
import { Outlet } from "@tanstack/react-router";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";
import Announcement from "@/sections/user/announcement";
import { SidebarLeft } from "./sidebar-left";
import { SidebarRight } from "./sidebar-right";

export default function UserLayout() {
  return (
    <SidebarProvider className="container">
      <SidebarLeft className="sticky top-[84px] hidden w-52 border-r-0 bg-transparent lg:flex" />
      <SidebarInset className="relative p-4">
        <Outlet />
      </SidebarInset>
      <SidebarRight className="sticky top-[84px] hidden w-52 border-r-0 bg-transparent 2xl:flex" />
      <Announcement type="popup" />
    </SidebarProvider>
  );
}
