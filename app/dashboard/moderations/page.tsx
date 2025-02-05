"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
    ShieldAlert, 
    CheckCircle2, 
    XCircle, 
    Clock, 
    AlertCircle, 
    User,
    Server
} from "lucide-react"

// Definiere die Report-Typen
type ReportType = 'CHAT' | 'PLAYER' | 'SKIN' | 'GRIEF'
type ReportStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED'

interface Report {
    id: string
    type: ReportType
    reportedPlayer: string
    reportedBy: string
    reason: string
    description: string
    status: ReportStatus
    createdAt: string
    server: string
}

// Erweiterte Test-Daten
const testReports: Report[] = [
    {
        id: "REP-001",
        type: "CHAT",
        reportedPlayer: "BadPlayer123",
        reportedBy: "GoodPlayer456",
        reason: "Beleidigungen",
        description: "Hat mehrfach im Chat beleidigt",
        status: "OPEN",
        createdAt: "2024-03-10T15:30:00Z",
        server: "Lobby-1",
    },
    {
        id: "REP-002",
        type: "PLAYER",
        reportedPlayer: "Hacker777",
        reportedBy: "Watchful_Player",
        reason: "Verdacht auf Hacks",
        description: "Spieler fliegt und nutzt wahrscheinlich Killaura",
        status: "OPEN",
        createdAt: "2024-03-10T14:20:00Z",
        server: "Lobby-1",
    },
    {
        id: "REP-003",
        type: "GRIEF",
        reportedPlayer: "GrieferXX",
        reportedBy: "Builder99",
        reason: "Griefing auf Plot",
        description: "Hat mein Haus zerstört",
        status: "OPEN",
        createdAt: "2024-03-10T13:15:00Z",
        server: "Lobby-1",
    },
    {
        id: "REP-004",
        type: "SKIN",
        reportedPlayer: "SkinUser42",
        reportedBy: "Moderator1",
        reason: "Unangemessener Skin",
        description: "NSFW Skin",
        status: "OPEN",
        createdAt: "2024-03-10T12:45:00Z",
        server: "Lobby-1",
    },
]

function StatsCard({ title, value, icon: Icon, description }: { 
    title: string
    value: string
    icon: React.ElementType
    description: string 
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                    {description}
                </p>
            </CardContent>
        </Card>
    )
}

export default function ModerationsPage() {
    const [currentReport, setCurrentReport] = React.useState<Report | null>(null)

    // Statistiken berechnen
    const stats = {
        open: testReports.filter(r => r.status === 'OPEN').length,
        inProgress: testReports.filter(r => r.status === 'IN_PROGRESS').length,
        resolved: testReports.filter(r => r.status === 'RESOLVED').length,
        rejected: testReports.filter(r => r.status === 'REJECTED').length,
    }

    const getRandomOpenReport = () => {
        const openReports = testReports.filter(report => report.status === 'OPEN')
        if (openReports.length === 0) {
            alert("Keine offenen Fälle vorhanden!")
            return
        }
        const randomReport = openReports[Math.floor(Math.random() * openReports.length)]
        setCurrentReport(randomReport)
    }

    return (
        <div className="p-8 space-y-8">
            <div className="mx-auto max-w-[1200px] space-y-8">
                {/* Header */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <ShieldAlert className="h-6 w-6" />
                        <h1 className="text-2xl font-semibold tracking-tight">Moderationen</h1>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Bearbeiten Sie hier die gemeldeten Verstöße und Moderationsfälle.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard
                        title="Offene Fälle"
                        value={stats.open.toString()}
                        icon={AlertCircle}
                        description="Warten auf Bearbeitung"
                    />
                    <StatsCard
                        title="In Bearbeitung"
                        value={stats.inProgress.toString()}
                        icon={Clock}
                        description="Aktuell in Bearbeitung"
                    />
                    <StatsCard
                        title="Abgeschlossen"
                        value={stats.resolved.toString()}
                        icon={CheckCircle2}
                        description="Erfolgreich bearbeitet"
                    />
                    <StatsCard
                        title="Abgelehnt"
                        value={stats.rejected.toString()}
                        icon={XCircle}
                        description="Als unbegründet markiert"
                    />
                </div>

                {/* Action Button */}
                <div className="flex justify-center">
                    <Button 
                        size="lg"
                        onClick={getRandomOpenReport}
                        className="gap-2"
                    >
                        <ShieldAlert className="h-5 w-5" />
                        Nächsten Fall bearbeiten
                    </Button>
                </div>

                {/* Current Report Card or Empty State */}
                {currentReport ? (
                    <Card className="overflow-hidden max-w-3xl mx-auto">
                        <CardHeader className="border-b bg-muted/50 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <ShieldAlert className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <CardTitle className="text-base">Fall #{currentReport.id}</CardTitle>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(currentReport.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                    {
                                        'CHAT': 'bg-blue-100 text-blue-700 border border-blue-200',
                                        'PLAYER': 'bg-red-100 text-red-700 border border-red-200',
                                        'SKIN': 'bg-purple-100 text-purple-700 border border-purple-200',
                                        'GRIEF': 'bg-amber-100 text-amber-700 border border-amber-200'
                                    }[currentReport.type]
                                }`}>
                                    {
                                        {
                                            'CHAT': 'Chat-Report',
                                            'PLAYER': 'Spieler-Report',
                                            'SKIN': 'Skin-Report',
                                            'GRIEF': 'Griefing-Report'
                                        }[currentReport.type]
                                    }
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="space-y-4">
                                {/* Spieler Info */}
                                <div className="flex flex-col gap-3">
                                    {/* Beschuldigter Spieler */}
                                    <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                                                <User className="h-5 w-5 text-red-600" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-medium text-base">{currentReport.reportedPlayer}</h3>
                                                    <div className="px-2 py-0.5 rounded-md bg-red-100 border border-red-200 text-red-700 text-xs font-medium">
                                                        Beschuldigter
                                                    </div>
                                                </div>
                                                <Button variant="link" size="sm" className="h-6 p-0 text-xs text-muted-foreground hover:text-primary">
                                                    Profil anzeigen
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Meldender Spieler */}
                                    <div className="flex items-center justify-between p-3 rounded-lg border bg-card">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                                <User className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-medium text-base">{currentReport.reportedBy}</h3>
                                                    <div className="px-2 py-0.5 rounded-md bg-blue-100 border border-blue-200 text-blue-700 text-xs font-medium">
                                                        Melder
                                                    </div>
                                                </div>
                                                <Button variant="link" size="sm" className="h-6 p-0 text-xs text-muted-foreground hover:text-primary">
                                                    Profil anzeigen
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Report Details */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                                        <div className="h-9 w-9 rounded-md bg-muted flex items-center justify-center">
                                            <Server className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground mb-0.5">Gemeldet auf</p>
                                            <p className="text-sm font-medium">{currentReport.server}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                                        <div className="h-9 w-9 rounded-md bg-muted flex items-center justify-center">
                                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-muted-foreground mb-0.5">Grund</p>
                                            <p className="text-sm font-medium">{currentReport.reason}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between pt-4 border-t">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4 text-amber-600" />
                                        <span className="text-xs text-muted-foreground">
                                            Bitte den Fall sorgfältig prüfen
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="destructive" size="sm" className="gap-2">
                                            <XCircle className="h-4 w-4" />
                                            Ablehnen
                                        </Button>
                                        <Button variant="default" size="sm" className="gap-2">
                                            <CheckCircle2 className="h-4 w-4" />
                                            Bearbeiten
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="overflow-hidden max-w-3xl mx-auto">
                        <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                            <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-6 border">
                                <ShieldAlert className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold mb-3">Kein aktiver Fall</h3>
                            <div className="max-w-sm">
                                <p className="text-sm text-muted-foreground">
                                    Nutzen Sie den Button oben, um einen neuen Moderationsfall zu bearbeiten.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
} 