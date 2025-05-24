"use client"

import { AreaChart, Area, XAxis, CartesianGrid } from "recharts"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart"

const ticketSalesData = [
    { month: "January", ticketsSold: 12000 },
    { month: "February", ticketsSold: 14000 },
    { month: "March", ticketsSold: 13500 },
    { month: "April", ticketsSold: 15500 },
    { month: "May", ticketsSold: 16200 },
]

const chartConfig = {
    ticketsSold: {
        label: "Tickets Sold",
        color: "var(--themeBlue)",
    },
}

export function TicketingTrendChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Monthly Ticket Sales</CardTitle>
                <CardDescription>Tickets sold from Jan to May 2025</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        data={ticketSalesData}
                        margin={{ left: 12, right: 12 }}
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
                            type="monotone"
                            dataKey="ticketsSold"
                            fill="var(--color-ticketsSold)"
                            fillOpacity={0.4}
                            stroke="var(--color-ticketsSold)"
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
