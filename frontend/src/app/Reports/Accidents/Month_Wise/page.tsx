"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EllipsisVertical } from "lucide-react";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

type MonthwiseReport = {
  fatal_accident: string;
  major_accident: string;
  minor_accident: string;
  month: string;
  total: string;
  year: string;
};

const getTodayDate = (): string => {
  return new Date().toISOString().split("T")[0];
};

const formatDateForAPI = (input: string): string => {
  const [year, month, day] = input.split("-");
  return `${day}-${month}-${year}`;
};

const MonthWiseReport = () => {
  const [date, setDate] = useState<string>(getTodayDate());
  const [reportData, setReportData] = useState<MonthwiseReport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //   report data fetching
  const fetchReportData = async () => {
    try {
      !isLoading && setIsLoading(true);
      const formatedDate = formatDateForAPI(date);
      //   console.log(formatedDate);

      const response = await fetch(
        `/api/reports/accidents/month_wise?date=${formatedDate}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return;
      }

      const responseData = await response.json();
      const report = responseData.response.report;

      setReportData(report);
    } catch (error) {
      console.log(`something unexpected happen in month wise report`);
    } finally {
      setIsLoading(false);
    }
  };

  //   export to excel handler
  const exportToExcel = () => {
    const data = reportData;
    if (data.length === 0) {
      alert("No data to export.");
      return;
    }

    const formattedData = data.map((row) => ({
      Month: `${row.month} ${row.year}`,
      "Fatal Accidents": row.fatal_accident,
      "Major Accidents": row.major_accident,
      "Minor Accidents": row.minor_accident,
      "Total Accidents": row.total,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "MonthWiseReport");
    XLSX.writeFile(workbook, "MonthWiseReport.xlsx");
  };

  useEffect(() => {
    if (date) {
      fetchReportData();
    }
  }, [date]);

  return (
    <div className="px-5 pt-5 flex flex-col gap-7 h-[85vh] overflow-auto">
      <h2 className="text-[15px] font-semibold">Month Wise Report</h2>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            <div className="flex gap-1 items-center">
              <h6 className="font-medium text-[14px] text-grey-300">Date :</h6>
              <div className="flex items-center border rounded-md p-2 w-fit">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border-none p-0 text-sm focus:ring-0 focus:outline-none w-32 h-full"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="cursor-pointer bg-transparent hover:bg-transparent shadow-none">
                  <EllipsisVertical color="black" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 flex flex-col gap-3">
                <button
                  // onClick={exportPdfHandler}
                  className="bg-sidebar px-3 py-1 rounded-md text-sm text-white"
                >
                  Export to pdf
                </button>
                <button
                  onClick={exportToExcel}
                  className="bg-sidebar px-3 py-1 rounded-md text-sm text-white"
                >
                  Export to csv
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        {isLoading ? (
          <p>loading...</p>
        ) : (
          <div className="rounded-md border w-full overflow-x-auto h-full">
            <Table>
              <TableHeader>
                <TableRow className="bg-[var(--sidebar-bg)] hover:bg-[var(--sidebar-bg)]">
                  <TableHead className="text-white">Months</TableHead>
                  <TableHead className="text-white text-center">
                    Fatal Accidents
                  </TableHead>
                  <TableHead className="text-white text-center">
                    Major Accidents
                  </TableHead>
                  <TableHead className="text-white text-center">
                    Minor Accidents
                  </TableHead>
                  <TableHead className="text-white text-center">
                    Total Accidents
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportData.map((rowData, index) => (
                  <TableRow
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                  >
                    <TableCell>{`${rowData.month} ${rowData.year}`}</TableCell>
                    <TableCell className="text-center">
                      {rowData.fatal_accident}
                    </TableCell>
                    <TableCell className="text-center">
                      {rowData.major_accident}
                    </TableCell>
                    <TableCell className="text-center">
                      {rowData.minor_accident}
                    </TableCell>
                    <TableCell className="text-center">
                      {rowData.total}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthWiseReport;
