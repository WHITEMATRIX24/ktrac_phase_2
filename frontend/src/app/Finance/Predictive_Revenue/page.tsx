"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { SectionCards } from "@/components/section-cards";
import { Bus, BusFront, CalendarOff, ClipboardList } from "lucide-react";
import RevenueTable from "@/components/finance/predictiveRevenue/RevenueTable";
import { revenueData } from "@/components/finance/predictiveRevenue/revenueData";

// Dynamic import for the chart component
const RevenueChart = dynamic(
  () => import("@/components/finance/predictiveRevenue/RevenueChart"),
  {
    ssr: false,
  }
);

function PredictiveRevenuePage() {
  const predictedRevenueData = [
    {
      title: "Bus Allotment (Predicted)",
      value: 5470,
      icon: <BusFront className="w-16 h-16 text-white opacity-70" />, // adjusted size
    },
    {
      title: "Daily Run Revenue (Predicted)",
      value: 178600,
      icon: <Bus className="w-16 h-16 text-white opacity-70" />,
    },
    {
      title: "Schedules Allotted (Forecast)",
      value: 4500,
      icon: <ClipboardList className="w-16 h-16 text-white opacity-70" />,
    },
    {
      title: "Cancellations (Expected)",
      value: 199,
      icon: <CalendarOff className="w-16 h-16 text-white opacity-70" />,
    },
  ];

  const [selectedDepot, setSelectedDepot] = useState("");

  // Unique depot names from data, sorted alphabetically
  const depotOptions = useMemo(() => {
    return Array.from(new Set(revenueData.map((item) => item.depot))).sort();
  }, []);

  // Filter data by selected depot or return all data
  const filteredData = useMemo(() => {
    return selectedDepot
      ? revenueData.filter((item) => item.depot === selectedDepot)
      : revenueData;
  }, [selectedDepot]);

  return (
    <div className="flex flex-col flex-1">
      <div className="@container/main flex flex-col flex-1 gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards data={predictedRevenueData} />

          <div className="bg-white shadow rounded-lg p-6 mx-5 my-2">
            <h1 className="text-lg font-semibold mb-1">
              Depot-wise Revenue Forecast
            </h1>
            <span className="mt-2 block text-xs text-gray-500 font-semibold">
              Monthly Forecast — Click on Chart to View Details
            </span>

            {/* Depot Filter */}
            <div className="flex justify-end px-6 mb-4">
              <label
                htmlFor="depot"
                className="mr-2 font-semibold text-gray-700"
              >
                Depot:
              </label>
              <select
                id="depot"
                className="p-1 border rounded w-48"
                value={selectedDepot}
                onChange={(e) => setSelectedDepot(e.target.value)}
              >
                <option value="">All</option>
                {depotOptions.map((depot) => (
                  <option key={depot} value={depot}>
                    {depot}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-6">
              <div className="h-full flex flex-col">
                {/* Pass filtered data to chart as 'chartData' */}
                <RevenueChart chartData={filteredData} />
              </div>

              <div className="h-full flex flex-col">
                {/* Show filtered data in table */}
                <RevenueTable data={filteredData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PredictiveRevenuePage;
