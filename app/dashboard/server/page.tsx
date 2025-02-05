"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { 
    Server, 
    Shield, 
    Users, 
    MessageSquare,
    Settings,
    Plus
} from "lucide-react"
import motdParser from '@sfirew/mc-motd-parser'
import { ScrollArea } from "@/components/ui/scroll-area"

// MOTD Preview Komponente
function MotdPreview({ motd }: { motd: string }) {
    const renderMotd = () => {
        try {
            const html = motdParser.textToHTML(motd)
            return (
                <div 
                    className="font-minecraft text-[14px] leading-[1.2]"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            )
        } catch (e) {
            return (
                <div className="font-minecraft text-[14px] leading-[1.2]">
                    {motdParser.cleanTags(motd)}
                </div>
            )
        }
    }

    return (
        <div className="h-[85px] relative bg-[#1E1E1E] border border-[#282828] rounded overflow-hidden">
            {/* Hintergrundbild */}
            <div 
                className="absolute inset-0"
                style={{ 
                    backgroundImage: `url('/minecraft-background.png')`,
                    backgroundSize: '64px',
                    imageRendering: 'pixelated'
                }}
            />
            
            {/* Server Icon und MOTD */}
            <div className="relative flex items-start h-full px-2 py-2">
                <div className="w-[64px] h-[64px] shrink-0">
                    <img 
                        src="/Logo.png" 
                        alt="Server Icon"
                        className="w-full h-full"
                        style={{ imageRendering: 'pixelated' }}
                    />
                </div>
                <div className="flex flex-col min-w-0 ml-3 mt-0.5 flex-1">
                    <div className="flex items-center justify-between font-minecraft text-[14px]">
                        <span className="text-white">Minecraft Server</span>
                        <div className="flex items-center gap-1 text-white">
                            <span>0/100</span>
                            <img 
                                src="/ping.png" 
                                alt="Ping"
                                className="h-3.5 w-3.5 -mt-0.5"
                                style={{ imageRendering: 'pixelated' }}
                            />
                        </div>
                    </div>
                    <div className="text-white mt-px">
                        {renderMotd()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function ServerPage() {
    const [maintenance, setMaintenance] = React.useState(false)
    const [maxPlayers, setMaxPlayers] = React.useState("100")
    const [motd, setMotd] = React.useState("§6MineLegends §8» §7Dein Minecraft Server\n§8● §7Jetzt neu: §bBedwars 2.0")
    const [whitelistEnabled, setWhitelistEnabled] = React.useState(false)

    return (
        <div className="p-8 space-y-8">
            <div className="mx-auto max-w-[1200px] space-y-8">
                {/* Header */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <Server className="h-6 w-6" />
                        <h1 className="text-2xl font-semibold tracking-tight">Server Einstellungen</h1>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Verwalten Sie hier die grundlegenden Server-Einstellungen.
                    </p>
                </div>

                <div className="grid gap-6">
                    {/* Erste Reihe: Status und MOTD */}
                    <div className="grid gap-6 lg:grid-cols-2">
                        {/* Server Status & Grundeinstellungen */}
                        <Card className="flex flex-col">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="flex items-center gap-2">
                                    <Settings className="h-5 w-5" />
                                    Grundeinstellungen
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col flex-1">
                                <div className="space-y-6 flex-1">
                                    {/* Wartungsmodus */}
                                    <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Label>Wartungsmodus</Label>
                                                <div className="flex items-center gap-1.5">
                                                    <span className={`inline-block h-2 w-2 rounded-full ${
                                                        maintenance 
                                                            ? 'bg-red-500 animate-pulse'
                                                            : 'bg-emerald-500'
                                                    }`} />
                                                    <span className={`text-xs font-medium ${
                                                        maintenance
                                                            ? 'text-red-600'
                                                            : 'text-emerald-600'
                                                    }`}>
                                                        {maintenance ? 'Wartung aktiv' : 'Server online'}
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {maintenance 
                                                    ? "Der Server ist im Wartungsmodus."
                                                    : "Der Server ist für alle Spieler zugänglich."
                                                }
                                            </p>
                                        </div>
                                        <Switch
                                            checked={maintenance}
                                            onCheckedChange={setMaintenance}
                                            className={maintenance ? 'data-[state=checked]:bg-red-500' : ''}
                                        />
                                    </div>

                                    {/* Max Players */}
                                    <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                                        <div className="space-y-1">
                                            <Label className="flex items-center gap-2">
                                                <Users className="h-4 w-4" />
                                                Maximale Spieler
                                            </Label>
                                            <p className="text-sm text-muted-foreground">
                                                Maximale Anzahl gleichzeitiger Spieler
                                            </p>
                                        </div>
                                        <Input
                                            type="number"
                                            value={maxPlayers}
                                            onChange={(e) => setMaxPlayers(e.target.value)}
                                            className="max-w-[120px]"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4 mt-4 border-t">
                                    <Button size="sm">Änderungen speichern</Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* MOTD mit Live-Vorschau */}
                        <Card className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5" />
                                    Server MOTD
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col flex-1">
                                <div className="space-y-4 flex-1">
                                    <Textarea
                                        value={motd}
                                        onChange={(e) => {
                                            // Limitiere auf maximal 2 Zeilen
                                            const lines = e.target.value.split('\n')
                                            if (lines.length > 2) {
                                                setMotd(lines.slice(0, 2).join('\n'))
                                            } else {
                                                setMotd(e.target.value)
                                            }
                                        }}
                                        placeholder="Server MOTD..."
                                        className="font-mono text-sm resize-none"
                                        rows={2}
                                        maxLength={200}
                                    />
                                    <div className="space-y-2">
                                        <p className="text-xs font-medium text-muted-foreground">Vorschau:</p>
                                        <MotdPreview motd={motd} />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 mt-4 border-t">
                                    <p className="text-xs text-muted-foreground">
                                        Nutze §-Zeichen für Farben. Neue Zeile mit \n
                                    </p>
                                    <Button size="sm">Änderungen speichern</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Whitelist Card */}
                    <Card className="max-w-2xl">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    Whitelist
                                </CardTitle>
                                <Button size="sm" variant="outline" className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    Spieler hinzufügen
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[160px]">
                                <div className="h-full flex flex-col gap-3">
                                    <ScrollArea className="flex-1">
                                        <div className="space-y-3 pr-4">
                                            <div className="p-3 rounded-lg border bg-muted/30">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Users className="h-4 w-4 text-muted-foreground" />
                                                    <span className="text-muted-foreground">3 Spieler auf der Whitelist</span>
                                                </div>
                                            </div>
                                            {['ExMicrosoftDev', 'Player123', 'Steve42'].map((player) => (
                                                <div key={player} className="flex items-center justify-between p-2 rounded-lg border bg-card">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-8 w-8 rounded bg-muted flex items-center justify-center">
                                                            <Users className="h-4 w-4 text-muted-foreground" />
                                                        </div>
                                                        <span className="text-sm font-medium">{player}</span>
                                                    </div>
                                                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-600 hover:bg-red-100">
                                                        Entfernen
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
} 