import { Input } from "@/components/ui/input";
import React from "react";

const FormInspectorReport = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="border-b-2 border-sidebar py-2">
        <h6 className="text-sm font-semibold">Inspector Report</h6>
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
        <label className="text-[12px]">Accused in the Accident In FIR</label>
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
          Whether FIR IS MODIFIED OR NOT. Responisbilty Changed From KSRTC As
          Per Evidence Submitted
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
        <label className="text-[12px]">Revenue Loss Due To Dock Of Bus</label>
        <Input />
      </div>
      {/* 6th row */}
      <div className="flex flex-col gap-2">
        <label className="text-[12px]">
          Inspector Report Additional Details
        </label>
        <Input />
      </div>
      <div className="md:col-span-2">
        <label className="block font-medium mb-1 text-xs">Remarks</label>
        <textarea className="w-full mb-2 p-2 border rounded text-xs" rows={3} />
      </div>
    </div>
  );
};

export default FormInspectorReport;
