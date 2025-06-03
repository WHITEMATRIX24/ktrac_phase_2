"use client";
import { Input } from "@/components/ui/input";
import { Autocomplete, TextField } from "@mui/material";
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
      <h6 className="text-2xl">Inspector Report</h6>
      <div className="grid grid-cols-4 gap-10 items-end pb-5 mt-8">
        {/* 1st row */}
        <div className="flex flex-col gap-2">
          <label className="text-sm">Accident Reference Number</label>
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
          <label className="text-sm">Date Of Accident</label>
          <Input
            placeholder="Date"
            value={
              selectedAccedentData ? selectedAccedentData.accedent_date : ""
            }
            onChange={() => console.log("clicked")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Bus No</label>
          <Input
            value={selectedAccedentData ? selectedAccedentData.bus_no : ""}
            onChange={() => console.log("clicked")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">
            Repair Work Done At Workshop/ Depot (Yes/No)
          </label>
          <div className="flex items-center justify-evenly">
            <label htmlFor="#is_repair_done">Yes</label>
            <Input type="radio" name="is_repair_done" className="w-6" />
            <label htmlFor="#isFir">No</label>
            <Input type="radio" name="is_repair_done" className="w-6" />
          </div>
        </div>
        {/* 2nd row */}

        <div className="flex flex-col gap-2">
          <label className="text-sm">Work Shop/ Depot Name</label>
          <Input />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Date Of Entry(DD-MM-YYYY)</label>
          <Input type="date" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Date Of Work Start</label>
          <Input type="date" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Date Of Released (DD-MM-YYYY)</label>
          <Input type="date" />
        </div>
        {/* 3rd row */}
        <div className="flex flex-col gap-2">
          <label className="text-sm">No Of Days At W/S / Depot</label>
          <Input />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Insurance Surveyor Name</label>
          <Input />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Insurance Surveyor Phone No.</label>
          <Input />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Damage To The Bus</label>
          <Input type="text" />
        </div>
        {/* 4th row */}
        <div className="flex flex-col gap-2">
          <label className="text-sm">Spare Part Cost</label>
          <Input />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Labour Cost </label>
          <Input />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Total Bill Amount</label>
          <Input />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Cost Of Damage</label>
          <Input />
        </div>
        {/* 5th row */}
        <div className="flex flex-col gap-2">
          <label className="text-sm">COD Recovered (Yes/No)</label>
          <div className="flex items-center justify-evenly">
            <label htmlFor="#is_cod_recovered">Yes</label>
            <Input type="radio" name="is_cod_recovered" className="w-6" />
            <label htmlFor="#isFir">No</label>
            <Input type="radio" name="is_cod_recovered" className="w-6" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">towed (y/n)</label>
          <div className="flex items-center justify-evenly">
            <label htmlFor="#is_towed">Yes</label>
            <Input type="radio" name="is_towed" className="w-6" />
            <label htmlFor="#isFir">No</label>
            <Input type="radio" name="is_towed" className="w-6" />
          </div>
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <label className="text-sm">Remarks</label>
          <Input />
        </div>
      </div>
      <div className="flex gap-3 mx-auto">
        <button className="px-4 py-1 rounded-md bg-red-700 text-white">
          Cancel
        </button>
        <button className="px-4 py-1 rounded-md bg-green-700 text-white">
          Submit
        </button>
      </div>
    </div>
  );
};

export default AccedentWorkshop;
