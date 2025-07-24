"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, LogOut } from "lucide-react";

type BusData = {
  bonet_number: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  accident_id: string;
  bonet_no: string;
  created_at: string;
  vehicle_info: {
    vehicle_id: number;
    vehicle_type: string;
    model: string;
    registration_date: string | null;
  };
  details: {
    depot_name: string;
    depot_abv: string;
    month: string;
    year: string;
    serial_number: string;
    format: string;
  };
  additional_data: Record<string, unknown>;
  note: string;
};

const ZerothReportReg = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    bonnetNumber: "",
    operatedDepot: "",
  });

  const [allBuses, setAllBuses] = useState<BusData[]>([]);
  const [filteredBuses, setFilteredBuses] = useState<BusData[]>([]);
  const [busLoading, setBusLoading] = useState(false);
  const [busError, setBusError] = useState("");
  const [showBusDropdown, setShowBusDropdown] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const busRef = useRef<HTMLDivElement>(null);
  const [depots, setDepots] = useState<{ name: string; abv: string }[]>([]);
  const [filteredDepots, setFilteredDepots] = useState<
    { name: string; abv: string }[]
  >([]);
  const [showDepotDropdown, setShowDepotDropdown] = useState(false);
  const depotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBusData = async () => {
      try {
        setBusLoading(true);
        setBusError("");
        const response = await fetch("/api/getAllBusInfo");

        if (!response.ok)
          throw new Error(`Failed to fetch buses: ${response.status}`);

        const result = await response.json();
        if (result.data && Array.isArray(result.data)) {
          setAllBuses(result.data);
          setFilteredBuses(result.data);
        } else {
          throw new Error("Unexpected bus data format");
        }
      } catch (err) {
        setBusError("Failed to load bus data: " + (err as Error).message);
      } finally {
        setBusLoading(false);
      }
    };

    fetchBusData();
  }, []);
  useEffect(() => {
    const fetchDepots = async () => {
      try {
        const res = await fetch("/api/getAllDepo");
        const json = await res.json();
        const flatDepots =
          json.data?.flatMap((dist: any) =>
            dist.depot.map((d: any) => ({
              name: d["depot-name"],
              abv: d["depot-abv"],
            }))
          ) || [];
        setDepots(flatDepots);
        setFilteredDepots(flatDepots);
      } catch (err) {
        console.error("Depot fetch error:", err);
      }
    };
    fetchDepots();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (busRef.current && !busRef.current.contains(event.target as Node)) {
        setShowBusDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        depotRef.current &&
        !depotRef.current.contains(event.target as Node)
      ) {
        setShowDepotDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "bonnetNumber") {
      const term = value.toLowerCase();
      setFilteredBuses(
        allBuses.filter((bus) => bus.bonet_number?.toLowerCase().includes(term))
      );
      setShowBusDropdown(true);
    }
    if (name === "operatedDepot") {
      const term = value.toLowerCase();
      setFormData((prev) => ({ ...prev, [name]: value }));
      setFilteredDepots(
        depots.filter(
          (d) =>
            d.name.toLowerCase().includes(term) ||
            d.abv.toLowerCase().includes(term)
        )
      );
      setShowDepotDropdown(true);
    }
  };

  const handleSelectBus = (bonnetNo: string) => {
    setFormData((prev) => ({ ...prev, bonnetNumber: bonnetNo }));
    setShowBusDropdown(false);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.bonnetNumber)
      newErrors.bonnetNumber = "Bonnet number is required";
    if (!formData.operatedDepot)
      newErrors.operatedDepot = "Operated depot is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setApiLoading(true);
      setApiError("");

      // Call the validate API
      const response = await fetch("/api/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bonet_no: formData.bonnetNumber,
          depot_name: formData.operatedDepot,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const result: ApiResponse = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Validation failed");
      }

      // Store the response data in local storage

      // Also store in session storage for immediate use
      sessionStorage.setItem(
        "accidentData",
        JSON.stringify({
          bonnetNumber: formData.bonnetNumber,
          operatedDepot: formData.operatedDepot,
          referenceNumber: result.accident_id,
        })
      );

      router.push("/Accident_Zeroth_Report/ZerothForm");
    } catch (err) {
      setApiError("Failed to validate data: " + (err as Error).message);
      console.error("Validation error:", err);
    } finally {
      setApiLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    sessionStorage.clear();
    router.push("/");
  };
  const MalayalamText = ({ text }: { text: string }) => (
    <span className="text-[10px]">{text}</span>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex justify-between items-center p-4 bg-white shadow-sm">
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
          <h2 className="text-lg font-semibold">
            Accident Spot Report - Registration
          </h2>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center text-red-600 hover:bg-gray-100 px-3 py-1 rounded text-sm"
        >
          <LogOut className="w-4 h-4 mr-1" />
          Logout
        </button>
      </div>

      <div className="flex-1 p-4 w-full h-full">
        <div className="bg-white border rounded-sm shadow-sm w-full min-h-[80vh] p-4 sm:p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Enter Vehicle Details <br />
              <span className="text-[16px]">വാഹന വിശദാംശങ്ങൾ നൽകുക</span>
            </h3>
          </div>

          {apiError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1 relative" ref={busRef}>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Bus Number (Bonnet No) <span className="text-red-600">*</span>
                  <span className="text-xs text-gray-500 block">
                    <MalayalamText text="ബസ് നമ്പർ (ബോണറ്റ് നമ്പർ)" />
                  </span>
                </label>
                <input
                  name="bonnetNumber"
                  value={formData.bonnetNumber}
                  onChange={handleChange}
                  onFocus={() => setShowBusDropdown(true)}
                  className={`w-full px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 ${
                    errors.bonnetNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Search bus number"
                  autoComplete="off"
                />
                {errors.bonnetNumber && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.bonnetNumber}
                  </p>
                )}
                {showBusDropdown && (
                  <div className="absolute z-10 w-full bg-white border mt-1 rounded shadow max-h-60 overflow-y-auto">
                    {busLoading ? (
                      <div className="p-3 text-center text-gray-500">
                        Loading buses... /{" "}
                        <MalayalamText text=" ബസുകൾ ലോഡ് ചെയ്യുന്നു..." />
                      </div>
                    ) : busError ? (
                      <div className="p-3 text-red-500">{busError}</div>
                    ) : filteredBuses.length === 0 ? (
                      <div className="p-3 text-center text-gray-500">
                        No matching buses found /{" "}
                        <MalayalamText text=" അനുയോജ്യമായ ബസുകൾ കണ്ടെത്തിയില്ല" />
                      </div>
                    ) : (
                      <ul>
                        {filteredBuses.map((bus, index) => (
                          <li
                            key={`bus-${bus.bonet_number}-${index}`}
                            className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer border-b last:border-0"
                            onClick={() => handleSelectBus(bus.bonet_number)}
                          >
                            {bus.bonet_number}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              <div className="flex-1 relative" ref={depotRef}>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Operated Depot <span className="text-red-600">*</span>
                  <span className="text-[10px] text-gray-500 block">
                    ഓപ്പറേറ്റഡ് ഡിപ്പോ
                  </span>
                </label>
                <input
                  name="operatedDepot"
                  value={formData.operatedDepot}
                  onChange={handleChange}
                  onFocus={() => setShowDepotDropdown(true)}
                  className={`w-full px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 ${
                    errors.operatedDepot ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Search depot by name or abbreviation"
                  autoComplete="off"
                />
                {errors.operatedDepot && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.operatedDepot}
                  </p>
                )}
                {showDepotDropdown && (
                  <div className="absolute z-10 w-full bg-white border mt-1 rounded shadow max-h-60 overflow-y-auto">
                    {filteredDepots.length === 0 ? (
                      <div className="p-3 text-center text-gray-500">
                        No matching depots /{" "}
                        <MalayalamText text=" അനുയോജ്യമായ ഡിപ്പോകൾ കണ്ടെത്തിയില്ല" />
                      </div>
                    ) : (
                      <ul>
                        {filteredDepots.map((d, index) => (
                          <li
                            key={`depot-${d.abv}-${index}`}
                            className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer border-b last:border-0"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                operatedDepot: d.name,
                              }));
                              setShowDepotDropdown(false);
                            }}
                          >
                            {d.abv.toUpperCase()} - {d.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 flex justify-center md:justify-end">
              <button
                type="submit"
                disabled={apiLoading}
                className={`py-2.5 px-4 bg-[var(--sidebar)] text-white rounded hover:bg-[#001670] transition-colors text-sm font-medium shadow-md ${
                  apiLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {apiLoading ? (
                  <span>Processing... </span>
                ) : (
                  <span>Continue</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ZerothReportReg;
