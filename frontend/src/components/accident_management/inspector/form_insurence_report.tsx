import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const FormInsurenceReport = () => {
  const [validInsurence, setValidInsurence] = useState<boolean | null>(null);
  return (
    <div className="grid grid-cols-4 gap-x-3 gap-y-5 px-5 py-3 h-full bg-white border rounded-sm mx-3">
      <div className="flex flex-col justify-between gap-2 h-28">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          Whether The Bus Have VALID Insurance Or Not / ബസിന് സാധുതയുള്ള
          ഇൻഷുറൻസ് ഉണ്ടോ ഇല്ലയോ എന്ന്
        </label>
        <div className="flex items-center gap-8">
          <label
            htmlFor="#isinsuranceclaimapplied"
            className="text-[12px] text-[#374151] mb-[6px]"
          >
            Yes
          </label>
          <Input
            type="radio"
            name="isValidInsurance"
            onChange={(e) => setValidInsurence(true)}
            className="w-[14px] h-[14px]"
          />
          <label
            htmlFor="#isinsuranceclaimapplied"
            className="text-[12px] text-[#374151] mb-[6px]"
          >
            No
          </label>
          <Input
            type="radio"
            name="isValidInsurance"
            onChange={(e) => setValidInsurence(false)}
            className="w-[14px] h-[14px]"
          />
        </div>
      </div>
      {validInsurence && (
        <>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Type Of Insurance / ഇൻഷുറൻസ് തരം
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Insurance Claim Applied / ഇൻഷുറൻസ് ക്ലെയിം പ്രയോഗിച്ചു
            </label>
            <div className="flex items-center gap-8">
              <label
                htmlFor="#isinsuranceclaimapplied"
                className="text-[12px] text-[#374151] mb-[6px]"
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
                className="text-[12px] text-[#374151] mb-[6px]"
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

          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Insurance Company Name / ഇൻഷുറൻസ് കമ്പനിയുടെ പേര്
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Policy Number / പോളിസി നമ്പർ
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Claim Number / ക്ലെയിം നമ്പർ
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Date Of Insurance Claim Applied / ഇൻഷുറൻസ് ക്ലെയിം അപേക്ഷിച്ച
              തീയതി
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>

          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Name Of Spot Surveyor / സ്പോട്ട് സർവേയറുടെ പേര്
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Spot Surveyor Phone Number / സ്പോട്ട് സർവേയർ ഫോൺ നമ്പർ
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Final Bill Submitted Insurance Co / ഇൻഷുറൻസ് കമ്പനി സമർപ്പിച്ച
              അന്തിമ ബിൽ
            </label>
            <div className="flex items-center gap-8">
              <label
                htmlFor="#is_insurance_submit_final_bill"
                className="text-[12px] text-[#374151] mb-[6px]"
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
                className="text-[12px] text-[#374151] mb-[6px]"
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
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Final Bill Amount by KSRTC (Rs.) / കെ.എസ്.ആർ.ടി.സി.യുടെ അന്തിമ ബിൽ
              തുക (രൂപ)
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Approved Amount By Insurance Co. / ഇൻഷുറൻസ് കമ്പനി അംഗീകരിച്ച തുക.
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Admitted Amount By Insurance Co. / ഇൻഷുറൻസ് കമ്പനി അനുവദിച്ച തുക.
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Payment Settled (Y/N) / പേയ്‌മെന്റ് സെറ്റിൽഡ് ആണോ
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Date of Payment Settled / പേയ്‌മെന്റ് തീർപ്പാക്കിയ തീയതി
            </label>
            <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              REMARKS / അഭിപ്രായങ്ങൾ
            </label>
            <textarea className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
          </div>
        </>
      )}
    </div>
  );
};

export default FormInsurenceReport;
