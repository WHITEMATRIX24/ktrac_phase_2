"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";
const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
];

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BusAllotmentLineChart() {
  const [chartValues, setChartValues] = React.useState(chartData);
  const [graphFilter, setGraphFilter] = React.useState<{
    location: string;
    bus_type: string;
    duration: string;
    month_value: null | string;
    year_value: string;
  }>({
    location: "all",
    bus_type: "all_type",
    duration: "yearly",
    month_value: null,
    year_value: "2025",
  });

  React.useEffect(() => {
    const randomized = chartData.map((item) => ({
      ...item,
      desktop: Math.floor(Math.random() * 200),
      mobile: Math.floor(Math.random() * 200),
    }));
    setChartValues(randomized);
  }, [graphFilter]);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6">
          <CardTitle>Bus Allotment</CardTitle>
          {/* <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription> */}
        </div>
        <div className="flex gap-2 px-5 justify-end">
          <div className="relative">
            <select
              value={graphFilter.location}
              onChange={(e) =>
                setGraphFilter({ ...graphFilter, location: e.target.value })
              }
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
            >
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
            <select
              value={graphFilter.bus_type}
              onChange={(e) =>
                setGraphFilter({ ...graphFilter, bus_type: e.target.value })
              }
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
            >
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
          </div>
          <div className="relative">
            <select
              value={graphFilter.duration}
              onChange={(e) =>
                setGraphFilter({ ...graphFilter, duration: e.target.value })
              }
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
            >
              <option value="yearly">Yearly</option>
              <option value="monthly">Monthly</option>
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
            <select
              value={graphFilter.year_value}
              onChange={(e) =>
                setGraphFilter({ ...graphFilter, year_value: e.target.value })
              }
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
            >
              <option value="yearly">2025</option>
              <option value="monthly">2024</option>
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
          {graphFilter.duration === "monthly" && (
            <div className="relative">
              <select
                value={graphFilter.month_value || "may"}
                onChange={(e) =>
                  setGraphFilter({
                    ...graphFilter,
                    month_value: e.target.value,
                  })
                }
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
              >
                <option value="jan">Jan</option>
                <option value="feb">Feb</option>
                <option value="mar">March</option>
                <option value="april">April</option>
                <option value="may">May</option>
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
          )}
        </div>
      </CardHeader>
      <CardContent >
        <ChartContainer
          config={chartConfig}
          className="py-6"
        >
          <LineChart
            accessibilityLayer
            data={chartValues}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            {/* <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            /> */}
            <Line
              dataKey={"desktop"}
              type="basis"
              stroke={`#4e5166`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
