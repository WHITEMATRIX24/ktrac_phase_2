"use client";
import { AccidentLineChart } from "@/components/accident_dashboard_linechart";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AccidentDashboardCards } from "@/components/dashboard/accidents/cards";
import { AccidentDashboardPieChart } from "@/components/dashboard/accidents/accident_dashboard_piechart";

type CardModel = {
  name: string;
  value: number;
};

type PieChartModel = {
  labelData: String;
  data: number;
  fill: String;
};

const pieChartData = [
  { labelData: "FIR", key: "with_fir", data: 0, fill: "var(--color-chrome)" },
  {
    labelData: "No FIR",
    data: 0,
    key: "no_fir",
    fill: "var(--color-safari)",
  },
];

const lineChartData = [
  { month: "January", all: 186, primary: 80, inProgress: 50, completed: 60 },
  { month: "February", all: 305, primary: 200, inProgress: 80, completed: 20 },
  { month: "March", all: 237, primary: 120, inProgress: 20, completed: 40 },
  { month: "April", all: 300, primary: 190, inProgress: 90, completed: 50 },
  { month: "May", all: 209, primary: 130, inProgress: 100, completed: 90 },
  { month: "June", all: 214, primary: 140, inProgress: 90, completed: 80 },
];

const formatDateForAPI = (input: string): string => {
  const [year, month, day] = input.split("-");
  return `${day}/${month}/${year}`;
};

const getSameDayFromPastSixMonth = () => {
  const today = new Date();
  const lastMonth = new Date(today);

  lastMonth.setMonth(today.getMonth() - 6);

  // Handle cases where previous month had fewer days
  if (
    lastMonth.getMonth() === today.getMonth() - 1 + (12 % 12) &&
    lastMonth.getDate() !== today.getDate()
  ) {
    lastMonth.setDate(0);
  }
  const year = lastMonth.getFullYear();
  const month = String(lastMonth.getMonth() + 1).padStart(2, "0");
  const day = String(lastMonth.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const AccidentsDashboard = () => {
  const [dashboardData, setDashboardData] = useState<{
    cardData: CardModel[];
    fir_based_chart: PieChartModel[];
  }>({
    cardData: [
      {
        name: "Total Accidents",
        value: 0,
      },
      {
        name: "Primary Stage",
        value: 0,
      },
      {
        name: "In Progress ",
        value: 0,
      },
      {
        name: "Completed",
        value: 0,
      },
    ],
    fir_based_chart: [],
  });
  const [bonnetSearchNo, setBonnetSearchNo] = useState<string>("");
  const [bonnetNumberList, setBonnetNumberList] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedFuelType, setSelectedFuelType] = useState<string>("");
  const [startDate, setStartDate] = useState<string>(
    getSameDayFromPastSixMonth()
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [isLoading, setIsloading] = useState<boolean>(true);

  // bonnet number search handler
  const handleSearchBonnetnumber = (searchValue: string) => {
    setBonnetSearchNo(searchValue);
    if (searchValue === "") {
      setBonnetNumberList([]);
      return;
    }

    setBonnetNumberList(["RF1574", "RF1575"]);
  };

  // fetch dashboard data
  const fetchData = async () => {
    try {
      !isLoading && setIsloading(true);

      const formatedStartDate = formatDateForAPI(startDate);
      const formatedEndDate = formatDateForAPI(endDate);

      const response = await fetch(
        `/api/dashboard/accidents?start_date=${formatedStartDate}&end_date=${formatedEndDate}&bonnet_no=${bonnetSearchNo}&district=${selectedDistrict}&category=${selectedCategory}&fuel_type=${selectedFuelType}`
      );

      if (!response.ok) {
        console.log("error in accident dashboard");
        alert("something went wrong");
      }
      const data = await response.json();
      console.log(data);

      // cards
      const finalCardData = data.cards.map(
        (v: { name: string; value: number }) => {
          return {
            ...v,
            name: convertToTitleCase(v.name),
          };
        }
      );

      // pie chart
      const updatedPieChartData = pieChartData.map((d) => {
        return {
          ...d,
          data: data.fir_chart[d.key],
        };
      });
      // console.log(updatedPieChartData);

      setDashboardData({
        cardData: finalCardData,
        fir_based_chart: updatedPieChartData,
      });
    } catch (error) {
      console.log(error);
      console.log("error in accident dashboard");
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-3 md:gap-6 md:py-2">
          <div className="flex gap-2 justify-end pr-6">
            <div className="flex gap-2 items-center">
              <label>From</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-white h-8 w-fit"
              />
            </div>
            <div className="flex gap-2 items-center">
              <label>To</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-white h-8 w-fit"
              />
            </div>
            <div className="relative">
              <Input
                onChange={(e) => handleSearchBonnetnumber(e.target.value)}
                value={bonnetSearchNo}
                placeholder="bonnet no"
                className="bg-white h-8 w-36"
              />
              {bonnetNumberList.length > 0 && (
                <div className="absolute border-2 rounded-sm top-10 w-48 h-52 bg-white z-10 flex flex-col px-3 py-3 gap-3">
                  {bonnetNumberList.map((b, index) => (
                    <p
                      onClick={() => setBonnetSearchNo(b)}
                      key={index}
                      className="border-b-1"
                    >
                      {b}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <Select>
              <SelectTrigger
                size="sm"
                className="w-fit px-3 py-0 bg-white border border-slate-300 rounded-md text-[12px] text-black shadow-sm "
              >
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="depo1">Thiruvanathapuram</SelectItem>
                <SelectItem value="depo2">Kottayam</SelectItem>
                <SelectItem value="depo3">Pathanamthitta</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger
                size="sm"
                className="w-fit px-3 py-0 bg-white border border-slate-300 rounded-md text-[12px] text-black shadow-sm "
              >
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="depo1">Super Fast</SelectItem>
                <SelectItem value="depo2">Minnal</SelectItem>
                <SelectItem value="depo3">Ac lowfloor</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger
                size="sm"
                className="w-fit px-3 py-0 bg-white border border-slate-300 rounded-md text-[12px] text-black shadow-sm "
              >
                <SelectValue placeholder="Select Fuel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="depo1">Diseal</SelectItem>
                <SelectItem value="depo2">Electric</SelectItem>
                <SelectItem value="depo3">Cng</SelectItem>
              </SelectContent>
            </Select>
            <Button size={"sm"} className="bg-sidebar">
              Search
            </Button>
          </div>
          {isLoading ? (
            <p>loading...</p>
          ) : (
            <>
              <AccidentDashboardCards data={dashboardData.cardData} />
              <div className="grid grid-cols-2 gap-4">
                <div className="pl-4 lg:pl-6">
                  <AccidentLineChart chartData={lineChartData} />
                </div>
                <div className="pr-4 lg:pr-6">
                  <AccidentDashboardPieChart
                    chartTitle="Accident FIR"
                    description="Ratio of accident data with FIR & without FIR"
                    chartData={dashboardData.fir_based_chart}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccidentsDashboard;

const convertToTitleCase = (str: string): string => {
  return str.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};
