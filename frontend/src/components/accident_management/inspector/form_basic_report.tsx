import { Input } from "@/components/ui/input";
import { InspectorReportData } from "@/models/AccidentData";
import React, { useState } from "react";

interface Props {
  stateUpdateHandler: React.Dispatch<React.SetStateAction<InspectorReportData>>;
  accidentData: InspectorReportData | null;
  fetchedDetails: {
    accident_id: string;
    date: string;
    timeZone: string;
    driverName: string;
    driverPhoneNumber: string;
    conductorName: string;
    conductorPhoneNumber: string;
  } | null;
}

const FormBasicReport = ({
  stateUpdateHandler,
  accidentData,
  fetchedDetails,
}: Props) => {
  const [accidentDataController, setAccidentDataController] =
    useState(accidentData);

  return (
    <div className="relative grid grid-cols-4 gap-x-3 gap-y-5 overflow-auto h-full mx-3 rounded-m bg-white px-3 py-3 rounded-sm">
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Date' / തീയതി
        </label>
        <Input
          value={fetchedDetails?.date}
          readOnly
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          {"Inquiry inspector name (KSRTC) / അന്വേഷണ ഇൻസ്പെക്ടറുടെ പേര്"}
        </label>
        <Input
          value={accidentData?.inquiry_inspector_name_ksrtc}
          onChange={(e) =>
            stateUpdateHandler((prev) => ({
              ...prev,
              inquiry_inspector_name_ksrtc: e.target.value,
            }))
          }
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Jurisdiction of inspector / ഇൻസ്പെക്ടറുടെ അധികാരപരിധി
        </label>
        <Input
          value={accidentData?.jurisdiction_of_inspector}
          onChange={(e) =>
            stateUpdateHandler((prev) => ({
              ...prev,
              jurisdiction_of_inspector: e.target.value,
            }))
          }
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Time of Accidents & Time zone' / അപകട സമയവും സമയ മേഖലയും
        </label>
        <Input
          readOnly
          value={fetchedDetails?.timeZone}
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Unit / യൂണിറ്റ്
        </label>
        <Input className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Bus no / ബസ് നം
        </label>
        <Input className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Waybill / വേബിൽ
        </label>
        <Input className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          {"Schedule Detail (Descript)' / ഷെഡ്യൂൾ വിശദാംശങ്ങൾ (വിവരണം)"}
        </label>
        <Input className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Bus Class' / ബസ് ക്ലാസ്
        </label>
        <Input className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Driver/DC Name' / ഡ്രൈവർ/ഡിസി പേര്
        </label>
        <Input
          readOnly
          value={fetchedDetails?.driverName}
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Driver Phone No' / ഡ്രൈവറുടെ ഫോൺ നമ്പർ
        </label>
        <Input
          readOnly
          value={fetchedDetails?.driverPhoneNumber}
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Conductor Name' / കണ്ടക്ടറുടെ പേര്
        </label>
        <Input
          readOnly
          value={fetchedDetails?.conductorName}
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          CDR Phone No' / CDR ഫോൺ നമ്പർ
        </label>
        <Input
          readOnly
          value={fetchedDetails?.conductorPhoneNumber}
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Total no.of days bus docked due to accident / അപകടത്തിൽ ബസ് കുടുങ്ങിയ
          ആകെ ദിവസങ്ങൾ
        </label>
        <Input
          value={accidentData?.total_no_of_days_bus_docked_due_to_accident}
          onChange={(e) =>
            stateUpdateHandler((prev) => ({
              ...prev,
              total_no_of_days_bus_docked_due_to_accident: Number(
                e.target.value
              ),
            }))
          }
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Revenue loss due to dock of bus / ബസ് നിർത്തലാക്കിയതുമൂലം വരുമാനനഷ്ടം.
        </label>
        <Input
          value={accidentData?.revenue_loss_due_to_dock_of_bus}
          onChange={(e) =>
            stateUpdateHandler((prev) => ({
              ...prev,
              revenue_loss_due_to_dock_of_bus: Number(e.target.value),
            }))
          }
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Primary cause of accident in insp report / ഇൻസ്പെക്ടർ റിപ്പോർട്ടിൽ
          അപകടത്തിന്റെ പ്രാഥമിക കാരണം
        </label>
        <Input
          value={accidentData?.primary_cause_of_accident_in_insp_report}
          onChange={(e) =>
            stateUpdateHandler((prev) => ({
              ...prev,
              primary_cause_of_accident_in_insp_report: e.target.value,
            }))
          }
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Responsibility of the accident in insp report / ഇൻസ്പെക്ടർ
          റിപ്പോർട്ടിൽ അപകടത്തിന്റെ ഉത്തരവാദിത്തം
        </label>
        <Input
          value={accidentData?.responsibility_of_accident_in_insp_report}
          onChange={(e) =>
            stateUpdateHandler((prev) => ({
              ...prev,
              responsibility_of_accident_in_insp_report: e.target.value,
            }))
          }
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Inspector report additional details / ഇൻസ്പെക്ടർ കൂടുതൽ വിശദാംശങ്ങൾ
          റിപ്പോർട്ട് ചെയ്യുന്നു
        </label>
        <Input
          value={accidentData?.inspector_report_additional_details}
          onChange={(e) =>
            stateUpdateHandler((prev) => ({
              ...prev,
              inspector_report_additional_details: e.target.value,
            }))
          }
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Summary of inspector report / ഇൻസ്പെക്ടർ റിപ്പോർട്ടിൻ്റെ സംഗ്രഹം
        </label>
        <Input className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Upload written document / എഴുതിയ പ്രമാണം അപ്‌ലോഡ് ചെയ്യുക
        </label>
        <Input
          type="file"
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
    </div>
  );
};

export default FormBasicReport;
