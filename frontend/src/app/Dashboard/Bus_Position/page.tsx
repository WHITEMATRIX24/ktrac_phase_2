// src/app/bus/page.tsx
import { SectionCards } from "@/components/section-cards";
import { Bus, ClipboardList, RefreshCcw, Wrench } from "lucide-react";
import { getBusPosition } from "@/lib/sql_query";
import ChartClientWrapper from "@/components/ChartClientWrapper";
import { BusUsedForServiceChart } from "@/components/busPosition/busUsedForService";
import { BusDeploymentChart } from "@/components/busPosition/busDeployment";

export default async function BusPositionPage() {
  // Fetch data using getBusPosition
  const rawPositions = await getBusPosition();

  // Dummy data
  const dummyData = [
    {
      title: "No of Docked",
      value: 52,
      icon: <Wrench className="w-15 h-15 text-white opacity-40" />,
      change: "0",
    },
    {
      title: "Daily Run",
      value: 5432,
      icon: <Bus className="w-15 h-15 text-white opacity-40" />,
      change: "0",
    },
    {
      title: "Maintenance Scheduled",
      value: 199,
      icon: <ClipboardList className="w-15 h-15 text-white opacity-40" />,
      change: "0",
    },
    {
      title: "Repaired",
      value: 1989,
      icon: <RefreshCcw className="w-15 h-15 text-white opacity-40" />,
      change: "0",
    },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards data={dummyData} />
          <div className="px-4 lg:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-[350px] w-full">
                <ChartClientWrapper data={rawPositions} />
              </div>
              <div className="h-[350px] w-full">
                <BusUsedForServiceChart />
              </div>
              <div className="h-[350px] w-full">
                <BusDeploymentChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
