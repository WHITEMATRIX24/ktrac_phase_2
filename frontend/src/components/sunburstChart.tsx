"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { CalendarDropdown } from "@/components/ui/calendar";
import { isSameDay, parseISO } from "date-fns";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const depotGroups: Record<string, string[]> = {
  ALL: [],
  TVM: ["Thiruvananthapuram", "EMT", "KKD", "TDY"],
  KZD: ["Kozhikode", "ETP", "KTM"],
  TSR: ["Thrissur", "EDT", "MLA"],
};

type BusData = {
  "Unit Name": string;
  "Total Bus Operated": number;
  "Total Buses": number;
  "Total Schedules Operated in unit": number;
  "Transfer Bus Details": string | number | null;
  "Private Hire / Training / Test / Airport Services, etc": string | number | null;
  "Buses in Dock & Police Custody": number | null;
  "Enroute buses including Pamba Special Services": string | number | null;
  "Idle Buses": string | number | null;
  "No. of Buses Transfers Between Depots": string | number | null;
  "Spare buses used for 2 nd Spell & Non operted Jn Ac Buses": string | number | null;
  "created_at": string | number | null;
  "updated_at": string | number | null;
};

type Props = {
  data: unknown[];
};

export function SunburstRevenueChart({ data }: Props) {
  if (!data) return null;

  const rawData = data as BusData[];

  const [selectedDepot, setSelectedDepot] = React.useState("ALL");
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());

  const toNumber = (value: unknown): number => {
    if (value === null || value === undefined || value === "") return 0;
    const parsed = parseFloat(String(value).match(/-?\d+(\.\d+)?/)?.[0] || "0");
    return isNaN(parsed) ? 0 : parsed;
  };

  const depotList = React.useMemo(() => {
    const depots = new Set<string>();
    rawData.forEach((item) => {
      if (item["Unit Name"]) depots.add(item["Unit Name"]);
    });
    return Array.from(depots);
  }, [rawData]);

  const filteredData = React.useMemo(() => {
    if (!selectedDate) return [];
    return rawData.filter((item) => {
      const itemDate = typeof item.created_at === "string"
        ? parseISO(item.created_at)
        : new Date(item.created_at || "");

      const isSame = isSameDay(itemDate, selectedDate);
      const matchesDepot = selectedDepot === "ALL" || item["Unit Name"] === selectedDepot;

      return isSame && matchesDepot;
    });
  }, [selectedDate, selectedDepot, rawData]);

  const labels = ["All"];
  const parents = [""];
  const values = [0];
  let totalAll = 0;

  filteredData.forEach((unit) => {
    const depot = unit["Unit Name"];
    labels.push(depot);
    parents.push("All");
    const depotStartIndex = labels.length - 1;
    let depotTotal = 0;

    const groupTotals: Record<string, number> = {
      OperationalBus: 0,
      EnrouteBus: 0,
      Idle: 0,
      SpareBus: 0,
      Btc: 0,
      Others: 0,
      Dock: 0,
      Schedules: 0,
      "1for2": 0,
      Total: 0,
    };

    const categories = [
      {
        label: "Total Bus Operated",
        group: "OperationalBus",
        value: toNumber(unit["Total Bus Operated"]),
      },
      {
        label: "Schedules Operated",
        group: "Total",
        value: toNumber(unit["Total Schedules Operated in unit"]),
      },
      {
        label: "Private Hire / Training / etc",
        group: "Others",
        value: toNumber(unit["Private Hire / Training / Test / Airport Services, etc"]),
      },
      {
        label: "Dock & Police Custody",
        group: "Dock",
        value: toNumber(unit["Buses in Dock & Police Custody"]),
      },
      {
        label: "Idle Buses",
        group: "Idle",
        value: toNumber(unit["Idle Buses"]),
      },
      {
        label: "Enroute Buses (Special)",
        group: "EnrouteBus",
        value: toNumber(unit["Enroute buses including Pamba Special Services"]),
      },
    ];

    const groupKeys = Object.keys(groupTotals);

    groupKeys.forEach((group) => {
      const groupLabel = `${depot} - ${group}`;
      labels.push(groupLabel);
      parents.push(depot);
    });

    categories.forEach(({ label, group, value }) => {
      const fullLabel = `${depot} - ${label}`;
      const groupLabel = `${depot} - ${group}`;
      labels.push(fullLabel);
      parents.push(groupLabel);
      values.push(value);
      groupTotals[group] += value;
      depotTotal += value;
    });

    groupKeys.forEach((group) => {
      const groupLabel = `${depot} - ${group}`;
      values.push(groupTotals[group]);
    });

    values[depotStartIndex] = depotTotal;
    totalAll += depotTotal;
  });

  values[0] = totalAll;

  const chartData: Plotly.Data = {
    type: "sunburst",
    labels,
    parents,
    values,
    hovertemplate: "%{label}<br><b>%{value} buses</b><extra></extra>",
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      setSelectedDate(newDate);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle>KSRTC Unit Wise Bus Allotment View</CardTitle>
            <CardDescription>
              Bus Allotment on {selectedDate?.toLocaleDateString("en-IN")}
            </CardDescription>
          </div>
          <div className="flex gap-2 ">
            <div className=" me-5">
              <label className="text-[12px] mb-1 block">Select Date</label>
              <input
                type="date"
                value={selectedDate?.toISOString().split("T")[0]}
                onChange={handleDateChange}
                className="border px-2 text-[12px] py-2 rounded"
              />
            </div>
            <div className=" ms-5">
              <label className="text-[12px] mb-1 block">Select Depot</label>
              <Select value={selectedDepot} onValueChange={setSelectedDepot}>
                <SelectTrigger className="text-[12px] p-1 px-2">
                  <SelectValue placeholder="Select Depot" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Depots</SelectItem>
                  {depotList.map((depot) => (
                    <SelectItem key={depot} value={depot}>
                      {depot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[500px] flex items-center justify-center">
        {filteredData.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No bus allotment data available for the selected date.
          </p>
        ) : (
          <Plot
            data={[chartData]}
            layout={{
              margin: { t: 10, l: 10, r: 10, b: 10 },
            }}
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </CardContent>
    </Card>
  );
}
