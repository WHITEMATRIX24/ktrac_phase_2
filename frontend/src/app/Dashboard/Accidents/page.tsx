"use client";
import { AccidentLineChart } from "@/components/accident_dashboard_linechart";
import { PieChartComponet } from "@/components/accident_dashboard_piechart";
import { SectionCards } from "@/components/section-cards";
import { Ambulance, File, FileCheck2, FileClock } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Button } from "@/components/ui/button";

const dummyData = [
  {
    title: "Total Accidents",
    value: 135230,
    change: "0",
    icon: <Ambulance className="w-12 h-12 text-grey opacity-40" />,
  },
  {
    title: "Primary Stage",
    value: 87990,
    change: "0",
    icon: <File className="w-12 h-12 text-grey opacity-40" />,
  },
  {
    title: "In Progress",
    value: 47240,
    change: "0",
    icon: <FileClock className="w-12 h-12 text-grey opacity-40" />,
  },
  {
    title: "Completed",
    value: 53340,
    change: "0",
    icon: <FileCheck2 className="w-12 h-12 text-grey opacity-40" />,
  },
];

const pieChartData = [
  { labelData: "FIR", data: 275, fill: "var(--color-chrome)" },
  { labelData: "No FIR", data: 200, fill: "var(--color-safari)" },
];

const lineChartData = [
  { month: "January", all: 186, primary: 80, inProgress: 50, completed: 60 },
  { month: "February", all: 305, primary: 200, inProgress: 80, completed: 20 },
  { month: "March", all: 237, primary: 120, inProgress: 20, completed: 40 },
  { month: "April", all: 300, primary: 190, inProgress: 90, completed: 50 },
  { month: "May", all: 209, primary: 130, inProgress: 100, completed: 90 },
  { month: "June", all: 214, primary: 140, inProgress: 90, completed: 80 },
];

const AccidentsDashboard = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-3 md:gap-6 md:py-2">
          <div className="flex gap-2 justify-end pr-6">
            <Select>
              <SelectTrigger
                size="sm"
                className="w-fit px-3 py-0 bg-white border border-slate-300 rounded-md text-[12px] text-black shadow-sm "
              >
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="depo1">District 1</SelectItem>
                <SelectItem value="depo2">District 2</SelectItem>
                <SelectItem value="depo3">District 3</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger
                size="sm"
                className="w-fit px-3 py-0 bg-white border border-slate-300 rounded-md text-[12px] text-black shadow-sm "
              >
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="depo1">Category 1</SelectItem>
                <SelectItem value="depo2">Category 2</SelectItem>
                <SelectItem value="depo3">Category 3</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger
                size="sm"
                className="w-fit px-3 py-0 bg-white border border-slate-300 rounded-md text-[12px] text-black shadow-sm "
              >
                <SelectValue placeholder="Select Fuel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="depo1">Fuel 1</SelectItem>
                <SelectItem value="depo2">Fuel 2</SelectItem>
                <SelectItem value="depo3">Fuel 3</SelectItem>
              </SelectContent>
            </Select>
            <Button size={"sm"} className="bg-sidebar">
              Search
            </Button>
          </div>
          <SectionCards data={dummyData} />
          <div className="grid grid-cols-2 gap-4">
            <div className="pl-4 lg:pl-6">
              <AccidentLineChart chartData={lineChartData} />
            </div>
            <div className="pr-4 lg:pr-6">
              <PieChartComponet
                chartTitle="Accident FIR"
                description="Ratio of accident data with FIR & without FIR"
                chartData={pieChartData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccidentsDashboard;
