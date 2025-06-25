import { Divider } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
  caseSelectHandler: (selectedData: any) => void;
}

const dummyData = [
  {
    accedent_ref_no: "KKD/06/25/01",
    accedent_date: "06/05/2025",
    bus_no: "FA3465",
    accidentPlace: "Main Road, Kochi",
    policeStation: "Ernakulam South",
    timeOfAccident: "14:30",
    homeDepot: "KKD",
    operatedDepot: "KKD",
    scheduleNumber: "48",
    driverName: "Rajesh Kumar",
    driverPhone: "9876543210",
    conductorName: "Suresh Nair",
    conductorPhone: "9876543211",
    accidentState: "Kerala",
    accidentDistrict: "Ernakulam",
    description: "Collision with private car",
    accidentLatitude: "9.9312",
    accidentLongitude: " 76.2673",
    photos: [],
  },
  {
    accedent_ref_no: "KTM/07/25/05",
    bus_no: "RPC292",
    accidentPlace: "MG Road, Trivandrum",
    accedent_date: "2023-07-22",
    policeStation: "Thiruvananthapuram East",
    timeOfAccident: "10:15",
    homeDepot: "KTM",
    operatedDepot: "KTM",
    scheduleNumber: "52",
    driverName: "Manoj Pillai",
    driverPhone: "9876543222",
    conductorName: "Deepak Kumar",
    conductorPhone: "9876543223",
    accidentState: "Kerala",
    accidentDistrict: "Thiruvananthapuram",
    description: "Rear-ended by truck",
    accidentLatitude: "8.5241",
    accidentLongitude: "76.9366",
    photos: [],
  },
];

const ReferenceNumberSearchModal = ({ caseSelectHandler }: Props) => {
  const [searchData, setSearchData] = useState<{
    date: string;
    bonnet_no: string;
    district: string;
    operated_depo: string;
  }>({
    date: "",
    bonnet_no: "",
    district: "",
    operated_depo: "",
  });
  const [showBonnetDropDown, setShowBonnetDropDown] = useState(false);
  const [accidentList, setAccidentList] = useState<{}[] | null>(null);

  // search handler
  const handleSearch = () => {
    setAccidentList(dummyData);
  };

  // handle case select
  const handlecaseSelect = (selectedData: any) => {
    caseSelectHandler(selectedData);
  };

  return (
    <div className="w-full flex flex-col gap-8 my-5">
      <div className="flex items-center gap-3 px-3">
        <h6>
          Accident Reference Number <span className="text-red-600">*</span>
        </h6>
        <input
          type="text"
          placeholder="Search and select accident reference"
          readOnly
          className="w-[79%] border px-3 py-1 rounded-xs bg-white"
        />
      </div>
      <div className="flex justify-center items-center gap-3">
        <Divider className="w-1/3" />
        <p>OR</p>
        <Divider className="w-1/3" />
      </div>
      <div className="relative bg-white flex flex-col gap-5 rounded-sm">
        <div className="w-full grid grid-cols-4 gap-5 text-[12px] px-3 py-2">
          <div className="flex flex-col">
            <label>Date</label>
            <input
              onChange={(e) =>
                setSearchData({ ...searchData, date: e.target.value })
              }
              type="date"
              className="px-3 py-2 border rounded-sm"
              value={searchData.date}
            />
          </div>
          <div className="relative flex flex-col">
            <label>Bonnet No</label>
            <input
              type="text"
              placeholder="search bonnet number"
              className="px-3 py-2 border rounded-sm"
              onClick={() => setShowBonnetDropDown(true)}
              value={searchData.bonnet_no}
              onChange={(e) =>
                setSearchData((prev) => ({
                  ...prev,
                  bonnet_no: e.target.value,
                }))
              }
            />
            {showBonnetDropDown && (
              <div className="absolute border flex flex-col gap-1 top-14 bg-slate-50 rounded-sm px-3 py-2 w-40">
                {dummyData.map((d) => (
                  <button
                    onClick={() => {
                      setSearchData({ ...searchData, bonnet_no: d.bus_no });
                      setShowBonnetDropDown(false);
                    }}
                    className="py-2 text-start"
                    key={d.bus_no}
                  >
                    {d.bus_no}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <label>District</label>
            <select
              onChange={(e) =>
                setSearchData({ ...searchData, district: e.target.value })
              }
              className="px-3 py-2 border rounded-sm"
              value={searchData.district}
            >
              <option value="kottayam">Kottayam</option>
              <option value="thiruvanathapuram">Thiruvanathapuram</option>
            </select>
          </div>
          <div className="relative flex flex-col">
            <label>Operated Depo</label>
            <input
              type="text"
              onChange={(e) =>
                setSearchData({ ...searchData, operated_depo: e.target.value })
              }
              placeholder="operated depo"
              className="px-3 py-2 border rounded-sm"
              value={searchData.operated_depo}
            />
          </div>
        </div>
        <div className="flex items-center px-3 py-2 bg-slate-50">
          <div className="flex gap-3 ms-auto">
            <button
              onClick={() => setAccidentList(null)}
              className="border px-3 py-1 rounded-sm bg-white"
            >
              clear
            </button>
            <button
              onClick={handleSearch}
              className="border px-3 py-1 rounded-sm bg-sidebar text-white"
            >
              search
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 px-3 py-5">
        {accidentList &&
          accidentList.map((d: any) => (
            <div
              key={d.accedent_ref_no}
              className="w-full px-3 py-5 flex flex-col bg-white cursor-pointer"
              onClick={handlecaseSelect}
            >
              <div className="flex justify-between">
                <div>
                  <label>Reference number:</label>
                  <label>{d.accedent_ref_no}</label>
                </div>
                <label>{d.accedent_date}</label>
              </div>
              <div className="flex gap-3">
                <p>
                  bonnet Number: <span>{d.bus_no}</span>
                </p>
                <p>
                  Accident Place: <span>{d.accidentPlace}</span>
                </p>
                <p>
                  Operated Depo: <span>{d.operatedDepot}</span>
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReferenceNumberSearchModal;
