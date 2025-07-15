"use client";
import React, { useEffect, useRef, useState } from "react";
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
import { AccidentSevertyBarChart } from "@/components/dashboard/accidents/accident_severity";
import { DashBoardDepoTable } from "@/components/dashboard/accidents/depotable";
import { ColumnDef } from "@tanstack/react-table";
import { AccidentDashboardAreaChart } from "@/components/dashboard/accidents/accident_dashboard_area";

type CardModel = {
  name: string;
  value: number;
};
export interface SeverityChartDashboardDataModel {
  severity_type: string;
  value: number;
}
export interface DashboardAreaChartDataModel {
  month: string;
  all: number;
  primary: number;
  inProgress: number;
  completed: number;
}
interface DashboardDepoTableDataModel {
  depot_name: string;
  fatal: number;
  major: number;
  minor: number;
  insignificant: number;
  total_accidents: number;
}

const columns: ColumnDef<DashboardDepoTableDataModel>[] = [
  {
    accessorKey: "depot_name",
    header: "Depot",
  },
  {
    accessorKey: "fatal",
    header: "Fatal",
  },
  {
    accessorKey: "major",
    header: "Major",
  },
  {
    accessorKey: "minor",
    header: "Minor",
  },
  {
    accessorKey: "insignificant",
    header: "Insignificant",
  },
  {
    accessorKey: "total_accidents",
    header: "Total accidents",
  },
];

const areaChartData = [
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
    lastMonth.getMonth() === today.getMonth() - 6 + (12 % 12) &&
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
    severityChart: SeverityChartDashboardDataModel[];
    statusChart: DashboardAreaChartDataModel[];
    depoData: DashboardDepoTableDataModel[];
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
    severityChart: [],
    statusChart: [],
    depoData: [],
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
  const bonnetNumberListRef = useRef<HTMLUListElement | null>(null);
  const [showBonnetNumberList, setShowBonnetNumberList] =
    useState<boolean>(false);
  const [allBusInfo, setAllBusInfo] = useState<string[]>([]);
  const [busInfoLoading, setBusInfoLoading] = useState<boolean>(false);

  // bonnet number search handler
  const handleSearchBonnetnumber = (searchValue: string) => {
    setBonnetSearchNo(searchValue);
    if (searchValue === "") {
      setBonnetNumberList([]);
      showBonnetNumberList && setShowBonnetNumberList(false);
      return;
    }
    setShowBonnetNumberList(true);
    setBonnetNumberList((prevData) => {
      const similarBonnetNumber = allBusInfo.filter((val) =>
        val.toLowerCase().includes(searchValue.toLowerCase())
      );
      return similarBonnetNumber;
    });
  };

  // HANDLE SELECT BONNET NUMBER
  const handleSelectBonnetNumber = (selectedValue: string) => {
    setBonnetSearchNo(selectedValue);
    setShowBonnetNumberList(false);
  };

  // HANDLE SEARCH BUTTON CLICK
  const handleSeacrh = () => {
    if (!startDate || !endDate) {
      return alert("From and To date are required");
    }
    fetchData();
  };

  // HANDLE CLEAR FILTER
  const handleClearFilter = () => {
    setBonnetSearchNo("");
    setSelectedCategory("");
    setSelectedDistrict("");
    setSelectedFuelType("");
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

      // console.log(updatedPieChartData);

      // CLEAR OBJECT FROM ARRAY WHERE EVERY VALUE AS ZERO
      const formatedDepotTable = data.depotData.filter(
        (obj: any) => !Object.values(obj).every((value) => value === 0)
      );
      console.log(formatedDepotTable);

      setDashboardData({
        cardData: finalCardData,
        severityChart: data.severityChart,
        statusChart: data.status_based_chart,
        depoData: formatedDepotTable,
      });
    } catch (error) {
      console.log(error);
      console.log("error in accident dashboard");
    } finally {
      setIsloading(false);
    }
  };

  // FETCH BUS INFO
  const fetchBusInfo = async () => {
    try {
      !busInfoLoading && setBusInfoLoading(true);

      const response = await fetch("/api/getAllBusInfo");
      const data = await response.json();
      const formatedData = data.data.map((v: any) => v.bonet_number);
      // console.log(formatedData);
      setAllBusInfo(formatedData);
    } catch (error) {
    } finally {
      setBusInfoLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchBusInfo();
  }, []);

  // LIST CONTAINER AUTOMATICALLY CLOSE
  const handleBonnetContainerColse = (e: MouseEvent) => {
    if (
      bonnetNumberListRef.current &&
      !bonnetNumberListRef.current.contains(e.target as Node)
    ) {
      setShowBonnetNumberList(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleBonnetContainerColse);
    return () => {
      document.removeEventListener("click", handleBonnetContainerColse);
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col bg-gray-100">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-3 md:gap-6 md:py-2">
          <div className="flex flex-col gap-2 pr-6">
            <div className="flex gap-2 justify-end flex-wrap">
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
                  placeholder="Bonnet no"
                  className="bg-white h-8 w-36"
                />
                {showBonnetNumberList && (
                  <ul
                    ref={bonnetNumberListRef}
                    className="absolute border-2 rounded-sm top-10 w-48 h-52 bg-white z-10 flex flex-col px-3 py-3 gap-3 overflow-auto"
                  >
                    {busInfoLoading ? (
                      <p>loading...</p>
                    ) : (
                      !busInfoLoading &&
                      bonnetNumberList.length > 0 &&
                      bonnetNumberList.map((b, index) => (
                        <li
                          onClick={() => handleSelectBonnetNumber(b)}
                          key={index}
                          className="border-b-1 cursor-pointer"
                        >
                          {b}
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>
              <Select
                onValueChange={(value) => setSelectedDistrict(value)}
                value={selectedDistrict}
              >
                <SelectTrigger
                  size="sm"
                  className="w-fit px-3 py-0 bg-white border border-slate-300 rounded-md text-[12px] text-black shadow-sm "
                >
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Thiruvananthapuram">
                    Thiruvananthapuram
                  </SelectItem>
                  <SelectItem value="Kollam">Kollam</SelectItem>
                  <SelectItem value="Pathanamthitta">Pathanamthitta</SelectItem>
                  <SelectItem value="Alappuzha">Alappuzha</SelectItem>
                  <SelectItem value="Kottayam">Kottayam</SelectItem>
                  <SelectItem value="Idukki">Idukki</SelectItem>
                  <SelectItem value="Ernakulam">Ernakulam</SelectItem>
                  <SelectItem value="Thrissur">Thrissur</SelectItem>
                  <SelectItem value="Palakkad">Palakkad</SelectItem>
                  <SelectItem value="Malappuram">Malappuram</SelectItem>
                  <SelectItem value="Kozhikode">Kozhikode</SelectItem>
                  <SelectItem value="Wayanad">Wayanad</SelectItem>
                  <SelectItem value="Kannur">Kannur</SelectItem>
                  <SelectItem value="Kasaragod">Kasaragod</SelectItem>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) => setSelectedCategory(value)}
                value={selectedCategory}
              >
                <SelectTrigger
                  size="sm"
                  className="w-fit px-3 py-0 bg-white border border-slate-300 rounded-md text-[12px] text-black shadow-sm "
                >
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AC PREMIUM SF">AC PREMIUM SF</SelectItem>
                  <SelectItem value="AC SEATER">AC SEATER</SelectItem>
                  <SelectItem value="AC SLEEPER">AC SLEEPER</SelectItem>
                  <SelectItem value="BD VAN">BD VAN</SelectItem>
                  <SelectItem value="ELECTRIC BUS">ELECTRIC BUS</SelectItem>
                  <SelectItem value="ELECTRIC DOUBLE DECKER">
                    ELECTRIC DOUBLE DECKER
                  </SelectItem>
                  <SelectItem value="FAST PASSENGER">FAST PASSENGER</SelectItem>
                  <SelectItem value="GARAUDA PREMIUM">
                    GARAUDA PREMIUM
                  </SelectItem>
                  <SelectItem value="HYBRID AC SLEEPER CUM SEATER">
                    HYBRID AC SLEEPER CUM SEATER
                  </SelectItem>
                  <SelectItem value="HYBRID NON AC SLEEPER CUM SEATER">
                    HYBRID NON AC SLEEPER CUM SEATER
                  </SelectItem>
                  <SelectItem value="JN AC">JN AC</SelectItem>
                  <SelectItem value="JN NAC">JN NAC</SelectItem>
                  <SelectItem value="KS DELUX">KS DELUX</SelectItem>
                  <SelectItem value="KS SUPER FAST">KS SUPER FAST</SelectItem>
                  <SelectItem value="KSRTC DRIVING SCHOOL BUS">
                    KSRTC DRIVING SCHOOL BUS
                  </SelectItem>
                  <SelectItem value="MINI BUS">MINI BUS</SelectItem>
                  <SelectItem value="ORDINARY">ORDINARY</SelectItem>
                  <SelectItem value="OTHER RTC VEHICLE">
                    OTHER RTC VEHICLE
                  </SelectItem>
                  <SelectItem value="SUPER DELUX">SUPER DELUX</SelectItem>
                  <SelectItem value="SUPER EXPRESS">SUPER EXPRESS</SelectItem>
                  <SelectItem value="SUPER FAST">SUPER FAST</SelectItem>
                  <SelectItem value="SWB">SWB</SelectItem>
                  <SelectItem value="VESTIBULE">VESTIBULE</SelectItem>
                  <SelectItem value="VOLVO MULTI AXLE">
                    VOLVO MULTI AXLE
                  </SelectItem>
                  <SelectItem value="VOLVO SINGLE AXLE">
                    VOLVO SINGLE AXLE
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) => setSelectedFuelType(value)}
                value={selectedFuelType}
              >
                <SelectTrigger
                  size="sm"
                  className="w-fit px-3 py-0 bg-white border border-slate-300 rounded-md text-[12px] text-black shadow-sm "
                >
                  <SelectValue placeholder="Select Fuel type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="electric">Electric</SelectItem>
                  <SelectItem value="cng">CNG</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 ms-auto">
              <Button
                onClick={handleClearFilter}
                size={"sm"}
                className="bg-white hover:bg-white hover:cursor-pointer text-black"
              >
                clear
              </Button>
              <Button onClick={handleSeacrh} size={"sm"} className="bg-sidebar">
                Search
              </Button>
            </div>
          </div>
          {isLoading ? (
            <p className="h-[80vh]">loading...</p>
          ) : (
            <>
              <AccidentDashboardCards data={dashboardData.cardData} />
              <div className="grid grid-cols-2 gap-4">
                <div className="pl-4 lg:pl-6">
                  <AccidentDashboardAreaChart
                    startDate={startDate}
                    endDate={endDate}
                    chartData={dashboardData.statusChart}
                  />
                </div>
                <div className="pr-4 lg:pr-6">
                  <AccidentSevertyBarChart
                    startDate={startDate}
                    endDate={endDate}
                    chartData={dashboardData.severityChart}
                  />
                </div>
                <div className="col-span-2 pl-4 lg:pl-6 pr-4 lg:pr-6">
                  <DashBoardDepoTable
                    startDate={startDate}
                    endDate={endDate}
                    columns={columns}
                    data={dashboardData.depoData}
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
