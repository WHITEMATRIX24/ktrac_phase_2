"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

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

export const description = "A pie chart with a label";

interface Props {
  chartData: {
    labelData: String;
    data: number;
    fill: String;
  }[];
  chartTitle: String;
  description: String;
}

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function PieChartComponet({
  chartData,
  chartTitle,
  description,
}: Props) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>{chartTitle}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="data" label nameKey="labelData" />
          </PieChart>
        </ChartContainer>
        <CardFooter className="mt-3 flex gap-2 text-xs">
          <div className="flex gap-2 items-center">
            <div
              className="w-4 h-4"
              style={{ backgroundColor: "var(--chart-1)" }}
            ></div>
            <p className="font-semibold"> FIR</p>
          </div>
          <div className="flex gap-2 items-center">
            <div
              className="w-4 h-4"
              style={{ backgroundColor: "var(--chart-2)" }}
            ></div>
            <p className="font-semibold">No FIR</p>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
