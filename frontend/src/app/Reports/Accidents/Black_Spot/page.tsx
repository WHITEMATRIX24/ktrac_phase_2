"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { dateToLocaleFormater } from "@/utils/dateFormater";
import { Input } from "@/components/ui/input";
import { Row } from "jspdf-autotable";

const ReportMap = dynamic(() => import("@/components/reports/blackspotmap"), {
  ssr: false,
});
interface MapPoint {
  lat: number;
  lng: number;
  label: string;
  severity: "Minor" | "Major" | "Fatal";
  details: {
    total: number;
    fatalities: number;
    severity_distribution: {
      minor: number;
      major: number;
      fatal: number;
    };
  };
}

const mockBackendData = [
  {
    location: "NH544, Palakkad Bypass",
    latitude: 10.775,
    longitude: 76.655,
    accidents_count: 5,
    fatalities_count: 1,
    severity_distribution: {
      minor: 2,
      major: 2,
      fatal: 1,
    },
  },
  {
    location: "Ernakulam South",
    latitude: 9.9312,
    longitude: 76.2673,
    accidents_count: 3,
    fatalities_count: 0,
    severity_distribution: {
      minor: 1,
      major: 2,
      fatal: 0,
    },
  },
  {
    location: "Kozhikode Bypass",
    latitude: 11.2588,
    longitude: 75.7804,
    accidents_count: 4,
    fatalities_count: 1,
    severity_distribution: {
      minor: 1,
      major: 1,
      fatal: 1,
    },
  },
];

const getDominantSeverity = (severity: {
  minor: number;
  major: number;
  fatal: number;
}): "Minor" | "Major" | "Fatal" => {
  const max = Math.max(severity.minor, severity.major, severity.fatal);
  if (max === severity.fatal) return "Fatal";
  if (max === severity.major) return "Major";
  return "Minor";
};

const transformToMapPoints = (data: typeof mockBackendData) =>
  data.map((spot) => ({
    lat: spot.latitude,
    lng: spot.longitude,
    label: spot.location,
    severity: getDominantSeverity(spot.severity_distribution),
    details: {
      total: spot.accidents_count,
      fatalities: spot.fatalities_count,
      severity_distribution: spot.severity_distribution,
    },
  }));

const ParentMapReport = () => {

const getSameDayLastMonth = () => {
  const today = new Date();
  const lastMonth = new Date(today);

  lastMonth.setMonth(today.getMonth() - 1);

  // Handle cases where previous month had fewer days
  if (
    lastMonth.getMonth() === today.getMonth() - 1 + (12 % 12) &&
    lastMonth.getDate() !== today.getDate()
  ) {
    lastMonth.setDate(0);
  }
  const year = lastMonth.getFullYear();
  const month = String(lastMonth.getMonth() + 1).padStart(2, "0");
  const day = String(lastMonth.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const [mapData, setMapData] = useState<MapPoint[]>([]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
  const [isLoading, setIsLoading] = useState(true);
   const [searchTerm, setSearchTerm] = useState("");
    const [severityFilter, setSeverityFilter] = useState("All");
      const [startDate, setStartDate] = useState(getSameDayLastMonth());
    
  
    const filteredLocations = mapData.filter((item) => {
      const matchesSearch =
        !searchTerm || item.label.toLowerCase().includes(searchTerm.toLowerCase());
  
      const matchesSeverity =
        severityFilter === "All" || item.severity === severityFilter;
  
      return matchesSearch && matchesSeverity;
    });
  

  const today = new Date().toISOString().split("T")[0];

  /* useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const formatted = transformToMapPoints(mockBackendData);
      setMapData(formatted);
      setIsLoading(false);
    }, 500);
  }, []); */
  const formatDateForAPI = (input: string): string => {
  const [year, month, day] = input.split("-");
  const shortYear = year.slice(2);
  return `${day}/${month}/${shortYear}`;
};

 const fetchData = async () => {
    setIsLoading(true);
    !isLoading && setIsLoading(true);
      const formatedStartDate = formatDateForAPI(startDate);
      const formatedEndDate = formatDateForAPI(endDate);
    try {
      const res = await fetch(
        `/api/reports/accidents/black_spot?start_date=${formatedStartDate}&end_date=${formatedEndDate}`
      );
      console.log(res);
      
      const raw = await res.json();
      console.log(raw);
      

      const formatted: MapPoint[] = raw.Report.map((item: any) => ({
        lat: item.latitude,
        lng: item.longitude,
        label: item.location,
        severity:
          item.severity_distribution.fatal > 0
            ? "Fatal"
            : item.severity_distribution.major > 0
            ? "Major"
            : "Minor",
        details: {
          total: item.accidents_count,
          fatalities: item.fatalities_count,
          severity_distribution: item.severity_distribution,
        },
      }));

      setMapData(formatted);
    } catch (err) {
      console.error("Failed to fetch blackspot data", err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);


  return (
    <div className="px-5 pt-5 flex flex-col gap-1 h-[85vh] overflow-auto">
      <h2 className="text-lg font-semibold mb-3">Black Spot Map Report</h2>
       <div className="flex gap-4 items-center flex-wrap">
        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium">From:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-1 rounded bg-gray-100 text-sm"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium">To:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-1 rounded bg-gray-100 text-sm"
          />
        </div>
        {/* Filters */}
              <div className="flex items-center justify-between py-2 flex-wrap gap-5">
                <div className="flex gap-2 items-center flex-wrap">
                  <label className="text-sm font-medium">Severity</label>
                  <select
                    value={severityFilter}
                    onChange={(e) => setSeverityFilter(e.target.value)}
                    className="border rounded-md p-1 text-sm bg-gray-100"
                  >
                    <option value="All">All</option>
                    <option value="Minor">Minor</option>
                    <option value="Major">Major</option>
                    <option value="Fatal">Fatal</option>
                  </select>
                </div>
        
               <div  className="flex gap-2 items-center flex-wrap" >
                  <Input
                    placeholder="Search by location"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm bg-gray-100"
                  />
               </div>
              </div>
        
      </div>

      <ReportMap
        title={`Black Spot Summary (${dateToLocaleFormater("2025-07-01")} - ${dateToLocaleFormater(today)})`}
        data={filteredLocations}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ParentMapReport;
