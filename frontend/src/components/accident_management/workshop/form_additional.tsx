import { Input } from "@/components/ui/input";

const AdditionalInfoForm = () => {
  return (
    <div className="relative grid grid-cols-1 gap-3 overflow-auto h-full mx-3 rounded-m">
      <div className="overflow-y-auto p-3 bg-white border rounded-sm flex flex-col gap-3">
        <div className="border-b-2 border-sidebar py-2">
          <h6 className="text-sm font-semibold">Recovery</h6>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            COD Recovered / COD വീണ്ടെടുത്തോ
          </label>
          <div className="flex items-center gap-8">
            <label htmlFor="#is_cod_recovered" className="text-[12px]">
              Yes
            </label>
            <Input
              type="radio"
              name="is_cod_recovered"
              className="w-[14px] h-[14px]"
            />
            <label htmlFor="#isFir" className="text-[12px]">
              No
            </label>
            <Input
              type="radio"
              name="is_cod_recovered"
              className="w-[14px] h-[14px]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">Towed / വലിച്ചിഴച്ചതാണോ</label>
          <div className="flex items-center gap-8">
            <label htmlFor="#is_towed" className="text-[12px]">
              Yes
            </label>
            <Input type="radio" name="is_towed" className="w-[14px] h-[14px]" />
            <label htmlFor="#isFir" className="text-[12px]">
              No
            </label>
            <Input type="radio" name="is_towed" className="w-[14px] h-[14px]" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px] text-[#374151] mb-[6px]">
            Remarks / അഭിപ്രായങ്ങൾ
          </label>
          <textarea className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
