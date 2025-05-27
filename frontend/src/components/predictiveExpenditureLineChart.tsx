"use client";

import { useMemo, useState, useEffect } from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ChartDataItem = {
  date: string;
  depot: string;
  actual: number;
  forecast: number;
  budget: number;
};

const rangeOptions = [
    { label: "All Time", value: "all" }, 
  { label: "Last 1 Month", value: "last-1-month" },
  { label: "Last 3 Months", value: "last-3-months" },
  { label: "Next 1 Month", value: "next-1-month" },
  { label: "Next 3 Months", value: "next-3-months" },
  { label: "Last, Current and Next Month", value: "month-snapshot" }, // ✅ default
];

function CustomTooltip({
  active,
  payload,
  label,
  chartData,
}: {
  active?: boolean;
  payload?: any;
  label?: string;
  chartData: ChartDataItem[];
}) {
  if (!active || !label) return null;

  const dataForDate = chartData.filter((item) => item.date === label);

  return (
    <div className="bg-white border border-gray-300 rounded p-3 shadow-lg min-w-[250px]">
      <div className="font-semibold mb-2">{label}</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Depot</TableHead>
            <TableHead>Actual</TableHead>
            <TableHead>Forecast</TableHead>
            <TableHead>Budget</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataForDate.map((item) => (
            <TableRow key={`${item.depot}-${item.date}`}>
              <TableCell>{item.depot}</TableCell>
              <TableCell>₹{item.actual.toLocaleString()}</TableCell>
              <TableCell>₹{item.forecast.toLocaleString()}</TableCell>
              <TableCell>₹{item.budget.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function ExpenditureLineChartComponent({
  chartData,
}: {
  chartData: ChartDataItem[];
}) {
  const [selectedDepot, setSelectedDepot] = useState<string>("all");
const [selectedRange, setSelectedRange] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const depots = Array.from(new Set(chartData.map((item) => item.depot)));

  const getDateRangeFilter = (range: string): [Date, Date] => {
  const today = new Date();
  let start = new Date(today);
  let end = new Date(today);

  switch (range) {
    case "last-1-month":
      start.setMonth(today.getMonth() - 1);
      break;
    case "last-3-months":
      start.setMonth(today.getMonth() - 3);
      break;
    case "next-1-month":
      end.setMonth(today.getMonth() + 1);
      break;
    case "next-3-months":
      end.setMonth(today.getMonth() + 3);
      break;
    case "month-snapshot":
      start.setMonth(today.getMonth() - 1);
      end.setMonth(today.getMonth() + 1);
      break;
    case "all":
    default:
      // Set to a wide range to include all data
      start = new Date("2000-01-01");
      end = new Date("2100-12-31");
      break;
  }

  return [start, end];
};


  const filteredChartData = useMemo(() => {
    let data = chartData;

    if (selectedDepot !== "all") {
      data = data.filter((item) => item.depot === selectedDepot);
    }

    const [startDate, endDate] = getDateRangeFilter(selectedRange);
    data = data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });

    if (selectedDepot === "all") {
      const grouped: Record<string, ChartDataItem> = {};
      data.forEach((item) => {
        if (!grouped[item.date]) {
          grouped[item.date] = {
            date: item.date,
            depot: "All",
            actual: 0,
            forecast: 0,
            budget: 0,
          };
        }
        grouped[item.date].actual += item.actual;
        grouped[item.date].forecast += item.forecast;
        grouped[item.date].budget += item.budget;
      });

      return Object.values(grouped).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }

    return data.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [chartData, selectedDepot, selectedRange]);

  const detailData = useMemo(() => {
    if (!selectedDate) return [];
    return chartData.filter((item) => item.date === selectedDate);
  }, [chartData, selectedDate]);

  // Auto-select first date from current month
  useEffect(() => {
    if (!selectedDate) {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const match = chartData.find((item) => {
        const date = new Date(item.date);
        return (
          date.getMonth() === currentMonth && date.getFullYear() === currentYear
        );
      });

      if (match) {
        setSelectedDate(match.date);
      }
    }
  }, [chartData, selectedDate]);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Depot-wise Expenditure Forecast</CardTitle>
        <CardDescription>
          Forecast vs Actual vs Budget — Click on Chart to View Details
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap justify-end gap-4 pb-4">
          <Select value={selectedDepot} onValueChange={setSelectedDepot}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Depot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Depots</SelectItem>
              {depots.map((depot) => (
                <SelectItem key={depot} value={depot}>
                  {depot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedRange} onValueChange={setSelectedRange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              {rangeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Chart and Table Side by Side */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Chart Area */}
          <div className="lg:w-2/5 w-full">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart
                data={filteredChartData}
                onClick={(e: any) => {
                  if (e && e.activeLabel) {
                    setSelectedDate(e.activeLabel);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
                <Tooltip
                  content={<CustomTooltip chartData={chartData} />}
                  cursor={{ stroke: "#8884d8", strokeWidth: 2 }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#04724d"
                  strokeWidth={2}
                  dot={false}
                  name="Actual"
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#d95d39"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  name="Forecast"
                />
                <Line
                  type="monotone"
                  dataKey="budget"
                  stroke="#235789"
                  strokeDasharray="3 3"
                  strokeWidth={2}
                  name="Budget"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Detail Table */}
          <div className="lg:w-3/5 w-full bg-white border p-5 m-5 rounded shadow h-fit">
            <div className="flex justify-between items-center mb-4 m-5">
              <h4 className="text-lg font-semibold">
  {selectedDate
    ? `Detailed View for: ${new Date(selectedDate).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })}`
    : "Select a date from chart"}
</h4>
              
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Depot</TableHead>
                  <TableHead>Actual</TableHead>
                  <TableHead>Forecast</TableHead>
                  <TableHead>Budget</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedDate ? (
                  detailData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.depot}</TableCell>
                      <TableCell>₹{item.actual.toLocaleString()}</TableCell>
                      <TableCell>₹{item.forecast.toLocaleString()}</TableCell>
                      <TableCell>₹{item.budget.toLocaleString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-gray-500">
                      No date selected
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
