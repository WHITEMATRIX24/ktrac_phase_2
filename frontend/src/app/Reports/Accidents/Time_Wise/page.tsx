"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ReportDataTable } from "@/components/reports/accidents/report_datatable";

// Data type
export type TimePeriodAccidentData = {
  time_period: string;
  fatal: number;
  major: number;
  minor: number;
  total: number;
  percentage: string;
  type?: string;
};

// Column definitions
const timePeriodColumns: ColumnDef<TimePeriodAccidentData>[] = [
  { accessorKey: "time_period", header: "Time Period" },
  { accessorKey: "fatal", header: "Fatal" },
  { accessorKey: "major", header: "Major" },
  { accessorKey: "minor", header: "Minor" },
  { accessorKey: "total", header: "Total" },
  { accessorKey: "percentage", header: "% of Accident" },
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

const TimePeriodAccidentReport = () => {
  const [startDate, setStartDate] = useState(getSameDayLastMonth());
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tableData, setTableData] = useState<TimePeriodAccidentData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //  report data fetching
  const fetchReportData = async () => {
    try {
      !isLoading && setIsLoading(true);
      const formatedStartDate = formatDateForAPI(startDate);
      const formatedEndDate = formatDateForAPI(endDate);
      //   console.log(formatedDate);

      const response = await fetch(
        `/api/reports/accidents/ksrtc_timewise?start_date=${formatedStartDate}&end_date=${formatedEndDate}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return;
      }

      const responseData = await response.json();
      // console.log(responseData);
      const report = responseData.report;
      const formatedReport = report.map((r: TimePeriodAccidentData) => {
        return {
          ...r,
          time_period: r.time_period
            ? r.time_period
            : r.type && r.type.charAt(0).toUpperCase() + r.type.slice(1),
        };
      });
      // console.log(formatedReport);

      setTableData(formatedReport);
    } catch (error) {
      console.log(`something unexpected happen in time wise report`);
      console.log(error);
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
      <h2 className="text-lg font-semibold">
        Time Period Wise Accident Report
      </h2>
      <ReportDataTable
        columns={timePeriodColumns}
        data={tableData}
        searchKey="time_period"
        tableLabel="Time Period Accident Table"
        startDate={startDate}
        startDateSetter={setStartDate}
        endDate={endDate}
        endDateSetter={setEndDate}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TimePeriodAccidentReport;
