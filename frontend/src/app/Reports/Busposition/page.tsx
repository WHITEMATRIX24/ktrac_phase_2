"use client";

import { ReportDataTable } from "@/components/reports/report_datatable";
import { Checkbox } from "@/components/ui/checkbox";
import { getBusPosition } from "@/lib/sql_query";
import { useEffect, useState } from "react";

// column data
const columns = [
  {
    id: "select",
    header: ({ table }: any) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }: any) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "SL NO",
    header: "SL No.",
    id: "SL NO",
  },
  {
    accessorKey: "CLASS OF BUS",
    header: "Bus Class",
    id: "CLASS OF BUS",
  },
  {
    accessorKey: "Service",
    header: "Service",
    id: "Service",
  },
  {
    accessorKey: "Training\n/ STC",
    header: "Training / STC",
    id: "Training",
  },
  {
    accessorKey: "Enroute",
    header: "Enroute",
    id: "Enroute",
  },
  {
    accessorKey: "BTC",
    header: "BTC",
    id: "BTC",
  },
  {
    accessorKey: "PRIVATE HIRE",
    header: "Private Hire",
    id: "PRIVATE HIRE",
  },
  {
    accessorKey: "TOTAL",
    header: "Total",
    id: "TOTAL",
  },
];

export default function ReportPage() {
  const [tableData, setTableData] = useState<any>([]);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [tableLabel, setTableLabel] = useState<string>("");

  const handleTableData = async () => {
    try {
      const busData = await getBusPosition();

      if (date || endDate) {
        const startDateTime = new Date(`${date}T08:00:00`);

        let endDateTime;

        if (endDate) {
          endDateTime = new Date(`${endDate}T00:00:00Z`);
          endDateTime.setUTCDate(endDateTime.getUTCDate() + 1);
          endDateTime.setUTCHours(7, 59, 0, 0);
        } else {
          endDateTime = new Date(startDateTime);
          endDateTime.setUTCDate(endDateTime.getUTCDate() + 1);
          endDateTime.setUTCHours(7, 59, 59, 999);
        }

        const result = busData.filter((item: any) => {
          const updatedAt = new Date(item.updated_at);
          return updatedAt >= startDateTime && updatedAt <= endDateTime;
        });

        setTableData(result);
      } else {
        setTableData(busData);
      }
    } catch (error) {
      console.error(`error in bus position report`, error);
    } finally {
      if (date) {
        const start = new Date(`${date}T08:00:00`);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);
        end.setHours(7, 59, 59);

        setTableLabel(
          `Bus Position Report (${start.toLocaleDateString()} 08:00 AM - ${end.toLocaleDateString()} 07:59 AM)`
        );
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (date || endDate) {
      setLoading(true);
      handleTableData();
    }
  }, [date, endDate]);

  return (
    <div className="flex flex-col gap-8 p-4">
      <ReportDataTable
        data={tableData}
        columns={columns}
        searchKey="CLASS OF BUS"
        tableLabel={tableLabel}
        startDate={date}
        startDateSetter={setDate}
        endDate={endDate}
        endDateSetter={setEndDate}
        isLoading={loading}
      />
    </div>
  );
}
