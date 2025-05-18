import { BarChartComponent } from "@/components/bus_allotment_barchart";
import { BusAllotmentLineChart } from "@/components/bus_allotment_linechart";
import { SectionCards } from "@/components/section-cards";
import { Bus, BusFront, CalendarOff, ClipboardList } from "lucide-react";
import React from "react";

const BusAllotment = () => {
  const dummyData = [
    {
      title: "Bus Allotment",
      value: 1000,
      icon: <BusFront className="w-15 h-15 text-white opacity-70" />,
    },
    {
      title: "Daily Run",
      value: 1000,
      icon: <Bus className="w-15 h-15 text-white opacity-70" />,
    },
    {
      title: "Schedules Alloted",
      value: 888,
      icon: <ClipboardList className="w-15 h-15 text-white opacity-70" />,
    },
    {
      title: "Cancelled",
      value: 199,
      icon: <CalendarOff className="w-15 h-15 text-white opacity-70" />,
    },
  ];

  const barChartData = [
    { date: "Today", bus: 186 },
    { date: "Yestrday", bus: 305 },
    { date: "17 May", bus: 237 },
    { date: "16 May", bus: 73 },
    { date: "15 May", bus: 209 },
    { date: "14 May", bus: 214 },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards data={dummyData} />
          <div className="grid grid-cols-2 gap-4">
            <div className="pl-4 lg:pl-6">
              <BusAllotmentLineChart />
            </div>
            <div className="pr-4 lg:pr-6">
              <BarChartComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusAllotment;
