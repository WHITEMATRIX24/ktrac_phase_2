import { DockyardBarChart } from "@/components/dockyard_barchart";
import { SectionCards } from "@/components/section-cards";
import { Bus, ClipboardList, RefreshCcw, Wrench } from "lucide-react";
import React from "react";

const DockYardPage = () => {
  const dummyData = [
    {
      title: "No of Docked",
      value: 52,
      change:'0',
      icon: <Wrench className="w-12 h-12 text-grey opacity-70" />,
    },
    {
      title: "Daily Run",
      value: 5432,
      change:'0',
      icon: <Bus className="w-12 h-12 text-grey opacity-70" />,
    },
    {
      title: "Maintanance Scheduled",
      value: 199,
      change:'0',
      icon: <ClipboardList className="w-12 h-12 text-grey opacity-70" />,
    },
    {
      title: "Repaired",
      value: 1989,
      change:'0',
      icon: <RefreshCcw className="w-12 h-12 text-grey opacity-70" />,
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards data={dummyData} />
          <div className="w-full px-4 lg:px-6">
            <DockyardBarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DockYardPage;
