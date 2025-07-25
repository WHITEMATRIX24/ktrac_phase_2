"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ReportDataTable } from "@/components/reports/report_datatable";
import { dateToLocaleFormater } from "@/utils/dateFormater";

export type Action = {
  suspension_count:number
  warning_count:number
};
// Data structure
export type DriverAccidentData = {
  pen_number: string;
  driver_name:string,
  emp_type:string;
  total_accidents: number;
  fatal: number;
  major: number;
  minor: number;
  times_driver_responsible: number;
  actions:Action
};

// Table column definitions
const driverAccidentColumns: ColumnDef<DriverAccidentData>[] = [
  { accessorKey: "pen_number", header: "Pen Number" },
  { accessorKey: "driver_name", header: "Driver Name" },
  { accessorKey: "emp_type", header: "Category" },
  { accessorKey: "total_accidents", header: "Total Accidents" },
  { accessorKey: "fatal", header: "Fatal" },
  { accessorKey: "major", header: "Major" },
  { accessorKey: "minor", header: "Minor" },
  { accessorKey: "total", header: "Total" },
  { accessorKey: "times_driver_responsible: number", header: "Driver Responsible" },
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

const DriverWiseAccidentReport = () => {
  const [startDate, setStartDate] = useState(getSameDayLastMonth());
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tableData, setTableData] = useState<DriverAccidentData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //  report data fetching
  const fetchReportData = async () => {
    try {
      !isLoading && setIsLoading(true);
      const formatedStartDate = formatDateForAPI(startDate);
      const formatedEndDate = formatDateForAPI(endDate);
      console.log(formatedEndDate);
      const response = await fetch(
        `/api/reports/accidents/driver_wise?start_date=${formatedStartDate}&end_date=${formatedEndDate}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return;
      }

      const responseData = await response.json();
      console.log(responseData);
      const report = responseData.data;
      const formatedReport = report
      console.log(formatedReport);

      setTableData(formatedReport);
    } catch (error) {
      console.log(`something unexpected happen in driver report`);
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
      <h2 className="text-lg font-semibold">Driver Wise Accident Report</h2>
      <ReportDataTable
        columns={driverAccidentColumns}
        data={tableData}
        searchKey="pen_number"
        tableLabel={`Driver Wise Accident Report (${dateToLocaleFormater(
          startDate
        )}) - (${dateToLocaleFormater(endDate)})`}
        startDate={startDate}
        startDateSetter={setStartDate}
        endDate={endDate}
        endDateSetter={setEndDate}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DriverWiseAccidentReport;
