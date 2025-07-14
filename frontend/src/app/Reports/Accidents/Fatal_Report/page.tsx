"use client";

import React, { useState, useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ReportDataTable } from "@/components/reports/report_datatable";
import { dateToLocaleFormater } from "@/utils/dateFormater";
import { FatalReportDataTable } from "@/components/reports/fatal_report_table";

type AccidentData = {
  date_of_accident: string;
  bus_no: string;
  home_units: string;
  jurisdiction_unit: string;
  driver_name: string;
  responsibility_as_per_inspector_report: string;
  accident_type:string;
  primary_cause_of_accident:string;
  action_taken_against_responsibility:string;
  responsibility_as_per_fir:string;
};

const columns: ColumnDef<AccidentData>[] = [
  { accessorKey: "date_of_accident", header: "Date Of Accident" },
  { accessorKey: "bus_no", header: "Bus No" },
  { accessorKey: "home_units", header: "Home Units" },
  { accessorKey: "jurisdiction_unit", header: "Jurisdiction Unit" },
  { accessorKey: "responsibility_as_per_inspector_report", header: "Responsibility As Per Inspector Report" },
  { accessorKey: "accident_type", header: "Accident Type" },
  { accessorKey: "primary_cause_of_accident", header: "Primary Cause Of Accident" },
  { accessorKey: "action_taken_against_responsibility", header: "Action Taken Against Responsibility" },
  { accessorKey: "responsibility_as_per_fir", header: "Responsibility As Per FIR" },

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

const FatalAccidentReport = () => {
  const [startDate, setStartDate] = useState(getSameDayLastMonth());
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tableData, setTableData] = useState<AccidentData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //  report data fetching
 /*  const fetchReportData = async () => {
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
  }; */

 /*  useEffect(() => {
    if (startDate || endDate) {
      fetchReportData();
    }
  }, [startDate, endDate]);
  console.log(tableData); */

  useEffect(() => {
  const dummyData: AccidentData[] = [
    {
      date_of_accident: "2025-06-12",
      bus_no: "KL-15-A-2345",
      home_units: "Ernakulam",
      jurisdiction_unit: "Aluva",
      driver_name: "Ravi Kumar",
      responsibility_as_per_inspector_report: "KSRTC Driver",
      accident_type: "Head-on Collision",
      primary_cause_of_accident: "The biker carelessly overtook another vehicle on the right side and hit the bus",
      action_taken_against_responsibility: "Suspension",
      responsibility_as_per_fir: "KSRTC Driver",
    },
    {
      date_of_accident: "2025-06-18",
      bus_no: "KL-07-B-7890",
      home_units: "Thrissur",
      jurisdiction_unit: "Guruvayur",
      driver_name: "Suresh Babu",
      responsibility_as_per_inspector_report: "Two Wheeler Driver",
      accident_type: "Rear-end Collision",
      primary_cause_of_accident: "Sudden Braking",
      action_taken_against_responsibility: "Warning",
      responsibility_as_per_fir: "Two Wheeler Driver",
    },
    {
      date_of_accident: "2025-07-01",
      bus_no: "KL-10-C-1123",
      home_units: "Kozhikode",
      jurisdiction_unit: "Kunnamangalam",
      driver_name: "Aneesh P",
      responsibility_as_per_inspector_report: "Pedestrian",
      accident_type: "Pedestrian Hit",
      primary_cause_of_accident: "Jaywalking",
      action_taken_against_responsibility: "Not Applicable",
      responsibility_as_per_fir: "Pedestrian",
    },
  ];

  setTableData(dummyData);
  setIsLoading(false);
}, []);

  return (
    <div className="px-5 pt-5 flex flex-col gap-1 h-[85vh] overflow-auto">
      <h2 className="text-lg font-semibold">Fatal Accident Report</h2>
      <FatalReportDataTable
        columns={columns}
        data={tableData}
        searchKey="home_units"
        tableLabel={`Fatal Accident Report (${dateToLocaleFormater(
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

export default FatalAccidentReport;
