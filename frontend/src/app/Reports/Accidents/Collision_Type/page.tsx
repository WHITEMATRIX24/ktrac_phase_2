"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ReportDataTable } from "@/components/reports/report_datatable";
import { dateToLocaleFormater } from "@/utils/dateFormater";
import { CollisionReportDataTable } from "@/components/reports/collision_report_table";
import { Eye } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";



// Define data structure
export type AccidentCauseData = {
  type: string;
  fatal: number;
  major: number;
  minor: number;
  total: number;
  percentage: string;
};


// Accident cause types
const causeTypes = [
  "HIT BEHIND BY KSRTC",
  "HIT BEHIND BY THIRD PARTY",
  "HIT FRONT BY THIRD PARTY",
  "HIT SIDE BY KSRTC",
  "HIT FRONT BY KSRTC",
  "HIT SIDE BY THIRD PARTY",
  "HIT FIXED OBJECT",
  "HIT ON PEDESTRIAN BY KSRTC",
  "OTHERS",
  "HEAD ON COLLISION",
  "PASSENGER FALL FROM FOOTBOARD",
  "TREE FALL OVER THE BUS",
  "PASSENGER INJURED INSIDE BUS",
  "HIT BY PEDESTRIAN",
  "HIT DIVIDER",
  "HIT TREE",
  "PASSENGER FALL INSIDE BUS",
  "HIT BEHIND SERIAL",
  "HIT PASSENGER",
  "RUN OVER PEDESTRIAN",
  "RUN OVER PASSENGER",
  "HIT ON ANIMAL",
  "HIT BY ANIMAL",
  "FELL INTO RIVER FROM BRIDGE",
  "TYRE BURSTED",
  "WHEEL JAMMED",
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

const CollisionTypeReport = () => {
  const [startDate, setStartDate] = useState(getSameDayLastMonth());
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [tableData, setTableData] = useState<AccidentCauseData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingAccidentList, setIsLoadingAccidentList] = useState<boolean>(true);

  const [selectedCauseType, setSelectedCauseType] = useState<string | "">("");
  const [accidentDetails, setAccidentDetails] = useState<any[]>([]);
  const [showDialog, setShowDialog] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  //utility function to change text to camel case
  const toTitleCase = (text: string) =>
    text
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    //function to make every sentence first letter capital
const capitalizeSentences = (text: string) =>
  text
    .split(/([.?!]\s+)/) // split by punctuation and keep separators
    .map(sentence =>
      sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase()
    )
    .join("");

  //accident list fetching for collision type
  const fetchAccidentDetails = async (type: string) => {
    setIsLoadingAccidentList(true)
    try {
      setSelectedCauseType(type);
      setAccidentDetails([])
      setShowDialog(true);

      const formattedStartDate = formatDateForAPI(startDate);
      const formattedEndDate = formatDateForAPI(endDate);

      const response = await fetch(
        `/api/reports/accidents/collisionwise_accidentlist?start_date=${formattedStartDate}&end_date=${formattedEndDate}&collision_type=${encodeURIComponent(
          type
        )}`
      );

      if (!response.ok) {
        console.error("Failed to fetch accident details");
        return;
      }

      const result = await response.json();
      setAccidentDetails(result.data || []);
      setIsLoadingAccidentList(false)
    } catch (error) {
      console.error("Error fetching accident details:", error);
    }
  };

  /* const fetchAccidentDetails = async (type: string) => {
    setSelectedCauseType(type);
    setShowDialog(true);
  
    // Simulate API delay
    await new Promise((res) => setTimeout(res, 500));
  
    
  
    setAccidentDetails(dummyAccidentDetails);
  };
   */
  //  report data fetching
  const fetchReportData = async () => {
    try {
      !isLoading && setIsLoading(true);
      const formatedStartDate = formatDateForAPI(startDate);
      const formatedEndDate = formatDateForAPI(endDate);
      //   console.log(formatedDate);

      const response = await fetch(
        `/api/reports/accidents/collision_type?start_date=${formatedStartDate}&end_date=${formatedEndDate}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return;
      }

      const responseData = await response.json();
      const report = responseData.report;
      const formatedReport = report.map((r: AccidentCauseData) => {
        return {
          ...r,
          type: r.type
            ? r.type.charAt(0).toUpperCase() + r.type.slice(1)
            : r.type,
        };
      });
      console.log(formatedReport);

      setTableData(formatedReport);
    } catch (error) {
      console.log(`something unexpected happen in responsibility report`);
    } finally {
      setIsLoading(false);
    }
  };
  // Column configuration for table
  const accidentCauseColumns: ColumnDef<AccidentCauseData>[] = [
    { accessorKey: "type", header: "Accident Type" },
    { accessorKey: "fatal", header: "Fatal" },
    { accessorKey: "major", header: "Major" },
    { accessorKey: "minor", header: "Minor" },
    { accessorKey: "total", header: "Total" },
    { accessorKey: "percentage", header: "%" },
    {
      id: "view",
      header: "View",
      cell: ({ row }) => {
        const rowType = row.original.type?.toLowerCase();
        const isTotalRow =
          rowType === "total" || rowType?.includes("total");

        if (isTotalRow) return null;

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Eye
                  className="w-4 h-4 text-blue-900 cursor-pointer hover:text-blue-800"
                  onClick={() => fetchAccidentDetails(row.original.type)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>View Accidents</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    }


  ];


  useEffect(() => {
    if (startDate || endDate) {
      fetchReportData();
    }
  }, [startDate, endDate]);

  return (
    <div className="px-5 pt-5 flex flex-col gap-1 h-[85vh] overflow-auto">
      <h2 className="text-lg font-semibold">Accident Collision Report</h2>
      <CollisionReportDataTable
        columns={accidentCauseColumns}
        data={tableData}
        searchKey="type"
        tableLabel={`Accident Collision Report (${dateToLocaleFormater(
          startDate
        )}) - (${dateToLocaleFormater(endDate)})`}
        startDate={startDate}
        startDateSetter={setStartDate}
        endDate={endDate}
        endDateSetter={setEndDate}
        isLoading={isLoading}
      />
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="!left-[356px] !top-1/2 !translate-x-0 !-translate-y-1/2  !w-[1200px] !max-w-none  overflow-auto max-h-[90vh]" style={{ inset: "auto" }}>
          <DialogHeader>
            <DialogTitle>
              <h3 className="text-lg font-semibold">
                Accident Details For: {toTitleCase(selectedCauseType)}
              </h3>

            </DialogTitle>
          </DialogHeader>
          {isLoadingAccidentList ? <p className="text-sm mt-4">Loading...</p> :


            <div>
              {accidentDetails.length === 0 && !isLoadingAccidentList ? (
                <p className="text-sm mt-4">No accidents found for this type.</p>
              ) : (
                <div className="mt-4">
                  <table className="w-full text-sm border-collapse border border-gray-300">
                    <thead className="bg-green-900 text-white">
                      <tr>
                        <th className="border px-2 py-1">Accident ID</th>
                        <th className="border px-2 py-1">Date</th>
                        <th className="border px-2 py-1">Time</th>
                        <th className="border px-2 py-1">Place</th>
                        <th className="border px-2 py-1">Depot</th>
                        <th className="border px-2 py-1">Bonnet No</th>
                        <th className="border px-2 py-1">Severity</th>
                        <th className="border px-2 py-1">Cause</th>
                        <th className="border px-2 py-1">Responsibility</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accidentDetails.map((accident, idx) => (
                        <tr key={idx} className="odd:bg-white even:bg-gray-50">
                          <td className="border px-2 py-1">{accident.accident_id}</td>
                          <td className="border px-2 py-1">{accident.date_of_accident}</td>
                          <td className="border px-2 py-1">{accident.time_of_accident}</td>
                          <td className="border px-2 py-1">
                            {accident.location_info?.place}
                          </td>
                          <td className="border px-2 py-1">
                            {accident.location_info?.operated_depot}
                          </td>
                          <td className="border px-2 py-1">{accident.bonet_no}</td>
                          <td className="border px-2 py-1">{accident.severity}</td>
                          <td className="border px-2 py-1">
                            {capitalizeSentences(accident.primary_cause_of_accident)}
                          </td>
                          <td className="border px-2 py-1">
                            {accident.primary_responsiblity_of_accident}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>}
        </DialogContent>
      </Dialog>


    </div>
  );
};

export default CollisionTypeReport;


