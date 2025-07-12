"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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

interface Props {
  chartData: {
    month: String;
    all: number;
    primary: number;
    inProgress: number;
    completed: number;
  }[];
}

const chartConfig = {
  all: {
    label: "all",
    color: "var(--chart-1)",
  },
  primary: {
    label: "primary",
    color: "var(--chart-2)",
  },
  inProgress: {
    label: "inProgress",
    color: "var(--chart-3)",
  },
  completed: {
    label: "completed",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function AccidentLineChart({ chartData }: Props) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Category Based Accidents</CardTitle>
        <CardDescription>
          Comparison of accidents based on category
        </CardDescription>
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="all"
              type="monotone"
              stroke="var(--color-all)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="primary"
              type="monotone"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="inProgress"
              type="monotone"
              stroke="var(--color-inProgress)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="completed"
              type="monotone"
              stroke="var(--color-completed)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="mt-3 flex gap-2 text-xs">
        <div className="flex gap-2 items-center">
          <div
            className="w-4 h-4"
            style={{ backgroundColor: "var(--chart-1)" }}
          ></div>
          <p className="font-semibold"> All</p>
        </div>
        <div className="flex gap-2 items-center">
          <div
            className="w-4 h-4"
            style={{ backgroundColor: "var(--chart-2)" }}
          ></div>
          <p className="font-semibold">Primary</p>
        </div>
        <div className="flex gap-2 items-center">
          <div
            className="w-4 h-4"
            style={{ backgroundColor: "var(--chart-3)" }}
          ></div>
          <p className="font-semibold">In progress</p>
        </div>
        <div className="flex gap-2 items-center">
          <div
            className="w-4 h-4"
            style={{ backgroundColor: "var(--chart-4)" }}
          ></div>
          <p className="font-semibold">Completed</p>
        </div>
      </CardFooter>
    </Card>
  );
}
