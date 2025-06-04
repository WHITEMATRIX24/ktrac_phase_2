"use client";
import { Input } from "@/components/ui/input";
import { Autocomplete, TextField } from "@mui/material";
import { User2, X } from "lucide-react";
import React, { useState } from "react";

const dummyData = [
  {
    accedent_ref_no: "1563867",
    accedent_date: "06/05/2025",
    bus_no: "FA3465",
  },
];

const AccedentInspectorForm = () => {
  const [selectedAccedentData, setSelectedAccedentData] = useState<{
    accedent_ref_no: string;
    accedent_date: string;
    bus_no: string;
  } | null>();

  return (
    <div className="flex flex-col gap-3 p-5 mb-10">
      <div className="bg-white shadow h-[80vh] overflow-scroll rounded-lg border-0 p-6">
        <div className="flex items-center mb-4 justify-between">
          <div className="flex items-center">
            <User2 className="w-5 h-5 text-red-600 mr-2" />
            <h2 className="text-[14px] font-semibold">
              Inspector Report On Accidents
            </h2>
          </div>
          <div className="flex gap-4">
            {/* depo */}
            <div className="relative w-32">
              <select className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                <option value="all">ALL Depo</option>
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
            {/* date */}
            <div className="flex items-center border rounded-md p-2 w-fit">
              <input
                type="date"
                className="border-none p-0 text-sm focus:ring-0 focus:outline-none w-32 h-full"
              />
            </div>
          </div>
        </div>
        <hr className="mb-4" />
        <div className="grid grid-cols-4 gap-10 items-end pb-5 mt-8">
          {/* 1st row */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Accident Reference Number</label>
            <Autocomplete
              size="small"
              options={dummyData}
              getOptionLabel={(option) => option.accedent_ref_no}
              onChange={(_, val) => setSelectedAccedentData(val)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  className="text-[12px]"
                />
              )}
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
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Bus No</label>
            <Input
              value={selectedAccedentData ? selectedAccedentData.bus_no : ""}
              onChange={() => console.log("clicked")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Inspector Name</label>
            <Input />
          </div>
          {/* 2nd row */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">FIR Registered</label>
            <div className="flex items-center justify-evenly">
              <label htmlFor="#isFir" className="text-[12px]">
                Yes
              </label>
              <Input type="radio" name="isFir" className="w-4" />
              <label htmlFor="#isFir" className="text-[12px]">
                No
              </label>
              <Input type="radio" name="isFir" className="w-4" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">FIR Number</label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Under Section Details</label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">
              Accused in the Accident In FIR
            </label>
            <Input />
          </div>
          {/* 3rd row */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">FIR Case Against KSRTC</label>
            <div className="flex items-center justify-evenly">
              <label htmlFor="#isfiragainstksrtc" className="text-[12px]">
                Yes
              </label>
              <Input type="radio" name="isfiragainstksrtc" className="w-4" />
              <label htmlFor="#isfiragainstksrtc" className="text-[12px]">
                No
              </label>
              <Input type="radio" name="isfiragainstksrtc" className="w-4" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">
              Date Of Bus Released From Police Station
            </label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Enquiry Police person Name</label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Enquiry Police Phone Number</label>
            <Input />
          </div>
          {/* 4th row */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Digital Evidence </label>
            <Input type="file" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Witness</label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">
              Primary Cause Of Accident In Insp Report
            </label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">
              Responsibility Of The Accident In Insp Report
            </label>
            <Input />
          </div>
          {/* 5th row */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">
              If Not KSRTC Is Responsible, Action Taken
            </label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">
              Whether FIR IS MODIFIED OR NOT. Responisbilty Changed From KSRTC
              As Per Evidence Submitted
            </label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">
              Total No. Of Days Bus Docked Due To Accident
            </label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">
              Revenue Loss Due To Dock Of Bus
            </label>
            <Input />
          </div>
          {/* 6th row */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">
              Inspector Report Additional Details
            </label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">
              Whether The Bus Have VALID Insurance Or Not
            </label>
            <Input placeholder="Date" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Type Of Insurance</label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Insurance Claim Applied</label>
            <div className="flex items-center justify-evenly">
              <label htmlFor="#isinsuranceclaimapplied" className="text-[12px]">
                Yes
              </label>
              <Input
                type="radio"
                name="isinsuranceclaimapplied"
                className="w-4"
              />
              <label htmlFor="#isinsuranceclaimapplied" className="text-[12px]">
                No
              </label>
              <Input
                type="radio"
                name="isinsuranceclaimapplied"
                className="w-4"
              />
            </div>
          </div>
          {/* 7th row */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Insurance Company Name</label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Policy Number</label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Claim Number </label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">
              Date Of Insurance Claim Applied
            </label>
            <Input />
          </div>
          {/* 8th row */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Name Of Spot Surveyor</label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Spot Surveyor Phone Number</label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">
              Final Bill Submitted Insurance Co
            </label>
            <div className="flex items-center justify-evenly">
              <label
                htmlFor="#is_insurance_submit_final_bill"
                className="text-[12px]"
              >
                Yes
              </label>
              <Input
                type="radio"
                name="is_insurance_submit_final_bill"
                className="w-4"
              />
              <label
                htmlFor="#is_insurance_submit_final_bill"
                className="text-[12px]"
              >
                No
              </label>
              <Input
                type="radio"
                name="is_insurance_submit_final_bill"
                className="w-4"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">
              Final Bill Amount by KSRTC (Rs.)
            </label>
            <Input />
          </div>
          {/* 9th row */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">
              {" "}
              Approved Amount By Insurance Co.
            </label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">
              Admitted Amount By Insurance Co.
            </label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Payment Settled (Y/N)</label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Date of Payment Settled</label>
            <Input />
          </div>
          {/* 10th row */}
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium mb-1 text-xs">Remarks</label>
          <textarea
            className="w-full mb-2 p-2 border rounded text-xs"
            rows={3}
          />
        </div>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            className="px-4 py-2 text-sm border rounded flex items-center"
          >
            <X className="w-4 h-4 mr-1" /> Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-[var(--sidebar)] text-white rounded"
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccedentInspectorForm;
