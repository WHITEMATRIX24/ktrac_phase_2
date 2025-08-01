"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dateToLocaleFormater } from "@/utils/dateFormater";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { EllipsisVertical } from "lucide-react";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx-js-style";

type MonthwiseReport = {
  fatal_accident: string;
  major_accident: string;
  minor_accident: string;
  month: string;
  total: string;
  year: string;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getTodayMonth = (): string => {
  const month = new Date().getMonth();
  return months[month];
};

const getYears = (): string[] => {
  const currentYear = new Date().getFullYear();
  const years: string[] = [];

  for (let i = 0; i < 5; i++) {
    years.push((currentYear - i).toString());
  }

  return years;
};

const getCurrentYear = () => new Date().getFullYear().toString();

const MonthWiseReport = () => {
  const [month, setMonth] = useState<string>(getTodayMonth());
  const [yearList, setYearList] = useState<string[]>(getYears());
  const [selectedYear, setSelectedYear] = useState<string>(getCurrentYear());
  const [reportData, setReportData] = useState<MonthwiseReport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //   report data fetching
  const fetchReportData = async () => {
    try {
      !isLoading && setIsLoading(true);
      const formatedMonth = month.toLowerCase();

      const response = await fetch(
        `/api/reports/accidents/month_wise?month=${formatedMonth}&year=${selectedYear}`
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
    console.log(formattedData);

    const columnCount = Object.keys(formattedData[0]).length;

    const ws_data = [
      ["KSRTC REPORT"],
      ["Monthly Accident Report"],
      [],
      [
        "Month",
        "Fatal Accidents",
        "Major Accidents",
        "Minor Accidents",
        "Total Accidents",
      ],
      ...formattedData.map((item) => [
        item.Month,
        item["Fatal Accidents"],
        item["Major Accidents"],
        item["Minor Accidents"],
        item["Total Accidents"],
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(ws_data);

    worksheet["A1"].s = {
      font: { bold: true, sz: 16 },
      alignment: { horizontal: "center" },
      fill: { fgColor: { rgb: "FFFF00" } },
    };
    worksheet["A2"].s = {
      font: { italic: true, sz: 12 },
      alignment: { horizontal: "center" },
      fill: { fgColor: { rgb: "FFCC99" } },
    };

    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: columnCount - 1 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: columnCount - 1 } },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "MonthWiseReport");
    XLSX.writeFile(workbook, "MonthWiseReport.xlsx");
  };

  // export pdf
  const exportPdfHandler = async () => {
    const doc = new jsPDF();
    const header = [
      "Month",
      "Year",
      "Fatal Accident",
      "Major Accident",
      "Minor Accident",
      "Total",
    ];

    const body = reportData.map((row) => [
      row.month,
      row.year,
      row.fatal_accident,
      row.major_accident,
      row.minor_accident,
      row.total,
    ]);

    // Add the title (main heading)
    doc.setFontSize(20);
    doc.text("KSRTC REPORT", 105, 10, { align: "center" });

    doc.setFontSize(14);
    const tableLabel = `Accident Month Wise Report ${month} ${selectedYear}`;
    doc.text(tableLabel, 13, 30, { align: "left" });

    // Add the table using autoTable
    autoTable(doc, {
      head: [header],
      body: body,
      startY: 40,
      margin: { horizontal: 13, vertical: 10 },
      theme: "striped",
      styles: {
        fontSize: 10,
        halign: "center",
        valign: "middle",
      },
    });
    doc.save(`Accident Month Wise Report ${month} ${selectedYear}`);
  };

  useEffect(() => {
    if (month && selectedYear) {
      fetchReportData();
    }
  }, []);

  return (
    <div className="px-5 pt-5 flex flex-col gap-7 h-[85vh] overflow-auto">
      <h2 className="text-[15px] font-semibold">Month Wise Report</h2>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            <Select onValueChange={(value) => setMonth(value)} value={month}>
              <SelectTrigger
                size="sm"
                className="w-fit px-3 py-0 bg-white border border-slate-300 rounded-md text-[12px] text-black shadow-sm "
              >
                <SelectValue>{month}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) => setSelectedYear(value)}
              value={selectedYear}
            >
              <SelectTrigger
                size="sm"
                className="w-fit px-3 py-0 bg-white border border-slate-300 rounded-md text-[12px] text-black shadow-sm "
              >
                <SelectValue>{selectedYear}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {yearList.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button
              onClick={fetchReportData}
              className="px-2 py-1 bg-sidebar rounded-md text-white text-sm"
            >
              search
            </button>
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
                  onClick={exportPdfHandler}
                  className="bg-sidebar px-3 py-1 rounded-md text-sm text-white"
                >
                  Pdf Export
                </button>
                <button
                  onClick={exportToExcel}
                  className="bg-sidebar px-3 py-1 rounded-md text-sm text-white"
                >
                  Excel Export
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
