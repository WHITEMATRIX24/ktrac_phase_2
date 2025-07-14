"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ReportDataTable } from "@/components/reports/report_datatable";
import {
  dateToLocaleFormater,
  getMonthNameFromYearMonth,
} from "@/utils/dateFormater";

// Data type
export type InjuriesAccidentDataModel = {
  year_month: string;
  fatal: number;
  major: number;
  minor: number;
  total: number;
};

// Column definitions
const timePeriodColumns: ColumnDef<InjuriesAccidentDataModel>[] = [
  { accessorKey: "year_month", header: "Month" },
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

const getSameDayLastSixMonth = () => {
  const today = new Date();
  const lastMonth = new Date(today);

  lastMonth.setMonth(today.getMonth() - 5);

  // Handle cases where previous month had fewer days
  if (
    lastMonth.getMonth() === today.getMonth() - 5 + (12 % 12) &&
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
  const [startDate, setStartDate] = useState(getSameDayLastSixMonth());
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tableData, setTableData] = useState<InjuriesAccidentDataModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //  report data fetching
  const fetchReportData = async () => {
    try {
      !isLoading && setIsLoading(true);
      const formatedStartDate = formatDateForAPI(startDate);
      const formatedEndDate = formatDateForAPI(endDate);
      //   console.log(formatedDate);

      const response = await fetch(
        `/api/reports/accidents/injuries?start_date=${formatedStartDate}&end_date=${formatedEndDate}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return;
      }

      const responseData = await response.json();
      const formatedData = responseData.report.map((item: any) => {
        return {
          ...item,
          year_month: getMonthNameFromYearMonth(item.year_month),
        };
      });
      //   console.log(responseData);
      setTableData(formatedData);
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
      <h2 className="text-lg font-semibold">Accident Injuries Report</h2>
      <ReportDataTable
        columns={timePeriodColumns}
        data={tableData}
        searchKey="year_month"
        tableLabel={`Accident Injuries Report (${dateToLocaleFormater(
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

export default TimePeriodAccidentReport;
