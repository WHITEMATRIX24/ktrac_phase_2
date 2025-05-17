"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Assuming you're using a shadcn/ui or similar

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function RevenueBarchartComponent({
  chartData,
}: {
  chartData: {
    date: string;
    revenue: number;
  }[];
}) {
  return (
    <Card className="h-full gap-0">
      <CardHeader className="flex flex-col gap-2 ">
        <CardTitle>Total Collection</CardTitle>
        <CardDescription>Showing data from June 2024 - May 2025</CardDescription>


      </CardHeader>

      <CardContent>
        <div className="flex justify-end">
          <Select disabled>
            <SelectTrigger className="w-fit px-3 py-0 bg-white border border-slate-300 rounded-md text-[12px] text-slate-700 shadow-sm opacity-60 cursor-not-allowed">
              <SelectValue placeholder="Select Depo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="depo1">Depo 1</SelectItem>
              <SelectItem value="depo2">Depo 2</SelectItem>
              <SelectItem value="depo3">Depo 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f1d302" />
                <stop offset="100%" stopColor="#f1d302" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="revenue"
              fill="url(#greenGradient)"
              radius={4}
              barSize={40}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
