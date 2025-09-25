"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import toast from "react-hot-toast";

interface AddInsurance {
  bonet_no: string;
  type_of_insurance: string;
  insurance_company_name: string;
  policy_number: string;
  insurance_start_date: string;
  insurance_end_date: string;
}

const initialInsuranceData: AddInsurance = {
  bonet_no: "",
  type_of_insurance: "",
  insurance_company_name: "",
  policy_number: "",
  insurance_start_date: "",
  insurance_end_date: "",
};

const AddInsuranceForm = () => {
  const [insuranceData, setInsuranceData] =
    useState<AddInsurance>(initialInsuranceData);

  const [errors, setErrors] = useState<
    Partial<Record<keyof AddInsurance, string>>
  >({});
  const [allBusInfo, setAllBusInfo] = useState<string[]>([]);
  const [busInfoLoading, setBusInfoLoading] = useState<boolean>(false);
  const [showBonnetNumberList, setShowBonnetNumberList] =
    useState<boolean>(false);
  const [bonnetNumberList, setBonnetNumberList] = useState<string[]>([]);
  const bonnetNumberListRef = useRef<HTMLUListElement | null>(null);

  // bonnet number search handler
  const handleSearchBonnetnumber = (searchValue: string) => {
    setInsuranceData({
      ...insuranceData,
      bonet_no: searchValue,
    });
    if (searchValue === "") {
      setBonnetNumberList([]);
      showBonnetNumberList && setShowBonnetNumberList(false);
      return;
    }
    setShowBonnetNumberList(true);
    setBonnetNumberList(() => {
      const similarBonnetNumber = allBusInfo.filter((val) =>
        val.toLowerCase().includes(searchValue.toLowerCase())
      );
      return similarBonnetNumber;
    });
  };

  // HANDLE SELECT BONNET NUMBER
  const handleSelectBonnetNumber = (selectedValue: string) => {
    setInsuranceData({
      ...insuranceData,
      bonet_no: selectedValue,
    });
    setShowBonnetNumberList(false);
  };

  // FETCH BUS INFO
  const fetchBusInfo = async () => {
    try {
      !busInfoLoading && setBusInfoLoading(true);

      const response = await fetch("/api/getAllBusInfo");
      const data = await response.json();
      const formatedData = data.data.map((v: any) => v.bonet_number);
      setAllBusInfo(formatedData);
    } catch (error) {
    } finally {
      setBusInfoLoading(false);
    }
  };

  // VALIDATE REQUIRED FIELDS
  const validateForm = () => {
    let newErrors: Partial<Record<keyof AddInsurance, string>> = {};
    Object.entries(insuranceData).forEach(([key, value]) => {
      if (!value) newErrors[key as keyof AddInsurance] = "Required";
    });
     setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // HANDLE SUBMIT
  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const response = await fetch("/api/Insurance/add_insurance", {
        method: "post",
        body: JSON.stringify(insuranceData),
      });

      if (!response.ok) {
        toast.error("Something went wrong while adding insurance");
        return;
      }

      toast.success("Insurance added successfully 🎉");
      setInsuranceData(initialInsuranceData);
      setErrors({});
    } catch (error) {
      toast.error("Failed to add insurance");
      console.error(error);
    }
  };

  // HANDLE CANCEL
  const handleCancel = () => {
    setInsuranceData(initialInsuranceData);
    setErrors({});
  };

  useEffect(() => {
    fetchBusInfo();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-4 gap-2 py-8">
        {/* Bonet Number */}
        <div className="flex flex-col gap-3">
          <p className="text-[12px]">
            Bonet Number <span className="text-red-600">*</span>
          </p>
          <div className="relative">
            <Input
              onChange={(e) => handleSearchBonnetnumber(e.target.value)}
              value={insuranceData.bonet_no}
              placeholder="Bonnet no"
              className={`bg-white h-8 w-full ${
                errors.bonet_no ? "border-red-500" : ""
              }`}
            />
            {errors.bonet_no && (
              <span className="text-xs text-red-500">{errors.bonet_no}</span>
            )}
            {showBonnetNumberList && (
              <ul
                ref={bonnetNumberListRef}
                className="absolute border-2 rounded-sm top-10 w-48 h-52 bg-white z-10 flex flex-col px-3 py-3 gap-3 overflow-auto"
              >
                {busInfoLoading ? (
                  <p>loading...</p>
                ) : (
                  bonnetNumberList.map((b, index) => (
                    <li
                      onClick={() => handleSelectBonnetNumber(b)}
                      key={index}
                      className="border-b-1 cursor-pointer"
                    >
                      {b}
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>

        {/* Other Fields */}
        {[
          { label: "Type Of Insurance", key: "type_of_insurance" },
          { label: "Insurance Company Name", key: "insurance_company_name" },
          { label: "Policy Number", key: "policy_number" },
          { label: "Start Date", key: "insurance_start_date", type: "date" },
          { label: "End Date", key: "insurance_end_date", type: "date" },
        ].map(({ label, key, type }) => (
          <div className="flex flex-col gap-3" key={key}>
            <p className="text-[12px]">
              {label} <span className="text-red-600">*</span>
            </p>
            <Input
              type={type || "text"}
              value={insuranceData[key as keyof AddInsurance]}
              onChange={(e) =>
                setInsuranceData({
                  ...insuranceData,
                  [key]: e.target.value,
                })
              }
              className={`${
                errors[key as keyof AddInsurance] ? "border-red-500" : ""
              }`}
            />
            {errors[key as keyof AddInsurance] && (
              <span className="text-xs text-red-500">
                {errors[key as keyof AddInsurance]}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3 ms-auto">
        <button
          onClick={handleCancel}
          className="text-sm bg-themeRed px-2 py-2 rounded-sm text-white"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="text-sm bg-sidebar px-2 py-2 rounded-sm text-white"
        >
          Add Insurance
        </button>
      </div>
    </div>
  );
};

export default AddInsuranceForm;
