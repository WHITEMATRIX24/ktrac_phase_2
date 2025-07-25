"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { UnitWiseReportColorTable } from "@/components/reports/accidents/unit_wise_report_colortable";
import { dateToLocaleFormater } from "@/utils/dateFormater";

export type UnitWiseAccidentDataModel = {
  depot_name: string;
  fatal: number;
  major: number;
  minor: number;
  total_accidents: number;
  unit_wise_operated_km: number;
  rate_of_accidents_in_1_lakhs_km: number;
  isTotalRow?: boolean;
};

const depotKMMap: Record<string, number> = {
  ARK: 80563,
  PVR: 301656,
  HPD: 282159,
  CTL: 429294,
  TVM: 1261401,
  KMY: 379939,
  PSL: 493939,
  ALP: 538774,
};

const injectDummyKM = (data: UnitWiseAccidentDataModel[]): UnitWiseAccidentDataModel[] => {
  return data.map((entry, index) => {
    const dummyKM = depotKMMap[entry.depot_name] ?? (150000 + index * 10000);
    const total = entry.fatal + entry.major + entry.minor;
    const rate = (total / dummyKM) * 100000;

    return {
      ...entry,
      unit_wise_operated_km: dummyKM,
      rate_of_accidents_in_1_lakhs_km: parseFloat(rate.toFixed(2)),
    };
  });
};

function addTotalToTableData(data: UnitWiseAccidentDataModel[]): UnitWiseAccidentDataModel[] {
  const total = data.reduce(
    (acc, item) => {
      acc.fatal += item.fatal;
      acc.major += item.major;
      acc.minor += item.minor;
      acc.total += item.total_accidents;
      acc.km += item.unit_wise_operated_km;
      acc.weighted += item.rate_of_accidents_in_1_lakhs_km * item.unit_wise_operated_km;
      return acc;
    },
    { fatal: 0, major: 0, minor: 0, total: 0, km: 0, weighted: 0 }
  );

  const totalRate = total.km > 0 ? parseFloat((total.weighted / total.km).toFixed(2)) : 0;

  return [
    ...data,
    {
      depot_name: "Total",
      fatal: total.fatal,
      major: total.major,
      minor: total.minor,
      total_accidents: total.total,
      unit_wise_operated_km: total.km,
      rate_of_accidents_in_1_lakhs_km: totalRate,
       isTotalRow: true,
    },
  ];
}

const columns: ColumnDef<UnitWiseAccidentDataModel>[] = [
  {
    id: "sl_no",
    header: "Sl No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "depot_name",
    header: "Depot Name",
    cell: (info) => (
      <div className="capitalize font-medium">{info.getValue() as string}</div>
    ),
  },
  { accessorKey: "fatal", header: "Fatal" },
  { accessorKey: "major", header: "Major" },
  { accessorKey: "minor", header: "Minor" },
  { accessorKey: "total_accidents", header: "Total" },
  {
    accessorKey: "rate_of_accidents_in_1_lakhs_km",
    header: "Rate (1 Lakh Km)",
    cell: (info) => (info.getValue() as number).toFixed(2),
  },
  {
    accessorKey: "unit_wise_operated_km",
    header: "Operated KM",
    cell: (info) => Number(info.getValue() as number).toLocaleString(),
  },
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
  if (lastMonth.getDate() !== today.getDate()) lastMonth.setDate(0);

  return lastMonth.toISOString().split("T")[0];
};

const UnitWiseAccidentReport = () => {
  const [startDate, setStartDate] = useState(getSameDayLastMonth());
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
  const [tableData, setTableData] = useState<UnitWiseAccidentDataModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchReportData = async () => {
    try {
      setIsLoading(true);
      const start = formatDateForAPI(startDate);
      const end = formatDateForAPI(endDate);

      const res = await fetch(
        `/api/dashboard/accidents?start_date=${start}&end_date=${end}&bonnet_no=&district=&category=&fuel_type=`
      );

      if (!res.ok) {
        console.error(await res.json());
        return;
      }

      const json = await res.json();
      const enriched = injectDummyKM(json.depotData);

const sortedData = enriched
  .filter((item) => !item.isTotalRow)
  .sort(
    (a, b) => (b.rate_of_accidents_in_1_lakhs_km ?? 0) - (a.rate_of_accidents_in_1_lakhs_km ?? 0)
);

const finalData = addTotalToTableData(sortedData);

      setTableData(finalData);
    } catch (err) {
      console.error("Failed to fetch report:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchReportData();
    }
  }, [startDate, endDate]);

  return (
    <div className="px-5 pt-5 flex flex-col gap-2 h-[85vh] overflow-auto">
      <h2 className="text-lg font-semibold">Rate Of Accident Report</h2>
      <UnitWiseReportColorTable
        columns={columns}
        data={tableData}
        searchKey="depot_name"
        tableLabel={`Rate Of Accident Report (${dateToLocaleFormater(
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

export default UnitWiseAccidentReport;