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
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react"

// Sample data for critical alerts
const alertsData = [
    {
        id: "RPC 205",
        model: "Ashok Leyland",
        component: "Brakes",
        riskLevel: "high",
        predictedFailureDays: 3,
    },
    {
        id: "RPC 209",
        model: "Tata Marcopolo",
        component: "Engine Cooling",
        riskLevel: "medium",
        predictedFailureDays: 6,
    },
    {
        id: "RPC 280",
        model: "Volvo",
        component: "Suspension",
        riskLevel: "high",
        predictedFailureDays: 2,
    },
    {
        id: "RPC 200",
        model: "Ashok Leyland",
        component: "Transmission",
        riskLevel: "low",
        predictedFailureDays: 10,
    },
    {
        id: "RPC 290",
        model: "Tata",
        component: "Engine",
        riskLevel: "medium",
        predictedFailureDays: 5,
    },
]

// Helper to render risk level with color and icon
function RiskLevelTag({ level }: { level: "high" | "medium" | "low" }) {
    switch (level) {
        case "high":
            return (
                <span className="flex items-center gap-1 text-red-600 font-semibold">
                    <AlertTriangle className="w-4 h-4" /> High
                </span>
            )
        case "medium":
            return (
                <span className="flex items-center gap-1 text-yellow-600 font-semibold">
                    <AlertCircle className="w-4 h-4" /> Medium
                </span>
            )
        case "low":
            return (
                <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <CheckCircle className="w-4 h-4" /> Low
                </span>
            )
        default:
            return <span>Unknown</span>
    }
}

export function CriticalAlertsTable() {
    return (
        <div className="overflow-x-auto">
            <Table>
                <TableHeader >
                    <TableRow>
                        <TableHead>Bus No</TableHead>
                        <TableHead>Model</TableHead>
                        <TableHead>Component</TableHead>
                        <TableHead>Risk Level</TableHead>
                        <TableHead>Predicted Failure</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
                    {alertsData.map((alert) => (
                        <TableRow key={alert.id}>
                            <TableCell>{alert.id}</TableCell>
                            <TableCell>{alert.model}</TableCell>
                            <TableCell>{alert.component}</TableCell>
                            <TableCell>
                                <RiskLevelTag level={alert.riskLevel as any} />
                            </TableCell>
                            <TableCell>{alert.predictedFailureDays} days</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
