import { ReportDataTable } from "@/components/report_datatable";
import { ReportTable } from "@/components/reportTable";
import { getBusPosition } from "@/lib/sql_query";
const columns = [
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
function getInitialDates() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return {
    initialStart: yesterday.toISOString().split("T")[0],
    initialEnd: new Date(yesterday.getTime() + 86400000)
      .toISOString()
      .split("T")[0],
  };
}

export default async function ReportPage() {
  const { initialStart, initialEnd } = getInitialDates();
  const busData = await getBusPosition();

  return (
    <div className="p-4">
      <ReportDataTable
        data={busData}
        columns={columns}
        searchKey="CLASS OF BUS"
      />
    </div>
  );
}
