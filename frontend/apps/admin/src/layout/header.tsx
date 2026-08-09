import { Link, useLocation } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { Separator } from "@workspace/ui/components/separator";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { LanguageSwitch } from "@workspace/ui/composed/language-switch";
import { ThemeSwitch } from "@workspace/ui/composed/theme-switch";
import { Fragment, useMemo } from "react";
import { findNavByUrl, useNavs } from "./navs";
import TimezoneSwitch from "./timezone-switch";
import { UserNav } from "./user-nav";

export function Header() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const navs = useNavs();
  const items = useMemo(() => findNavByUrl(navs, pathname), [pathname]);
  return (
    <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 bg-background">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator className="mr-2 h-4" orientation="vertical" />
        <Breadcrumb>
          <BreadcrumbList>
            {items.map((item, index) => (
              <Fragment key={item?.title}>
                {index !== items.length - 1 && (
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to={item?.url || "/dashboard"}>{item?.title}</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                )}
                {index < items.length - 1 && <BreadcrumbSeparator />}
                {index === items.length - 1 && (
                  <BreadcrumbPage>{item?.title}</BreadcrumbPage>
                )}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-2 px-3">
        <LanguageSwitch />
        <TimezoneSwitch />
        <ThemeSwitch />
        <UserNav />
      </div>
    </header>
  );
}
