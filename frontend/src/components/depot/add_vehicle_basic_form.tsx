import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

interface BasicVehicleDetails {
  bonet_no: string;
  register_no: string;
  make_of_chasis: string;
  makers_type_of_vehicle: string;
  wheel_base: string;
  st_unit_no: string;
  chasis_no: string;
  engine_no: string;
  engine_make_and_type: string;
  type_of_body: string;
  seating_or_carrying_capacity: string;
  unladen_weight: number;
  registered_laden_weight: number;
  chasis_weight_front: number;
  size_of_type_rear: string;
  date_of_commission: string;
  body_built_at: string;
}

const initialBasicVehicleDetails: BasicVehicleDetails = {
  bonet_no: "",
  register_no: "",
  make_of_chasis: "",
  makers_type_of_vehicle: "",
  wheel_base: "",
  st_unit_no: "",
  chasis_no: "",
  engine_no: "",
  engine_make_and_type: "",
  type_of_body: "",
  seating_or_carrying_capacity: "",
  unladen_weight: 0,
  registered_laden_weight: 0,
  chasis_weight_front: 0,
  size_of_type_rear: "",
  date_of_commission: "",
  body_built_at: "",
};

const AddBasicVehicleDetailsForm = () => {
  const [vehicleDetails, setVehicleDetails] = useState<BasicVehicleDetails>(
    initialBasicVehicleDetails
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // ✅ Validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!vehicleDetails.bonet_no.trim()) {
      newErrors.bonet_no = "Bonnet No. is required";
    }
    if (!vehicleDetails.register_no.trim()) {
      newErrors.register_no = "Register No. is required";
    }
    if (!vehicleDetails.make_of_chasis.trim()) {
      newErrors.make_of_chasis = "Make of Chassis is required";
    }
    if (!vehicleDetails.date_of_commission.trim()) {
      newErrors.date_of_commission = "Date of Commission is required";
    }
    return newErrors;
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVehicleDetails(initialBasicVehicleDetails);
    setErrors({});
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const response = await fetch("/api/vehicle/add_vehicle_log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vehicleDetails),
      });
      const data = await response.json();
      if (!response.ok) {
        return alert(data.error?.error || "Something went wrong");
      }
      toast.success("Bus basic details added successfully");
      setVehicleDetails(initialBasicVehicleDetails);
    } catch (error) {
      console.error("Error in adding bus basic details", error);
    }
  };

  return (
    <div className="flex flex-col gap-0">
      <form className="flex flex-col gap-5 pt-8">
        <div className="grid grid-cols-4 gap-2">
          {/* Bonnet No */}
          <div className="flex flex-col gap-1">
            <p className="text-[12px]">
              Bonnet No. <span className="text-red-600">*</span>
            </p>
            <Input
              className={errors.bonet_no ? "border-red-500" : ""}
              value={vehicleDetails.bonet_no}
              onChange={(e) =>
                setVehicleDetails({ ...vehicleDetails, bonet_no: e.target.value })
              }
            />
            {errors.bonet_no && (
              <span className="text-red-500 text-xs">{errors.bonet_no}</span>
            )}
          </div>

          {/* Register No */}
          <div className="flex flex-col gap-1">
            <p className="text-[12px]">
              Register No. <span className="text-red-600">*</span>
            </p>
            <Input
              className={errors.register_no ? "border-red-500" : ""}
              value={vehicleDetails.register_no}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  register_no: e.target.value,
                })
              }
            />
            {errors.register_no && (
              <span className="text-red-500 text-xs">{errors.register_no}</span>
            )}
          </div>

          {/* Make of Chassis */}
          <div className="flex flex-col gap-1">
            <p className="text-[12px]">
              Make of Chassis <span className="text-red-600">*</span>
            </p>
            <Input
              className={errors.make_of_chasis ? "border-red-500" : ""}
              value={vehicleDetails.make_of_chasis}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  make_of_chasis: e.target.value,
                })
              }
            />
            {errors.make_of_chasis && (
              <span className="text-red-500 text-xs">
                {errors.make_of_chasis}
              </span>
            )}
          </div>

          {/* Makers Type of Vehicle */}
          <div className="flex flex-col gap-1">
            <p className="text-[12px]">Makers Type of Vehicle</p>
            <Input
              value={vehicleDetails.makers_type_of_vehicle}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  makers_type_of_vehicle: e.target.value,
                })
              }
            />
          </div>

          {/* Wheel Base */}
          <div className="flex flex-col gap-1">
            <p className="text-[12px]">Wheel Base</p>
            <Input
              value={vehicleDetails.wheel_base}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  wheel_base: e.target.value,
                })
              }
            />
          </div>

          {/* ST Unit No */}
          <div className="flex flex-col gap-1">
            <p className="text-[12px]">ST Unit No</p>
            <Input
              value={vehicleDetails.st_unit_no}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  st_unit_no: e.target.value,
                })
              }
            />
          </div>

          {/* Chasis No */}
          <div className="flex flex-col gap-1">
            <p className="text-[12px]">Chasis No</p>
            <Input
              value={vehicleDetails.chasis_no}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  chasis_no: e.target.value,
                })
              }
            />
          </div>

          {/* Engine No */}
          <div className="flex flex-col gap-1">
            <p className="text-[12px]">Engine No</p>
            <Input
              value={vehicleDetails.engine_no}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  engine_no: e.target.value,
                })
              }
            />
          </div>

          {/* Engine Make and Type */}
          <div className="flex flex-col gap-1">
            <p className="text-[12px]">Engine Make and Type</p>
            <Input
              value={vehicleDetails.engine_make_and_type}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  engine_make_and_type: e.target.value,
                })
              }
            />
          </div>

          {/* Type of Body */}
          <div className="flex flex-col gap-1">
            <p className="text-[12px]">Type of Body</p>
            <Input
              value={vehicleDetails.type_of_body}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  type_of_body: e.target.value,
                })
              }
            />
          </div>

          {/* Seating / Carrying Capacity */}
          <div className="flex flex-col gap-1">
            <p className="text-[12px]">Seating / Carrying Capacity</p>
            <Input
              value={vehicleDetails.seating_or_carrying_capacity}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  seating_or_carrying_capacity: e.target.value,
                })
              }
            />
          </div>

          {/* Unladen Weight */}
          <div className="flex flex-col gap-1">
            <p className="text-[12px]">Unladen Weight</p>
            <Input
              type="number"
              value={vehicleDetails.unladen_weight}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  unladen_weight: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>

          {/* Registered Laden Weight */}
          <div className="flex flex-col gap-1">
            <p className="text-[12px]">Registered Laden Weight</p>
            <Input
              type="number"
              value={vehicleDetails.registered_laden_weight}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  registered_laden_weight: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>

          {/* Chasis Weight Front */}
          <div className="flex flex-col gap-1">
            <p className="text-[12px]">Chasis Weight Front</p>
            <Input
              type="number"
              value={vehicleDetails.chasis_weight_front}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  chasis_weight_front: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>

          {/* Size of Type Rear */}
          <div className="flex flex-col gap-1">
            <p className="text-[12px]">Size of Type Rear</p>
            <Input
              value={vehicleDetails.size_of_type_rear}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  size_of_type_rear: e.target.value,
                })
              }
            />
          </div>

          {/* Date of Commission */}
          <div className="flex flex-col gap-1">
            <p className="text-[12px]">
              Date of Commission <span className="text-red-600">*</span>
            </p>
            <Input
              type="date"
              className={errors.date_of_commission ? "border-red-500" : ""}
              value={vehicleDetails.date_of_commission}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  date_of_commission: e.target.value,
                })
              }
            />
            {errors.date_of_commission && (
              <span className="text-red-500 text-xs">
                {errors.date_of_commission}
              </span>
            )}
          </div>

          {/* Body Built At */}
          <div className="flex flex-col gap-1">
            <p className="text-[12px]">Body Built At</p>
            <Input
              value={vehicleDetails.body_built_at}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  body_built_at: e.target.value,
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
            Create Vehicle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBasicVehicleDetailsForm;
