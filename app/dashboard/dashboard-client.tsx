"use client"

import React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePathname } from 'next/navigation'

// Mapping für benutzerfreundliche Namen
const pathNames: { [key: string]: string } = {
    dashboard: "Dashboard",
    players: "Spieler",
    profile: "Profil Einstellungen",
    server: "Server",
    stats: "Statistiken",
    moderations: "Moderationen",
};

export function DashboardClient({
    children,
    defaultOpen = false,
}: {
    children: React.ReactNode;
    defaultOpen?: boolean;
}) {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);
    
    const breadcrumbs = segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join('/')}`;
        const isLast = index === segments.length - 1;
        const name = pathNames[segment] || segment;

        return {
            name,
            path,
            isLast
        };
    });

    return (
        <div className="min-h-screen">
            <SidebarProvider defaultOpen={defaultOpen}>
                <AppSidebar />
                <SidebarInset>
                    <div className="flex h-full flex-col">
                        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
                            <div className="flex items-center gap-2 px-3">
                                <SidebarTrigger />
                                <Separator orientation="vertical" className="mr-2 h-4" />
                                <Breadcrumb>
                                    <BreadcrumbList>
                                        {breadcrumbs.map((breadcrumb, index) => (
                                            <React.Fragment key={breadcrumb.path}>
                                                <BreadcrumbItem key={index}>
                                                    {breadcrumb.isLast ? (
                                                        <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
                                                    ) : (
                                                        <BreadcrumbLink href={breadcrumb.path}>
                                                            {breadcrumb.name}
                                                        </BreadcrumbLink>
                                                    )}
                                                </BreadcrumbItem>
                                                {!breadcrumb.isLast && (
                                                    <BreadcrumbSeparator />
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </BreadcrumbList>
                                </Breadcrumb>
                            </div>
                        </header>
                        <main className="flex-1">
                            <div className="container max-w-[1200px] mx-auto">
                                {children}
                            </div>
                        </main>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
} 