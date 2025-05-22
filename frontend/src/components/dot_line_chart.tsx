"use client"

import { TrendingUp } from "lucide-react"
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

// New fuel efficiency data (example values)
const chartData = [
    { month: "January", bus: 3.5, car: 12.2 },
    { month: "February", bus: 3.8, car: 11.8 },
    { month: "March", bus: 3.2, car: 12.0 },
    { month: "April", bus: 3.9, car: 13.1 },
    { month: "May", bus: 4.1, car: 13.4 },
    { month: "June", bus: 3.7, car: 12.7 },
]

// Config to style each line
const chartConfig = {
    bus: {
        label: "Bus (km/l)",
        color: "hsl(var(--chart-1))",
    }
} satisfies ChartConfig

export function DotLineChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Fuel Efficiency Trends</CardTitle>
                <CardDescription>January - May 2025</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
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
                            dataKey="bus"
                            type="natural"
                            stroke="var(--themeGreen)"
                            strokeWidth={2}
                            dot={{ fill: "var(--themeGreen)" }}
                            activeDot={{ r: 6 }}
                        />

                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Fuel efficiency up by 4.1% <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing average fuel efficiency (km/l) for the last 5 months
                </div>
            </CardFooter>
        </Card>
    )
}
