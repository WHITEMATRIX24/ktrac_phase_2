"use client";

import React, { useEffect, useState } from "react";
import { ReportDataTable } from "@/components/reports/accidents/report_datatable";
import { ColumnDef } from "@tanstack/react-table";

// Define data type
export type AccidentTypeData = {
  type: string;
  fatal: number;
  major: number;
  minor: number;
  total: number;
};

// Table column definitions
const accidentTypeColumns: ColumnDef<AccidentTypeData>[] = [
  { accessorKey: "type", header: "Accident Type" },
  { accessorKey: "fatal", header: "Fatal" },
  { accessorKey: "major", header: "Major" },
  { accessorKey: "minor", header: "Minor" },
  { accessorKey: "total", header: "Total" },
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

const InvolvedVehicleReport = () => {
  const [startDate, setStartDate] = useState(getSameDayLastMonth());
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tableData, setTableData] = useState<AccidentTypeData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //  report data fetching
  const fetchReportData = async () => {
    try {
      !isLoading && setIsLoading(true);

      const formatedStartDate = formatDateForAPI(startDate);
      const formatedEndDate = formatDateForAPI(endDate);
      //   console.log(formatedDate);

      const response = await fetch(
        `/api/reports/accidents/involved_vehicles?start_date=${formatedStartDate}&end_date=${formatedEndDate}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return;
      }

      const responseData = await response.json();
      const report = responseData.report;
      const formatedReport = report.map((r: AccidentTypeData) => {
        return {
          ...r,
          type: r.type
            ? r.type.charAt(0).toUpperCase() + r.type.slice(1)
            : r.type,
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
      <h2 className="text-lg font-semibold">Involved Vehicle Report</h2>
      <ReportDataTable
        columns={accidentTypeColumns}
        data={tableData}
        searchKey="type"
        tableLabel="Involved Vehicle Report"
        startDate={startDate}
        startDateSetter={setStartDate}
        endDate={endDate}
        endDateSetter={setEndDate}
        isLoading={isLoading}
      />
    </div>
  );
};

export default InvolvedVehicleReport;
