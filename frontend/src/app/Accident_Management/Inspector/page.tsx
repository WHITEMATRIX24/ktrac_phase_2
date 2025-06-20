"use client";

import FormInspectorReport from "@/components/accident_management/inspector/form_inspector_report";
import FormInsurenceReport from "@/components/accident_management/inspector/form_insurence_report";
import ReferenceNumberSearchModal from "@/components/accident_management/search_referencenumber_modal";
import { Input } from "@/components/ui/input";
import { Autocomplete, TextField } from "@mui/material";
import { User2, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const tabs = ["Inspector Report", "Insurance"];

const AccedentInspectorForm = () => {
  const [selectedAccedentData, setSelectedAccedentData] = useState<{
    accedent_ref_no: string;
    accedent_date: string;
    bus_no: string;
  } | null>();
  const tabList = [<FormInspectorReport />, <FormInsurenceReport />];
  const [selectedTab, setSelectedtab] = useState<number>(0);
  const [isReferenceModalSearchOpen, setIsReferenceModalSearch] =
    useState<boolean>(false);
  const [progressStatus, setProgressStatus] = useState(50);

  //modal close handler
  const handleSearchModalClose = () => setIsReferenceModalSearch(false);
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
        <div className="flex items-center gap-3 px-3">
          <h6>
            Accident Reference Number <span className="text-red-600">*</span>
          </h6>
          <input
            type="text"
            placeholder="Search and select accident reference"
            readOnly
            className="w-[79%] border px-3 py-1 rounded-xs bg-white"
          />
          <button
            onClick={() => setIsReferenceModalSearch(true)}
            className="px-3 py-1 text-white cursor-pointer bg-sidebar rounded-xs"
          >
            Search
          </button>
        </div>
        {/* main */}
        <div className="flex flex-col bg-white">
          <div className="flex  gap-3  border-b font-semibold text-slate-500 ">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setSelectedtab(index)}
                className={`flex items-center px-4 py-2.5 text-[12px] font-medium cursor-pointer ${selectedTab === index && "border-b-2 border-b-sidebar"
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
        <div className="relative grid grid-cols-2 gap-3 overflow-auto h-full mx-3 rounded-m">
          <div className="p-3 overflow-y-auto bg-white border rounded-sm flex flex-col gap-3">
            <div className="border-b-2 border-sidebar py-2">
              <h6 className="text-sm font-semibold">Basic information</h6>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
                Date Of Accident
              </label>
              <Input
                placeholder="Date"
                value={
                  selectedAccedentData ? selectedAccedentData.accedent_date : ""
                }
                onChange={() => console.log("clicked")}
                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
                Bus No
              </label>
              <Input
                value={selectedAccedentData ? selectedAccedentData.bus_no : ""}
                onChange={() => console.log("clicked")}
                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
              />
            </div>
          </div>
          <div className="overflow-y-auto p-3 bg-white border rounded-sm">
            {tabList[selectedTab]}
          </div>
        </div>
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
      </div>
      {isReferenceModalSearchOpen && (
        <ReferenceNumberSearchModal
          closeHandler={handleSearchModalClose}
          caseSelectHandler={handleSearchSelect}
        />
      )}
    </React.Fragment>
  );
};

export default AccedentInspectorForm;
