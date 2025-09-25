import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputFilter from "../input_filter";
import toast from "react-hot-toast";

interface Schedule {
  id: number;
  schedule_number: string;
  schedule_name: string;
  route_from: string;
  route_to: string;
  distance_km: string;
  duration_minutes: number;
  schedule_type: string;
  is_active: boolean;
  created_at: string;
}

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

interface BonnetNumberData {
  bonet_no: string;
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
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [allSchedule, setAllSchedule] = useState<Schedule[]>([]);
  const [scheduleLoading, setScheduleLoading] = useState<boolean>(false);
  const [allBusInfo, setAllBusInfo] = useState<BonnetNumberData[]>([]);

  const [busInfoLoading, setBusInfoLoading] = useState<boolean>(false);
// ✅ Validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!vehicleDetails.bonet_number.trim()) {
      newErrors.bonet_number = "Bonnet Number is required";
    }
    if (!vehicleDetails.registration_number.trim()) {
      newErrors.registration_number = "Registration Number is required";
    }
    if (!vehicleDetails.schedule_number.trim()) {
      newErrors.schedule_number = "Schedule Number is required";
    }
    return newErrors;
  };
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setVehicleDetails(initialVehicleData);
    setErrors({});
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const response = await fetch("/api/getAllBusInfo", {
        method: "POST",
        body: JSON.stringify(vehicleDetails),
      });
      const data = await response.json();
      if (!response.ok) {
        return alert(data.error.error || "something went wrong");
      }
      toast.success("Bus added succesfully");
      setVehicleDetails(initialVehicleData);
    } catch (error) {
      console.error("error in adding bus");
    }
  };

  // HANDLE SCHEDULE SELECT
  const handleScheduleSelect = (selectedData: Schedule) => {
    setVehicleDetails({
      ...vehicleDetails,
      schedule_number: selectedData.schedule_number,
    });
  };

  // HANDLE BONNET NUMBER SELECT
  const handleBonnetNumberSelect = (selectedData: BonnetNumberData) => {
    setVehicleDetails({
      ...vehicleDetails,
      bonet_number: selectedData.bonet_no,
    });
  };

  // GET ALL SCHEDULE DATA
  const getAllScheduleData = async () => {
    try {
      setScheduleLoading(true);

      const response = await fetch("/api/depot/get_schedule");
      const data = await response.json();

      if (!response.ok) {
        console.log(`error in fetching schedule data`);
        return;
      }
      setAllSchedule(data.data);
    } catch (error) {
      console.error(`error in fetching schedule data`);
    } finally {
      setScheduleLoading(false);
    }
  };

  // FETCH BUS INFO
  const fetchBusInfo = async () => {
    try {
      !busInfoLoading && setBusInfoLoading(true);

      const response = await fetch("/api/vehicle/get_vehiclelog");
      const data = await response.json();

      if (response.ok) {
        const formatedData = data.data.map((v: any) => {
          return { bonet_no: v.bonet_no };
        });
        setAllBusInfo(formatedData);
      }
    } catch (error) {
    } finally {
      setBusInfoLoading(false);
    }
  };

  useEffect(() => {
    getAllScheduleData();
    fetchBusInfo();
  }, []);

  return (
    <div className="flex flex-col gap-0">
      <form className=" flex flex-col gap-5 pt-8">
        <div className="grid grid-cols-4 gap-2">
          <div className="flex flex-col gap-3">
            <p className="text-[12px]">Bonnet Number <span className="text-[12px] text-red-600"> *</span></p>
            <InputFilter
              data={allBusInfo}
              dataIsLoading={busInfoLoading}
              filter_key="bonet_no"
              label="bonet_no"
              onSelectHanlder={handleBonnetNumberSelect}
            />
            {errors.bonet_number && (
              <span className="text-red-500 text-xs">{errors.bonet_number}</span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[12px]">Registration Number <span className="text-[12px] text-red-600"> *</span></p>
            <Input
              value={vehicleDetails.registration_number}
              onChange={(e) =>
                setVehicleDetails({
                  ...vehicleDetails,
                  registration_number: e.target.value,
                })
              }
            />
            {errors.registration_number && (
              <span className="text-red-500 text-xs">
                {errors.registration_number}
              </span>
            )}
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
            <p className="text-[12px]">Schedule Number <span className="text-[12px] text-red-600"> *</span></p>
            <InputFilter
              data={allSchedule}
              dataIsLoading={scheduleLoading}
              filter_key="schedule_number"
              label="schedule_number"
              onSelectHanlder={handleScheduleSelect}
            />
             {errors.schedule_number && (
              <span className="text-red-500 text-xs">{errors.schedule_number}</span>
            )}
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
            Add Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVehicleForm;
