"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "December", expense: 98523, mobile: 140 },
  { month: "January", expense: 114756, mobile: 80 },
  { month: "February", expense: 90057, mobile: 200 },
  { month: "March", expense: 104576, mobile: 120 },
  { month: "April", expense: 89900, mobile: 190 },
  { month: "May", expense: 67240, mobile: 130 },
];

const chartConfig = {
  expense: {
    label: "Expense",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function RevenueCustomBarchart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fuel Expenses</CardTitle>
        <CardDescription>
          Previous months expense expenses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="expense" type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="expense"
              layout="vertical"
              fill="var(--themeRed)"
              radius={4}
            >
              <LabelList
                dataKey="month"
                position="insideLeft"
                offset={4}
                className="fill-[white]"
                fontSize={12}
              />
              <LabelList
                dataKey="expense"
                position="right"
                offset={4}
                className="text-grey"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
