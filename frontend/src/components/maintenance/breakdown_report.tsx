"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

// Breakdown data: monthly counts of breakdowns by component
const chartData = [
    { month: "January", engine: 10, brakes: 4, ac: 6 },
    { month: "February", engine: 12, brakes: 3, ac: 7 },
    { month: "March", engine: 8, brakes: 5, ac: 4 },
    { month: "April", engine: 15, brakes: 2, ac: 5 },
    { month: "May", engine: 7, brakes: 6, ac: 3 },

]
const chartConfig = {
    engine: {
        label: "Engine",
        color: "var(--themeGrey)",
    },
    brakes: {
        label: "Brakes",
        color: "var(--themeBlue)",
    },
    ac: {
        label: "AC",
        color: "var(--themeGreen)",
    },
} satisfies ChartConfig

export function BreakdownTrendChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Monthly Breakdown Report</CardTitle>
                <CardDescription>
                    Breakdown occurrences by component (Jan - Jun)
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
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
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            dataKey="ac"
                            type="natural"
                            fill="var(--color-ac)"
                            fillOpacity={0.4}
                            stroke="var(--color-ac)"
                            stackId="a"
                        />
                        <Area
                            dataKey="brakes"
                            type="natural"
                            fill="var(--color-brakes)"
                            fillOpacity={0.4}
                            stroke="var(--color-brakes)"
                            stackId="a"
                        />
                        <Area
                            dataKey="engine"
                            type="natural"
                            fill="var(--color-engine)"
                            fillOpacity={0.4}
                            stroke="var(--color-engine)"
                            stackId="a"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Increase in breakdown rate by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            January - May 2025
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
