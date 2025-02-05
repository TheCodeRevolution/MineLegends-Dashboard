"use client"

import * as React from "react"
import Image from "next/image"
import {
  LayoutDashboard,
  Users,
  Server,
  ShieldAlert,
} from "lucide-react"
import { NavLink } from "@/components/nav-link"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  TooltipProvider,
} from "@/components/ui/tooltip"

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Spieler",
    href: "/dashboard/players",
    icon: Users,
  },
  {
    title: "Server",
    href: "/dashboard/server",
    icon: Server,
  },
  {
    title: "Moderationen",
    href: "/dashboard/moderations",
    icon: ShieldAlert,
  }
]

// Behalte den User für den Footer
const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <TooltipProvider delayDuration={0}>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <div className="relative flex items-center gap-3 px-4 py-2">
            <div className="relative h-8 w-8 shrink-0 group-has-[[data-collapsible=icon]]/sidebar-wrapper:absolute group-has-[[data-collapsible=icon]]/sidebar-wrapper:inset-x-0 group-has-[[data-collapsible=icon]]/sidebar-wrapper:mx-auto group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-6 group-has-[[data-collapsible=icon]]/sidebar-wrapper:w-6">
              <Image
                src="/Logo.png"
                alt="MineLegends Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out group-has-[[data-collapsible=icon]]/sidebar-wrapper:w-0 group-has-[[data-collapsible=icon]]/sidebar-wrapper:opacity-0">
              <span className="font-semibold truncate whitespace-nowrap">MineLegends</span>
              <span className="text-xs text-muted-foreground truncate whitespace-nowrap">Version 1.0</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                icon={item.icon}
              >
                {item.title}
              </NavLink>
            ))}
          </nav>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </TooltipProvider>
  )
}
