"use client";
import { Input } from "@/components/ui/input";
import { AccidentWorkshopReport } from "@/models/AccidentData";

interface SelectedAccedentModel {
  accedent_ref_no: string;
  accedent_date: string;
  bus_no: string;
}

interface Props {
  workShopFormData?: AccidentWorkshopReport | null;
  formUpdateController: React.Dispatch<
    React.SetStateAction<AccidentWorkshopReport>
  >;
}

// basic & workshop ui
const BasicAndWorkShopForm = ({
  workShopFormData,
  formUpdateController,
}: Props) => {
  return (
    <div className="relative grid grid-cols-2 gap-3 overflow-auto h-full mx-3 rounded-m">
      <div className="p-3 overflow-y-auto bg-white border rounded-sm flex flex-col gap-3 w-full">
        <div className="border-b-2 border-sidebar py-2">
          <h6 className="text-sm font-semibold">Basic</h6>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Repair Work Done At Workshop/Depot /
            <span className="text-[10px]">
              വർക്ക്‌ഷോപ്പ്/ഡിപ്പോയിൽ അറ്റകുറ്റപ്പണികൾ പൂർത്തിയായി
            </span>
          </label>
          <div className="flex items-center gap-8">
            <label htmlFor="#is_repair_done" className="text-[12px]">
              Yes
            </label>
            <Input
              type="radio"
              name="is_repair_done"
              checked={workShopFormData?.repair_work_done_at_workshop === true}
              onChange={() =>
                formUpdateController((prev) => ({
                  ...prev,
                  repair_work_done_at_workshop: true,
                }))
              }
              className="w-[14px] h-[14px]"
            />
            <label htmlFor="#isFir" className="text-[12px]">
              No
            </label>
            <Input
              type="radio"
              checked={workShopFormData?.repair_work_done_at_workshop === false}
              onChange={() =>
                formUpdateController((prev) => ({
                  ...prev,
                  repair_work_done_at_workshop: false,
                }))
              }
              name="is_repair_done"
              className="w-[14px] h-[14px]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Damage To The Bus /
            <span className="text-[10px]">ബസിന് കേടുപാടുകൾ</span>
          </label>
          <Input
            type="text"
            value={workShopFormData?.damage_to_bus}
            onChange={(e) =>
              formUpdateController((prev) => ({
                ...prev,
                damage_to_bus: e.target.value,
              }))
            }
            className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
          />
        </div>
      </div>
      <div className="p-3 overflow-y-auto bg-white border rounded-sm flex flex-col gap-3 w-full">
        <div className="border-b-2 border-sidebar py-2">
          <h6 className="text-sm font-semibold">
            Workshop /<span className="text-[10px]">ശിൽപശാല</span>
          </h6>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Work Shop/Depot Name /
            <span className="text-[10px]">വർക്ക് ഷോപ്പ്/ഡിപ്പോ പേര്</span>
          </label>
          <Input
            value={workShopFormData?.workshop_depot_name}
            onChange={(e) =>
              formUpdateController((prev) => ({
                ...prev,
                workshop_depot_name: e.target.value,
              }))
            }
            className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Date Of Entry(DD-MM-YYYY) /
            <span className="text-[10px]">പ്രവേശന തീയതി</span>
          </label>
          <Input
            className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
            type="date"
            value={workShopFormData?.date_of_entry}
            onChange={(e) =>
              formUpdateController((prev) => ({
                ...prev,
                date_of_entry: e.target.value,
              }))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Date Of Work Start /
            <span className="text-[10px]">ജോലി ആരംഭിക്കുന്ന തീയതി</span>
          </label>
          <Input
            className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
            type="date"
            value={workShopFormData?.date_of_work_start}
            onChange={(e) =>
              formUpdateController((prev) => ({
                ...prev,
                date_of_work_start: e.target.value,
              }))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Date Of Released (DD-MM-YYYY) /
            <span className="text-[10px]">റിലീസ് ചെയ്ത തീയതി</span>
          </label>
          <Input
            className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
            type="date"
            value={workShopFormData?.date_of_released}
            onChange={(e) =>
              formUpdateController((prev) => ({
                ...prev,
                date_of_released: e.target.value,
              }))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            No Of Days At W/S /Depot / W/S /
            <span className="text-[10px]">ഡിപ്പോയിലെ ദിവസങ്ങളുടെ എണ്ണം</span>
          </label>
          <Input
            type="number"
            value={JSON.stringify(workShopFormData?.no_of_days_at_workshop)}
            onChange={(e) =>
              formUpdateController((prev) => ({
                ...prev,
                no_of_days_at_workshop: Number(e.target.value),
              }))
            }
            className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicAndWorkShopForm;
