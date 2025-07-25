"use client";
import AddScheduleForm from "@/components/depot/add_schedule_form";
import AddBasicVehicleDetailsForm from "@/components/depot/add_vehicle_basic_form";
import AddVehicleForm from "@/components/depot/add_vehicle_form";
import AddInsuranceForm from "@/components/insurance/add_insurance_form";
import React, { useState } from "react";

const tabs = [
  "Add Vehicle Basic",
  "Add Schedule",
  "Schedule Vehicle",
  "Insurance",
];
const AddVehicle = () => {
  const [selectedTab, setSelectedtab] = useState<number>(0);
  const tabList = [
    <AddBasicVehicleDetailsForm />,
    <AddScheduleForm />,
    <AddVehicleForm />,
    <AddInsuranceForm />,
  ];
  return (
    <div className="h-[86vh] px-5 py-3 pt-5 flex flex-col">
      <div className="flex flex-col bg-white">
        <div className="flex gap-3 border-b font-semibold text-white bg-[var(--sidebar-bg)]">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setSelectedtab(index)}
              className={`flex items-center px-4 py-2.5 text-[12px] font-medium cursor-pointer ${
                selectedTab === index && "border-b-2 border-b-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="h-[75vh] overflow-auto px-2">{tabList[selectedTab]}</div>
    </div>
  );
};

export default AddVehicle;
