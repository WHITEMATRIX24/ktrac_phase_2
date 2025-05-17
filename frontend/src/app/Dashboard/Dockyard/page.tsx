import DockyardLineChart from "@/components/dockyard_linechart";
import { SectionCards } from "@/components/section-cards";
import React from "react";

const DockYardPage = () => {
  const dummyData = [
    {
      title: "No of Docked",
      value: 50,
    },
    {
      title: "Daily Run",
      value: 199,
    },
    {
      title: "Maintanance Scheduled",
      value: 199,
    },
    {
      title: "Repaired",
      value: 199,
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards data={dummyData} />
          <div className="px-4 lg:px-6">
            <DockyardLineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DockYardPage;
