"use client";
import { Input } from "@/components/ui/input";
import { Autocomplete, TextField } from "@mui/material";
import { Wrench, X } from "lucide-react";
import React, { useState } from "react";

const dummyData = [
  {
    accedent_ref_no: "1563867",
    accedent_date: "06/05/2025",
    bus_no: "FA3465",
  },
];

const AccedentWorkshop = () => {
  const [selectedAccedentData, setSelectedAccedentData] = useState<{
    accedent_ref_no: string;
    accedent_date: string;
    bus_no: string;
  } | null>();

  return (
    <div className="flex flex-col gap-3 p-5 mb-5">
      <div className="bg-white shadow h-[80vh] overflow-scroll rounded-lg border-0 p-6">
        <div className="flex items-center mb-4">
          <Wrench className="w-5 h-5 text-red-600 mr-2" />
          <h2 className="text-[14px] font-semibold">
            Workshop Update On Accidents
          </h2>
        </div>
        <hr className="mb-4" />
        <div className="grid grid-cols-4 gap-10 items-end pb-5 mt-8">
          {/* 1st row */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Accident Reference Number</label>
            <Autocomplete
              size="small"
              options={dummyData}
              getOptionLabel={(option) => option.accedent_ref_no}
              onChange={(_, val) => setSelectedAccedentData(val)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  className="text-[12px]"
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Date Of Accident</label>
            <Input
              placeholder="Date"
              value={
                selectedAccedentData ? selectedAccedentData.accedent_date : ""
              }
              onChange={() => console.log("clicked")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Bus No</label>
            <Input
              value={selectedAccedentData ? selectedAccedentData.bus_no : ""}
              onChange={() => console.log("clicked")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">
              Repair Work Done At Workshop/ Depot
            </label>
            <div className="flex items-center justify-evenly">
              <label htmlFor="#is_repair_done" className="text-[12px]">
                Yes
              </label>
              <Input type="radio" name="is_repair_done" className="w-4" />
              <label htmlFor="#isFir" className="text-[12px]">
                No
              </label>
              <Input type="radio" name="is_repair_done" className="w-4" />
            </div>
          </div>
          {/* 2nd row */}

          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Work Shop/ Depot Name</label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Date Of Entry(DD-MM-YYYY)</label>
            <Input type="date" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Date Of Work Start</label>
            <Input type="date" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Date Of Released (DD-MM-YYYY)</label>
            <Input type="date" />
          </div>
          {/* 3rd row */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">No Of Days At W/S / Depot</label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Insurance Surveyor Name</label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Insurance Surveyor Phone No.</label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Damage To The Bus</label>
            <Input type="text" />
          </div>
          {/* 4th row */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Spare Part Cost</label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Labour Cost </label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Total Bill Amount</label>
            <Input />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Cost Of Damage</label>
            <Input />
          </div>
          {/* 5th row */}
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">COD Recovered</label>
            <div className="flex items-center justify-evenly">
              <label htmlFor="#is_cod_recovered" className="text-[12px]">
                Yes
              </label>
              <Input type="radio" name="is_cod_recovered" className="w-4" />
              <label htmlFor="#isFir" className="text-[12px]">
                No
              </label>
              <Input type="radio" name="is_cod_recovered" className="w-4" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px]">Towed</label>
            <div className="flex items-center justify-evenly">
              <label htmlFor="#is_towed" className="text-[12px]">
                Yes
              </label>
              <Input type="radio" name="is_towed" className="w-4" />
              <label htmlFor="#isFir" className="text-[12px]">
                No
              </label>
              <Input type="radio" name="is_towed" className="w-4" />
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium mb-1 text-xs">Remarks</label>
          <textarea
            className="w-full mb-2 p-2 border rounded text-xs"
            rows={3}
          />
        </div>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            className="px-4 py-2 text-[12px] border rounded flex items-center"
          >
            <X className="w-4 h-4 mr-1" /> Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-[12px] bg-[var(--sidebar)] text-white rounded"
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccedentWorkshop;
