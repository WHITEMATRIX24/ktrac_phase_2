"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ReportDataTable } from "@/components/report_datatable";

type AccidentData = {
  Class: string;
  Fatal: number;
  Major: number;
  Minor: number;
  Total: number;
  BusRatio: number;
  Date: string;
};

const classes = [
  "ORD",
  "FP",
  "SFP",
  "SDLX",
  "JN AC",
  "AC Premium SFP",
  "JN NAC",
  "E-BUS",
  "MULTI AXLE",
];

// Utility to generate random integer between min and max (inclusive)
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random date string between two dates (YYYY-MM-DD)
function randomDate(start: Date, end: Date) {
  const d = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return d.toISOString().split("T")[0];
}

// Generate random accident data for all classes given a date range
function generateRandomData(start: string, end: string): AccidentData[] {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const data: AccidentData[] = [];

  classes.forEach((cls) => {
    const fatal = randomInt(0, 5);
    const major = randomInt(0, 30);
    const minor = randomInt(0, 40);
    const total = fatal + major + minor;
    const busRatio = +(Math.random() * 40).toFixed(2);
    const date = randomDate(startDate, endDate);

    data.push({
      Class: cls,
      Fatal: fatal,
      Major: major,
      Minor: minor,
      Total: total,
      BusRatio: busRatio,
      Date: date,
    });
  });

  return data;
}

const columns: ColumnDef<AccidentData>[] = [
  { accessorKey: "Class", header: "Class" },
  { accessorKey: "Fatal", header: "Fatal" },
  { accessorKey: "Major", header: "Major" },
  { accessorKey: "Minor", header: "Minor" },
  { accessorKey: "Total", header: "Total Accidents" },
  { accessorKey: "BusRatio", header: "Bus Ratio" },
  { accessorKey: "Date", header: "Date" },
];

const ParentAccidentReport = () => {
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [filteredData, setFilteredData] = useState<AccidentData[]>([]);

  useEffect(() => {
    // Generate fresh random data on date change
    setFilteredData(generateRandomData(startDate, endDate));
  }, [startDate, endDate]);

  return (
    <div className="px-5 pt-5 flex flex-col gap-1 h-[85vh] overflow-auto">
      <h2 className="text-lg font-semibold">Bus Type Wise Report</h2>
      <ReportDataTable
        columns={columns}
        data={filteredData}
        searchKey="Class"
        tableLabel="Accident Report Table"
        startDate={startDate}
        startDateSetter={setStartDate}
        endDate={endDate}
        endDateSetter={setEndDate}
        isLoading={false}
      />
    </div>
  );
};

export default ParentAccidentReport;
