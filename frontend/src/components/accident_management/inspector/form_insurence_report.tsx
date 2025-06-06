import { Input } from "@/components/ui/input";
import React from "react";

const FormInsurenceReport = () => {
  return (
    <div className="flex flex-col gap-3">
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
          <Input type="radio" name="isinsuranceclaimapplied" className="w-4" />
          <label htmlFor="#isinsuranceclaimapplied" className="text-[12px]">
            No
          </label>
          <Input type="radio" name="isinsuranceclaimapplied" className="w-4" />
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
        <label className="text-[12px]">Date Of Insurance Claim Applied</label>
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
        <label className="text-[12px]">Final Bill Submitted Insurance Co</label>
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
        <label className="text-[12px]">Final Bill Amount by KSRTC (Rs.)</label>
        <Input />
      </div>
      {/* 9th row */}
      <div className="flex flex-col gap-2">
        <label className="text-[12px]"> Approved Amount By Insurance Co.</label>
        <Input />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[12px]">Admitted Amount By Insurance Co.</label>
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
    </div>
  );
};

export default FormInsurenceReport;
