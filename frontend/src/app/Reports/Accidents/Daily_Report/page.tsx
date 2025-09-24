"use client";
import DailyAccidentsDetails from "@/components/reports/accidents/daily_acciedent_details";
import DailySeverityTable from "@/components/reports/accidents/daily_severity_table";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EllipsisVertical } from "lucide-react";
import React, { useState } from "react";

// TABS
const tabs = ["Severity", "Details"];

const DailyReport = () => {
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTab, setSelectedtab] = useState<number>(0);

  //   TABLE LIST
  const tableList = [
    <DailySeverityTable selectedDate={date} />,
    <DailyAccidentsDetails />,
  ];

  return (
    <div className="px-5 pt-5 flex flex-col gap-4 h-[85vh] overflow-auto">
      <h2 className="text-lg font-semibold">Daily Report</h2>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="flex items-center border rounded-md p-2 w-fit bg-gray-100">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-none p-0 text-sm focus:ring-0 focus:outline-none w-32 h-full"
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="cursor-pointer bg-transparent hover:bg-transparent shadow-none">
                <EllipsisVertical color="black" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 flex flex-col gap-3 mr-8">
              <button className="bg-green-700 px-3 py-1 rounded-sm text-sm text-white cursor-pointer">
                PDF Export
              </button>
              <button className="bg-green-700 px-3 py-1 rounded-sm text-sm text-white cursor-pointer">
                Excel Export
              </button>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col">
          <div className="flex  gap-3  border-b font-semibold text-white bg-[var(--sidebar-bg)]">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setSelectedtab(index)}
                className={`flex items-center px-4 py-2.5 text-[12px] font-medium cursor-pointer ${
                  selectedTab === index && "border-b-2 border-b-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {tableList[selectedTab]}
        </div>
      </div>
    </div>
  );
};

export default DailyReport;
