"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ReportDataTable } from "@/components/report_datatable";

// Data structure
export type DistrictAccidentData = {
  District: string;
  Fatal: number;
  Major: number;
  Minor: number;
  Total: number;
  Percentage: string;
  Date: string;
};

// Table column definitions
export const districtAccidentColumns: ColumnDef<DistrictAccidentData>[] = [
  { accessorKey: "District", header: "District" },
  { accessorKey: "Fatal", header: "Fatal" },
  { accessorKey: "Major", header: "Major" },
  { accessorKey: "Minor", header: "Minor" },
  { accessorKey: "Total", header: "Total" },
  { accessorKey: "Percentage", header: "%" },
  { accessorKey: "Date", header: "Date" },
];

// Districts list from your data
const districts = [
  "THIRUVANANTHAPURAM",
  "KOLLAM",
  "KOTTAYAM",
  "ERNAKULAM",
  "IDUKKI",
  "KOZHIKODE",
  "THRISSUR",
  "MALAPPURAM",
  "KANNUR",
  "PATHANAMTHITTA",
  "ALAPPUZHA",
  "PALAKKAD",
  "WAYANAD",
  "KASARAGOD",
  "OTHER STATE",
];

// Random number helper
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Data generator
const generateDistrictData = (
  from: string,
  to: string
): DistrictAccidentData[] => {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const totalAccidents = rand(70, 100);

  return districts.map((district) => {
    const fatal = rand(0, 3);
    const major = rand(0, 10);
    const minor = rand(0, 15);
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
      District: district,
      Fatal: fatal,
      Major: major,
      Minor: minor,
      Total: total,
      Percentage: percentage,
      Date: randomDate,
    };
  });
};

const DistrictWiseAccidentReport = () => {
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tableData, setTableData] = useState<DistrictAccidentData[]>([]);

  useEffect(() => {
    setTableData(generateDistrictData(startDate, endDate));
  }, [startDate, endDate]);

  return (
    <div className="px-5 pt-5 flex flex-col gap-1 h-[85vh] overflow-auto">
      <h2 className="text-lg font-semibold">District Wise Accident Report</h2>
      <ReportDataTable
        columns={districtAccidentColumns}
        data={tableData}
        searchKey="District"
        tableLabel="District Accident Table"
        startDate={startDate}
        startDateSetter={setStartDate}
        endDate={endDate}
        endDateSetter={setEndDate}
        isLoading={false}
      />
    </div>
  );
};

export default DistrictWiseAccidentReport;
