"use client";
import { Input } from "@/components/ui/input";

interface SelectedAccedentModel {
  accedent_ref_no: string;
  accedent_date: string;
  bus_no: string;
}

interface Props {
  selectedAccedentData?: SelectedAccedentModel | null;
}

// basic & workshop ui
const BasicAndWorkShopForm = ({ selectedAccedentData }: Props) => {
  return (
    <div className="relative grid grid-cols-2 gap-3 overflow-auto h-full mx-3 rounded-m">
      <div className="p-3 overflow-y-auto bg-white border rounded-sm flex flex-col gap-3 w-full">
        <div className="border-b-2 border-sidebar py-2">
          <h6 className="text-sm font-semibold">Basic</h6>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Repair Work Done At Workshop/Depot / വർക്ക്‌ഷോപ്പ്/ഡിപ്പോയിൽ
            അറ്റകുറ്റപ്പണികൾ പൂർത്തിയായി
          </label>
          <div className="flex items-center gap-8">
            <label htmlFor="#is_repair_done" className="text-[12px]">
              Yes
            </label>
            <Input
              type="radio"
              name="is_repair_done"
              className="w-[14px] h-[14px]"
            />
            <label htmlFor="#isFir" className="text-[12px]">
              No
            </label>
            <Input
              type="radio"
              name="is_repair_done"
              className="w-[14px] h-[14px]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Damage To The Bus / ബസിന് കേടുപാടുകൾ
          </label>
          <Input
            type="text"
            className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
          />
        </div>
      </div>
      <div className="p-3 overflow-y-auto bg-white border rounded-sm flex flex-col gap-3 w-full">
        <div className="border-b-2 border-sidebar py-2">
          <h6 className="text-sm font-semibold">Workshop / ശിൽപശാല</h6>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Work Shop/Depot Name / വർക്ക് ഷോപ്പ്/ഡിപ്പോ പേര്
          </label>
          <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Date Of Entry(DD-MM-YYYY) / പ്രവേശന തീയതി
          </label>
          <Input
            className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
            type="date"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Date Of Work Start / ജോലി ആരംഭിക്കുന്ന തീയതി
          </label>
          <Input
            className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
            type="date"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Date Of Released (DD-MM-YYYY) / റിലീസ് ചെയ്ത തീയതി
          </label>
          <Input
            className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
            type="date"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            No Of Days At W/S /Depot / W/S / ഡിപ്പോയിലെ ദിവസങ്ങളുടെ എണ്ണം
          </label>
          <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
        </div>
      </div>
    </div>
  );
};

export default BasicAndWorkShopForm;
