"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from "react"

interface NavLinkProps {
  href: string
  icon: LucideIcon
  children: React.ReactNode
}

export function NavLink({ href, icon: Icon, children }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false)

  // Überprüfe den Sidebar-Zustand
  React.useEffect(() => {
    const checkSidebarState = () => {
      const sidebarElement = document.querySelector('[data-state="collapsed"]')
      setIsSidebarCollapsed(!!sidebarElement)
    }

    checkSidebarState()
    // Optional: Beobachte Änderungen am DOM
    const observer = new MutationObserver(checkSidebarState)
    observer.observe(document.body, { attributes: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  const link = (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground",
        "group-has-[[data-collapsible=icon]]/sidebar-wrapper:justify-center group-has-[[data-collapsible=icon]]/sidebar-wrapper:px-2"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="truncate group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden">
        {children}
      </span>
    </Link>
  )

  return (
    <Tooltip>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent 
        side="right" 
        align="center"
        hidden={!isSidebarCollapsed}
      >
        {children}
      </TooltipContent>
    </Tooltip>
  )
} 