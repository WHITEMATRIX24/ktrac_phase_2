"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ReportDataTable } from "@/components/report_datatable";

// Define data structure
export type AccidentCauseData = {
  Cause: string;
  Fatal: number;
  Major: number;
  Minor: number;
  Total: number;
  Percentage: string;
  Date: string;
};

// Column configuration for table
const accidentCauseColumns: ColumnDef<AccidentCauseData>[] = [
  { accessorKey: "Cause", header: "Accident Type" },
  { accessorKey: "Fatal", header: "Fatal" },
  { accessorKey: "Major", header: "Major" },
  { accessorKey: "Minor", header: "Minor" },
  { accessorKey: "Total", header: "Total" },
  { accessorKey: "Percentage", header: "%" },
  { accessorKey: "Date", header: "Date" },
];

// Accident cause types
const causeTypes = [
  "HIT BEHIND BY KSRTC",
  "HIT BEHIND BY THIRD PARTY",
  "HIT FRONT BY THIRD PARTY",
  "HIT SIDE BY KSRTC",
  "HIT FRONT BY KSRTC",
  "HIT SIDE BY THIRD PARTY",
  "HIT FIXED OBJECT",
  "HIT ON PEDESTRIAN BY KSRTC",
  "OTHERS",
  "HEAD ON COLLISION",
  "PASSENGER FALL FROM FOOTBOARD",
  "TREE FALL OVER THE BUS",
  "PASSENGER INJURED INSIDE BUS",
  "HIT BY PEDESTRIAN",
  "HIT DIVIDER",
  "HIT TREE",
  "PASSENGER FALL INSIDE BUS",
  "HIT BEHIND SERIAL",
  "HIT PASSENGER",
  "RUN OVER PEDESTRIAN",
  "RUN OVER PASSENGER",
  "HIT ON ANIMAL",
  "HIT BY ANIMAL",
  "FELL INTO RIVER FROM BRIDGE",
  "TYRE BURSTED",
  "WHEEL JAMMED",
];

// Random utility
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Random data generator
const generateAccidentCauseData = (
  from: string,
  to: string
): AccidentCauseData[] => {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const totalAccidents = rand(70, 100);

  return causeTypes.map((cause) => {
    const fatal = rand(0, 3);
    const major = rand(0, 10);
    const minor = rand(0, 20);
    const total = fatal + major + minor;
    const percentage =
      total > 0 ? ((total / totalAccidents) * 100).toFixed(2) + "%" : "0.00%";
    const randomDate = new Date(
      fromDate.getTime() +
        Math.random() * (toDate.getTime() - fromDate.getTime())
    )
      .toISOString()
      .split("T")[0];

    return {
      Cause: cause,
      Fatal: fatal,
      Major: major,
      Minor: minor,
      Total: total,
      Percentage: percentage,
      Date: randomDate,
    };
  });
};

const CollisionTypeReport = () => {
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tableData, setTableData] = useState<AccidentCauseData[]>([]);

  useEffect(() => {
    setTableData(generateAccidentCauseData(startDate, endDate));
  }, [startDate, endDate]);

  return (
    <div className="px-5 pt-5 flex flex-col gap-1 h-[85vh] overflow-auto">
      <h2 className="text-lg font-semibold">Accident Cause Report</h2>
      <ReportDataTable
        columns={accidentCauseColumns}
        data={tableData}
        searchKey="Cause"
        tableLabel="Accident Cause Table"
        startDate={startDate}
        startDateSetter={setStartDate}
        endDate={endDate}
        endDateSetter={setEndDate}
        isLoading={false}
      />
    </div>
  );
};

export default CollisionTypeReport;
