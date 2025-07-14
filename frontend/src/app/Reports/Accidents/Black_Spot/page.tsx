"use client";

import React, { useState } from "react";
import { dateToLocaleFormater } from "@/utils/dateFormater";
import dynamic from "next/dynamic";

const ReportMap = dynamic(() => import("@/components/reports/blackspotmap"), {
  ssr: false, // <-- disables server-side rendering
});
const dummyData = [
  {
    lat: 10.5276,
    lng: 76.2144,
    label: "Thrissur",
    date: "2025-07-10",
  },
  {
    lat: 9.9312,
    lng: 76.2673,
    label: "Ernakulam",
    date: "2025-07-11",
  },
  {
    lat: 11.8745,
    lng: 75.3704,
    label: "Kannur",
    date: "2025-07-09",
  },
  {
    lat: 8.5241,
    lng: 76.9366,
    label: "Thiruvananthapuram",
    date: "2025-07-12",
  },
  {
    lat: 11.2588,
    lng: 75.7804,
    label: "Kozhikode",
    date: "2025-07-13",
  },
  {
    lat: 9.1535,
    lng: 76.7284,
    label: "Alappuzha",
    date: "2025-07-08",
  },
  {
    lat: 9.5920,
    lng: 76.5222,
    label: "Kottayam",
    date: "2025-07-14",
  },
  {
    lat: 8.8932,
    lng: 76.6141,
    label: "Kollam",
    date: "2025-07-07",
  },
  {
    lat: 10.0083,
    lng: 76.3610,
    label: "Perumbavoor",
    date: "2025-07-13",
  },
  {
    lat: 12.2958,
    lng: 76.6394,
    label: "Wayanad (Kalpetta)",
    date: "2025-07-11",
  },
];


const ParentMapReport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="px-5 pt-5 flex flex-col gap-1 h-[85vh] overflow-auto">
      <h2 className="text-lg font-semibold mb-[10px]">Black Spot Map Report</h2>
      <ReportMap
/*         title={`Accident Locations (${dateToLocaleFormater("2025-07-10")} - ${dateToLocaleFormater(today)})`}
 */        data={dummyData}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ParentMapReport;
