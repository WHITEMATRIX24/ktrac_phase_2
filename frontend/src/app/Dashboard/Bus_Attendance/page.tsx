"use client";

import React, { useState } from "react";
import { SunburstRevenueChart } from "@/components/sunburstChart";
import { SectionCards } from "@/components/section-cards";
import { Bus, StopCircle, TrendingUp, WalletCards } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Page() {
  const [selectedDepo, setSelectedDepo] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const dummyTableData = [
    {
      bonnetNo: "ADR1234",
      class: "A/C",
      status: "Enroute",
      depo: "ADR",
      dateModified: "2025-05-22",
    },
    {
      bonnetNo: "EKM5678",
      class: "Non A/C",
      status: "Idle",
      depo: "EKM",
      dateModified: "2025-05-22",
    },
    {
      bonnetNo: "ALY9012",
      class: "Sleeper",
      status: "Dock",
      dockReason: "Under maintenance",
      depo: "ALY",
      dateModified: "2025-05-23",
    },
    {
      bonnetNo: "TVM3456",
      class: "A/C",
      status: "Dock",
      dockReason: "Tyre replacement",
      depo: "TVM",
      dateModified: "2025-05-23",
    },
    {
      bonnetNo: "ALY345",
      class: "A/C",
      status: "Service",
      dockReason: "",
      depo: "ALY",
      dateModified: "2025-05-23",
    },
    {
      bonnetNo: "ETP545",
      class: "A/C",
      status: "Training/STC",
      dockReason: "",
      depo: "ETP",
      dateModified: "2025-05-23",
    },
    {
      bonnetNo: "ETP548",
      class: "A/C",
      status: "BTC",
      dockReason: "",
      depo: "ETP",
      dateModified: "2025-05-23",
    },
    {
      bonnetNo: "TVM308",
      class: "A/C",
      status: "Private Hire",
      dockReason: "",
      depo: "TVM",
      dateModified: "2025-05-23",
    },
    {
      bonnetNo: "TVM308",
      class: "A/C",
      status: "Private Hire",
      dockReason: "",
      depo: "TVM",
      dateModified: "2025-05-23",
    },
    {
      bonnetNo: "TVM308",
      class: "A/C",
      status: "Private Hire",
      dockReason: "",
      depo: "TVM",
      dateModified: "2025-05-23",
    },
    {
      bonnetNo: "TVM308",
      class: "A/C",
      status: "Private Hire",
      dockReason: "",
      depo: "TVM",
      dateModified: "2025-05-23",
    },
    {
      bonnetNo: "TVM308",
      class: "A/C",
      status: "Private Hire",
      dockReason: "",
      depo: "TVM",
      dateModified: "2025-05-23",
    },
    {
      bonnetNo: "TVM308",
      class: "A/C",
      status: "Private Hire",
      dockReason: "",
      depo: "TVM",
      dateModified: "2025-05-23",
    },
    {
      bonnetNo: "TVM308",
      class: "A/C",
      status: "Private Hire",
      dockReason: "",
      depo: "TVM",
      dateModified: "2025-05-23",
    },
    {
      bonnetNo: "TVM308",
      class: "A/C",
      status: "Private Hire",
      dockReason: "",
      depo: "TVM",
      dateModified: "2025-05-23",
    },
    {
      bonnetNo: "TVM308",
      class: "A/C",
      status: "Private Hire",
      dockReason: "",
      depo: "TVM",
      dateModified: "2025-05-23",
    },
  ];

  const depotList = React.useMemo(() => {
    const depots = new Set<string>();
    dummyTableData.forEach((item) => {
      if (item["depo"]) depots.add(item["depo"]);
    });
    return Array.from(depots);
  }, [dummyTableData]);

  const filteredData = dummyTableData.filter((item) => {
    const dateMatch = selectedDate ? item.dateModified === selectedDate : true;
    const depoMatch = selectedDepo === "All" || item.depo === selectedDepo;
    return dateMatch && depoMatch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const dummyData = [
    {
      title: "Idle Buses",
      value: 10,
      change: "0",
      icon: <TrendingUp className="w-12 h-12 text-grey opacity-40" />,
    },
    {
      title: "In Service",
      value: 105,
      change: "0",
      icon: <Bus className="w-12 h-12 text-grey opacity-40" />,
    },
    {
      title: "Dock",
      value: 95,
      change: "0",
      icon: <StopCircle className="w-12 h-12 text-grey opacity-40" />,
    },
    {
      title: "Enroute",
      value: 120,
      change: "0",
      icon: <WalletCards className="w-12 h-12 text-grey opacity-40" />,
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards data={dummyData} />

          <div className="pl-4 lg:pl-4">
            <div className="">
              <div className="flex">
                <h2 className="text-lg mx-4 font-semibold ">
                  Bus Attendance Details
                </h2>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-0 me-5 ms-auto">
                  <select
                    value={selectedDepo}
                    onChange={(e) => setSelectedDepo(e.target.value)}
                    className="border px-3 py-2 rounded text-[12px]"
                  >
                    <option value="All">All Depos</option>
                    {depotList.map((depot) => (
                      <option key={depot} value={depot}>
                        {depot}
                      </option>
                    ))}
                  </select>

                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border px-3 py-2 rounded text-[12px]"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-auto m-1 p-2">
                <Table className="rounded-[5px]">
                  <TableHeader className=" sticky top-0 rounded-[5px]">
                    <TableRow className="bg-sidebar hover:bg-sidebar">
                      <TableHead className="border px-4 py-1 text-white">
                        Bonnet No
                      </TableHead>
                      <TableHead className="border px-4 py-1 text-white">
                        Class
                      </TableHead>
                      <TableHead className="border px-4 py-1 text-white">
                        Status
                      </TableHead>
                      <TableHead className="border px-4 py-1 text-white">
                        Depo
                      </TableHead>
                      <TableHead className="border px-4 py-1 text-white">
                        Date Modified
                      </TableHead>
                      <TableHead className="border px-4 py-1 text-white">
                        Reason (if Dock)
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="h-full overflow-y-scroll">
                    {paginatedData.map((item, idx) => (
                      <TableRow
                        key={idx}
                        className={`${
                          idx % 2 === 0 ? "bg-white" : "bg-gray-200"
                        }`}
                      >
                        <TableCell className="border px-4 py-2 text-[12px]">
                          {item.bonnetNo}
                        </TableCell>
                        <TableCell className="border px-4 py-2 text-[12px]">
                          {item.class}
                        </TableCell>
                        <TableCell className="border px-4 py-2 text-[12px]">
                          {item.status}
                        </TableCell>
                        <TableCell className="border px-4 py-2 text-[12px]">
                          {item.depo}
                        </TableCell>
                        <TableCell className="border px-4 py-2 text-[12px]">
                          {item.dateModified}
                        </TableCell>
                        <TableCell className="border px-4 py-2 text-[12px]">
                          {item.status === "Dock" ? item.dockReason : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                    {paginatedData.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center py-4 text-gray-500"
                        >
                          No data found.
                        </td>
                      </tr>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-start items-center mt-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="px-4 py-2 border rounded disabled:opacity-50"
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="text-sm mx-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="px-4 py-2 border rounded disabled:opacity-50"
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
