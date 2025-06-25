import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const FormInspectorReport = () => {
  const [isFir, setIsFir] = useState<boolean | null>(null);
  return (
    <div className="relative grid grid-cols-4 gap-x-3 gap-y-8 overflow-auto h-full mx-3 rounded-m bg-white px-3 py-3 rounded-sm">
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          FIR Registered / എഫ്ഐആർ രജിസ്റ്റർ ചെയ്തിട്ടുണ്ടോ
        </label>
        <div className="flex items-center gap-8">
          <label
            htmlFor="#isFir"
            className="text-[12px] text-[#374151] mb-[6px]"
          >
            Yes
          </label>
          <Input
            type="radio"
            onChange={() => setIsFir(true)}
            name="isFir"
            className="w-[14px] h-[14px]"
          />
          <label
            htmlFor="#isFir"
            className="text-[12px] text-[#374151] mb-[6px]"
          >
            No
          </label>
          <Input
            type="radio"
            onChange={() => setIsFir(false)}
            name="isFir"
            className="w-[14px] h-[14px]"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          FIR Number / എഫ്ഐആർ നമ്പർ
        </label>
        <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          Enquiry Police person Name / അന്വേഷണ പോലീസ് വ്യക്തിയുടെ പേര്
        </label>
        <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          Enquiry Police Phone Number / അന്വേഷണ പോലീസ് ഫോൺ നമ്പർ
        </label>
        <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          Under Section Details / വിഭാഗത്തിൻ്റെ വിശദാംശങ്ങൾക്ക് കീഴിൽ
        </label>
        <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          Accused in the Accident In FIR / എഫ്‌ഐ‌ആറിൽ അപകടത്തിൽ ആരാണ് പ്രതി
        </label>
        <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          FIR Case Against KSRTC / കെ.എസ്.ആർ.ടി.സിക്കെതിരെ എഫ്.ഐ.ആർ.
        </label>
        <div className="flex items-center gap-8">
          <label
            htmlFor="#isfiragainstksrtc"
            className="text-[12px] text-[#374151] mb-[6px]"
          >
            Yes
          </label>
          <Input
            type="radio"
            name="isfiragainstksrtc"
            className="w-[14px] h-[14px]"
          />
          <label
            htmlFor="#isfiragainstksrtc"
            className="text-[12px] text-[#374151] mb-[6px]"
          >
            No
          </label>
          <Input
            type="radio"
            name="isfiragainstksrtc"
            className="w-[14px] h-[14px]"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          Date Of Bus Released From Police Station / പോലീസ് സ്റ്റേഷനിൽ നിന്ന്
          ബസ് വിട്ട തീയതി
        </label>
        <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">Witness</label>
        <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          If Not KSRTC Is Responsible, Action Taken / കെ.എസ്.ആർ.ടി.സി.യല്ല
          ഉത്തരവാദിയെങ്കിൽ, എന്ത് നടപടിയാണ് സ്വീകരിച്ചത്
        </label>
        <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          Whether FIR IS MODIFIED OR NOT. Responisbilty Changed From KSRTC As
          Per Evidence Submitted / എഫ്‌ഐആർ പരിഷ്കരിച്ചിട്ടുണ്ടോ ഇല്ലയോ എന്നത്.
          കെ‌എസ്‌ആർ‌ടി‌സിയിൽ നിന്ന് ഉത്തരവാദിത്തത്തിൽ മാറ്റം വരുത്തിയിട്ടുണ്ട്
          സമർപ്പിച്ച തെളിവുകൾ പ്രകാരം
        </label>
        <Input className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          Digital Evidence / ഡിജിറ്റൽ തെളിവുകൾ
        </label>
        <Input
          type="file"
          className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
    </div>
  );
};

export default FormInspectorReport;
