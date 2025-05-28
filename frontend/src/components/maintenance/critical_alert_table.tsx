"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

// Helper to render risk level with color and icon
function RiskLevelTag({ level }: { level: "high" | "medium" | "low" }) {
  switch (level) {
    case "high":
      return (
        <span className="flex items-center gap-1 text-red-600 font-semibold">
          <AlertTriangle className="w-4 h-4" /> High
        </span>
      );
    case "medium":
      return (
        <span className="flex items-center gap-1 text-yellow-600 font-semibold">
          <AlertCircle className="w-4 h-4" /> Medium
        </span>
      );
    case "low":
      return (
        <span className="flex items-center gap-1 text-green-600 font-semibold">
          <CheckCircle className="w-4 h-4" /> Low
        </span>
      );
    default:
      return <span>Unknown</span>;
  }
}

// auto genarate values
function generateRandomAlertsData(count = 5) {
  const models = ["Ashok Leyland", "Tata", "Tata Marcopolo", "Volvo", "Eicher"];
  const components = [
    "Brakes",
    "Engine",
    "Transmission",
    "Suspension",
    "Battery",
    "Tires",
    "Engine Cooling",
    "HVAC",
  ];
  const riskLevels = ["low", "medium", "high"];

  const getRandomItem = (arr: string[]) =>
    arr[Math.floor(Math.random() * arr.length)];
  const getRandomId = () => `RPC ${Math.floor(100 + Math.random() * 900)}`;
  const getRandomFailureDays = () => Math.floor(1 + Math.random() * 10);

  const alertsData = Array.from({ length: count }, () => ({
    id: getRandomId(),
    model: getRandomItem(models),
    component: getRandomItem(components),
    riskLevel: getRandomItem(riskLevels),
    predictedFailureDays: getRandomFailureDays(),
  }));

  return alertsData;
}

export function CriticalAlertsTable() {
  const [alertsData, setAlertsData] = useState([
    {
      id: "RPC 205",
      model: "Ashok Leyland",
      component: "Brakes",
      riskLevel: "high",
      predictedFailureDays: 3,
    },
    {
      id: "RPC 209",
      model: "Tata Marcopolo",
      component: "Engine Cooling",
      riskLevel: "medium",
      predictedFailureDays: 6,
    },
    {
      id: "RPC 280",
      model: "Volvo",
      component: "Suspension",
      riskLevel: "high",
      predictedFailureDays: 2,
    },
    {
      id: "RPC 200",
      model: "Ashok Leyland",
      component: "Transmission",
      riskLevel: "low",
      predictedFailureDays: 10,
    },
    {
      id: "RPC 290",
      model: "Tata",
      component: "Engine",
      riskLevel: "medium",
      predictedFailureDays: 5,
    },
  ]);

  const handleSelect = () => {
    setAlertsData(generateRandomAlertsData(Math.floor(Math.random() * 10) + 1));
  };

  return (
    <div className="flex flex-col gap-3">
      {/* select */}
      <div className="relative">
        <select
          onChange={handleSelect}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
        >
          <option value="all_depo">ALL DEPO</option>
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
          className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-70  0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bus No</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Component</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Predicted Failure</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alertsData.map((alert) => (
              <TableRow key={alert.id}>
                <TableCell>{alert.id}</TableCell>
                <TableCell>{alert.model}</TableCell>
                <TableCell>{alert.component}</TableCell>
                <TableCell>
                  <RiskLevelTag level={alert.riskLevel as any} />
                </TableCell>
                <TableCell>{alert.predictedFailureDays} days</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
