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

// Monthly revenue and expense data
const chartData = [
    { month: "January", revenue: 700000, expense: 450000 },
    { month: "February", revenue: 680000, expense: 470000 },
    { month: "March", revenue: 750000, expense: 490000 },
    { month: "April", revenue: 800000, expense: 520000 },
    { month: "May", revenue: 820000, expense: 560000 },
]

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "var(--themeGreen)",
    },
    expense: {
        label: "Expense",
        color: "var(--themeRed)",
    },
} satisfies ChartConfig

export function RevenueExpenseChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Revenue vs Expense</CardTitle>
                <CardDescription>
                    Track monthly revenue and expenses
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
                            dataKey="revenue"
                            type="monotone"
                            fill="var(--color-revenue)"
                            fillOpacity={0.4}
                            stroke="var(--color-revenue)"
                        />
                        <Area
                            dataKey="expense"
                            type="monotone"
                            fill="var(--color-expense)"
                            fillOpacity={0.4}
                            stroke="var(--color-expense)"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Profit margin increased steadily <TrendingUp className="h-4 w-4" />
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
