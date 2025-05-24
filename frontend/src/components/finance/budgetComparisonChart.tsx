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

// Monthly budget vs actual expense data
const chartData = [
    { month: "January", budgeted: 500000, actual: 480000 },
    { month: "February", budgeted: 520000, actual: 510000 },
    { month: "March", budgeted: 530000, actual: 550000 },
    { month: "April", budgeted: 540000, actual: 580000 },
    { month: "May", budgeted: 550000, actual: 560000 },
]

const chartConfig = {
    budgeted: {
        label: "Budgeted",
        color: "var(--themeBlue)",
    },
    actual: {
        label: "Actual",
        color: "var(--themeGreen)",
    },
} satisfies ChartConfig

export function BudgetComparisonChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Budget vs Actual Expenditure</CardTitle>
                <CardDescription>
                    Monthly comparison of planned vs actual spending
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
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
                            dataKey="budgeted"
                            type="monotone"
                            fill="var(--color-budgeted)"
                            fillOpacity={0.4}
                            stroke="var(--color-budgeted)"
                        />
                        <Area
                            dataKey="actual"
                            type="monotone"
                            fill="var(--color-actual)"
                            fillOpacity={0.4}
                            stroke="var(--color-actual)"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Actual expenses exceeded budget in April <TrendingUp className="h-4 w-4" />
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
