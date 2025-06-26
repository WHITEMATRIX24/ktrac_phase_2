"use client";
import { Input } from "@/components/ui/input";

// insurance and cost
const InsuranceAndCostForm = () => {
  return (
    <div className="relative grid grid-cols-2 gap-3 overflow-auto h-full mx-3 rounded-m">
      <div className="overflow-y-auto p-3 bg-white border rounded-sm flex flex-col gap-3">
        <div className="border-b-2 border-sidebar py-2">
          <h6 className="text-sm font-semibold">Insurance</h6>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Insurance Surveyor Name / ഇൻഷുറൻസ് സർവേയർ പേര്
          </label>
          <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Insurance Surveyor Phone No / ഇൻഷുറൻസ് സർവേയർ ഫോൺ നമ്പർ
          </label>
          <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
        </div>
      </div>
      <div className="overflow-y-auto p-3 bg-white border rounded-sm flex flex-col gap-3">
        <div className="border-b-2 border-sidebar py-2">
          <h6 className="text-sm font-semibold">Cost / ചെലവ്</h6>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Spare Part Cost / സ്പെയർ പാർട്സ് ചെലവ്
          </label>
          <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">Labour Cost / തൊഴിൽ ചെലവ്</label>
          <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Total Bill Amount / മൊത്തം ബിൽ തുക
          </label>
          <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Cost Of Damage / നാശനഷ്ടത്തിൻ്റെ വില
          </label>
          <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
        </div>
      </div>
    </div>
  );
};

export default InsuranceAndCostForm;
