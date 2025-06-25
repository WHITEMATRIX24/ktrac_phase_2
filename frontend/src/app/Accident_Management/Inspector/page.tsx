"use client";

import FormBasicReport from "@/components/accident_management/inspector/form_basic_report";
import FormInspectorReport from "@/components/accident_management/inspector/form_inspector_report";
import FormInsurenceReport from "@/components/accident_management/inspector/form_insurence_report";
import ReferenceNumberSearchModal from "@/components/accident_management/search_referencenumber_modal";
import { Input } from "@/components/ui/input";
import { Autocomplete, TextField } from "@mui/material";
import { User2, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const tabs = ["Basic Details", "Inspector Report", "Insurance"];
const tabList = [
  <FormBasicReport />,
  <FormInspectorReport />,
  <FormInsurenceReport />,
];

const AccedentInspectorForm = () => {
  const [selectedAccedentData, setSelectedAccedentData] = useState<{
    accedent_ref_no: string;
    accedent_date: string;
    bus_no: string;
  } | null>(null);
  const [selectedTab, setSelectedtab] = useState<number>(0);
  const [progressStatus, setProgressStatus] = useState(50);

  const handleSearchSelect = (selectedData: any) =>
    setSelectedAccedentData(selectedData);

  // progressbar
  useEffect(() => {
    const progressValuePerTab = 100 / tabs.length;
    setProgressStatus(progressValuePerTab * (selectedTab + 1));
  }, [selectedTab]);

  return (
    <React.Fragment>
      <div className="flex flex-col h-[88vh] pt-1 text-[12px] gap-3">
        {selectedAccedentData === null ? (
          <ReferenceNumberSearchModal caseSelectHandler={handleSearchSelect} />
        ) : (
          <>
            {/* tab */}
            <div className="flex flex-col bg-white">
              <div className="flex  gap-3  border-b font-semibold text-slate-500 ">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedtab(index)}
                    className={`flex items-center px-4 py-2.5 text-[12px] font-medium cursor-pointer ${
                      selectedTab === index && "border-b-2 border-b-sidebar"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div
                className={`h-[2px] bg-sidebar`}
                style={{ width: `${progressStatus}%` }}
              ></div>
            </div>
            {/* main */}
            {tabList[selectedTab]}
            {/* footer */}
            <div className="h-[3vh] flex items-center justify-between px-5 py-6">
              <div className="flex gap-3">
                {selectedTab !== 0 && (
                  <button
                    className="bg-green-600 font-[500] text-white px-5 py-1 rounded-xs disabled:bg-gray-400"
                    onClick={() => setSelectedtab((prevValue) => prevValue - 1)}
                  >
                    Previous
                  </button>
                )}
                {selectedTab !== tabs.length - 1 && (
                  <button
                    className="bg-sidebar font-[500] text-white px-5 py-1 rounded-xs disabled:bg-gray-400"
                    onClick={() => setSelectedtab((prevValue) => prevValue + 1)}
                  >
                    Next
                  </button>
                )}
              </div>
              <div className="flex gap-3">
                <button className="border font-[500] px-5 py-1 rounded-xs">
                  Cancel
                </button>
                <button className="border font-[500] px-5 py-1 rounded-xs">
                  Save Draft
                </button>
                {selectedTab === tabs.length - 1 && (
                  <button className="border font-[500] px-5 py-1 rounded-xs bg-sidebar text-white">
                    Submit
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default AccedentInspectorForm;
