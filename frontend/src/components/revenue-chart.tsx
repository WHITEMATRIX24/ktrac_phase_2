"use client";

import * as React from "react";
import { Line, LineChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RevenueData = {
  date: string;
  ordinary: number;
  fastPassenger: number;
  superFast: number;
  swift: number;
  totalRevenue: number;
};
import rawData from "../data/bus_finance_2024_2025.json";
const depots = [
  "Thiruvananthapuram",
  "Ernakulam",
  "Kozhikode",
  "Thrissur",
  "Kannur",
];

const chartData = rawData;
const chartConfig = {
  totalRevenue: {
    label: "Total Revenue",
    color: "#610345",
  },
  ordinary: {
    label: "KURTC",
    color: "#8884d8",
  },
  fastPassenger: {
    label: "RTC",
    color: "#82ca9d",
  },
  superFast: {
    label: "Swift",
    color: "#ffc658",
  },
  swift: {
    label: "Samudhra",
    color: "#ff8042",
  },
} satisfies ChartConfig;

export function RevenueAnalysisChart() {
  const currentDate = new Date();
  const [selectedDepot, setSelectedDepot] = React.useState("All");
  const [timeRange, setTimeRange] = React.useState<"month" | "year">("month");
  const [selectedMonth, setSelectedMonth] = React.useState(
    currentDate.getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = React.useState(
    currentDate.getFullYear()
  );

  const filteredData = React.useMemo(() => {
    let data = chartData.filter(
      (entry) => selectedDepot === "All" || entry.depot === selectedDepot
    );

    if (timeRange === "month") {
      data = data.filter((entry) => {
        const date = new Date(entry.date);
        return (
          date.getMonth() + 1 === selectedMonth &&
          date.getFullYear() === selectedYear
        );
      });
    } else {
      data = data.filter(
        (entry) => new Date(entry.date).getFullYear() === selectedYear
      );
    }

    const aggregated = data.reduce((acc, entry) => {
      const dateKey = entry.date;
      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: dateKey,
          ordinary: 0,
          fastPassenger: 0,
          superFast: 0,
          swift: 0,
          totalRevenue: 0,
        };
      }

      switch (entry.busType) {
        case "ordinary":
          acc[dateKey].ordinary += entry.revenue;
          break;
        case "fastPassenger":
          acc[dateKey].fastPassenger += entry.revenue;
          break;
        case "superFast":
          acc[dateKey].superFast += entry.revenue;
          break;
        case "swift":
          acc[dateKey].swift += entry.revenue;
          break;
      }

      acc[dateKey].totalRevenue += entry.revenue;
      return acc;
    }, {} as Record<string, RevenueData>);

    return Object.values(aggregated);
  }, [selectedDepot, timeRange, selectedMonth, selectedYear]);

  const processedData = React.useMemo(() => {
    if (timeRange === "year") {
      const monthlyData: Record<string, RevenueData> = {};
      filteredData.forEach((d) => {
        const month = new Date(d.date).getMonth();
        const year = new Date(d.date).getFullYear();
        const key = `${year}-${month}`;

        if (!monthlyData[key]) {
          monthlyData[key] = {
            date: new Date(year, month).toLocaleString("default", {
              month: "short",
            }),
            ordinary: 0,
            fastPassenger: 0,
            superFast: 0,
            swift: 0,
            totalRevenue: 0,
          };
        }

        monthlyData[key].ordinary += d.ordinary;
        monthlyData[key].fastPassenger += d.fastPassenger;
        monthlyData[key].superFast += d.superFast;
        monthlyData[key].swift += d.swift;
        monthlyData[key].totalRevenue += d.totalRevenue;
      });
      return Object.values(monthlyData);
    }
    return filteredData;
  }, [filteredData, timeRange]);

  return (
    <Card className="@container/card h-full">
      <CardHeader className="flex flex-col">
        <CardTitle>KSRTC Revenue Analysis</CardTitle>
        <CardDescription>
          {timeRange === "month"
            ? `Showing data for ${new Date(
                selectedYear,
                selectedMonth - 1
              ).toLocaleString("default", { month: "long", year: "numeric" })}`
            : `Yearly data for ${selectedYear}`}
        </CardDescription>
        <CardAction className="flex self-end flex-row flex-wrap justify-end gap-2">
          <Select value={selectedDepot} onValueChange={setSelectedDepot}>
            <SelectTrigger className="w-fit px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 hover:border-slate-400 transition duration-200">
              <SelectValue>
                {selectedDepot === "All" ? "All Depots" : selectedDepot}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-white border border-slate-200 rounded-md shadow-lg text-sm text-slate-700">
              <SelectItem
                value="All"
                className="cursor-pointer px-3 py-2 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
              >
                All Depots
              </SelectItem>
              {depots.map((depot) => (
                <SelectItem
                  key={depot}
                  value={depot}
                  className="cursor-pointer px-3 py-2 hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
                >
                  {depot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={timeRange}
            onValueChange={(v) => setTimeRange(v as "month" | "year")}
          >
            <SelectTrigger className="w-fit px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 hover:border-slate-400 transition duration-200">
              <SelectValue>
                {timeRange === "month" ? "Month View" : "Year View"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month View</SelectItem>
              <SelectItem value="year">Year View</SelectItem>
            </SelectContent>
          </Select>

          {timeRange === "month" ? (
            <div className="flex gap-2">
              <Select
                value={selectedMonth.toString()}
                onValueChange={(v) => setSelectedMonth(parseInt(v))}
              >
                <SelectTrigger className="w-fit px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 hover:border-slate-400 transition duration-200">
                  <SelectValue>
                    {new Date(selectedYear, selectedMonth - 1).toLocaleString(
                      "default",
                      { month: "short" }
                    )}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {new Date(selectedYear, i).toLocaleString("default", {
                        month: "long",
                      })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedYear.toString()}
                onValueChange={(v) => setSelectedYear(parseInt(v))}
              >
                <SelectTrigger className="w-fit px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 hover:border-slate-400 transition duration-200">
                  <SelectValue>{selectedYear}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {[2023, 2024, 2025].map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : (
            <Select
              value={selectedYear.toString()}
              onValueChange={(v) => setSelectedYear(parseInt(v))}
            >
              <SelectTrigger className="w-fit px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 hover:border-slate-400 transition duration-200">
                <SelectValue>{selectedYear}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {[2023, 2024, 2025].map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-0 sm:px-6 sm:pt-0 h-full">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-full w-full"
        >
          <LineChart data={processedData}>
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value}
            />
            <Tooltip
              content={
                <ChartTooltipContent
                  className="w-60"
                  labelFormatter={(value) => value}
                />
              }
            />
            {Object.entries(chartConfig).map(([key, config]) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={config.color}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
