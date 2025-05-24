"use client"
import * as React from "react"
import {
    Pie,
    PieChart,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    Label,
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"

const dataByDate: Record<string, { category: string; value: number; fill: string }[]> = {
    "2025-05-18": [
        { category: "SERVICE", value: 3280, fill: "#4caf50" },
        { category: "ENROUTE", value: 225, fill: "#2196f3" },
        { category: "PRIVATE HIRE", value: 20, fill: "#ff9800" },
        { category: "TRAINING/STC", value: 20, fill: "#9c27b0" },
        { category: "TRIAL BUS IN SERVICE", value: 10, fill: "#00bcd4" },
        { category: "SCRAP BUS IN SERVICE", value: 0, fill: "#f44336" },
        { category: "BTC", value: 107, fill: "#795548" },
    ],
    "2025-05-19": [
        { category: "SERVICE", value: 3300, fill: "#4caf50" },
        { category: "ENROUTE", value: 210, fill: "#2196f3" },
        { category: "PRIVATE HIRE", value: 18, fill: "#ff9800" },
        { category: "TRAINING/STC", value: 25, fill: "#9c27b0" },
        { category: "TRIAL BUS IN SERVICE", value: 12, fill: "#00bcd4" },
        { category: "SCRAP BUS IN SERVICE", value: 0, fill: "#f44336" },
        { category: "BTC", value: 105, fill: "#795548" },
    ],
}

const chartConfig = {
    SERVICE: { label: "Service", color: "#4caf50" },
    ENROUTE: { label: "Enroute", color: "#2196f3" },
    "PRIVATE HIRE": { label: "Private Hire", color: "#ff9800" },
    "TRAINING/STC": { label: "Training/STC", color: "#9c27b0" },
    "TRIAL BUS IN SERVICE": { label: "Trial Bus", color: "#00bcd4" },
    "SCRAP BUS IN SERVICE": { label: "Scrap Bus", color: "#f44336" },
    BTC: { label: "BTC", color: "#795548" },
}
function formatDate(dateString: string) {
    const d = new Date(dateString)
    return d.toISOString().split('T')[0]
}
export function BusUsedForServiceChart() {
    const [selectedDate, setSelectedDate] = React.useState("2025-05-18")
    const chartData = dataByDate[formatDate(selectedDate)] || []
    const totalBuses = chartData.reduce((acc, cur) => acc + cur.value, 0)


    return (
        <Card className="w-full max-w-full overflow-hidden">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
                    <div className="flex flex-col text-right sm:text-left">
                        <CardTitle>Bus Used For Service</CardTitle>
                        <CardDescription>Choose a date to view buses used for services</CardDescription>
                    </div>
                    <input
                        type="date"
                        value={formatDate(selectedDate)}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                    />
                </div>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <ResponsiveContainer>
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="category"
                                innerRadius={60}
                                strokeWidth={5}
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-3xl font-bold"
                                                    >
                                                        {totalBuses.toLocaleString()}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-muted-foreground"
                                                    >
                                                        Buses
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 w-full px-4">
                    {chartData.map((entry, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <div
                                className="w-2 h-2"
                                style={{ backgroundColor: entry.fill }}
                            />
                            <span className="text-[8px] text-gray-700">{entry.category}</span>
                        </div>
                    ))}
                </div>
            </CardContent>

        </Card>
    )
}
