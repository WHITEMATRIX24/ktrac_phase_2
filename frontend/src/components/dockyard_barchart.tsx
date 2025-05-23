"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getClasswiseDock } from "@/lib/sql_query";
import { useEffect, useState } from "react";
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function DockyardBarChart() {
  const [graphData, setgraphData] = useState<any>([]);
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const handlegraphData = async (date?: string) => {
    try {
      const classWiseDockData = await getClasswiseDock();
      console.log(classWiseDockData);

      if (date) {
        const startDateTime = new Date(`${date}T08:00:00`);
        const endDateTime = new Date(startDateTime);
        endDateTime.setUTCDate(endDateTime.getUTCDate() + 1);
        endDateTime.setUTCHours(7, 59, 59, 999);
        const result = classWiseDockData.filter((item: any) => {
          const updatedAt = new Date(item.updated_at);
          return updatedAt >= startDateTime && updatedAt <= endDateTime;
        });
        setgraphData(result);
        return;
      }
      setgraphData(classWiseDockData);
    } catch (error) {
      console.error(`error in bus position report`);
    } finally {
      const start = new Date(`${date}T08:00:00`);
      const end = new Date(start);
      end.setDate(start.getDate() + 1);
      end.setHours(7, 59, 59);
    }
  };

  useEffect(() => {
    if (date) {
      handlegraphData(date);
    }
  }, [date]);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6">
          <CardTitle>Dockyard</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
        <div className="flex gap-2 px-5">
          {/* <div className="relative">
            <select className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
              <option value="all">ALL</option>
              <option value="ADR">ADR</option>
              <option value="ALP">ALP</option>
              <option value="ALY">ALY</option>
              <option value="ANK">ANK</option>
              <option value="ARD">ARD</option>
              <option value="ARK">ARK</option>
              <option value="ATL">ATL</option>
              <option value="CDM">CDM</option>
              <option value="CGR">CGR</option>
              <option value="CHT">CHT</option>
              <option value="CHY">CHY</option>
              <option value="CLD">CLD</option>
              <option value="CTL">CTL</option>
              <option value="CTR">CTR</option>
              <option value="EDT">EDT</option>
              <option value="EKM">EKM</option>
              <option value="EMY">EMY</option>
              <option value="ETP">ETP</option>
              <option value="GVR">GVR</option>
              <option value="HPD">HPD</option>
              <option value="IJK">IJK</option>
              <option value="KDR">KDR</option>
              <option value="KGD">KGD</option>
              <option value="KHD">KHD</option>
              <option value="KKD">KKD</option>
              <option value="KKM">KKM</option>
              <option value="KLM">KLM</option>
              <option value="KLP">KLP</option>
              <option value="KMG">KMG</option>
              <option value="KMR">KMR</option>
              <option value="KMY">KMY</option>
              <option value="KNI">KNI</option>
              <option value="KNP">KNP</option>
              <option value="KNR">KNR</option>
              <option value="KPM">KPM</option>
              <option value="KPT">KPT</option>
              <option value="KTD">KTD</option>
              <option value="KTM">KTM</option>
              <option value="KTP">KTP</option>
              <option value="KTR">KTR</option>
              <option value="KYM">KYM</option>
              <option value="MKD">MKD</option>
              <option value="MLA">MLA</option>
              <option value="MLP">MLP</option>
              <option value="MLT">MLT</option>
              <option value="MND">MND</option>
              <option value="MNR">MNR</option>
              <option value="MPY">MPY</option>
              <option value="MVK">MVK</option>
              <option value="MVP">MVP</option>
              <option value="NBR">NBR</option>
              <option value="NDD">NDD</option>
              <option value="NDM">NDM</option>
              <option value="NPR">NPR</option>
              <option value="NTA">NTA</option>
              <option value="PBR">PBR</option>
              <option value="PDK">PDK</option>
              <option value="PDM">PDM</option>
              <option value="PLA">PLA</option>
              <option value="PLD">PLD</option>
              <option value="PLK">PLK</option>
              <option value="PLR">PLR</option>
              <option value="PMN">PMN</option>
              <option value="PNI">PNI</option>
              <option value="PNK">PNK</option>
              <option value="PNR">PNR</option>
              <option value="PPD">PPD</option>
              <option value="PPM">PPM</option>
              <option value="PRK">PRK</option>
              <option value="PSL">PSL</option>
              <option value="PTA">PTA</option>
              <option value="PVM">PVM</option>
              <option value="PVR">PVR</option>
              <option value="RNI">RNI</option>
              <option value="SBY">SBY</option>
              <option value="TDP">TDP</option>
              <option value="TDY">TDY</option>
              <option value="TLY">TLY</option>
              <option value="TMY">TMY</option>
              <option value="TPM">TPM</option>
              <option value="TSR">TSR</option>
              <option value="TVL">TVL</option>
              <option value="TVM CL">TVM CL</option>
              <option value="TVM CTY">TVM CTY</option>
              <option value="TVRA">TVRA</option>
              <option value="VDA">VDA</option>
              <option value="VDY">VDY</option>
              <option value="VJD">VJD</option>
              <option value="VKB">VKB</option>
              <option value="VKM">VKM</option>
              <option value="VLD">VLD</option>
              <option value="VRD">VRD</option>
              <option value="VTR">VTR</option>
              <option value="VZM">VZM</option>
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.2"
              stroke="currentColor"
              className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
              />
            </svg>
          </div>
          <div className="relative">
            <select className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
              <option value="all_type">All Type</option>
              <option value="PPD">RTC</option>
              <option value="tvm">Swift</option>
              <option value="PPD">KURTC</option>
              <option value="PPD">Samudhra</option>
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.2"
              stroke="currentColor"
              className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
              />
            </svg>
          </div> */}
          <div className="flex items-center border rounded-md p-2 w-fit">
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className="border-none p-0 text-sm focus:ring-0 focus:outline-none w-32 h-full"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[300px] w-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <BarChart
            accessibilityLayer
            data={graphData}
            margin={{
              top: 20,
            }}
            barSize={50}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="CLASS OF BUS"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              height={100}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="No. of Buses on Dock"
              fill="var(--color-desktop)"
              radius={2}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
