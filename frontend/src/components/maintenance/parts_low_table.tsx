
"use client"

import React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { AlertTriangle, CheckCircle } from "lucide-react"

// Sample data for critical alerts
const alertsData = [
    {
        id: 1,
        part: "Brake Pads",
        required: 50,
        available: 12,
        status: "low",
    },
    {
        id: 2,
        part: "Engine Oil",
        required: 80,
        available: 70,
        status: "sufficient",
    },
    {
        id: 3,
        part: "Air Filters",
        required: 40,
        available: 15,
        status: "low",
    },
    {
        id: 4,
        part: "Fan Belts",
        required: 30,
        available: 30,
        status: "sufficient",
    },
    {
        id: 5,
        part: "Coolant",
        required: 60,
        available: 25,
        status: "low",
    },
    {
        id: 6,
        part: "Air Filters",
        required: 40,
        available: 15,
        status: "low",
    },
    {
        id: 7,
        part: "Fan Belts",
        required: 30,
        available: 30,
        status: "sufficient",
    },
    {
        id: 8,
        part: "Coolant",
        required: 60,
        available: 25,
        status: "low",
    },
]

// Helper to render risk level with color and icon
function RiskLevelTag({ level }: { level: "sufficient" | "low" }) {
    switch (level) {
        case "low":
            return (
                <span className="flex items-center gap-1 text-red-600 font-semibold">
                    <AlertTriangle className="w-4 h-4" /> Low
                </span>
            )
        case "sufficient":

            return (
                <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <CheckCircle className="w-4 h-4" /> Sufficient
                </span>
            )
        default:
            return <span>Unknown</span>
    }
}

export function LowStockPartsTable() {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Part</TableHead>
                        <TableHead>Required</TableHead>
                        <TableHead>Available</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {alertsData.map((alert) => (
                        <TableRow key={alert.id}>
                            <TableCell>{alert.part}</TableCell>
                            <TableCell>{alert.required}</TableCell>
                            <TableCell>{alert.available}</TableCell>
                            <TableCell>
                                <RiskLevelTag level={alert.status as any} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
