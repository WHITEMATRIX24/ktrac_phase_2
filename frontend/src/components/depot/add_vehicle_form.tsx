import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VehicleData {
  bonet_number: string;
  registration_number: string;
  schedule_number: string;
  class: string;
  rc_id: string;
  pollution_certificate: string;
  body_type: string;
  zone: string;
  vehicle_no: string;
  fuel_type: string;
  registration_date: string;
}

// INITIAL EMPTY STATE
const initialVehicleData: VehicleData = {
  bonet_number: "",
  registration_number: "",
  schedule_number: "",
  class: "",
  rc_id: "",
  pollution_certificate: "",
  body_type: "",
  zone: "",
  vehicle_no: "",
  fuel_type: "",
  registration_date: "",
};

const AddVehicleForm = () => {
  const [vehicleDetails, setVehicleDetails] =
    useState<VehicleData>(initialVehicleData);

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVehicleDetails(initialVehicleData);
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/getAllBusInfo", {
        method: "POST",
        body: JSON.stringify(vehicleDetails),
      });
      const data = await response.json();
      if (!response.ok) {
        return alert(data.error.error || "something went wrong");
      }
      alert("Bus added succesfully");
    } catch (error) {
      console.error("error in adding bus");
    }
  };
  return (
    <div className="flex flex-col gap-0">
      <form className=" flex flex-col gap-5 pt-8">
        <div className="grid grid-cols-4 gap-2">
          <div className="flex flex-col gap-3">
            <p className="text-[12px]">Bonet Number</p>
            <Input
              value={vehicleDetails.bonet_number}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  bonet_number: e.target.value,
                })
              }
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[12px]">Registration Number</p>
            <Input
              value={vehicleDetails.registration_number}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  registration_number: e.target.value,
                })
              }
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[12px]">Class</p>
            <Select
              onValueChange={(value) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  class: value,
                })
              }
              value={vehicleDetails.class}
            >
              <SelectTrigger
                size="sm"
                className="w-full px-3 py-0 border border-slate-300 rounded-md text-[12px] text-black shadow-sm "
              >
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AC PREMIUM SF">AC PREMIUM SF</SelectItem>
                <SelectItem value="AC SEATER">AC SEATER</SelectItem>
                <SelectItem value="AC SLEEPER">AC SLEEPER</SelectItem>
                <SelectItem value="BD VAN">BD VAN</SelectItem>
                <SelectItem value="ELECTRIC BUS">ELECTRIC BUS</SelectItem>
                <SelectItem value="ELECTRIC DOUBLE DECKER">
                  ELECTRIC DOUBLE DECKER
                </SelectItem>
                <SelectItem value="FAST PASSENGER">FAST PASSENGER</SelectItem>
                <SelectItem value="GARAUDA PREMIUM">GARAUDA PREMIUM</SelectItem>
                <SelectItem value="HYBRID AC SLEEPER CUM SEATER">
                  HYBRID AC SLEEPER CUM SEATER
                </SelectItem>
                <SelectItem value="HYBRID NON AC SLEEPER CUM SEATER">
                  HYBRID NON AC SLEEPER CUM SEATER
                </SelectItem>
                <SelectItem value="JN AC">JN AC</SelectItem>
                <SelectItem value="JN NAC">JN NAC</SelectItem>
                <SelectItem value="KS DELUX">KS DELUX</SelectItem>
                <SelectItem value="KS SUPER FAST">KS SUPER FAST</SelectItem>
                <SelectItem value="KSRTC DRIVING SCHOOL BUS">
                  KSRTC DRIVING SCHOOL BUS
                </SelectItem>
                <SelectItem value="MINI BUS">MINI BUS</SelectItem>
                <SelectItem value="ORDINARY">ORDINARY</SelectItem>
                <SelectItem value="OTHER RTC VEHICLE">
                  OTHER RTC VEHICLE
                </SelectItem>
                <SelectItem value="SUPER DELUX">SUPER DELUX</SelectItem>
                <SelectItem value="SUPER EXPRESS">SUPER EXPRESS</SelectItem>
                <SelectItem value="SUPER FAST">SUPER FAST</SelectItem>
                <SelectItem value="SWB">SWB</SelectItem>
                <SelectItem value="VESTIBULE">VESTIBULE</SelectItem>
                <SelectItem value="VOLVO MULTI AXLE">
                  VOLVO MULTI AXLE
                </SelectItem>
                <SelectItem value="VOLVO SINGLE AXLE">
                  VOLVO SINGLE AXLE
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[12px]">RC ID</p>
            <Input
              value={vehicleDetails.rc_id}
              onChange={(e) =>
                setVehicleDetails({ ...vehicleDetails, rc_id: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[12px]">Pollution Certificate</p>
            <Input
              value={vehicleDetails.pollution_certificate}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  pollution_certificate: e.target.value,
                })
              }
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[12px]">Body Type</p>
            <Input
              value={vehicleDetails.body_type}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  body_type: e.target.value,
                })
              }
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[12px]">Register Date</p>
            <Input
              value={vehicleDetails.registration_date}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  registration_date: e.target.value,
                })
              }
              type="date"
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[12px]">Zone</p>
            <Input
              value={vehicleDetails.zone}
              onChange={(e) =>
                setVehicleDetails({ ...vehicleDetails, zone: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[12px]">Vehicle Number</p>
            <Input
              value={vehicleDetails.vehicle_no}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  vehicle_no: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[12px]">Schedule Number</p>
            <Input
              value={vehicleDetails.schedule_number}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  schedule_number: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-[12px]">Fuel type</p>
            <Select
              onValueChange={(value) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  fuel_type: value,
                })
              }
              value={vehicleDetails.fuel_type}
            >
              <SelectTrigger
                size="sm"
                className="w-full px-3 py-0 border border-slate-300 rounded-md text-[12px] text-black shadow-sm "
              >
                <SelectValue placeholder="Select fuel type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DIESEL">DIESEL</SelectItem>
                <SelectItem value="ELECTRIC">ELECTRIC</SelectItem>
                <SelectItem value="CNG">CNG</SelectItem>
              </SelectContent>
            </Select>
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
            Add Vehicle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicleForm;
