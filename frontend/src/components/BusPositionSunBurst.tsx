"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Layout, PlotData } from "plotly.js";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface BusPosition {
  "SL NO": number;
  "CLASS OF BUS": string;
  Service: number;
  Enroute: number;
  date: string; // REQUIRED for filtering
  [key: string]: any; // To handle weird keys like 'Training↵/ STC'
}

const Plot = dynamic(
  () => import("react-plotly.js").then((mod) => mod.default),
  {
    ssr: false,
  }
);

interface SunburstChartProps {
  data: BusPosition[];
}

export default function SunburstChart({ data }: SunburstChartProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const findTrainingValue = (bus: BusPosition) => {
    const key = Object.keys(bus).find((k) =>
      k.toLowerCase().includes("training")
    );
    return key ? Number(bus[key]) || 0 : 0;
  };

  // Filter data by selected date (formatted as YYYY-MM-DD)
  const filteredData = selectedDate
    ? data.filter((bus) => {
        const busDate = new Date(bus.created_at).toISOString().split("T")[0];
        return busDate === selectedDate;
      })
    : data;

  const busMap = new Map<
    string,
    { Service: number; Training: number; Enroute: number }
  >();

  filteredData.forEach((bus) => {
    const classLabel = bus["CLASS OF BUS"];
    const Service = Number(bus.Service) || 0;
    const Training = findTrainingValue(bus);
    const Enroute = Number(bus.Enroute) || 0;

    if (!busMap.has(classLabel)) {
      busMap.set(classLabel, { Service, Training, Enroute });
    } else {
      const existing = busMap.get(classLabel)!;
      existing.Service += Service;
      existing.Training += Training;
      existing.Enroute += Enroute;
    }
  });

  const labels: string[] = ["All Buses"];
  const parents: string[] = [""];
  const values: number[] = [0];

  for (const [classLabel, { Service, Training, Enroute }] of busMap.entries()) {
    const total = Service + Training + Enroute;

    labels.push(classLabel);
    parents.push("All Buses");
    values.push(total);

    labels.push(`${classLabel} - Service`);
    parents.push(classLabel);
    values.push(Service);

    labels.push(`${classLabel} - Training / STC`);
    parents.push(classLabel);
    values.push(Training);

    labels.push(`${classLabel} - Enroute`);
    parents.push(classLabel);
    values.push(Enroute);
  }

  // Set root node total
  values[0] = values.slice(1).reduce((sum, v) => sum + v, 0);

  const plotData: Partial<PlotData>[] = [
    {
      type: "sunburst",
      labels,
      parents,
      values,
      branchvalues: "total",
      textinfo: "label+value+percent",
    },
  ];

  const layout: Partial<Layout> = {
    margin: { l: 40, r: 40, b: 40, t: 40 },
    height: 320,
    colorway: [
      "#636efa",
      "#ef553b",
      "#00cc96",
      "#ab63fa",
      "#ffa15a",
      "#19d3f3",
      "#ff6692",
      "#b6e880",
      "#ff97ff",
      "#fecb52",
    ],
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <CardTitle>Bus Position</CardTitle>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="border rounded px-2 py-1 text-sm"
        />
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: "290px" }}>
          <Plot
            data={plotData}
            layout={layout}
            style={{ width: "100%", height: "90%" }}
            config={{ responsive: true }}
          />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none"></div>
        <div className="leading-none text-muted-foreground">
          Showing deployment for {selectedDate ? selectedDate : "Today"}
        </div>
      </CardFooter>
    </Card>
  );
}
