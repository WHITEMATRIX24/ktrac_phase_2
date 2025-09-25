import React, { useState } from "react";
import { Input } from "../ui/input";
import toast from "react-hot-toast";

interface ScheduleDetails {
  schedule_number: string;
  schedule_name: string;
  route_from: string;
  route_to: string;
  distance_km: string;
  duration_minutes: number;
  is_active: boolean;
}

const initialScheduleData: ScheduleDetails = {
  schedule_number: "",
  schedule_name: "",
  route_from: "",
  route_to: "",
  distance_km: "",
  duration_minutes: 0,
  is_active: true,
};

const AddScheduleForm = () => {
  const [scheduleDetails, setScheduleDetails] =
    useState<ScheduleDetails>(initialScheduleData);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // VALIDATION
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!scheduleDetails.schedule_number.trim()) {
      newErrors.schedule_number = "Schedule Number is required";
    }
    if (!scheduleDetails.schedule_name.trim()) {
      newErrors.schedule_name = "Schedule Name is required";
    }

    return newErrors;
  };

  // CANCEL HANDLER
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setScheduleDetails(initialScheduleData);
    setErrors({});
  };

  // SUBMIT HANDLER
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
/*     console.log(scheduleDetails);
 */
    try {
      const response = await fetch("/api/depot/add_schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scheduleDetails),
      });

      const data = await response.json();

      if (!response.ok) {
        return alert(data.error?.error || "Error in adding schedule");
      }

      toast.success("Successfully added Schedule");
      setScheduleDetails(initialScheduleData);
    } catch (error) {
      console.error(`error in creating schedule`, error);
      alert("Error in adding schedule");
    }
  };

  return (
    <form className="flex flex-col gap-5 pt-8">
      <div className="grid grid-cols-4 gap-2">
        {/* Schedule Number */}
        <div className="flex flex-col gap-1">
          <p className="text-[12px]">
            Schedule Number <span className="text-red-600">*</span>
          </p>
          <Input
            className={errors.schedule_number ? "border-red-500" : ""}
            value={scheduleDetails.schedule_number}
            onChange={(e) =>
              setScheduleDetails({
                ...scheduleDetails,
                schedule_number: e.target.value,
              })
            }
          />
          {errors.schedule_number && (
            <span className="text-red-500 text-xs">
              {errors.schedule_number}
            </span>
          )}
        </div>

        {/* Schedule Name */}
        <div className="flex flex-col gap-1">
          <p className="text-[12px]">
            Schedule Name <span className="text-red-600">*</span>
          </p>
          <Input
            className={errors.schedule_name ? "border-red-500" : ""}
            value={scheduleDetails.schedule_name}
            onChange={(e) =>
              setScheduleDetails({
                ...scheduleDetails,
                schedule_name: e.target.value,
              })
            }
          />
          {errors.schedule_name && (
            <span className="text-red-500 text-xs">
              {errors.schedule_name}
            </span>
          )}
        </div>

        {/* Route From */}
        <div className="flex flex-col gap-1">
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

        {/* Route To */}
        <div className="flex flex-col gap-1">
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

        {/* Distance Km */}
        <div className="flex flex-col gap-1">
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

        {/* Duration Minutes */}
        <div className="flex flex-col gap-1">
          <p className="text-[12px]">Duration Minutes</p>
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
      </div>

      {/* Buttons */}
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
