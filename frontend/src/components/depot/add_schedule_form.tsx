import React, { useState } from "react";
import { Input } from "../ui/input";

interface ScheduleDetails {
  schedule_number: string;
  schedule_name: string;
  route_from: string;
  route_to: string;
  distance_km: string;
  duration_minutes: number;
  schedule_type: string;
  is_active: boolean;
}

const initialScheduleData = {
  schedule_number: "",
  schedule_name: "",
  route_from: "",
  route_to: "",
  distance_km: "",
  duration_minutes: 0,
  schedule_type: "",
  is_active: true,
};

const AddScheduleForm = () => {
  const [scheduleDetails, setScheduleDetails] =
    useState<ScheduleDetails>(initialScheduleData);

  // CANCEL HANDLER
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setScheduleDetails(initialScheduleData);
  };

  // SUBMIT HANDLER
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(scheduleDetails);
  };

  return (
    <form className=" flex flex-col gap-5 pt-8">
      <div className="grid grid-cols-4 gap-2">
        <div className="flex flex-col gap-3">
          <p className="text-[12px]">Schedule Number</p>
          <Input
            value={scheduleDetails.schedule_number}
            onChange={(e) =>
              setScheduleDetails({
                ...scheduleDetails,
                schedule_number: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[12px]">Schedule Name</p>
          <Input
            value={scheduleDetails.schedule_name}
            onChange={(e) =>
              setScheduleDetails({
                ...scheduleDetails,
                schedule_name: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[12px]">Route From</p>
          <Input
            value={scheduleDetails.route_from}
            onChange={(e) =>
              setScheduleDetails({
                ...scheduleDetails,
                route_from: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[12px]">Route To</p>
          <Input
            value={scheduleDetails.route_to}
            onChange={(e) =>
              setScheduleDetails({
                ...scheduleDetails,
                route_to: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[12px]">Distance Km</p>
          <Input
            value={scheduleDetails.distance_km}
            onChange={(e) =>
              setScheduleDetails({
                ...scheduleDetails,
                distance_km: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[12px]">Duration minutes</p>
          <Input
            type="number"
            value={scheduleDetails.duration_minutes}
            onChange={(e) =>
              setScheduleDetails({
                ...scheduleDetails,
                duration_minutes: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-[12px]">Schedue Type</p>
          <Input
            value={scheduleDetails.schedule_type}
            onChange={(e) =>
              setScheduleDetails({
                ...scheduleDetails,
                schedule_type: e.target.value,
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
          Add Schedule
        </button>
      </div>
    </form>
  );
};

export default AddScheduleForm;
