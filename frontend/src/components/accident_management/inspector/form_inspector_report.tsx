import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const FormInspectorReport = () => {
  const [isFir, setIsFir] = useState<boolean | null>(null);
  return (
    <div className="flex flex-col gap-3">
      <div className="border-b-2 border-sidebar py-2">
        <h6 className="text-sm font-semibold">Inspector Report</h6>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
          FIR Registered
        </label>
        <div className="flex items-center gap-8">
          <label
            htmlFor="#isFir"
            className="text-[12px] font-[600] text-[#374151] mb-[6px]"
          >
            Yes
          </label>
          <Input
            type="radio"
            onChange={() => setIsFir(true)}
            name="isFir"
            className="w-[14px] h-[14px]"
          />
          <label
            htmlFor="#isFir"
            className="text-[12px] font-[600] text-[#374151] mb-[6px]"
          >
            No
          </label>
          <Input
            type="radio"
            onChange={() => setIsFir(false)}
            name="isFir"
            className="w-[14px] h-[14px]"
          />
        </div>
      </div>
      {isFir && (
        <React.Fragment>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
              Inspector Name
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
              FIR Number
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
              Under Section Details
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
              Accused in the Accident In FIR
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
              FIR Case Against KSRTC
            </label>
            <div className="flex items-center gap-8">
              <label
                htmlFor="#isfiragainstksrtc"
                className="text-[12px] font-[600] text-[#374151] mb-[6px]"
              >
                Yes
              </label>
              <Input
                type="radio"
                name="isfiragainstksrtc"
                className="w-[14px] h-[14px]"
              />
              <label
                htmlFor="#isfiragainstksrtc"
                className="text-[12px] font-[600] text-[#374151] mb-[6px]"
              >
                No
              </label>
              <Input
                type="radio"
                name="isfiragainstksrtc"
                className="w-[14px] h-[14px]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
              Date Of Bus Released From Police Station
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
              Enquiry Police person Name
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
              Enquiry Police Phone Number
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
              Digital Evidence{" "}
            </label>
            <Input
              type="file"
              className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
              Witness
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
              Primary Cause Of Accident In Insp Report
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
              Responsibility Of The Accident In Insp Report
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
              If Not KSRTC Is Responsible, Action Taken
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
              Whether FIR IS MODIFIED OR NOT. Responisbilty Changed From KSRTC
              As Per Evidence Submitted
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
              Total No. Of Days Bus Docked Due To Accident
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
              Revenue Loss Due To Dock Of Bus
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
              Inspector Report Additional Details
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="md:col-span-2">
            <label className="block font-medium mb-1 text-xs">Remarks</label>
            <textarea
              className="w-full mb-2 p-2 border rounded text-xs"
              rows={3}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default FormInspectorReport;
