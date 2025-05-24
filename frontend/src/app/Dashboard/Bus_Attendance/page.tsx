"use client";

import React, { useState } from "react";
import { SunburstRevenueChart } from "@/components/sunburstChart";
import { SectionCards } from "@/components/section-cards";
import { Bus, StopCircle, TrendingUp, WalletCards } from "lucide-react";

export default function Page() {
  const [selectedDepo, setSelectedDepo] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const dummyTableData = [
    { bonnetNo: "ADR1234", class: "A/C", status: "Enroute", depo: "ADR", dateModified: "2025-05-22" },
    { bonnetNo: "EKM5678", class: "Non A/C", status: "Idle", depo: "EKM", dateModified: "2025-05-22" },
    { bonnetNo: "ALY9012", class: "Sleeper", status: "Dock", dockReason: "Under maintenance", depo: "ALY", dateModified: "2025-05-23" },
    { bonnetNo: "TVM3456", class: "A/C", status: "Dock", dockReason: "Tyre replacement", depo: "TVM", dateModified: "2025-05-23" },
    { bonnetNo: "ALY345", class: "A/C", status: "Service", dockReason: "", depo: "ALY", dateModified: "2025-05-23" },
    { bonnetNo: "ETP545", class: "A/C", status: "Training/STC", dockReason: "", depo: "ETP", dateModified: "2025-05-23" },
    { bonnetNo: "ETP548", class: "A/C", status: "BTC", dockReason: "", depo: "ETP", dateModified: "2025-05-23" },
    { bonnetNo: "TVM308", class: "A/C", status: "Private Hire", dockReason: "", depo: "TVM", dateModified: "2025-05-23" },
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
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const dummyData = [
    { title: "Idle Buses", value: 10, icon: <TrendingUp className="w-15 h-15 text-white opacity-70" /> },
    { title: "In Service", value: 105, icon: <Bus className="w-15 h-15 text-white opacity-70" /> },
    { title: "Dock", value: 95, icon: <StopCircle className="w-15 h-15 text-white opacity-70" /> },
    { title: "Enroute", value: 120, icon: <WalletCards className="w-15 h-15 text-white opacity-70" /> },

  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards data={dummyData} />

          <div className="pl-4 lg:pl-6">
            <div className="my-6">
              <h2 className="text-lg font-semibold mb-4">Bus Attendance Details</h2>

              {/* Filters */}
              <div className="flex flex-wrap gap-4 mb-4">
                <select value={selectedDepo} onChange={(e) => setSelectedDepo(e.target.value)} className="border px-3 py-2 rounded">
                  <option value="All">All Depos</option>
                  {depotList.map((depot) => (
                    <option key={depot} value={depot}>{depot}</option>
                  ))}
                </select>

                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="border px-3 py-2 rounded" />
              </div>

              {/* Table */}
              <div className="overflow-auto me-5">
                <table className="min-w-full border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="border px-4 py-2">Bonnet No</th>
                      <th className="border px-4 py-2">Class</th>
                      <th className="border px-4 py-2">Status</th>
                      <th className="border px-4 py-2">Depo</th>
                      <th className="border px-4 py-2">Date Modified</th>
                      <th className="border px-4 py-2">Reason (if Dock)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item, idx) => (
                      <tr key={idx}>
                        <td className="border px-4 py-2">{item.bonnetNo}</td>
                        <td className="border px-4 py-2">{item.class}</td>
                        <td className="border px-4 py-2">{item.status}</td>
                        <td className="border px-4 py-2">{item.depo}</td>
                        <td className="border px-4 py-2">{item.dateModified}</td>
                        <td className="border px-4 py-2">
                          {item.status === "Dock" ? item.dockReason : "-"}
                        </td>
                      </tr>
                    ))}
                    {paginatedData.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-4 text-gray-500">
                          No data found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center items-center mt-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="text-sm mx-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
