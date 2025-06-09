"use client";
import ReferenceNumberSearchModal from "@/components/accident_management/search_referencenumber_modal";
import { Input } from "@/components/ui/input";
import { Autocomplete, TextField } from "@mui/material";
import { Wrench, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const tabs = ["Basic & Workshop", "Insurance & Cost", "Additional info"];

interface SelectedAccedentModel {
  accedent_ref_no: string;
  accedent_date: string;
  bus_no: string;
}

// basic & workshop ui
const BasicAndWorkShop = ({
  selectedAccedentData,
}: {
  selectedAccedentData?: SelectedAccedentModel | null;
}) => {
  return (
    <div className="relative grid grid-cols-2 gap-3 overflow-auto h-full mx-3 rounded-m">
      <div className="p-3 overflow-y-auto bg-white border rounded-sm flex flex-col gap-3 w-full">
        <div className="border-b-2 border-sidebar py-2">
          <h6 className="text-sm font-semibold">Basic</h6>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">Bus No</label>
          <Input
            value={selectedAccedentData ? selectedAccedentData.bus_no : ""}
            onChange={() => console.log("clicked")}
            className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">Date Of Accident</label>
          <Input
            placeholder="Date"
            value={
              selectedAccedentData ? selectedAccedentData.accedent_date : ""
            }
            onChange={() => console.log("clicked")}
            className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
          />
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">
              Repair Work Done At Workshop/ Depot
            </label>
            <div className="flex items-center gap-8">
              <label htmlFor="#is_repair_done" className="text-[12px]">
                Yes
              </label>
              <Input
                type="radio"
                name="is_repair_done"
                className="w-[14px] h-[14px]"
              />
              <label htmlFor="#isFir" className="text-[12px]">
                No
              </label>
              <Input
                type="radio"
                name="is_repair_done"
                className="w-[14px] h-[14px]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Damage To The Bus</label>
            <Input
              type="text"
              className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
            />
          </div>
        </div>
      </div>
      <div className="p-3 overflow-y-auto bg-white border rounded-sm flex flex-col gap-3 w-full">
        <div className="border-b-2 border-sidebar py-2">
          <h6 className="text-sm font-semibold">Workshop</h6>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">Work Shop/ Depot Name</label>
          <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">Date Of Entry(DD-MM-YYYY)</label>
          <Input
            className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
            type="date"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">Date Of Work Start</label>
          <Input
            className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
            type="date"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">Date Of Released (DD-MM-YYYY)</label>
          <Input
            className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
            type="date"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">No Of Days At W/S / Depot</label>
          <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
        </div>
      </div>
    </div>
  );
};

// insurance and cost
const InsuranceAndCost = () => {
  return (
    <div className="relative grid grid-cols-2 gap-3 overflow-auto h-full mx-3 rounded-m">
      <div className="overflow-y-auto p-3 bg-white border rounded-sm flex flex-col gap-3">
        <div className="border-b-2 border-sidebar py-2">
          <h6 className="text-sm font-semibold">Insurance</h6>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">Insurance Surveyor Name</label>
          <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">Insurance Surveyor Phone No.</label>
          <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
        </div>
      </div>
      <div className="overflow-y-auto p-3 bg-white border rounded-sm flex flex-col gap-3">
        <div className="border-b-2 border-sidebar py-2">
          <h6 className="text-sm font-semibold">Cost</h6>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">Spare Part Cost</label>
          <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">Labour Cost </label>
          <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">Total Bill Amount</label>
          <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">Cost Of Damage</label>
          <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
        </div>
      </div>
    </div>
  );
};

// additional
const AdditionalInfo = () => {
  return (
    <div className="relative grid grid-cols-2 gap-3 overflow-auto h-full mx-3 rounded-m">
      <div className="overflow-y-auto p-3 bg-white border rounded-sm flex flex-col gap-3">
        <div className="border-b-2 border-sidebar py-2">
          <h6 className="text-sm font-semibold">Recovery</h6>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">COD Recovered</label>
          <div className="flex items-center gap-8">
            <label htmlFor="#is_cod_recovered" className="text-[12px]">
              Yes
            </label>
            <Input
              type="radio"
              name="is_cod_recovered"
              className="w-[14px] h-[14px]"
            />
            <label htmlFor="#isFir" className="text-[12px]">
              No
            </label>
            <Input
              type="radio"
              name="is_cod_recovered"
              className="w-[14px] h-[14px]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">Towed</label>
          <div className="flex items-center gap-8">
            <label htmlFor="#is_towed" className="text-[12px]">
              Yes
            </label>
            <Input type="radio" name="is_towed" className="w-[14px] h-[14px]" />
            <label htmlFor="#isFir" className="text-[12px]">
              No
            </label>
            <Input type="radio" name="is_towed" className="w-[14px] h-[14px]" />
          </div>
        </div>
      </div>
      <div className="overflow-y-auto p-3 bg-white border rounded-sm flex flex-col gap-3">
        <div className="border-b-2 border-sidebar py-2">
          <h6 className="text-sm font-semibold">Recovery</h6>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">Current Status</label>
          <div className="relative">
            <select className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
              <option value="">Select Status</option>
              <option value="">Pending</option>
              <option value="">In Progress</option>
              <option value="">Complete</option>
              <option value="">Cancel</option>
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
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">Additional Notes</label>
          <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">Priority Level</label>
          <div className="relative">
            <select className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
              <option value="">Select priority</option>
              <option value="">Low</option>
              <option value="">Medium</option>
              <option value="">High</option>
              <option value="">Urgent</option>
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
        </div>
      </div>
    </div>
  );
};

const AccedentWorkshop = () => {
  const [selectedAccedentData, setSelectedAccedentData] =
    useState<SelectedAccedentModel | null>();
  const tabList = [
    <BasicAndWorkShop selectedAccedentData={selectedAccedentData} />,
    <InsuranceAndCost />,
    <AdditionalInfo />,
  ];
  const [selectedTab, setSelectedtab] = useState<number>(0);
  const [isReferenceModalSearchOpen, setIsReferenceModalSearch] =
    useState<boolean>(false);
  const [progressStatus, setProgressStatus] = useState(0);

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
          <div className="flex gap-3 border-b font-semibold text-slate-500">
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
        {tabList[selectedTab]}

        {/* footer */}
        <div className="h-[3vh] flex items-center justify-between px-5 py-6">
          <div className="flex gap-3">
            <button
              disabled={selectedTab === 0}
              className="bg-green-600 font-[500] text-white px-5 py-1 rounded-xs disabled:bg-gray-400"
              onClick={() => setSelectedtab((prevValue) => prevValue - 1)}
            >
              Previous
            </button>
            <button
              disabled={selectedTab === tabs.length - 1}
              className="bg-sidebar font-[500] text-white px-5 py-1 rounded-xs disabled:bg-gray-400"
              onClick={() => setSelectedtab((prevValue) => prevValue + 1)}
            >
              Next
            </button>
          </div>
          <div className="flex gap-3">
            <button className="border font-[500] px-5 py-1 rounded-xs">
              Cancel
            </button>
            <button className="border font-[500] px-5 py-1 rounded-xs">
              Save Draft
            </button>
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

export default AccedentWorkshop;
