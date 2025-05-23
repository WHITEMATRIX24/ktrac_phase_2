"use client";

import { ReportDataTable } from "@/components/report_datatable";
import { Checkbox } from "@/components/ui/checkbox";
import { getUnitwiseBusDeployment } from "@/lib/sql_query";
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
    accessorKey: "Sl.No",
    header: "Sl.No",
    id: "Sl.No",
  },
  {
    accessorKey: "Unit Name",
    header: "Unit Name",
    id: "Unit Name",
  },
  {
    accessorKey: "1 Bus Used for 2 or more services",
    header: "1 Bus Used for 2 or more services",
    id: "1 Bus Used for 2 or more services",
  },
  {
    accessorKey: "Btc Operation",
    header: "Btc Operation",
    id: "Btc Operation",
  },
  {
    accessorKey: "Buses in Dock & Police Custody",
    header: "Buses in Dock & Police Custody",
    id: "Buses in Dock & Police Custody",
  },
  {
    accessorKey: "Enroute buses including Pamba Special Services",
    header: "Enroute buses including Pamba Special Services",
    id: "Enroute buses including Pamba Special Services",
  },
  {
    accessorKey: "Idle Buses",
    header: "Idle Buses",
    id: "Idle Buses",
  },
  {
    accessorKey: "No. of Buses Transfers Between Depots",
    header: "No. of Buses Transfers Between Depots",
    id: "No. of Buses Transfers Between Depots",
  },
  {
    accessorKey: "Private Hire / Training / Test / Airport Services, etc",
    header: "Private Hire / Training / Test / Airport Services, etc",
    id: "Private Hire / Training / Test / Airport Services, etc",
  },
  {
    accessorKey: "Spare buses used for 2 nd Spell & Non operted Jn Ac Buses",
    header: "Spare buses used for 2 nd Spell & Non operted Jn Ac Buses",
    id: "Spare buses used for 2 nd Spell & Non operted Jn Ac Buses",
  },
  {
    accessorKey: "Total Bus Operated",
    header: "Total Bus Operated",
    id: "Total Bus Operated",
  },
  {
    accessorKey: "Total Buses",
    header: "Total Buses",
    id: "Total Buses",
  },
  {
    accessorKey: "Total Schedules Operated in unit",
    header: "Total Schedules Operated in unit",
    id: "Total Schedules Operated in unit",
  },
  {
    accessorKey: "Transfer Bus Details",
    header: "Transfer Bus Details",
    id: "Transfer Bus Details",
  },
];

const ReportUnitwiseBusDeployment = () => {
  const [tableData, setTableData] = useState<any>([]);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [tableLabel, setTableLabel] = useState<string>("");

  const handleTableData = async () => {
    try {
      const busData = await getUnitwiseBusDeployment();

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
        searchKey="Unit Name"
        tableLabel={tableLabel}
        startDate={date}
        startDateSetter={setDate}
        endDate={endDate}
        endDateSetter={setEndDate}
        isLoading={loading}
      />
    </div>
  );
};

export default ReportUnitwiseBusDeployment;
