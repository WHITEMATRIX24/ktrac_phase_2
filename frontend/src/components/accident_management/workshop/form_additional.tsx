"use client";
import { Input } from "@/components/ui/input";
import { AccidentWorkshopReport } from "@/models/AccidentData";

interface Props {
  workShopFormData?: AccidentWorkshopReport | null;
  formUpdateController: React.Dispatch<
    React.SetStateAction<AccidentWorkshopReport>
  >;
}

const AdditionalInfoForm = ({
  formUpdateController,
  workShopFormData,
}: Props) => {
  return (
    <div className="relative grid grid-cols-1 gap-3 overflow-auto h-full mx-3 rounded-m">
      <div className="overflow-y-auto p-3 bg-white border rounded-sm flex flex-col gap-3">
        <div className="border-b-2 border-sidebar py-2">
          <h6 className="text-sm font-semibold">Recovery</h6>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            COD Recovered /<span className="text-[10px]">COD വീണ്ടെടുത്തോ</span>
            <span className="text-[12px] text-red-600"> *</span>
          </label>
          <div className="flex items-center gap-8">
            <label htmlFor="#is_cod_recovered" className="text-[12px]">
              Yes
            </label>
            <Input
              type="radio"
              checked={workShopFormData?.cod_recovered === true}
              onChange={() =>
                formUpdateController((prev) => ({
                  ...prev,
                  cod_recovered: true,
                }))
              }
              name="is_cod_recovered"
              className="w-[14px] h-[14px]"
            />
            <label htmlFor="#isFir" className="text-[12px]">
              No
            </label>
            <Input
              type="radio"
              checked={workShopFormData?.cod_recovered === false}
              onChange={() =>
                formUpdateController((prev) => ({
                  ...prev,
                  repair_work_done_at_workshop: false,
                }))
              }
              name="is_cod_recovered"
              className="w-[14px] h-[14px]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px] text-[#374151] mb-[6px]">
            Remarks /<span className="text-[10px]">അഭിപ്രായങ്ങൾ </span>
                        <span className="text-[12px] text-red-600">*</span>
          </label>
          <textarea
            value={workShopFormData?.remarks}
            onChange={(e) =>
              formUpdateController((prev) => ({
                ...prev,
                remarks: e.target.value,
              }))
            }
            className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Bill / <span className="text-[10px]">ബിൽ</span>
            </label>
            <Input type="file" id="accidentWorkshopBillFileInput" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Total Bill / <span className="text-[10px]">ബിൽ</span>
            </label>
            <Input type="file" id="accidentWorkshopTotalBillFileInput"  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
