"use client"

import * as React from "react"
import type {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
} from "@tanstack/react-table"
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreVertical, Search, Users } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Spieler-Typ Definition
export type Player = {
    _id: string
    uuid: string
    username: string
    language: string
    playTime: number
    emeralds: number
    created_at: string
    updated_at: string
}

// Beispieldaten
const data: Player[] = [
    {
        _id: "67a105550390620c565dcd82",
        uuid: "a4cc39fe-d210-4e7a-ab15-1e84d8158190",
        username: "ExMicrosoftDev",
        language: "de",
        playTime: 22229462,
        emeralds: 0,
        created_at: "2025-02-03T18:05:09.404Z",
        updated_at: "2025-02-03T18:05:09.404Z"
    },
    // ... mehr Beispieldaten
]

export const columns: ColumnDef<Player>[] = [
    {
        accessorKey: "username",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex h-8 items-center justify-start px-4 py-0 hover:bg-transparent"
                >
                    Spieler
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const username = row.getValue("username") as string
            return (
                <div className="flex items-center px-4">
                    <Image
                        src={`https://cravatar.eu/avatar/${username}/32.png`}
                        alt={`${username}'s Avatar`}
                        width={32}
                        height={32}
                        className="rounded-sm mr-3"
                    />
                    <span className="font-medium">{username}</span>
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: () => <div className="px-4">Status</div>,
        cell: ({ row }) => {
            const isOnline = Math.random() > 0.5
            return (
                <div className="px-4">
                    <Badge
                        variant="secondary"
                        className={
                            isOnline
                                ? "bg-emerald-100 hover:bg-emerald-100 text-emerald-700 cursor-default"
                                : "bg-gray-100 hover:bg-gray-100 text-gray-700 cursor-default"
                        }
                    >
                        {isOnline ? "Online" : "Offline"}
                    </Badge>
                </div>
            )
        },
    },
    {
        accessorKey: "playTime",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex h-8 items-center justify-start px-4 py-0 hover:bg-transparent"
                >
                    Spielzeit
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const minutes = Math.floor((row.getValue("playTime") as number) / 60)
            const hours = Math.floor(minutes / 60)
            return (
                <div className="flex items-center px-4">
                    {hours}h {minutes % 60}m
                </div>
            )
        },
    },
    {
        accessorKey: "emeralds",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex h-8 items-center justify-start px-4 py-0 hover:bg-transparent"
                >
                    Emeralds
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="flex items-center px-4">
                    {row.getValue("emeralds")}
                </div>
            )
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex h-8 items-center justify-start px-4 py-0 hover:bg-transparent"
                >
                    Registriert am
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue("created_at"))
            return (
                <div className="flex items-center px-4">
                    {date.toLocaleDateString()}
                </div>
            )
        },
    },
    {
        id: "actions",
        header: () => (
            <div className="px-4 text-right">
                Aktionen
            </div>
        ),
        cell: ({ row }) => {
            const player = row.original
            return (
                <div className="px-4 text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Menü öffnen</span>
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(player.uuid)}>
                                UUID kopieren
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profil anzeigen</DropdownMenuItem>
                            <DropdownMenuItem>Inventar anzeigen</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Spieler sperren</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]

export default function PlayersPage() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

    return (
        <div className="p-8 space-y-8">
            <div className="mx-auto max-w-[1200px] space-y-8">
                {/* Header */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <Users className="h-6 w-6" />
                        <h1 className="text-2xl font-semibold tracking-tight">Spieler</h1>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Verwalten Sie hier alle registrierten Spieler und deren Status.
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-6">
                    {/* Search Bar */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="relative w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Nach Spieler suchen..."
                                value={(table.getColumn("username")?.getFilterValue() as string) ?? ""}
                                onChange={(event) =>
                                    table.getColumn("username")?.setFilterValue(event.target.value)
                                }
                                className="pl-9 w-full bg-secondary focus-visible:ring-0"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="rounded-lg border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id} className="bg-muted/50">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            className="hover:bg-muted/50 cursor-pointer"
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            Keine Ergebnisse gefunden.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                            {table.getFilteredRowModel().rows.length} Spieler insgesamt
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="default"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                Zurück
                            </Button>
                            <Button
                                variant="default"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                Weiter
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 