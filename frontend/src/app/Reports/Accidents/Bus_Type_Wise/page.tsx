"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ReportDataTable } from "@/components/reports/report_datatable";

type AccidentData = {
  class: string;
  fatal: number;
  major: number;
  minor: number;
  total: number;
  accident_bus_ratio: number;
};

const columns: ColumnDef<AccidentData>[] = [
  { accessorKey: "class", header: "Class" },
  { accessorKey: "fatal", header: "Fatal" },
  { accessorKey: "major", header: "Major" },
  { accessorKey: "minor", header: "Minor" },
  { accessorKey: "total", header: "Total Accidents" },
  { accessorKey: "accident_bus_ratio", header: "Bus Ratio" },
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

const ParentAccidentReport = () => {
  const [startDate, setStartDate] = useState(getSameDayLastMonth());
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tableData, setTableData] = useState<AccidentData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //  report data fetching
  const fetchReportData = async () => {
    try {
      !isLoading && setIsLoading(true);
      const formatedStartDate = formatDateForAPI(startDate);
      const formatedEndDate = formatDateForAPI(endDate);
      //   console.log(formatedDate);

      const response = await fetch(
        `/api/reports/accidents/bus_type?start_date=${formatedStartDate}&end_date=${formatedEndDate}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return;
      }

      const responseData = await response.json();
      const report = responseData.report;
      // console.log(report);
      const formatedReport = report.map((r: AccidentData) => {
        return {
          ...r,
          class: r.class && r.class.charAt(0).toUpperCase() + r.class.slice(1),
        };
      });
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
      <h2 className="text-lg font-semibold">Bus Type Wise Report</h2>
      <ReportDataTable
        columns={columns}
        data={tableData}
        searchKey="class"
        tableLabel="Accident Report Table"
        startDate={startDate}
        startDateSetter={setStartDate}
        endDate={endDate}
        endDateSetter={setEndDate}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ParentAccidentReport;
