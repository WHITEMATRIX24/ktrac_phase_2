import { Input } from "@/components/ui/input";
import { InspectorReportData } from "@/models/AccidentData";
import { fileToBase64 } from "@/utils/convertToBase64";
import { dateToLocaleFormater } from "@/utils/dateFormater";
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
    bonnetNumber: string;
  } | null;
}

const FormBasicReport = ({
  stateUpdateHandler,
  accidentData,
  fetchedDetails,
}: Props) => {
  // handle Upload written document change
  const handleUploadWritenDocument = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files === null) return;
    const file = e.target.files[0];

    if (file) {
      try {
        const result = await fileToBase64(file);
        stateUpdateHandler((prev) => ({
          ...prev,
          upload_document: result.base64,
          document_filename: result.name,
          document_content_type: result.type,
        }));
      } catch (error) {
        console.error(`error in uploading written document`);
      }
    }
  };

  return (
    <div className="relative grid grid-cols-4 gap-x-3 gap-y-5 overflow-auto h-full mx-3 rounded-m bg-white px-3 py-3 rounded-sm">
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Date / <span className="text-[10px]"> തീയതി</span>
        </label>
        <Input
          value={dateToLocaleFormater(fetchedDetails?.date)}
          readOnly
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Iquiry inspector name (KSRTC) /
          <span className="text-[10px]">അന്വേഷണ ഇൻസ്പെക്ടറുടെ പേര്</span>
        </label>
        <Input
          value={accidentData?.inquiry_inspector_name}
          onChange={(e) =>
            stateUpdateHandler((prev) => ({
              ...prev,
              inquiry_inspector_name: e.target.value,
            }))
          }
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Jurisdiction of inspector /{" "}
          <span className="text-[10px]">ഇൻസ്പെക്ടറുടെ അധികാരപരിധി</span>
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
          Time of Accidents & Time zone' /
          <span className="text-[10px]">അപകട സമയവും സമയ മേഖലയും</span>
        </label>
        <Input
          readOnly
          value={fetchedDetails?.timeZone}
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Unit /<span className="text-[10px]">യൂണിറ്റ്</span>
        </label>
        <Input
          value={accidentData?.unit}
          onChange={(e) =>
            stateUpdateHandler((prev) => ({
              ...prev,
              unit: e.target.value,
            }))
          }
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Bus no /<span className="text-[10px]">ബസ് നം</span>
        </label>
        <Input
          readOnly
          value={fetchedDetails?.bonnetNumber}
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Waybill /<span className="text-[10px]">വേബിൽ</span>
        </label>
        <Input
          value={accidentData?.waybill}
          onChange={(e) =>
            stateUpdateHandler((prev) => ({
              ...prev,
              waybill: e.target.value,
            }))
          }
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Schedule Detail (Descript) /
          <span className="text-[10px]">ഷെഡ്യൂൾ വിശദാംശങ്ങൾ (വിവരണം)</span>
        </label>
        <Input
          value={accidentData?.schedule_details}
          onChange={(e) =>
            stateUpdateHandler((prev) => ({
              ...prev,
              schedule_details: e.target.value,
            }))
          }
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Bus Class' /<span className="text-[10px]">ബസ് ക്ലാസ്</span>
        </label>
        <Input className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Driver/DC Name' /<span className="text-[10px]">ഡ്രൈവർ/ഡിസി പേര്</span>
        </label>
        <Input
          readOnly
          value={fetchedDetails?.driverName}
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Driver Phone No' /
          <span className="text-[10px]">ഡ്രൈവറുടെ ഫോൺ നമ്പർ</span>
        </label>
        <Input
          readOnly
          value={fetchedDetails?.driverPhoneNumber}
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Conductor Name' /{" "}
          <span className="text-[10px]">കണ്ടക്ടറുടെ പേര്</span>
        </label>
        <Input
          readOnly
          value={fetchedDetails?.conductorName}
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          CDR Phone No' /<span className="text-[10px]">CDR ഫോൺ നമ്പർ</span>
        </label>
        <Input
          readOnly
          value={fetchedDetails?.conductorPhoneNumber}
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Total no.of days bus docked due to accident /
          <span className="text-[10px]">
            അപകടത്തിൽ ബസ് കുടുങ്ങിയ ആകെ ദിവസങ്ങൾ
          </span>
        </label>
        <Input
          type="number"
          value={JSON.stringify(
            accidentData?.total_no_of_days_bus_docked_due_to_accident
          )}
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
          Revenue loss due to dock of bus /
          <span className="text-[10px]">
            ബസ് നിർത്തലാക്കിയതുമൂലം വരുമാനനഷ്ടം.
          </span>
        </label>
        <Input
          type="number"
          value={JSON.stringify(accidentData?.revenue_loss_due_to_dock_of_bus)}
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
          Primary cause of accident in insp report /
          <span className="text-[10px]">
            ഇൻസ്പെക്ടർ റിപ്പോർട്ടിൽ അപകടത്തിന്റെ പ്രാഥമിക കാരണം
          </span>
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
          Responsibility of the accident in insp report /
          <span className="text-[10px]">
            ഇൻസ്പെക്ടർ റിപ്പോർട്ടിൽ അപകടത്തിന്റെ ഉത്തരവാദിത്തം
          </span>
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
          Inspector report additional details /
          <span className="text-[10px]">
            ഇൻസ്പെക്ടർ കൂടുതൽ വിശദാംശങ്ങൾ റിപ്പോർട്ട് ചെയ്യുന്നു
          </span>
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
          Summary of inspector report /
          <span className="text-[10px]">
            ഇൻസ്പെക്ടർ റിപ്പോർട്ടിൻ്റെ സംഗ്രഹം
          </span>
        </label>
        <Input
          value={accidentData?.summary_of_inspector_report}
          onChange={(e) =>
            stateUpdateHandler((prev) => ({
              ...prev,
              summary_of_inspector_report: e.target.value,
            }))
          }
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
      <div className="flex flex-col justify-between gap-2">
        <label className="text-[12px]  text-[#374151] mb-[6px]">
          Upload written document /
          <span className="text-[10px]">എഴുതിയ പ്രമാണം അപ്‌ലോഡ് ചെയ്യുക</span>
        </label>
        <Input
          onChange={handleUploadWritenDocument}
          type="file"
          className="w-full py-[5px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
        />
      </div>
    </div>
  );
};

export default FormBasicReport;
