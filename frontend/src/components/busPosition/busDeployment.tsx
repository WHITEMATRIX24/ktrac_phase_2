
"use client"

import * as React from "react"
import {
    PieChart,
    Pie,
    Label,
    ResponsiveContainer
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartConfig,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const dataByDate: Record<string, { category: string; value: number; fill: string }[]> = {
    "2025-05-18": [
        { category: "Service", value: 3280, fill: "#4caf50" },
        { category: "Enroute", value: 225, fill: "#2196f3" },
        { category: "Training", value: 20, fill: "#9c27b0" },
        { category: "Private Hire", value: 10, fill: "#ff9800" },
    ],
    "2025-05-19": [
        { category: "Service", value: 3100, fill: "#4caf50" },
        { category: "Enroute", value: 240, fill: "#2196f3" },
        { category: "Training", value: 15, fill: "#9c27b0" },
        { category: "Private Hire", value: 25, fill: "#ff9800" },
    ],
    "2025-05-20": [
        { category: "Service", value: 3150, fill: "#4caf50" },
        { category: "Enroute", value: 230, fill: "#2196f3" },
        { category: "Training", value: 18, fill: "#9c27b0" },
        { category: "Private Hire", value: 12, fill: "#ff9800" },
    ],
    "2025-05-21": [
        { category: "Service", value: 3000, fill: "#4caf50" },
        { category: "Enroute", value: 220, fill: "#2196f3" },
        { category: "Training", value: 10, fill: "#9c27b0" },
        { category: "Private Hire", value: 30, fill: "#ff9800" },
    ],
    "2025-05-22": [
        { category: "Service", value: 3400, fill: "#4caf50" },
        { category: "Enroute", value: 210, fill: "#2196f3" },
        { category: "Training", value: 12, fill: "#9c27b0" },
        { category: "Private Hire", value: 18, fill: "#ff9800" },
    ],
    "2025-05-23": [
        { category: "Service", value: 3200, fill: "#4caf50" },
        { category: "Enroute", value: 250, fill: "#2196f3" },
        { category: "Training", value: 16, fill: "#9c27b0" },
        { category: "Private Hire", value: 20, fill: "#ff9800" },
    ],
    "2025-05-24": [
        { category: "Service", value: 3250, fill: "#4caf50" },
        { category: "Enroute", value: 260, fill: "#2196f3" },
        { category: "Training", value: 19, fill: "#9c27b0" },
        { category: "Private Hire", value: 22, fill: "#ff9800" },
    ],
    "2025-05-25": [
        { category: "Service", value: 3350, fill: "#4caf50" },
        { category: "Enroute", value: 245, fill: "#2196f3" },
        { category: "Training", value: 20, fill: "#9c27b0" },
        { category: "Private Hire", value: 28, fill: "#ff9800" },
    ],
}

const chartConfig: ChartConfig = {
    Service: { label: "Service", color: "#4caf50" },
    Enroute: { label: "Enroute", color: "#2196f3" },
    Training: { label: "Training", color: "#9c27b0" },
    "Private Hire": { label: "Private Hire", color: "#ff9800" },
}

function formatDate(dateString: string) {
    const d = new Date(dateString)
    return d.toISOString().split('T')[0]
}

export function BusDeploymentChart() {
    const [selectedDate, setSelectedDate] = React.useState("2025-05-18")
    const chartData = dataByDate[selectedDate] || []
    const totalBuses = chartData.reduce((acc, cur) => acc + cur.value, 0)

    return (
        <Card className="flex flex-col">
            <CardHeader className="pb-0">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
                    <div className="flex flex-col text-right sm:text-left">
                        <CardTitle>Bus Deployment Overview</CardTitle>
                        <CardDescription>Choose a date to view deployment</CardDescription>
                    </div>
                    <input
                        type="date"
                        value={formatDate(selectedDate)}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border rounded px-2 py-1 text-sm w-[140px]"
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
            </CardContent>

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
        </Card>
    )
}
