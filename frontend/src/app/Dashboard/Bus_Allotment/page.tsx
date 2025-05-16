import { BusAllotmentLineChart } from "@/components/bus_allotment_linechart";
import { SectionCards } from "@/components/section-cards";
import React from "react";

const BusAllotment = () => {
  const dummyData = [
    {
      title: "Bus Allotment",
      subData: [
        {
          title: "Swift",
          value: 1000,
        },
        {
          title: "Samudhara",
          value: 1000,
        },
      ],
    },
    {
      title: "Daily Run",
      subData: [
        {
          title: "Swift",
          value: 199,
        },
        {
          title: "KURTC",
          value: 888,
        },
      ],
    },
    {
      title: "Schedules Alloted",
      subData: [
        {
          title: "Swift",
          value: 199,
        },
        {
          title: "Samudhara",
          value: 888,
        },
      ],
    },
    {
      title: "Cancelled",
      subData: [
        {
          title: "Swift",
          value: 199,
        },
        {
          title: "Samudhara",
          value: 888,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards data={dummyData} />
          <div className="px-4 lg:px-6">
            <BusAllotmentLineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusAllotment;
