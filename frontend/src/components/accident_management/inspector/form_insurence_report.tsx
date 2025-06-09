import { Input } from "@/components/ui/input";
import React from "react";

const FormInsurenceReport = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
          Whether The Bus Have VALID Insurance Or Not
        </label>
        <Input
          placeholder="Date"
          className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
          Type Of Insurance
        </label>
        <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
          Insurance Claim Applied
        </label>
        <div className="flex items-center gap-8">
          <label
            htmlFor="#isinsuranceclaimapplied"
            className="text-[12px] font-[600] text-[#374151] mb-[6px]"
          >
            Yes
          </label>
          <Input
            type="radio"
            name="isinsuranceclaimapplied"
            className="w-[14px] h-[14px]"
          />
          <label
            htmlFor="#isinsuranceclaimapplied"
            className="text-[12px] font-[600] text-[#374151] mb-[6px]"
          >
            No
          </label>
          <Input
            type="radio"
            name="isinsuranceclaimapplied"
            className="w-[14px] h-[14px]"
          />
        </div>
      </div>
      {/* 7th row */}
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
          Insurance Company Name
        </label>
        <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
          Policy Number
        </label>
        <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
          Claim Number{" "}
        </label>
        <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
          Date Of Insurance Claim Applied
        </label>
        <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      {/* 8th row */}
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
          Name Of Spot Surveyor
        </label>
        <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
          Spot Surveyor Phone Number
        </label>
        <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
          Final Bill Submitted Insurance Co
        </label>
        <div className="flex items-center gap-8">
          <label
            htmlFor="#is_insurance_submit_final_bill"
            className="text-[12px] font-[600] text-[#374151] mb-[6px]"
          >
            Yes
          </label>
          <Input
            type="radio"
            name="is_insurance_submit_final_bill"
            className="w-[14px] h-[14px]"
          />
          <label
            htmlFor="#is_insurance_submit_final_bill"
            className="text-[12px] font-[600] text-[#374151] mb-[6px]"
          >
            No
          </label>
          <Input
            type="radio"
            name="is_insurance_submit_final_bill"
            className="w-[14px] h-[14px]"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
          Final Bill Amount by KSRTC (Rs.)
        </label>
        <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      {/* 9th row */}
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
          {" "}
          Approved Amount By Insurance Co.
        </label>
        <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
          Admitted Amount By Insurance Co.
        </label>
        <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
          Payment Settled (Y/N)
        </label>
        <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
          Date of Payment Settled
        </label>
        <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
    </div>
  );
};

export default FormInsurenceReport;
