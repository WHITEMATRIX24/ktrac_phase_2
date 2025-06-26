"use client";

import React, { useState, useEffect } from "react";
import { ReportDataTable } from "@/components/report_datatable";
import { ColumnDef } from "@tanstack/react-table";

export type VehicleAccidentData = {
  VehicleType: string;
  Fatal: number;
  Major: number;
  Minor: number;
  Total: number;
  Percentage: string;
  Date: string;
};

const vehicleColumns: ColumnDef<VehicleAccidentData>[] = [
  { accessorKey: "VehicleType", header: "Vehicle Type" },
  { accessorKey: "Fatal", header: "Fatal" },
  { accessorKey: "Major", header: "Major" },
  { accessorKey: "Minor", header: "Minor" },
  { accessorKey: "Total", header: "Total" },
  { accessorKey: "Percentage", header: "% of Accident" },
  { accessorKey: "Date", header: "Date" },
];

const vehicleTypes = [
  "OTHER VEHICLE",
  "KSRTC",
  "TWO WHEELER",
  "PEDESTRIANS/PASSENGER",
  "UNKNOWN",
];

// Utility to generate a random integer
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Generate random data
const generateData = (from: string, to: string): VehicleAccidentData[] => {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const totalAccidents = rand(50, 100);

  return vehicleTypes.map((type) => {
    const fatal = rand(0, 5);
    const major = rand(0, 10);
    const minor = rand(0, 30);
    const total = fatal + major + minor;
    const percentage = ((total / totalAccidents) * 100).toFixed(2) + "%";
    const randomDate = new Date(
      fromDate.getTime() +
        Math.random() * (toDate.getTime() - fromDate.getTime())
    )
      .toISOString()
      .split("T")[0];

    return {
      VehicleType: type,
      Fatal: fatal,
      Major: major,
      Minor: minor,
      Total: total,
      Percentage: percentage,
      Date: randomDate,
    };
  });
};

const AccidentResponsibilityReport = () => {
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tableData, setTableData] = useState<VehicleAccidentData[]>([]);

  useEffect(() => {
    setTableData(generateData(startDate, endDate));
  }, [startDate, endDate]);

  return (
    <div className="px-5 pt-5 flex flex-col gap-1 h-[85vh] overflow-auto">
      <h2 className="text-lg font-semibold">Vehicle Responsibility Report</h2>
      <ReportDataTable
        columns={vehicleColumns}
        data={tableData}
        searchKey="VehicleType"
        tableLabel="Vehicle Accident Table"
        startDate={startDate}
        startDateSetter={setStartDate}
        endDate={endDate}
        endDateSetter={setEndDate}
        isLoading={false}
      />
    </div>
  );
};

export default AccidentResponsibilityReport;
