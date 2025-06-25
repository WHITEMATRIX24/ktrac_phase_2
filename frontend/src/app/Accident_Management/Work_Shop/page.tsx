"use client";
import ReferenceNumberSearchModal from "@/components/accident_management/search_referencenumber_modal";
import AdditionalInfoForm from "@/components/accident_management/workshop/form_additional";
import BasicAndWorkShopForm from "@/components/accident_management/workshop/form_basicWorkshop";
import InsuranceAndCostForm from "@/components/accident_management/workshop/form_insuranceCost";
import React, { useEffect, useState } from "react";

const tabs = ["Basic & Workshop", "Insurance & Cost", "Additional info"];

interface SelectedAccedentModel {
  accedent_ref_no: string;
  accedent_date: string;
  bus_no: string;
}

const AccedentWorkshop = () => {
  const [selectedAccedentData, setSelectedAccedentData] =
    useState<SelectedAccedentModel | null>(null);
  const tabList = [
    <BasicAndWorkShopForm selectedAccedentData={selectedAccedentData} />,
    <InsuranceAndCostForm />,
    <AdditionalInfoForm />,
  ];
  const [selectedTab, setSelectedtab] = useState<number>(0);
  const [progressStatus, setProgressStatus] = useState(0);

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
            {/* main */}
            <div className="flex flex-col bg-white">
              <div className="flex gap-3 border-b font-semibold text-slate-500">
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

export default AccedentWorkshop;
