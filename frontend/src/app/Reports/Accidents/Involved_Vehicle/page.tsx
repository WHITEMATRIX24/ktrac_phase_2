"use client";

import React, { useEffect, useState } from "react";
import { ReportDataTable } from "@/components/report_datatable";
import { ColumnDef } from "@tanstack/react-table";

// Define data type
export type AccidentTypeData = {
  Type: string;
  Fatal: number;
  Major: number;
  Minor: number;
  Total: number;
  Date: string;
};

// Table column definitions
const accidentTypeColumns: ColumnDef<AccidentTypeData>[] = [
  { accessorKey: "Type", header: "Accident Type" },
  { accessorKey: "Fatal", header: "Fatal" },
  { accessorKey: "Major", header: "Major" },
  { accessorKey: "Minor", header: "Minor" },
  { accessorKey: "Total", header: "Total" },
  { accessorKey: "Date", header: "Date" },
];

// List of accident types
const accidentTypes = [
  "KSRTC - FOUR WHEELER",
  "KSRTC - TWO WHEELER",
  "KSRTC - OBJECT",
  "KSRTC - LORRY",
  "KSRTC - PEDESTRIAN",
  "KSRTC - KSRTC",
  "KSRTC - PICK UP",
  "KSRTC - PRIVATE BUS",
  "KSRTC - KSWIFT",
  "KSRTC - TRUCK",
  "OTHERS",
  "KSRTC - BICYCLE",
  "SUDDEN BRAKE",
  "KSRTC - SCHOOL BUS",
  "CAUGHT FIRE",
  "JUMP OVER HUMP",
];

// Utility for random number
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Generate table data with random accident values and a date within the range
const generateAccidentTypeData = (
  from: string,
  to: string
): AccidentTypeData[] => {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  return accidentTypes.map((type) => {
    const fatal = rand(0, 3);
    const major = rand(0, 10);
    const minor = rand(0, 20);
    const total = fatal + major + minor;
    const randomDate = new Date(
      fromDate.getTime() +
        Math.random() * (toDate.getTime() - fromDate.getTime())
    )
      .toISOString()
      .split("T")[0];

    return {
      Type: type,
      Fatal: fatal,
      Major: major,
      Minor: minor,
      Total: total,
      Date: randomDate,
    };
  });
};

const InvolvedVehicleReport = () => {
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tableData, setTableData] = useState<AccidentTypeData[]>([]);

  useEffect(() => {
    setTableData(generateAccidentTypeData(startDate, endDate));
  }, [startDate, endDate]);

  return (
    <div className="px-5 pt-5 flex flex-col gap-1 h-[85vh] overflow-auto">
      <h2 className="text-lg font-semibold">Involved Vehicle Report</h2>
      <ReportDataTable
        columns={accidentTypeColumns}
        data={tableData}
        searchKey="Type"
        tableLabel="KSRTC Accident Type Table"
        startDate={startDate}
        startDateSetter={setStartDate}
        endDate={endDate}
        endDateSetter={setEndDate}
        isLoading={false}
      />
    </div>
  );
};

export default InvolvedVehicleReport;
