import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const tableHeaders = [
  "Context",
  "Responsibility KSRTC",
  "Responsibility Others",
  "Fatal",
  "Major",
  "Minor",
  "Total",
];

const current_day_data = {
  responsibility_ksrtc: 0,
  responsibility_others: 3,
  fatal: 1,
  major: 0,
  minor: 2,
  total: 3,
};
const cumulative = {
  responsibility_ksrtc: 28,
  responsibility_others: 62,
  fatal: 9,
  major: 17,
  minor: 64,
  total: 90,
};
const prev_month = {
  from: "01-06-2025",
  to: "21-06-2025",
  fatal: 2,
  major: 11,
  minor: 79,
  total: 92,
};
const last_year_same_month = {
  from: "01-07-2024",
  to: "21-07-2024",
  fatal: 3,
  major: 26,
  minor: 39,
  total: 68,
};

interface Props {
  selectedDate: string;
}

const DailySeverityTable = ({ selectedDate }: Props) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeaders.map((head, index) => (
              <TableHead key={index} className="font-semibold">
                {head}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{selectedDate}</TableCell>
            {Object.entries(current_day_data).map(([key, value]) => (
              <TableCell key={key}>{value}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Cumulative</TableCell>
            {Object.entries(cumulative).map(([key, value]) => (
              <TableCell key={key}>{value}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell
              colSpan={3}
            >{`Previous month (${prev_month.from}) - (${prev_month.to})`}</TableCell>
            <TableCell>{prev_month.fatal}</TableCell>
            <TableCell>{prev_month.major}</TableCell>
            <TableCell>{prev_month.minor}</TableCell>
            <TableCell>{prev_month.total}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              colSpan={3}
            >{`Previous year same month (${last_year_same_month.from}) - (${last_year_same_month.to})`}</TableCell>
            <TableCell>{last_year_same_month.fatal}</TableCell>
            <TableCell>{last_year_same_month.major}</TableCell>
            <TableCell>{last_year_same_month.minor}</TableCell>
            <TableCell>{last_year_same_month.total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default DailySeverityTable;
