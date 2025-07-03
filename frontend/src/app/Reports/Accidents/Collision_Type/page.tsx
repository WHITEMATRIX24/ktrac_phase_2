"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ReportDataTable } from "@/components/reports/accidents/report_datatable";

// Define data structure
export type AccidentCauseData = {
  type: string;
  fatal: number;
  major: number;
  minor: number;
  total: number;
  percentage: string;
};

// Column configuration for table
const accidentCauseColumns: ColumnDef<AccidentCauseData>[] = [
  { accessorKey: "type", header: "Accident Type" },
  { accessorKey: "fatal", header: "Fatal" },
  { accessorKey: "major", header: "Major" },
  { accessorKey: "minor", header: "Minor" },
  { accessorKey: "total", header: "Total" },
  { accessorKey: "percentage", header: "%" },
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

const formatDateForAPI = (input: string): string => {
  const [year, month, day] = input.split("-");
  const shortYear = year.slice(2);
  return `${day}/${month}/${shortYear}`;
};

const getSameDayLastMonth = () => {
  const today = new Date();
  const lastMonth = new Date(today);

  lastMonth.setMonth(today.getMonth() - 1);

  // Handle cases where previous month had fewer days
  if (
    lastMonth.getMonth() === today.getMonth() - 1 + (12 % 12) &&
    lastMonth.getDate() !== today.getDate()
  ) {
    lastMonth.setDate(0);
  }
  const year = lastMonth.getFullYear();
  const month = String(lastMonth.getMonth() + 1).padStart(2, "0");
  const day = String(lastMonth.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const CollisionTypeReport = () => {
  const [startDate, setStartDate] = useState(getSameDayLastMonth());
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tableData, setTableData] = useState<AccidentCauseData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //  report data fetching
  const fetchReportData = async () => {
    try {
      !isLoading && setIsLoading(true);
      const formatedStartDate = formatDateForAPI(startDate);
      const formatedEndDate = formatDateForAPI(endDate);
      //   console.log(formatedDate);

      const response = await fetch(
        `/api/reports/accidents/collision_type?start_date=${formatedStartDate}&end_date=${formatedEndDate}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return;
      }

      const responseData = await response.json();
      const report = responseData.report;
      const formatedReport = report.map((r: AccidentCauseData) => {
        return {
          ...r,
          type: r.type
            ? r.type.charAt(0).toUpperCase() + r.type.slice(1)
            : r.type,
        };
      });
      console.log(formatedReport);

      setTableData(formatedReport);
    } catch (error) {
      console.log(`something unexpected happen in responsibility report`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (startDate || endDate) {
      fetchReportData();
    }
  }, [startDate, endDate]);

  return (
    <div className="px-5 pt-5 flex flex-col gap-1 h-[85vh] overflow-auto">
      <h2 className="text-lg font-semibold">Accident Cause Report</h2>
      <ReportDataTable
        columns={accidentCauseColumns}
        data={tableData}
        searchKey="type"
        tableLabel="Accident Cause Table"
        startDate={startDate}
        startDateSetter={setStartDate}
        endDate={endDate}
        endDateSetter={setEndDate}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CollisionTypeReport;
