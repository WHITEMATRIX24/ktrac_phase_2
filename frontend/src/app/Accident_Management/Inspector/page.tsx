"use client";

import FormBasicReport from "@/components/accident_management/inspector/form_basic_report";
import FormInspectorReport from "@/components/accident_management/inspector/form_inspector_report";
import FormInsurenceReport from "@/components/accident_management/inspector/form_insurence_report";
import ReferenceNumberSearchModal from "@/components/accident_management/search_referencenumber_modal";
import { Input } from "@/components/ui/input";
import {
  AccidentInsuranceModel,
  InspectorReportData,
} from "@/models/AccidentData";
import { Autocomplete, TextField } from "@mui/material";
import { User2, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const tabs = ["Basic Details", "Inspector Report", "Insurance"];

const AccedentInspectorForm = () => {
  const [inspectorReportData, setInspectorReportData] =
    useState<InspectorReportData>({
      accident_uuid: "",
      jurisdiction_of_inspector: "",
      accident_id: "",
      date_of_accident: "",
      bonet_no: "",
      inquiry_inspector_name: "",
      fir_registered: false,
      fir_number: "",
      under_section_details: "",
      accused_in_accident_in_fir: "",
      fir_case_against_ksrtc: false,
      date_of_bus_released_from_police_station: "",
      enquiry_police_person_name: "",
      enquiry_police_phone_number: "",
      witness: "",
      primary_cause_of_accident_in_insp_report: "",
      responsibility_of_accident_in_insp_report: "",
      if_not_ksrtc_responsible_action_taken: "",
      whether_fir_is_modified_or_not: false,
      responsibility_changed_from_ksrtc_as_per_evidence_submitted: false,
      total_no_of_days_bus_docked_due_to_accident: 0,
      revenue_loss_due_to_dock_of_bus: 0,
      inspector_report_additional_details: "",
      remarks: "",
      whether_bus_have_valid_insurance_or_not: false,
      created_by: "",
      digital_evidence_files: [],
      summary_of_inspector_report: "",
      unit: "",
      upload_document: "",
      waybill: "",
      schedule_details: "",
      document_content_type: "",
      document_filename: "",
    });
  const [insuranceReportData, setInsuranceReportData] =
    useState<AccidentInsuranceModel>({
      accident_id: "",
      type_of_insurance: "",
      insurance_claim_applied: false,
      insurance_company_name: "",
      policy_number: "",
      claim_number: "",
      date_of_insurance_claim_applied: "",
      name_of_spot_surveyor: "",
      spot_surveyor_phone_number: "",
      final_bill_submitted_insurance_co: false,
      final_bill_amount_to_ksrtc: 0,
      approved_amount_by_insurance_co: 0,
      admitted_amount_by_insurance_co: 0,
      payment_settled: false,
      date_of_payment_settled: null,
      remarks: "",
      created_by: "",
    });
  const [fetchedDetails, setFetchedDetails] = useState<{
    accident_id: string;
    date: string;
    timeZone: string;
    driverName: string;
    driverPhoneNumber: string;
    conductorName: string;
    conductorPhoneNumber: string;
    bonnetNumber: string;
  } | null>(null);
  const [selectedTab, setSelectedtab] = useState<number>(0);
  const [progressStatus, setProgressStatus] = useState(50);

  const handleSearchSelect = (selectedData: any) => {
    console.log(selectedData);

    const accidentId = selectedData.accident_id;
    const date = selectedData.accident_details.date_of_accident;
    const timeZone = selectedData.accident_details.time_zone_of_accident;
    const driverName = selectedData.crew_information.driver_name;
    const driverPhoneNumber = selectedData.crew_information.driver_phn_no;
    const conductorName = selectedData.crew_information.conductor_name;
    const conductorPhoneNumber = selectedData.crew_information.conductor_phn_no;
    const bonnetNumber = selectedData.vehicle_info.bonet_no;
    setFetchedDetails({
      accident_id: accidentId,
      date,
      timeZone,
      driverName,
      driverPhoneNumber,
      conductorName,
      conductorPhoneNumber,
      bonnetNumber,
    });
    setInspectorReportData({
      ...inspectorReportData,
      accident_id: accidentId,
      bonet_no: bonnetNumber,
      date_of_accident: date,
    });
    setInsuranceReportData({ ...insuranceReportData, accident_id: accidentId });
  };

  // progressbar
  useEffect(() => {
    const progressValuePerTab = 100 / tabs.length;
    setProgressStatus(progressValuePerTab * (selectedTab + 1));
  }, [selectedTab]);

  const tabList = [
    <FormBasicReport
      accidentData={inspectorReportData}
      stateUpdateHandler={setInspectorReportData}
      fetchedDetails={fetchedDetails}
    />,
    <FormInspectorReport
      accidentData={inspectorReportData}
      stateUpdateHandler={setInspectorReportData}
    />,
    <FormInsurenceReport
      insuranceForm={insuranceReportData}
      stateUpdateHandler={setInsuranceReportData}
      inspectorReport={inspectorReportData}
      inspectorUpdateFunction={setInspectorReportData}
    />,
  ];

  // submit handler
  const handleSubmit = async () => {
    const inspectorReportBody = {
      ...inspectorReportData,
      report_date: new Date(),
      created_by: "admin@ktrack",
      digital_evidence_count: inspectorReportData.digital_evidence_files.length,
    };

    const insuranceBody = {
      ...insuranceReportData,
      created_by: "admin@ktrac",
    };

    console.log(insuranceBody);

    const [inspectorResponse, insuranceResponse] = await Promise.all([
      fetch("/api/submitAccidentInspectorForm", {
        method: "POST",
        body: JSON.stringify(inspectorReportBody),
      }),
      fetch("/api/submitAccidentInsuranceForm", {
        method: "POST",
        body: JSON.stringify(insuranceBody),
      }),
    ]);

    if (inspectorResponse.ok && inspectorResponse.ok) {
      const inspectorData = await inspectorResponse.json();
      const insuranceData = await insuranceResponse.json();
      // console.log(inspectorData, insuranceData);

      alert("Inspector and Insurance data created");
      setFetchedDetails(null);
    }

    if (!inspectorResponse.ok) {
      const errorData = await inspectorResponse.json();
      console.log(`error in inspector form submittion`);
      console.log(errorData);
      alert("something went wrong in inspector form");
    }

    if (!insuranceResponse.ok) {
      const errorData = await inspectorResponse.json();
      console.log(`error in inspector form submittion`);
      console.log(errorData);
      alert("something went wrong in insurance form");
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-col h-[88vh] pt-1 text-[12px] gap-3">
        {fetchedDetails === null ? (
          <ReferenceNumberSearchModal caseSelectHandler={handleSearchSelect} />
        ) : (
          <>
            <div className="pt-5 px-3 flex justify-end">
              <h6 className="text-2xl font-semibold text-themeRed">
                {fetchedDetails.accident_id.replaceAll("_", "/")}
              </h6>
            </div>
            {/* tab */}
            <div className="flex flex-col">
              <div className="flex  gap-3  border-b font-semibold text-white bg-[var(--sidebar-bg)]">
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
            {/* main */}
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
                <button className="border bg-themeRed text-white font-[500] px-5 py-2 rounded-xs">
                  Cancel
                </button>
                {/* <button className="border font-[500] px-5 py-1 rounded-xs">
                  Save Draft
                </button> */}
                {selectedTab === tabs.length - 1 && (
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

export default AccedentInspectorForm;
