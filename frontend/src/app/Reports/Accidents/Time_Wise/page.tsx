"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ReportDataTable } from "@/components/report_datatable";

// Data type
export type TimePeriodAccidentData = {
  TimePeriod: string;
  Fatal: number;
  Major: number;
  Minor: number;
  Total: number;
  Percentage: string;
  Date: string;
};

// Column definitions
export const timePeriodColumns: ColumnDef<TimePeriodAccidentData>[] = [
  { accessorKey: "TimePeriod", header: "Time Period" },
  { accessorKey: "Fatal", header: "Fatal" },
  { accessorKey: "Major", header: "Major" },
  { accessorKey: "Minor", header: "Minor" },
  { accessorKey: "Total", header: "Total" },
  { accessorKey: "Percentage", header: "% of Accident" },
  { accessorKey: "Date", header: "Date" },
];

// Time slots from your data
const timeSlots = [
  "11.00-15.00",
  "15.00-18.00",
  "22.00-04.00",
  "08.00-11.00",
  "04.00-08.00",
  "18.00-22.00",
  "Time Not Assigned",
];

// Random generator helper
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Generator function
const generateTimePeriodData = (
  from: string,
  to: string
): TimePeriodAccidentData[] => {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const totalAccidents = rand(50, 100);

  return timeSlots.map((slot) => {
    const fatal = rand(0, 3);
    const major = rand(0, 15);
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
      TimePeriod: slot,
      Fatal: fatal,
      Major: major,
      Minor: minor,
      Total: total,
      Percentage: percentage,
      Date: randomDate,
    };
  });
};

const TimePeriodAccidentReport = () => {
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tableData, setTableData] = useState<TimePeriodAccidentData[]>([]);

  useEffect(() => {
    setTableData(generateTimePeriodData(startDate, endDate));
  }, [startDate, endDate]);

  return (
    <div className="px-5 pt-5 flex flex-col gap-1 h-[85vh] overflow-auto">
      <h2 className="text-lg font-semibold">
        Time Period Wise Accident Report
      </h2>
      <ReportDataTable
        columns={timePeriodColumns}
        data={tableData}
        searchKey="TimePeriod"
        tableLabel="Time Period Accident Table"
        startDate={startDate}
        startDateSetter={setStartDate}
        endDate={endDate}
        endDateSetter={setEndDate}
        isLoading={false}
      />
    </div>
  );
};

export default TimePeriodAccidentReport;
