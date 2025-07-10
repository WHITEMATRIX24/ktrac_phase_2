import { Input } from "@/components/ui/input";
import {
  AccidentInsuranceModel,
  InspectorReportData,
} from "@/models/AccidentData";
import React, { useState } from "react";

interface Props {
  stateUpdateHandler: React.Dispatch<
    React.SetStateAction<AccidentInsuranceModel>
  >;
  insuranceForm: AccidentInsuranceModel | null;
  inspectorReport: InspectorReportData | null;
  inspectorUpdateFunction: React.Dispatch<
    React.SetStateAction<InspectorReportData>
  >;
}

const FormInsurenceReport = ({
  insuranceForm,
  stateUpdateHandler,
  inspectorReport,
  inspectorUpdateFunction,
}: Props) => {
  return (
    <div className="grid grid-cols-4 gap-x-3 gap-y-5 px-5 py-3 h-full bg-white border rounded-sm mx-3 overflow-auto">
      <div className="flex flex-col justify-between gap-2 h-28">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          Whether The Bus Have VALID Insurance Or Not /
          <span className="text-[10px]">
            ബസിന് സാധുതയുള്ള ഇൻഷുറൻസ് ഉണ്ടോ ഇല്ലയോ എന്ന്
          </span>
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
            checked={
              inspectorReport?.whether_bus_have_valid_insurance_or_not ===
                true || false
            }
            onChange={() =>
              inspectorUpdateFunction((prev) => ({
                ...prev,
                whether_bus_have_valid_insurance_or_not: true,
              }))
            }
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
            checked={
              inspectorReport?.whether_bus_have_valid_insurance_or_not ===
                false || false
            }
            onChange={() =>
              inspectorUpdateFunction((prev) => ({
                ...prev,
                whether_bus_have_valid_insurance_or_not: false,
              }))
            }
            name="isValidInsurance"
            className="w-[14px] h-[14px]"
          />
        </div>
      </div>
      {inspectorReport?.whether_bus_have_valid_insurance_or_not && (
        <>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Type Of Insurance /
              <span className="text-[10px]">ഇൻഷുറൻസ് തരം</span>
            </label>
            <Input
              value={insuranceForm?.type_of_insurance}
              onChange={(e) =>
                stateUpdateHandler((prev) => ({
                  ...prev,
                  type_of_insurance: e.target.value,
                }))
              }
              className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
            />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Insurance Claim Applied /
              <span className="text-[10px]">ഇൻഷുറൻസ് ക്ലെയിം പ്രയോഗിച്ചു</span>
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
                checked={
                  insuranceForm?.insurance_claim_applied === true || false
                }
                onChange={() =>
                  stateUpdateHandler((prev) => ({
                    ...prev,
                    insurance_claim_applied: true,
                  }))
                }
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
                checked={
                  insuranceForm?.insurance_claim_applied === false || false
                }
                onChange={() =>
                  stateUpdateHandler((prev) => ({
                    ...prev,
                    insurance_claim_applied: false,
                  }))
                }
                name="isinsuranceclaimapplied"
                className="w-[14px] h-[14px]"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Insurance Company Name /
              <span className="text-[10px]">ഇൻഷുറൻസ് കമ്പനിയുടെ പേര്</span>
            </label>
            <select
              onChange={(e) =>
                stateUpdateHandler((prev) => ({
                  ...prev,
                  insurance_company_name: e.target.value,
                }))
              }
              className="px-3 py-2 border rounded-sm"
              value={insuranceForm?.insurance_company_name}
            >
              <option value="" disabled>
                Select Insurance Company
              </option>
              <option value="National Insurance">National Insurance</option>
            </select>
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Policy Number /<span className="text-[10px]">പോളിസി നമ്പർ</span>
            </label>
            <Input
              value={insuranceForm?.policy_number}
              onChange={(e) =>
                stateUpdateHandler((prev) => ({
                  ...prev,
                  policy_number: e.target.value,
                }))
              }
              className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
            />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Claim Number /<span className="text-[10px]">ക്ലെയിം നമ്പർ</span>
            </label>
            <Input
              value={insuranceForm?.claim_number}
              onChange={(e) =>
                stateUpdateHandler((prev) => ({
                  ...prev,
                  claim_number: e.target.value,
                }))
              }
              className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
            />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Date Of Insurance Claim Applied /
              <span className="text-[10px]">
                ഇൻഷുറൻസ് ക്ലെയിം അപേക്ഷിച്ച തീയതി
              </span>
            </label>
            <Input
              type="date"
              value={insuranceForm?.date_of_insurance_claim_applied}
              onChange={(e) =>
                stateUpdateHandler((prev) => ({
                  ...prev,
                  date_of_insurance_claim_applied: e.target.value,
                }))
              }
              className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
            />
          </div>

          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Name Of Spot Surveyor /
              <span className="text-[10px]">സ്പോട്ട് സർവേയറുടെ പേര്</span>
            </label>
            <Input
              value={insuranceForm?.name_of_spot_surveyor}
              onChange={(e) =>
                stateUpdateHandler((prev) => ({
                  ...prev,
                  name_of_spot_surveyor: e.target.value,
                }))
              }
              className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
            />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Spot Surveyor Phone Number /
              <span className="text-[10px]">സ്പോട്ട് സർവേയർ ഫോൺ നമ്പർ</span>
            </label>
            <Input
              value={insuranceForm?.spot_surveyor_phone_number}
              onChange={(e) =>
                stateUpdateHandler((prev) => ({
                  ...prev,
                  spot_surveyor_phone_number: e.target.value,
                }))
              }
              className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
            />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Final Bill Submitted Insurance Co /
              <span className="text-[10px]">
                ഇൻഷുറൻസ് കമ്പനി സമർപ്പിച്ച അന്തിമ ബിൽ
              </span>
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
                checked={
                  insuranceForm?.final_bill_submitted_insurance_co === true
                }
                onChange={() =>
                  stateUpdateHandler((prev) => ({
                    ...prev,
                    final_bill_submitted_insurance_co: true,
                  }))
                }
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
                checked={
                  insuranceForm?.final_bill_submitted_insurance_co === false
                }
                onChange={() =>
                  stateUpdateHandler((prev) => ({
                    ...prev,
                    final_bill_submitted_insurance_co: false,
                  }))
                }
                name="is_insurance_submit_final_bill"
                className="w-[14px] h-[14px]"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Final Bill Amount by KSRTC (Rs.) /
              <span className="text-[10px]">
                കെ.എസ്.ആർ.ടി.സി.യുടെ അന്തിമ ബിൽ തുക (രൂപ)
              </span>
            </label>
            <Input
              type="number"
              value={insuranceForm?.final_bill_amount_to_ksrtc}
              onChange={(e) =>
                stateUpdateHandler((prev) => ({
                  ...prev,
                  final_bill_amount_to_ksrtc: Number(e.target.value),
                }))
              }
              className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
            />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Approved Amount By Insurance Co. /
              <span className="text-[10px]">
                ഇൻഷുറൻസ് കമ്പനി അംഗീകരിച്ച തുക.
              </span>
            </label>
            <Input
              type="number"
              value={insuranceForm?.approved_amount_by_insurance_co}
              onChange={(e) =>
                stateUpdateHandler((prev) => ({
                  ...prev,
                  approved_amount_by_insurance_co: Number(e.target.value),
                }))
              }
              className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
            />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Admitted Amount By Insurance Co. /
              <span className="text-[10px]">
                ഇൻഷുറൻസ് കമ്പനി അനുവദിച്ച തുക.
              </span>
            </label>
            <Input
              value={insuranceForm?.admitted_amount_by_insurance_co}
              onChange={(e) =>
                stateUpdateHandler((prev) => ({
                  ...prev,
                  admitted_amount_by_insurance_co: Number(e.target.value),
                }))
              }
              className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
            />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Payment Settled (Y/N) /
              <span className="text-[10px]">പേയ്‌മെന്റ് സെറ്റിൽഡ് ആണോ</span>
            </label>
            <div className="flex items-center gap-8">
              <label
                htmlFor="#is_payment_settled"
                className="text-[12px] text-[#374151] mb-[6px]"
              >
                Yes
              </label>
              <Input
                type="radio"
                checked={insuranceForm?.payment_settled === true}
                onChange={() =>
                  stateUpdateHandler((prev) => ({
                    ...prev,
                    payment_settled: true,
                  }))
                }
                name="is_payment_settled"
                className="w-[14px] h-[14px]"
              />
              <label
                htmlFor="#is_payment_settled"
                className="text-[12px] text-[#374151] mb-[6px]"
              >
                No
              </label>
              <Input
                type="radio"
                checked={insuranceForm?.payment_settled === false}
                onChange={() =>
                  stateUpdateHandler((prev) => ({
                    ...prev,
                    payment_settled: false,
                  }))
                }
                name="is_payment_settled"
                className="w-[14px] h-[14px]"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Date of Payment Settled /
              <span className="text-[10px]">
                പേയ്‌മെന്റ് തീർപ്പാക്കിയ തീയതി
              </span>
            </label>
            <Input
              type="date"
              value={insuranceForm?.date_of_payment_settled || ""}
              onChange={(e) =>
                stateUpdateHandler((prev) => ({
                  ...prev,
                  date_of_payment_settled: e.target.value,
                }))
              }
              className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
            />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              REMARKS /<span className="text-[10px]">അഭിപ്രായങ്ങൾ</span>
            </label>
            <textarea
              value={insuranceForm?.remarks}
              onChange={(e) =>
                stateUpdateHandler((prev) => ({
                  ...prev,
                  remarks: e.target.value,
                }))
              }
              className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FormInsurenceReport;
