"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis } from "recharts";

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
import { dateToLocaleFormater } from "@/utils/dateFormater";
import { SeverityChartDashboardDataModel } from "@/app/Dashboard/Accidents/page";

interface Props {
  startDate: string;
  endDate: string;
  chartData: SeverityChartDashboardDataModel[];
}

// const chartData = [
//   { severity_type: "Total", value: 186 },
//   { severity_type: "Fatal", value: 73 },
//   { severity_type: "Major", value: 305 },
//   { severity_type: "Minor", value: 1000 },
//   { severity_type: "Insignificant", value: 257 },
// ];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

function CustomTooltip({ payload, label }: any) {
  if (!payload || payload.length === 0) return null;

  const { value } = payload[0];

  return (
    <div className="bg-white p-2 shadow-md rounded">
      <p>
        <strong>{label}:</strong> <span>{value}</span>
      </p>
    </div>
  );
}

export function AccidentSevertyBarChart({
  startDate,
  endDate,
  chartData,
}: Props) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Severity Chart</CardTitle>
        <CardDescription>{`${dateToLocaleFormater(
          startDate
        )} - ${dateToLocaleFormater(endDate)}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="severity_type"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Bar dataKey="value" radius={5}>
              {chartData.map((entry, index) => {
                let color = "";

                switch (entry.severity_type) {
                  case "Fatal":
                    color = "	#ff1a1a";
                    break;
                  case "Major":
                    color = "#ff4d4d";
                    break;
                  case "Minor":
                    color = "#ff8080";
                    break;
                  case "Insignificant":
                    color = "#ffb3b3";
                    break;
                  case "Total":
                    color = "#d9d9d9";
                    break;
                }

                return <Cell key={`cell-${index}`} fill={color} />;
              })}
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Showing severity data for the date selected
        </div>
      </CardFooter>
    </Card>
  );
}
