"use client";
import { Input } from "@/components/ui/input";
import { AccidentWorkshopReport } from "@/models/AccidentData";

interface Props {
  workShopFormData?: AccidentWorkshopReport | null;
  formUpdateController: React.Dispatch<
    React.SetStateAction<AccidentWorkshopReport>
  >;
}

// insurance and cost
const InsuranceAndCostForm = ({
  formUpdateController,
  workShopFormData,
}: Props) => {
  return (
    <div className="relative grid grid-cols-2 gap-3 overflow-auto h-full mx-3 rounded-m">
      <div className="overflow-y-auto p-3 bg-white border rounded-sm flex flex-col gap-3">
        <div className="border-b-2 border-sidebar py-2">
          <h6 className="text-sm font-semibold">Insurance</h6>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Insurance Surveyor Name /
            <span className="text-[10px]">ഇൻഷുറൻസ് സർവേയർ പേര്</span>
          </label>
          <Input
            value={workShopFormData?.insurance_surveyor_name}
            onChange={(e) =>
              formUpdateController((prev) => ({
                ...prev,
                insurance_surveyor_name: e.target.value,
              }))
            }
            className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Insurance Surveyor Phone No /
            <span className="text-[10px]">ഇൻഷുറൻസ് സർവേയർ ഫോൺ നമ്പർ</span>
          </label>
          <Input
            value={workShopFormData?.insurance_surveyor_phone_number}
            onChange={(e) =>
              formUpdateController((prev) => ({
                ...prev,
                insurance_surveyor_phone_number: e.target.value,
              }))
            }
            className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
          />
        </div>
      </div>
      <div className="overflow-y-auto p-3 bg-white border rounded-sm flex flex-col gap-3">
        <div className="border-b-2 border-sidebar py-2">
          <h6 className="text-sm font-semibold">
            Cost /<span className="text-[10px]">ചെലവ്</span>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default InsuranceAndCostForm;
