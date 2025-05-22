"use client";
import React from "react";
import { ReportDataTable } from "@/components/report_datatable";
import { Checkbox } from "@/components/ui/checkbox";
import { getDockBusses } from "@/lib/sql_query";
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
    accessorKey: "ALLOTTED DEPOT",
    header: "ALLOTTED DEPOT",
    id: "ALLOTTED DEPOT",
  },
  {
    accessorKey: "BONNET NO",
    header: "BONNET NO",
    id: "BONNET NO",
  },
  {
    accessorKey: "CLASS",
    header: "CLASS",
    id: "CLASS",
  },
  {
    accessorKey: "DOCK REASON",
    header: "DOCK REASON",
    id: "DOCK REASON",
  },
  {
    accessorKey: "REG NO",
    header: "REG NO",
    id: "REG NO",
  },
  {
    accessorKey: "TODAY\nstatus",
    header: "TODAY\nstatus",
    id: "TODAY\nstatus",
  },
  {
    accessorKey: "REPORT ED BY",
    header: "REPORT ED BY",
    id: "REPORT ED BY",
  },
];

const ReportDockBusses = () => {
  const [tableData, setTableData] = useState<any>([]);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [tableLabel, setTableLabel] = useState<string>("");

  const handleTableData = async (date?: string) => {
    try {
      const dockBusData = await getDockBusses();

      if (date) {
        const startDateTime = new Date(`${date}T08:00:00`);
        const endDateTime = new Date(startDateTime);
        endDateTime.setUTCDate(endDateTime.getUTCDate() + 1);
        endDateTime.setUTCHours(7, 59, 59, 999);
        const result = dockBusData.filter((item: any) => {
          const updatedAt = new Date(item.updated_at);
          return updatedAt >= startDateTime && updatedAt <= endDateTime;
        });
        setTableData(result);
        return;
      }
      setTableData(dockBusData);
    } catch (error) {
      console.error(`error in bus position report`);
    } finally {
      const start = new Date(`${date}T08:00:00`);
      const end = new Date(start);
      end.setDate(start.getDate() + 1);
      end.setHours(7, 59, 59);
      setTableLabel(
        `Dock Busses Report (${start.toLocaleDateString()} 08:00 AM - ${end.toLocaleDateString()} 07:59 AM)`
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (date) {
      setLoading(true);
      handleTableData(date);
    }
  }, [date]);
  console.log(tableData);

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex gap-1 items-center">
        <h6 className="font-medium">Date:</h6>
        <div className="flex items-center border rounded-md p-2 w-fit">
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            className="border-none p-0 text-sm focus:ring-0 focus:outline-none w-32 h-full"
          />
        </div>
      </div>

      {loading ? (
        <p>loading...</p>
      ) : (
        <ReportDataTable
          data={tableData}
          columns={columns}
          searchKey="BONNET NO"
          tableLabel={tableLabel}
        />
      )}
    </div>
  );
};

export default ReportDockBusses;
