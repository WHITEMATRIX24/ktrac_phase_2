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
        <div className="flex items-center mb-4">
          <User2 className="w-5 h-5 text-red-600 mr-2" />
          <h2 className="text-[14px] font-semibold">
            Inspector Report On Accidents
          </h2>
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
