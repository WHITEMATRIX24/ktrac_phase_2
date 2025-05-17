import { RevenueAnalysisChart } from "@/components/revenue-chart";
import { RevenueBarchartComponent } from "@/components/revenue_Barchart";
import { RevenueCustomBarchart } from "@/components/revenue_c_barchart";
import { RevenuePieChart } from "@/components/revenue_piechart";
import { SectionCards } from "@/components/section-cards";
import { Fuel, TrendingUp, Users, WalletCards } from "lucide-react";

export default function Page() {
  const dummyData = [
    {
      title: "Yesterday's Collection",
      value: 15230,
      icon: <WalletCards className="w-15 h-15 text-white opacity-70" />,
    },
    {
      title: "Revenue",
      value: 8000,
      icon: <TrendingUp className="w-15 h-15 text-white opacity-70" />,
    },
    {
      title: "Fuel Expenses",
      value: 3200,
      icon: <Fuel className="w-15 h-15 text-white opacity-70" />,
    },
    {
      title: "Total Passengers",
      value: 1340,
      icon: <Users className="w-15 h-15 text-white opacity-70" />,
    },
  ];

  const barChartData = [
    { date: "June", revenue: 186 },
    { date: "Jul", revenue: 73 },
    { date: "Aug", revenue: 214 },
    { date: "Sept", revenue: 237 },
    { date: "Oct", revenue: 207 },
    { date: "Nov", revenue: 267 },
    { date: "Dec", revenue: 186 },
    { date: "Jan", revenue: 305 },
    { date: "Feb", revenue: 237 },
    { date: "March", revenue: 73 },
    { date: "April", revenue: 209 },
    { date: "May", revenue: 214 },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards data={dummyData} />
          <div className="grid grid-cols-2 gap-4">
            <div className="pl-4 lg:pl-6">
              <RevenueAnalysisChart />
            </div>
            <div className="pr-4 lg:pr-6">
              <RevenueBarchartComponent chartData={barChartData} />
            </div>
            <div className="pl-4 lg:pl-6">
              <RevenuePieChart />
            </div>
            <div className="pr-4 lg:pr-6">
              <RevenueCustomBarchart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
