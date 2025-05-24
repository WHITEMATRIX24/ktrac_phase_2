import { SunburstRevenueChart } from "@/components/sunburstChart";
import { SectionCards } from "@/components/section-cards";
import { getUnitwiseBusDeployment } from "@/lib/sql_query";
import { Bus, StopCircle, TrendingUp, Users, WalletCards } from "lucide-react";


export default async function Page() {


  type BusAllotmentUnit = {
    "Total Schedules Operated in unit": number | string | null;
    "Total Bus Operated": number | string | null;
    "Idle Buses": number | string | null;
    "Total Buses": number | string | null;
    // Add other properties if needed
  };


  const busAllotmentData = await getUnitwiseBusDeployment()

  const busAllotmentData1 = (await getUnitwiseBusDeployment()) as BusAllotmentUnit[];



  // Helper to safely parse numbers
  const toNumber = (val: any) => (val !== null && !isNaN(Number(val)) ? Number(val) : 0);

  const totalSchedulesOperated = busAllotmentData1.reduce(
    (acc: number, curr) => acc + toNumber(curr["Total Schedules Operated in unit"]),
    0
  );
  const totalBusOperated = busAllotmentData1.reduce(
    (acc: number, curr) => acc + toNumber(curr["Total Bus Operated"]),
    0
  );
  const idleBuses = busAllotmentData1.reduce(
    (acc: number, curr) => acc + toNumber(curr["Idle Buses"]),
    0
  );
  const totalBuses = busAllotmentData1.reduce(
    (acc: number, curr) => acc + toNumber(curr["Total Buses"]),
    0
  );

  const dummyData = [
    {
      title: "Total Schedules Operated",
      value: totalSchedulesOperated,
      icon: <WalletCards className="w-15 h-15 text-white opacity-70" />,
    },
    {
      title: "Total Bus Operated",
      value: totalBusOperated,
      icon: <TrendingUp className="w-15 h-15 text-white opacity-70" />,
    },
    {
      title: "Idle Buses",
      value: idleBuses,
      icon: <StopCircle className="w-15 h-15 text-white opacity-70" />,
    },
    {
      title: "Total Buses",
      value: totalBuses,
      icon: <Bus className="w-15 h-15 text-white opacity-70" />,
    },
  ];




  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards data={dummyData} />
          <div className=" ">
            <div className="pl-4 lg:pl-6">
              <SunburstRevenueChart data={busAllotmentData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
