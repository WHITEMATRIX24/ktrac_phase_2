"use client";
import React, { useEffect, useState } from "react";

interface AccidentWorkshopReport {
  accident_depot: string;
  accident_id: string;
  accident_reference_number: string | null;
  bonet_no: string | null;
  bus_no: string | null;
  cod_recovered: boolean;
  cod_recovery_amount: number;
  cost_of_damage: number;
  created_at: string;
  created_by: string;
  damage_assessment_report: string | null;
  damage_to_bus: string;
  date_of_accident: string | null;
  date_of_entry: string;
  date_of_released: string;
  date_of_work_start: string;
  district: string;
  file_downloads: Record<string, any>;
  final_inspection_report: string | null;
  history_endpoint: string;
  id: number;
  individual_bill_document_s3_path: string | null;
  insurance_surveyor_name: string;
  insurance_surveyor_phone_number: string;
  invoice_number: string | null;
  labour_cost: number;
  no_of_days_at_workshop: number;
  other_costs: number;
  quality_check_status: boolean;
  remarks: string;
  repair_status: string;
  repair_work_done_at_workshop: boolean;
  severity: string | null;
  spare_part_cost: number;
  status: string;
  total_bill_amount: number;
  total_bill_document_s3_path: string | null;
  towing_charges: number;
  towing_company_name: string | null;
  updated_at: string;
  updated_by: string | null;
  vehicle_towed_status: boolean;
  work_completion_percentage: number;
  work_order_number: string | null;
  workshop_depot_name: string;
}

const ViewWorkshopData = () => {
  const [workShopDataList, setWorkShopDataList] = useState([]);
  const [selectedWorkShopData, setSelectedWorkshopData] =
    useState<AccidentWorkshopReport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // HANDLE SELECT
  const handleSelect = (selectedData: any) => {
    setSelectedWorkshopData(selectedData);
  };

  // HANDLE GO BACK
  const handleGoBack = () => {
    setSelectedWorkshopData(null);
  };

  // GET ALL WORKSHOP DATA
  const getAllWorkshopData = async () => {
    try {
      const workshopResponse = await fetch("/api/workshop/get_workshopdata");
      const workshopData = await workshopResponse.json();

      if (!workshopResponse.ok) {
        alert("something went wrong");
        return;
      }
      setWorkShopDataList(workshopData.data);
    } catch (error) {
      console.error("error in fetching the workshop data list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllWorkshopData();
  }, []);
  console.log(selectedWorkShopData);

  return (
    <div className="flex flex-col h-[86vh] pt-3 text-[12px] gap-3 px-5 overflow-y-auto">
      <h6 className="text-lg">Workshop Data</h6>
      {!selectedWorkShopData ? (
        <div className="grid grid-cols-2 gap-3">
          {loading ? (
            <p>loading...</p>
          ) : !loading && workShopDataList.length < 1 ? (
            <p>No record found</p>
          ) : !loading && workShopDataList.length > 0 ? (
            workShopDataList.map((data: any) => (
              <div
                key={data.accident_id}
                onClick={() => handleSelect(data)}
                className="px-5 py-3 rounded-md bg-gray-100 cursor-pointer"
              >
                <p className="flex gap-2">
                  Accident id
                  <span>{data.accident_id}</span>
                </p>
                <p className="flex gap-2">
                  Bonet No.
                  <span>{data.bonet_no}</span>
                </p>
                <p className="flex gap-2">
                  Date of accident
                  <span>{data.date_of_accident}</span>
                </p>
              </div>
            ))
          ) : (
            <p>No data found</p>
          )}
        </div>
      ) : (
        // if selected data
        <div className="flex flex-col">
          <div className="grid grid-rows-3 grid-cols-3 gap-2 gap-y-12 bg-white px-2 py-3 rounded-md h-[73vh] min-h-0 overflow-y-auto items-start">
            <div className="flex flex-col gap-3 h-fit">
              <h6 className="text-[15px]">Accident Details</h6>
              <div className="flex flex-col gap-1">
                <p className="flex gap-2">
                  Accident Id:
                  <span>
                    {selectedWorkShopData.accident_id.replaceAll("_", "/")}
                  </span>
                </p>
                <p className="flex gap-2">
                  Bonet No.:
                  <span>{selectedWorkShopData.bonet_no}</span>
                </p>
                <p className="flex gap-2">
                  Accident Depot:
                  <span>{selectedWorkShopData.accident_depot}</span>
                </p>
                <p className="flex gap-2">
                  Date Of Accident:
                  <span>{selectedWorkShopData.date_of_accident}</span>
                </p>
                <p className="flex gap-2">
                  District:
                  <span>{selectedWorkShopData.district}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 h-fit">
              <h6 className="text-[15px]">Workshop Details</h6>
              <div className="flex flex-col gap-1">
                <p className="flex gap-2">
                  Workshop Depot Name:
                  <span>{selectedWorkShopData.workshop_depot_name}</span>
                </p>
                <p className="flex gap-2">
                  Repair Work Done At Workshop:
                  <span>
                    {selectedWorkShopData.repair_work_done_at_workshop === true
                      ? "Yes"
                      : "No"}
                  </span>
                </p>
                <p className="flex gap-2">
                  Damage To The Bus:
                  <span>{selectedWorkShopData.damage_to_bus}</span>
                </p>
                <p className="flex gap-2">
                  Towed:
                  <span>
                    {selectedWorkShopData.vehicle_towed_status === true
                      ? "Yes"
                      : "No"}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h6 className="text-[15px]">Costs</h6>
              <div className="flex flex-col gap-1">
                <p className="flex gap-2">
                  Spare Part Cost:
                  <span>{selectedWorkShopData.spare_part_cost}</span>
                </p>
                <p className="flex gap-2">
                  Labour Cost:
                  <span>{selectedWorkShopData.labour_cost}</span>
                </p>
                <p className="flex gap-2">
                  Cost Of Damage:
                  <span>{selectedWorkShopData.cost_of_damage}</span>
                </p>
                <p className="flex gap-2">
                  Total Bill Amount:
                  <span>{selectedWorkShopData.total_bill_amount}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h6 className="text-[15px]">Workshop Timeline</h6>
              <div className="flex flex-col gap-1">
                <p className="flex gap-2">
                  Date Of Entry:
                  <span>{selectedWorkShopData.date_of_entry}</span>
                </p>
                <p className="flex gap-2">
                  Date Of Work Start:
                  <span>{selectedWorkShopData.date_of_work_start}</span>
                </p>
                <p className="flex gap-2">
                  Date Of Released:
                  <span>{selectedWorkShopData.date_of_released}</span>
                </p>
                <p className="flex gap-2">
                  No Of Days At Workshop:
                  <span>{selectedWorkShopData.no_of_days_at_workshop}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h6 className="text-[15px]">Insurance</h6>
              <div className="flex flex-col gap-1">
                <p className="flex gap-2">
                  Insurance Surveyor Name:
                  <span>{selectedWorkShopData.insurance_surveyor_name}</span>
                </p>
                <p className="flex gap-2">
                  Insurance Surveyor Phone No:
                  <span>
                    {selectedWorkShopData.insurance_surveyor_phone_number}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h6 className="text-[15px]">Additional</h6>
              <div className="flex flex-col gap-1">
                <p className="flex gap-2">
                  COD Recovered:
                  <span>
                    {selectedWorkShopData.cod_recovered === true ? "Yes" : "No"}
                  </span>
                </p>
                <p className="flex gap-2">
                  Remarks:
                  <span>{selectedWorkShopData.remarks}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 ms-auto">
            <button
              onClick={handleGoBack}
              className="border font-[500] px-5 py-2 rounded-xs bg-themeRed cursor-pointer"
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewWorkshopData;
