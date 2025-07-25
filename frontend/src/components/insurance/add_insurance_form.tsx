import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";

interface AddInsurance {
  bonet_no: string;
  type_of_insurance: string;
  insurance_company_name: string;
  policy_number: string;
  insurance_start_date: string;
  insurance_end_date: string;
}

const initialInsuranceData = {
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
    setBonnetNumberList((prevData) => {
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
      // console.log(data);
      setAllBusInfo(formatedData);
    } catch (error) {
    } finally {
      setBusInfoLoading(false);
    }
  };

  // HANDLE SUBMIT
  const handleSubmit = async () => {
    try {
      const {
        bonet_no,
        insurance_company_name,
        insurance_end_date,
        insurance_start_date,
        policy_number,
        type_of_insurance,
      } = insuranceData;

      if (
        !bonet_no ||
        !insurance_company_name ||
        !insurance_end_date ||
        !insurance_start_date ||
        !policy_number ||
        !type_of_insurance
      ) {
        return alert("requires full fields");
      }

      // const startDate = new Date(insurance_start_date);
      // startDate.setUTCHours(0, 0, 0, 0);
      // const endDate = new Date(insurance_end_date);
      // endDate.setUTCHours(23, 59, 59, 999);

      const body: AddInsurance = {
        bonet_no,
        policy_number,
        type_of_insurance,
        insurance_company_name,
        insurance_end_date,
        insurance_start_date,
      };

      const response = await fetch("/api/Insurance/add_insurance", {
        method: "post",
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (!response.ok) {
        console.log(`error in adding insurance error`);
        // console.log(data);

        return alert("something went wrong");
      }
      // console.log(data);
      alert("successfully added insurance");
      setInsuranceData(initialInsuranceData);
    } catch (error) {
      alert("error in adding insurance");
      console.error(`error in adding insurance error:${error}`);
    }
  };

  // HANDLE CANCEL
  const handleCancel = () => {
    setInsuranceData(initialInsuranceData);
  };

  useEffect(() => {
    fetchBusInfo();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-4 gap-2 py-8">
        <div className="flex flex-col gap-3">
          <p className="text-[12px]">Bonet Number</p>
          <div className="relative">
            <Input
              onChange={(e) => handleSearchBonnetnumber(e.target.value)}
              value={insuranceData.bonet_no}
              placeholder="Bonnet no"
              className="bg-white h-8 w-full"
            />
            {showBonnetNumberList && (
              <ul
                ref={bonnetNumberListRef}
                className="absolute border-2 rounded-sm top-10 w-48 h-52 bg-white z-10 flex flex-col px-3 py-3 gap-3 overflow-auto"
              >
                {busInfoLoading ? (
                  <p>loading...</p>
                ) : (
                  !busInfoLoading &&
                  bonnetNumberList.length > 0 &&
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
        <div className="flex flex-col gap-3">
          <p className="text-[12px]">Type Of Insurance</p>
          <Input
            value={insuranceData.type_of_insurance}
            onChange={(e) =>
              setInsuranceData({
                ...insuranceData,
                type_of_insurance: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[12px]">Insurance Comapny Name</p>
          <Input
            value={insuranceData.insurance_company_name}
            onChange={(e) =>
              setInsuranceData({
                ...insuranceData,
                insurance_company_name: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[12px]">Policy Number</p>
          <Input
            value={insuranceData.policy_number}
            onChange={(e) =>
              setInsuranceData({
                ...insuranceData,
                policy_number: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[12px]">Start Date</p>
          <Input
            type="date"
            value={insuranceData.insurance_start_date}
            onChange={(e) =>
              setInsuranceData({
                ...insuranceData,
                insurance_start_date: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[12px]">End Date</p>
          <Input
            type="date"
            value={insuranceData.insurance_end_date}
            onChange={(e) =>
              setInsuranceData({
                ...insuranceData,
                insurance_end_date: e.target.value,
              })
            }
          />
        </div>
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
