import React, { useState } from "react";

interface Props {
  closeHandler: () => void;
}

const ReferenceNumberSearchModal = ({ closeHandler }: Props) => {
  const [searchData, setSearchData] = useState(false);

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
            [1, 2, 3].map((card) => (
              <div key={card} className="px-3 py-4 border-b-2">
                <h6>
                  ACC001 - <span>KL0D5412</span>
                </h6>
                <p className="text-gray-400">Date | District</p>
                <p className="text-gray-400">Minor collision at palarivattom</p>
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
