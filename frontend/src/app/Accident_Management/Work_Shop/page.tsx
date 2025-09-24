"use client";
import ReferenceNumberSearchModal from "@/components/accident_management/search_referencenumber_modal";
import BasicDetails from "@/components/accident_management/workshop/basic_details";
import AdditionalInfoForm from "@/components/accident_management/workshop/form_additional";
import BasicAndWorkShopForm from "@/components/accident_management/workshop/form_basicWorkshop";
import InsuranceAndCostForm from "@/components/accident_management/workshop/form_insuranceCost";
import HistoryDAG from "@/components/accident_management/workshop/history_DAG";
import { AccidentWorkshopReport } from "@/models/AccidentData";
import React, { useEffect, useState } from "react";

const tabs = [
  "Basic Details",
  "Basic & Workshop",
  "Insurance",
  "Additional info",
  "History",
];

export interface SelectedAccidentWorkshopModel {
  accident_id: string;
  bonet_no: string;
  date_of_accident: string;
  description: string;
  district: string;
  operated_depot: string;
  photos: {
    download_urls: {
      download_url: string;
    }[];
  };
}
interface HistoryEntry {
  version: number;
  operation: string;
  changed_by: string;
  changed_at: string;
  old_data: Record<string, any>;
  new_data: Record<string, any>;
}

const AccedentWorkshop = () => {
  const [selectedAccedentData, setSelectedAccedentData] =
    useState<SelectedAccidentWorkshopModel | null>(null);
  const [workShopForm, setWorkshopForm] = useState<AccidentWorkshopReport>({
    accident_id: "",
    bonet_no: "",
    created_by: "",
    accident_reference_number: "",
    date_of_accident: "",
    bus_no: "",
    repair_work_done_at_workshop: false,
    workshop_depot_name: "",
    date_of_entry: "",
    date_of_work_start: "",
    date_of_released: "",
    no_of_days_at_workshop: 0,
    insurance_surveyor_name: "",
    insurance_surveyor_phone_number: "",
    damage_to_bus: "",
    damage_assessment_report: "",
    spare_part_cost: 0,
    labour_cost: 0,
    total_bill_amount: 0,
    cost_of_damage: 0,
    cod_recovered: false,
    cod_recovery_amount: 0,
    vehicle_towed_status: false,
    towing_charges: 0,
    towing_company_name: "",
    repair_status: "",
    work_completion_percentage: 0,
    quality_check_status: false,
    work_order_number: "",
    invoice_number: "",
    final_inspection_report: "",
    remarks: "",
  });
  const [depot, setDepot] = useState<[]>([]);
  const [historyData, setHistoryData] = useState<HistoryEntry[]>([]);

  const tabList = [
    <BasicDetails basicDetails={selectedAccedentData} />,
    <BasicAndWorkShopForm
      workShopFormData={workShopForm}
      formUpdateController={setWorkshopForm}
      depot={depot}
    />,
    <InsuranceAndCostForm
      formUpdateController={setWorkshopForm}
      workShopFormData={workShopForm}
    />,
    <AdditionalInfoForm
      formUpdateController={setWorkshopForm}
      workShopFormData={workShopForm}
    />,
    <HistoryDAG historyData={historyData} />,
  ];
  const [selectedTab, setSelectedtab] = useState<number>(0);
  const [progressStatus, setProgressStatus] = useState(0);

  const handleSearchSelect = (selectedData: any) => {
    // console.log(selectedData);

    const accidentId = selectedData.accident_id;
    const bonnetNo = selectedData.vehicle_info.bonet_no;
    const accidentDate = selectedData.accident_details.date_of_accident;
    const description = selectedData.accident_details.description;
    const district = selectedData.location_info.district;
    const operatedDepot = selectedData.location_info.operated_depot;
    const photos = selectedData.photos;

    setSelectedAccedentData({
      accident_id: accidentId,
      bonet_no: bonnetNo,
      date_of_accident: accidentDate,
      description,
      district,
      operated_depot: operatedDepot,
      photos,
    });
  };
  // progressbar
  useEffect(() => {
    const progressValuePerTab = 100 / tabs.length;
    setProgressStatus(progressValuePerTab * (selectedTab + 1));
  }, [selectedTab]);

  // FETCH DEPO
  const getAllDepoHandler = async () => {
    try {
      const response = await fetch("/api/getAllDepos");
      const data = await response.json();

      // format
      const flatenedData = data.data.flatMap((d: any) =>
        d.depot.map((d: any) => ({
          name: d["depot-name"],
          abv: d["depot-abv"],
        }))
      );

      setDepot(flatenedData);
    } catch (error) {
      console.log("error on getting depo details");
    }
  };

  // HANDLE CANCEL
  const handelCancel = () => setSelectedAccedentData(null);
  const getHistoryDetailsHandler = async () => {
    try {
      if (selectedAccedentData?.accident_id) {
        const response = await fetch(
          `/api/getWorkshopHistoryData?accident_reference_number=${selectedAccedentData?.accident_id.replaceAll(
            "/",
            "_"
          )}`
        );
        const data = await response.json();

        setHistoryData(Array.isArray(data.history) ? data.history : []);
      }
    } catch (error) {
      console.log("error on getting bus details");
    }
  };

  useEffect(() => {
    getHistoryDetailsHandler();
  }, [selectedAccedentData]);

  useEffect(() => {
    getAllDepoHandler();
  }, []);

  // submit handler
  const handleSubmit = async () => {
    const body = {
      ...workShopForm,
      accident_id: selectedAccedentData?.accident_id,
      bonet_no: selectedAccedentData?.bonet_no,
      bus_no: selectedAccedentData?.bonet_no,
      date_of_accident: selectedAccedentData?.date_of_accident,
      accident_reference_number: selectedAccedentData?.accident_id,
      created_by: "admin",
      status: "processing",
    };

    try {
      //  BILL FILE UPLOAD
      const billInput = document.getElementById(
        "accidentWorkshopBillFileInput"
      ) as HTMLInputElement;
      const billTotalInput = document.getElementById(
        "accidentWorkshopTotalBillFileInput"
      ) as HTMLInputElement;

      let billFile = billInput.files ? billInput.files[0] : null;
      let totalBillFile = billTotalInput.files ? billTotalInput.files[0] : null;

      const accidentWorkshopBillFormData = new FormData();
      if (billFile) {
        accidentWorkshopBillFormData.append("files", billFile, "bill");
      }
      if (totalBillFile) {
        accidentWorkshopBillFormData.append(
          "files",
          totalBillFile,
          "total_bill"
        );
      }

      if (billFile || totalBillFile) {
        const response = await fetch(
          `/api/storage/upload_workshop_bill?reference_numner=${selectedAccedentData?.accident_id}`,
          {
            method: "POST",
            body: accidentWorkshopBillFormData,
          }
        );

        if (!response.ok) {
          return alert("error in uploading files");
        }
        const fileUploadResponseData = await response.json();
        const fileUploadData: {
          name: string;
          key: string;
        }[] = fileUploadResponseData.data;
        // console.log(fileUploadData);
        const billFile = fileUploadData.find((v) => v.name === "bill");
        const totalBillFile = fileUploadData.find(
          (v) => v.name === "total_bill"
        );

        body.individual_bill_document_s3_path = billFile?.key;
        body.total_bill_document_s3_path = totalBillFile?.key;
      }

      // CHECK FOR SEVIERITY
      const recoveryPhaseResponse = await fetch(
        `/api/primary_report/get_recoveryphase_data?accident_id=${body.accident_id}`
      );
      const recoveryPhaseData = await recoveryPhaseResponse.json();
      console.log(recoveryPhaseData);

      const severity = recoveryPhaseData.data.severity;
      let severityNewValue = null;

      if (severity === "Minor") {
        if (body.total_bill_amount && body.total_bill_amount >= 50000) {
          severityNewValue = "Major";
        }
      }
      if (severityNewValue) {
        const updateRecoveryPhase = await fetch("/api/addRecoveryDetails", {
          method: "post",
          body: JSON.stringify({ severity: severityNewValue }),
        });
        if (!updateRecoveryPhase.ok) {
          return alert("failed to update severity");
        }
      }

      // // FORM UPLOAD
      const response = await fetch("/api/submitAccidentWorkshopForm", {
        method: "POST",
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const responseData = await response.json();
        // console.log(responseData);
        alert("create successufully");
        setSelectedAccedentData(null);
      } else {
        const errorData = await response.json();
        console.log(errorData);

        alert(errorData.error.error || "something went wrong");
      }
    } catch (error) {
      alert("something went wrong");
      console.error("Network error or unexpected error:", error);
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-col h-[88vh] pt-1 text-[12px] gap-3">
        {selectedAccedentData === null ? (
          <ReferenceNumberSearchModal caseSelectHandler={handleSearchSelect} />
        ) : (
          <>
            <div className="pt-5 px-3 flex justify-end">
              <h6 className="text-[16px] font-semibold text-themeRed">
                {selectedAccedentData.accident_id.replaceAll("_", "/")}
              </h6>
            </div>
            {/* main */}
            <div className="flex flex-col bg-white">
              <div className="flex gap-3 border-b font-semibold text-white bg-[var(--sidebar-bg)]">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedtab(index)}
                    className={`flex items-center px-4 py-2.5 text-[12px] font-medium cursor-pointer ${
                      selectedTab === index && "border-b-2 border-b-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div
                className={`h-[2px] bg-[var(--sidebar-bg)]`}
                style={{ width: `${progressStatus}%` }}
              ></div>
            </div>
            {tabList[selectedTab]}

            {/* footer */}
            <div className="h-[3vh] flex items-center justify-between px-5 py-6">
              <div className="flex gap-3">
                {selectedTab !== 0 && (
                  <button
                    className="bg-[#059669] font-[500] text-white px-5 py-2 rounded-xs disabled:bg-gray-400"
                    onClick={() => setSelectedtab((prevValue) => prevValue - 1)}
                  >
                    Previous
                  </button>
                )}
                {selectedTab !== tabs.length - 1 && (
                  <button
                    className="bg-sidebar font-[500] text-white px-5 py-2 rounded-xs disabled:bg-gray-400"
                    onClick={() => setSelectedtab((prevValue) => prevValue + 1)}
                  >
                    Next
                  </button>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handelCancel}
                  className="border font-[500] px-5 py-2 rounded-xs bg-themeRed"
                >
                  Cancel
                </button>
                {/* <button className="border font-[500] px-5 py-1 rounded-xs">
                  Save Draft
                </button> */}
                {selectedTab === tabs.length - 2 && (
                  <button
                    onClick={handleSubmit}
                    className="border font-[500] px-5 py-2 rounded-xs bg-sidebar text-white"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default AccedentWorkshop;
