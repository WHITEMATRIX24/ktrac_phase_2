"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { dateToLocaleFormater } from "@/utils/dateFormater";
import { UnitWiseReportTable } from "@/components/reports/accidents/unit_wise_reporttable";

// Data type
export type UnitWiseAccidentDataModel = {
  depot_name: string;
  fatal: number;
  major: number;
  minor: number;
  total_accidents: number;
  rate_of_accidents_in_1_lakhs_km: number;
  unit_wise_operated_km: number;
};

// FUNCTION FOR ADDING TOTAL ROW DATA
function addTotalToTableData(
  tableData: UnitWiseAccidentDataModel[]
): UnitWiseAccidentDataModel[] {
  const totalData = tableData.reduce(
    (acc, data) => {
      acc.fatal += data.fatal;
      acc.major += data.major;
      acc.minor += data.minor;
      acc.total += data.total_accidents;
      acc.unit_wise_operated_km += data.unit_wise_operated_km;
      acc.rate_of_accidents_in_1_lakhs_km +=
        data.rate_of_accidents_in_1_lakhs_km * data.unit_wise_operated_km;

      return acc;
    },
    {
      fatal: 0,
      major: 0,
      minor: 0,
      total: 0,
      unit_wise_operated_km: 0,
      rate_of_accidents_in_1_lakhs_km: 0,
    }
  );

  // Calculate the final rate_of_accidents_in_1_lakhs_km for the "Total" entry
  let totalRate = 0;
  if (totalData.unit_wise_operated_km > 0) {
    const totalAccidents = totalData.fatal + totalData.major + totalData.minor;
    totalRate = (totalAccidents / totalData.unit_wise_operated_km) * 100000;
  }

  const formattedRate = parseFloat(totalRate.toFixed(2));

  console.log(totalData); // Debugging line

  const totalEntry: UnitWiseAccidentDataModel = {
    depot_name: "Total",
    fatal: totalData.fatal,
    major: totalData.major,
    minor: totalData.minor,
    total_accidents: totalData.total,
    rate_of_accidents_in_1_lakhs_km: formattedRate,
    unit_wise_operated_km: totalData.unit_wise_operated_km,
  };

  // Add the "Total" entry to the data
  return [...tableData, totalEntry];
}

// Column definitions
const unitewiseTableColumns: ColumnDef<UnitWiseAccidentDataModel>[] = [
  { accessorKey: "depot_name", header: "Depot name" },
  { accessorKey: "fatal", header: "Fatal" },
  { accessorKey: "major", header: "Major" },
  { accessorKey: "minor", header: "Minor" },
  { accessorKey: "total_accidents", header: "Total" },
  {
    accessorKey: "rate_of_accidents_in_1_lakhs_km",
    header: "Rate of accidents in 1 lakhs km",
  },
  { accessorKey: "unit_wise_operated_km", header: "Unit wise operated km" },
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

const UnitWiseAccidentReport = () => {
  const [startDate, setStartDate] = useState(getSameDayLastMonth());
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tableData, setTableData] = useState<UnitWiseAccidentDataModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //   //  report data fetching
  const fetchReportData = async () => {
    try {
      !isLoading && setIsLoading(true);
      const formatedStartDate = formatDateForAPI(startDate);
      const formatedEndDate = formatDateForAPI(endDate);
      //   console.log(formatedDate);

      const response = await fetch(
        `/api/dashboard/accidents?start_date=${formatedStartDate}&end_date=${formatedEndDate}&bonnet_no=&district=&category=&fuel_type=`
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return;
      }

      const responseData = await response.json();
      console.log(responseData.depotData);
      setTableData(responseData.depotData);
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
      <h2 className="text-lg font-semibold">Unit Wise Accident Report</h2>
      <UnitWiseReportTable
        columns={unitewiseTableColumns}
        data={addTotalToTableData(tableData)}
        searchKey="depot_name"
        tableLabel={`Unit Wise Accident Report (${dateToLocaleFormater(
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
