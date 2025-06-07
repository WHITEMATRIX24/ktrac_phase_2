import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
  closeHandler: () => void;
  caseSelectHandler: (selectedData: any) => void;
}

const dummyData = [
  {
    accedent_ref_no: "KKD/06/25/01",
    accedent_date: "06/05/2025",
    bus_no: "FA3465",
    accidentPlace: 'Main Road, Kochi',
    policeStation: 'Ernakulam South',
    timeOfAccident: '14:30',
    homeDepot: 'KKD',
    operatedDepot: 'KKD',
    scheduleNumber: '48',
    driverName: 'Rajesh Kumar',
    driverPhone: '9876543210',
    conductorName: 'Suresh Nair',
    conductorPhone: '9876543211',
    accidentState: 'Kerala',
    accidentDistrict: 'Ernakulam',
    description: 'Collision with private car',
    accidentLatitude: "9.9312",
    accidentLongitude: " 76.2673",
    photos: []
  },
  {
    accedent_ref_no: 'KTM/07/25/05',
    bus_no: 'RPC292',
    accidentPlace: 'MG Road, Trivandrum',
    accedent_date: '2023-07-22',
    policeStation: 'Thiruvananthapuram East',
    timeOfAccident: '10:15',
    homeDepot: 'KTM',
    operatedDepot: 'KTM',
    scheduleNumber: '52',
    driverName: 'Manoj Pillai',
    driverPhone: '9876543222',
    conductorName: 'Deepak Kumar',
    conductorPhone: '9876543223',
    accidentState: 'Kerala',
    accidentDistrict: 'Thiruvananthapuram',
    description: 'Rear-ended by truck',
    accidentLatitude: "8.5241",
    accidentLongitude: "76.9366",
    photos: []
  },
];


const ReferenceNumberSearchModal = ({
  closeHandler,
  caseSelectHandler,
}: Props) => {
  const [searchData, setSearchData] = useState(false);

  // handle case select
  const handlecaseSelect = (selectedData: any) => {
    caseSelectHandler(selectedData);
    closeHandler();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-dvh bg-black/30 flex justify-center items-center">
      <div className="relative bg-white flex flex-col gap-5 w-[35rem] rounded-sm overflow-hidden">
        <div className="flex gap-3 justify-between items-center bg-slate-50 px-3 py-2">
          <h6>Search Accident Report</h6>
          <button onClick={closeHandler}>x</button>
        </div>
        <div className="w-full grid grid-cols-3 gap-5 text-[12px] px-3 py-2">
          <div className="flex flex-col">
            <label>Date</label>
            <input type="date" className="px-3 py-2 border rounded-sm" />
          </div>
          <div className="flex flex-col">
            <label>Bonnet No</label>
            <input
              type="text"
              placeholder="search bonnet number"
              className="px-3 py-2 border rounded-sm"
            />
          </div>
          <div className="flex flex-col">
            <label>District</label>
            <select className="px-3 py-2 border rounded-sm">
              <option value="">Kottayam</option>
              <option value="">Thiruvanathapuram</option>
            </select>
          </div>
        </div>
        <div className="bg-slate-50 max-h-52 mx-3 rounded-sm overflow-y-scroll text-[12px]">
          {searchData &&
            dummyData.map((data) => (
              <div
                onClick={() => handlecaseSelect(data)}
                key={data.accedent_ref_no}
                className="px-3 py-4 border-b-2"
              >
                <h6>
                  ACC001 - <span>{data.bus_no}</span>
                </h6>
                <p className="text-gray-400">{`${data.accedent_date} | District`}</p>
                <p className="text-gray-400">Accident at {data.accidentPlace}</p>
              </div>
            ))}
        </div>
        <div className="flex items-center px-3 py-2 bg-slate-50">
          <div className="flex gap-3 ms-auto">
            <button className="border px-3 py-1 rounded-sm bg-white">
              clear
            </button>
            <button
              onClick={() => setSearchData(true)}
              className="border px-3 py-1 rounded-sm bg-sidebar text-white"
            >
              search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferenceNumberSearchModal;
