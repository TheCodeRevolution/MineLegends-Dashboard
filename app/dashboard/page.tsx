"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
    Users, 
    Clock, 
    Server, 
    ShieldAlert,
    UserPlus,
    Activity,
    LucideIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Statistik-Karten Komponente mit Farboptionen
function StatsCard({ 
    title, 
    value, 
    icon: Icon, 
    description,
    trend,
    trendColor = "text-emerald-500"
}: { 
    title: string
    value: string
    icon: LucideIcon
    description: string
    trend?: string
    trendColor?: string
}) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-2xl font-bold">{value}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {description}
                        </p>
                    </div>
                    {trend && (
                        <span className={`text-sm font-medium ${trendColor}`}>
                            {trend}
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

type ReportType = 'CHAT' | 'PLAYER' | 'SKIN' | 'GRIEF'

const reports = [
    { 
        text: "Verdacht auf Hacking", 
        time: "Gemeldet von ExMicrosoftDev",
        status: "Offen",
        statusColor: "bg-red-100 text-red-700",
        type: "PLAYER",
        typeLabel: "Spieler-Report"
    },
    { 
        text: "Unangemessener Skin", 
        time: "Gemeldet von Player123",
        status: "In Prüfung",
        statusColor: "bg-amber-100 text-amber-700",
        type: "SKIN",
        typeLabel: "Skin-Report"
    },
    { 
        text: "Chat Beleidigung", 
        time: "Gemeldet von Steve42",
        status: "Wird bearbeitet",
        statusColor: "bg-blue-100 text-blue-700",
        type: "CHAT",
        typeLabel: "Chat-Report"
    },
    { 
        text: "Griefing auf Plot", 
        time: "Gemeldet von Alex99",
        status: "Erledigt",
        statusColor: "bg-emerald-100 text-emerald-700",
        type: "GRIEF",
        typeLabel: "Grief-Report"
    },
]

// Neue Aktivitäts-/Ticket-Komponente
function ActivityCard({ 
    title, 
    icon: Icon,
    items 
}: { 
    title: string
    icon: LucideIcon
    items: { 
        text: string
        time: string
        status?: string
        statusColor?: string
        type?: ReportType
        typeLabel?: string
    }[] 
}) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                    </div>
                    <Button variant="outline" size="sm">
                        Alle anzeigen
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="divide-y">
                    {items.map((item, i) => (
                        <div key={i} className="py-4 first:pt-0 last:pb-0">
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium leading-none">
                                            {item.text}
                                        </p>
                                        {item.typeLabel && (
                                            <span className="text-xs px-1.5 py-0.5 rounded-md bg-muted">
                                                {item.typeLabel}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {item.time}
                                    </p>
                                </div>
                                {item.status && (
                                    <div className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${item.statusColor}`}>
                                        {item.status}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default function DashboardPage() {
    const activities = [
        { 
            text: "ExMicrosoftDev hat sich registriert", 
            time: "vor 5 Minuten",
            status: "Neu",
            statusColor: "bg-emerald-100 text-emerald-700"
        },
        { 
            text: "Server-Neustart durchgeführt", 
            time: "vor 12 Minuten",
            status: "System",
            statusColor: "bg-blue-100 text-blue-700"
        },
        { 
            text: "Neues Event gestartet", 
            time: "vor 25 Minuten",
            status: "Event",
            statusColor: "bg-purple-100 text-purple-700"
        },
        { 
            text: "Wartungsarbeiten abgeschlossen", 
            time: "vor 1 Stunde",
            status: "Wartung",
            statusColor: "bg-amber-100 text-amber-700"
        },
    ]

    return (
        <div className="p-8 space-y-8">
            <div className="mx-auto max-w-[1200px] space-y-8">
                {/* Header */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <Server className="h-6 w-6" />
                        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Willkommen im MineLegends Dashboard. Hier finden Sie eine Übersicht aller wichtigen Statistiken.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard
                        title="Aktive Spieler"
                        value="2,350"
                        icon={Users}
                        description="Aktuell online: 127 Spieler"
                    />
                    <StatsCard
                        title="Neue Registrierungen"
                        value="42"
                        icon={UserPlus}
                        description="In den letzten 24 Stunden"
                    />
                    <StatsCard
                        title="Gespielte Zeit"
                        value="1,274h"
                        icon={Clock}
                        description="Durchschnittlich 2.4h pro Spieler"
                    />
                    <StatsCard
                        title="Moderationen"
                        value="24"
                        icon={ShieldAlert}
                        description="Offene Moderationsfälle"
                    />
                </div>

                {/* Activity & Reports Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    <ActivityCard 
                        title="Letzte Aktivitäten"
                        icon={Activity}
                        items={activities}
                    />
                    <ActivityCard 
                        title="Aktuelle Moderationsfälle"
                        icon={ShieldAlert}
                        items={reports}
                    />
                </div>
            </div>
        </div>
    )
}
