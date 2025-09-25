"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DashboardAreaChartDataModel } from "@/app/Dashboard/Accidents/page";
import { dateToLocaleFormater } from "@/utils/dateFormater";

export const description = "An area chart with a legend";

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];

interface Props {
  startDate: string;
  endDate: string;
  chartData: DashboardAreaChartDataModel[];
}

const chartConfig = {
  all: {
    label: "All",
    color: "var(--chart-1)",
  },
  primary: {
    label: "Primary",
    color: "var(--chart-2)",
  },
  inProgress: {
    label: "In Progress",
    color: "#748DAE",
  },
  completed: {
    label: "Completed",
    color: "#A3DC9A",
  },
} satisfies ChartConfig;

export function AccidentDashboardAreaChart({
  chartData,
  endDate,
  startDate,
}: Props) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Accident Status Chart</CardTitle>
        <CardDescription>{`${dateToLocaleFormater(
          startDate
        )} - ${dateToLocaleFormater(endDate)}`}</CardDescription>
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
              dataKey="all"
              type="natural"
              fill={chartConfig.all.color} //"var(--color-all)"
              fillOpacity={0.4}
              stroke={chartConfig.all.color} //"var(--color-all)"
            />
            <Area
              dataKey="primary"
              type="natural"
              fill={chartConfig.primary.color} //"var(--color-primary)"
              fillOpacity={0.4}
              stroke={chartConfig.primary.color} //"var(--color-primary)"
            />
            <Area
              dataKey="in_progress"
              type="natural"
              fill={chartConfig.inProgress.color} //"var(--color-inProgress)"
              fillOpacity={0.4}
              stroke={chartConfig.inProgress.color} //"var(--color-inProgress)"
            />
            <Area
              dataKey="completed"
              type="natural"
              fill={chartConfig.completed.color} //"var(--color-completed)"
              fillOpacity={0.4}
              stroke={chartConfig.completed.color} //"var(--color-completed)"
              // stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
}
