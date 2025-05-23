"use client"

import { CalendarDays } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

// Sample maintenance prediction data
const chartData = [
    { month: "January", predicted: 22 },
    { month: "February", predicted: 34 },
    { month: "March", predicted: 29 },
    { month: "April", predicted: 40 },
    { month: "May", predicted: 35 },
    { month: "June", predicted: 46 },
]

// Config for styling the chart
const chartConfig = {
    predicted: {
        label: "Predicted Maintenance Cases",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export function DotLineChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Upcoming Predicted Maintenance</CardTitle>
                <CardDescription>Forecast for the next 6 months</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Line
                            dataKey="predicted"
                            type="monotone"
                            stroke="var(--themeBlue)"
                            strokeWidth={2}
                            dot={{ fill: "var(--themeBlue)" }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Surge expected in June <CalendarDays className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Use this forecast to prepare spares and technician availability.
                </div>
            </CardFooter>
        </Card>
    )
}
