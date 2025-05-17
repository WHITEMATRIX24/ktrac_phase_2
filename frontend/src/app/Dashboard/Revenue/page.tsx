import { RevenueAnalysisChart } from "@/components/revenue-chart";
import { RevenueBarchartComponent } from "@/components/revenue_Barchart";
import { RevenueCustomBarchart } from "@/components/revenue_c_barchart";
import { RevenuePieChart } from "@/components/revenue_piechart";
import { SectionCards } from "@/components/section-cards";

export default function Page() {
  const dummyData = [
    {
      title: "Yesterday's Collection",
      value: 15230,
    },
    {
      title: "Revenue",
      value: 8000,
    },
    {
      title: "Fuel Expenses",
      value: 3200,
    },
    {
      title: "Total Passengers",
      value: 1340,
    },
  ];

  const barChartData = [
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
