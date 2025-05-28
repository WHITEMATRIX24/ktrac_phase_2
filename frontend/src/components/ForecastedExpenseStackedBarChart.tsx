"use client";

import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

// Type definition
type ForecastCategoryData = {
  date: string;
  depot: string;
  category: string;
  forecast: number;
};



const categoryColors: Record<string, string> = {
  Fuel: "#cbf1ff",
  Maintenance: "#90e0ef",
  Salaries: "#00b4d8",
  Insurance: "#0077b6",
  Misc: "#235789",
};

export function ForecastStackedBarChart({
  data,
}: {
  data: ForecastCategoryData[];
}) {
  const [selectedDepot, setSelectedDepot] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string | null>(() => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const defaultDate = `${year}-${month}-01`;

  // Find the closest matching date in the dataset
  const availableDates = Array.from(new Set(data.map(d => d.date)));
  return availableDates.find(date => date.startsWith(`${year}-${month}`)) || null;
});

interface ForecastDataByDate {
  date: string;
  [category: string]: number | string;
}


  const depots = Array.from(new Set(data.map((d) => d.depot)));
  const allCategories = Array.from(new Set(data.map((d) => d.category)));

  const processedData = useMemo(() => {
    const filtered = selectedDepot === "all" ? data : data.filter((d) => d.depot === selectedDepot);
const grouped: Record<string, ForecastDataByDate> = {};

    filtered.forEach(({ date, category, forecast }) => {
      if (!grouped[date]) grouped[date] = { date };
      grouped[date][category] = (grouped[date][category] as number || 0) + forecast;
    });

    return Object.values(grouped).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data, selectedDepot]);

  const selectedMonthDetails = useMemo(() => {
    if (!selectedMonth) return null;
    return data
      .filter((d) => d.date === selectedMonth && (selectedDepot === "all" || d.depot === selectedDepot))
      .reduce<Record<string, number>>((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.forecast;
        return acc;
      }, {});
  }, [selectedMonth, data, selectedDepot]);

  const handleBarClick = (data: any) => {
    setSelectedMonth(data?.activeLabel || null);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Forecasted Expense by Category</CardTitle>
        <CardDescription>Click a month to view detailed forecast</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex justify-end mb-4">
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
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Chart */}
          <div className="w-full lg:w-2/5 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={processedData} onClick={handleBarClick}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date"
                  tick={{ fontSize: 12 }}
 />
                <YAxis tickFormatter={(v) => `₹${v / 1000}k`}
                  tick={{ fontSize: 12 }}
 />
                <Tooltip formatter={(value: any) => `₹${value.toLocaleString()}`} />
                <Legend />
                {allCategories.map((category) => (
                  <Bar
                    key={category}
                    dataKey={category}
                    stackId="a"
                    fill={categoryColors[category] || "#8884d8"}
                    name={category}
                    barSize={45}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Table */}
          

          <div className="lg:w-3/6 w-full bg-white border p-5 m-5 ms-auto rounded shadow h-fit">
            <div className="flex justify-between items-center mb-4 m-5">
              <h3 className="text-lg font-semibold mb-2">
  {selectedMonth
    ? `Forecast details for ${new Date(selectedMonth).toLocaleString("default", {
        month: "long",
      })} - 2025`
    : "Click a month to view details"}
</h3>
              
            </div>

            {selectedMonthDetails ? (
              <Table className="">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left border-b p-2">Category</TableHead>
                    <TableHead className="text-right border-b p-2">Forecast</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(selectedMonthDetails).map(([category, forecast]) => (
                    <TableRow key={category}>
                      <TableCell className="p-2 border-b">{category}</TableCell>
                      <TableCell className="p-2 text-right border-b">₹{forecast.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground">No data selected.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
