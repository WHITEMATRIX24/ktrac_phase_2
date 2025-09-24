import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tableHeads = [
  { label: "Bonet No.", key: "bonnet_no" },
  { label: "Home Depot", key: "home_depot" },
  { label: "Accident Place", key: "accident_place" },
  {
    label: "Jurisdiction Of Accident (Depot)",
    key: "jurisdiction_of_accident",
  },
  { label: "Time Of Accident", key: "time_of_accident" },
  { label: "Severity", key: "severity" },
  { label: "Accident Type", key: "accident_type" },
  { label: "Primary Cause Of Accident", key: "primary_cause_of_accident" },
  {
    label: "Primary Responsibility For The Accident",
    key: "primary_responsibility_for_the_accident",
  },
  { label: "Total Fatalities", key: "total_fatalities" },
  { label: "Total Major", key: "total_major" },
  { label: "Total Minor", key: "total_minor" },
  { label: "Remarks", key: "remarks" },
];

const data = [
  {
    bonnet_no: "RAE57",
    home_depot: "KTR",
    accident_place: "KURIYANAD",
    jurisdiction_of_accident: "KTM",
    time_of_accident: "06:30:00",
    severity: "FATAL",
    accident_type: "KSRTC-FOUR WHEELER",
    primary_cause_of_accident:
      "The accident was caused by the car, driver fall asleep",
    primary_responsibility_for_the_accident: "FOUR WHEELER DRIVER",
    total_fatalities: 0,
  },
];

const DailyAccidentsDetails = () => {
  return (
    <div className="w-[78vw] overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeads.map(({ label }, index) => (
              <TableHead key={index} className="font-semibold">
                {label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {tableHeads.map(({ key }, cellIndex) => (
                <TableCell key={cellIndex}>
                  {(row as any)[key] ?? "-"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DailyAccidentsDetails;
