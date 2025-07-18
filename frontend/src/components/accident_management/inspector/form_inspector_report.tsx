import { Input } from "@/components/ui/input";
import { InspectorReportData } from "@/models/AccidentData";
import { fileToBase64, multipleFilesToBase64 } from "@/utils/convertToBase64";
import React, { useState } from "react";

interface Props {
  stateUpdateHandler: React.Dispatch<React.SetStateAction<InspectorReportData>>;
  accidentData: InspectorReportData | null;
}

const FormInspectorReport = ({ accidentData, stateUpdateHandler }: Props) => {
  const [isFir, setIsFir] = useState<boolean | null>(null);

  // handle evidence upload
  const handleEvidenceUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files === null) return;
    const files = e.target.files;

    if (files.length > 0) {
      try {
        const result = await multipleFilesToBase64(files);
        stateUpdateHandler((prev) => ({
          ...prev,
          digital_evidence_files: result,
        }));
      } catch (error) {
        console.error(`error in uploading written document`);
      }
    }
  };

  return (
    <div className="relative grid grid-cols-4 gap-x-3 gap-y-8 overflow-auto h-full mx-3 rounded-m bg-white px-3 py-3 rounded-sm">
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          FIR Registered /
          <span className="text-[10px]">എഫ്ഐആർ രജിസ്റ്റർ ചെയ്തിട്ടുണ്ടോ</span>
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
            checked={accidentData?.fir_registered}
            onChange={() =>
              stateUpdateHandler((prev) => ({
                ...prev,
                fir_registered: true,
              }))
            }
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
            checked={accidentData?.fir_registered === false}
            onChange={() =>
              stateUpdateHandler((prev) => ({
                ...prev,
                fir_registered: false,
              }))
            }
            name="isFir"
            className="w-[14px] h-[14px]"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          FIR Number /<span className="text-[10px]">എഫ്ഐആർ നമ്പർ</span>
        </label>
        <Input
          value={accidentData?.fir_number}
          onChange={(e) =>
            stateUpdateHandler((prev) => ({
              ...prev,
              fir_number: e.target.value,
            }))
          }
          className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          Enquiry Police person Name /
          <span className="text-[10px]">അന്വേഷണ പോലീസ് വ്യക്തിയുടെ പേര്</span>
        </label>
        <Input
          value={accidentData?.enquiry_police_person_name}
          onChange={(e) =>
            stateUpdateHandler((prev) => ({
              ...prev,
              enquiry_police_person_name: e.target.value,
            }))
          }
          className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          Enquiry Police Phone Number /
          <span className="text-[10px]">അന്വേഷണ പോലീസ് ഫോൺ നമ്പർ</span>
        </label>
        <Input
          value={accidentData?.enquiry_police_phone_number}
          onChange={(e) =>
            stateUpdateHandler((prev) => ({
              ...prev,
              enquiry_police_phone_number: e.target.value,
            }))
          }
          className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          Under Section Details /
          <span className="text-[10px]">
            വിഭാഗത്തിൻ്റെ വിശദാംശങ്ങൾക്ക് കീഴിൽ
          </span>
        </label>
        <Input
          value={accidentData?.under_section_details}
          onChange={(e) =>
            stateUpdateHandler((prev) => ({
              ...prev,
              under_section_details: e.target.value,
            }))
          }
          className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          Accused in the Accident In FIR /
          <span className="text-[10px]">എഫ്‌ഐ‌ആറിൽ അപകടത്തിൽ ആരാണ് പ്രതി</span>
        </label>
        <Input
          value={accidentData?.accused_in_accident_in_fir}
          onChange={(e) =>
            stateUpdateHandler((prev) => ({
              ...prev,
              accused_in_accident_in_fir: e.target.value,
            }))
          }
          className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          FIR Case Against KSRTC /
          <span className="text-[10px]">കെ.എസ്.ആർ.ടി.സിക്കെതിരെ എഫ്.ഐ.ആർ.</span>
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
            checked={accidentData?.fir_case_against_ksrtc === true}
            onChange={() =>
              stateUpdateHandler((prev) => ({
                ...prev,
                fir_case_against_ksrtc: true,
              }))
            }
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
            checked={accidentData?.fir_case_against_ksrtc === false}
            onChange={() =>
              stateUpdateHandler((prev) => ({
                ...prev,
                fir_case_against_ksrtc: false,
              }))
            }
            name="isfiragainstksrtc"
            className="w-[14px] h-[14px]"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          Date Of Bus Released From Police Station /
          <span className="text-[10px]">
            പോലീസ് സ്റ്റേഷനിൽ നിന്ന് ബസ് വിട്ട തീയതി
          </span>
        </label>
        <Input
          type="date"
          value={accidentData?.date_of_bus_released_from_police_station}
          onChange={(e) =>
            stateUpdateHandler((prev) => ({
              ...prev,
              date_of_bus_released_from_police_station: e.target.value,
            }))
          }
          className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          Witness /<span className="text-[10px]"> സാക്ഷി</span>
        </label>
        <Input
          value={accidentData?.witness}
          onChange={(e) =>
            stateUpdateHandler((prev) => ({
              ...prev,
              witness: e.target.value,
            }))
          }
          className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          If Not KSRTC Is Responsible, Action Taken /
          <span className="text-[10px]">
            കെ.എസ്.ആർ.ടി.സി.യല്ല ഉത്തരവാദിയെങ്കിൽ, എന്ത് നടപടിയാണ് സ്വീകരിച്ചത്
          </span>
        </label>
        <Input
          value={accidentData?.if_not_ksrtc_responsible_action_taken}
          onChange={(e) =>
            stateUpdateHandler((prev) => ({
              ...prev,
              if_not_ksrtc_responsible_action_taken: e.target.value,
            }))
          }
          className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          Whether FIR IS MODIFIED OR NOT. Responisbilty Changed From KSRTC As
          Per Evidence Submitted /
          <span className="text-[10px]">
            എഫ്‌ഐആർ പരിഷ്കരിച്ചിട്ടുണ്ടോ ഇല്ലയോ എന്നത്. കെ‌എസ്‌ആർ‌ടി‌സിയിൽ
            നിന്ന് ഉത്തരവാദിത്തത്തിൽ മാറ്റം വരുത്തിയിട്ടുണ്ട് സമർപ്പിച്ച
            തെളിവുകൾ പ്രകാരം
          </span>
        </label>
        <div className="flex items-center gap-8">
          <label
            htmlFor="#isfirmodified"
            className="text-[12px] text-[#374151] mb-[6px]"
          >
            Yes
          </label>
          <Input
            type="radio"
            checked={accidentData?.whether_fir_is_modified_or_not}
            onChange={() =>
              stateUpdateHandler((prev) => ({
                ...prev,
                whether_fir_is_modified_or_not: true,
              }))
            }
            name="isfirmodified"
            className="w-[14px] h-[14px]"
          />
          <label
            htmlFor="#isfirmodified"
            className="text-[12px] text-[#374151] mb-[6px]"
          >
            No
          </label>
          <Input
            type="radio"
            checked={accidentData?.whether_fir_is_modified_or_not === false}
            onChange={() =>
              stateUpdateHandler((prev) => ({
                ...prev,
                whether_fir_is_modified_or_not: false,
              }))
            }
            name="isfirmodified"
            className="w-[14px] h-[14px]"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px] text-[#374151] mb-[6px]">
          Digital Evidence /
          <span className="text-[10px]">ഡിജിറ്റൽ തെളിവുകൾ</span>
        </label>
        <Input
          type="file"
          multiple={true}
          onChange={handleEvidenceUpload}
          className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
    </div>
  );
};

export default FormInspectorReport;
