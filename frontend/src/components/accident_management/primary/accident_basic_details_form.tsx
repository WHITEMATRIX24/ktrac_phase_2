// components/AccidentBasicDetailsForm.tsx
"use client";

import React from "react";
import MapComponent from "../../MapComponent"; // adjust path if needed

interface Depot {
  name: string;
  abv: string;
}

interface AccidentBasicDetailsProps {
  formData: any;
  errors: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeDepoSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setShowDepotDropdown: (show: boolean) => void;
  handleHomeDepo: (depotName: string) => void;
  showDepotDropdown: boolean;
  filteredDepots: Depot[];
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSuggestionClick: (place: any) => void;
  suggestions: any[];
  fetchPlaceName: (lat: number, lng: number) => Promise<string>;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const AccidentBasicDetailsForm: React.FC<AccidentBasicDetailsProps> = ({
  formData,
  errors,
  handleChange,
  handleChangeDepoSelect,
  setShowDepotDropdown,
  handleHomeDepo,
  showDepotDropdown,
  filteredDepots,
  searchQuery,
  handleSearchChange,
  handleSuggestionClick,
  suggestions,
  fetchPlaceName,
  setFormData,
  setSearchQuery,
}) => {
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-3 sm:p-4 md:p-2 mb-1.5">
      {/* LEFT SECTION */}
      <div className="bg-white border-2 border-gray-400 rounded-[8px] overflow-auto">
        <h3 className="text-[16px] font-[600] pb-2 border-b-2 border-[var(--sidebar)] p-[16px]">
          Basic Details{" "}
          <span className="text-[14px]">(അടിസ്ഥാന വിവരങ്ങൾ)</span>
        </h3>
        <div className="space-y-4 p-[16px]">
          {/* Schedule Number */}
          <div>
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Schedule Number (Cdit)
              <span className="text-[10px]"> (ഷെഡ്യൂൾ നമ്പർ (സിഡിറ്റ്))</span>
              <span className="text-[10px] text-red-600">*</span>
            </label>
            <input
              type="text"
              name="scheduleNumber"
              value={formData.scheduleNumber}
              readOnly
              className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] bg-gray-50 rounded text-xs"
            />
          </div>

          {/* Schedule Name */}
          <div>
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Schedule Name
              <span className="text-[10px]"> (ഷെഡ്യൂൾ പേര്)</span>
              <span className="text-[10px] text-red-600">*</span>
            </label>
            <input
              type="text"
              name="operatedScheduleName"
              value={formData.operatedScheduleName}
              onChange={handleChange}
              className={`w-full py-[8px] px-[12px] border rounded text-xs bg-white ${
                errors.operatedScheduleName
                  ? "border-red-500"
                  : "border-[#d1d5db]"
              }`}
            />
            {errors.operatedScheduleName && (
              <p className="text-xs text-red-600 mt-1">
                {errors.operatedScheduleName}
              </p>
            )}
          </div>

          {/* Home Depot */}
          <div className="relative">
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Home Depot
              <span className="text-[10px]"> (ഹോം ഡിപ്പോ)</span>
              <span className="text-[10px] text-red-600">*</span>
            </label>
            <input
              name="homeDepot"
              value={formData.homeDepot}
              onChange={handleChangeDepoSelect}
              onFocus={() => setShowDepotDropdown(true)}
              className={`w-full px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 ${
                errors.homeDepot ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Search depot by name or abbreviation"
              autoComplete="off"
            />
            {errors.homeDepot && (
              <p className="text-xs text-red-600 mt-1">
                {errors.homeDepot}
              </p>
            )}
            {showDepotDropdown && (
              <div className="absolute z-10 w-full bg-white border mt-1 rounded shadow max-h-60 overflow-y-auto">
                {filteredDepots.length === 0 ? (
                  <div className="p-3 text-center text-gray-500">
                    No matching depots{" "}
                    <span>അനുയോജ്യമായ ഡിപ്പോകൾ കണ്ടെത്തിയില്ല</span>
                  </div>
                ) : (
                  <ul>
                    {filteredDepots.map((d, index) => (
                      <li
                        key={`depot-${d.abv}-${index}`}
                        className="px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer border-b last:border-0"
                        onClick={() => handleHomeDepo(d.name)}
                      >
                        {d.abv.toUpperCase()} - {d.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Coordinates and Map */}
          <div>
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Accident Location (Lat, Long)
              <span className="text-[10px]">
                {" "}
                (അപകട സ്ഥലം (ലാറ്റിറ്റ്യൂഡ്, ലോംഗിറ്റ്യൂഡ്))
              </span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Latitude (ലാറ്റിറ്റ്യൂഡ്)"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="w-1/2 py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
              />
              <input
                type="text"
                placeholder="Longitude (ലോംഗിറ്റ്യൂഡ്)"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="w-1/2 py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
              />
            </div>

            {/* Place Search */}
            <div className="mt-2 relative z-50">
              <input
                type="text"
                placeholder="Search a place (സ്ഥലം തിരയൂ)"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full py-[8px] px-[12px] border border-gray-300 rounded text-xs"
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-100 bg-white border border-gray-300 rounded w-full max-h-40 overflow-y-auto text-xs shadow">
                  {suggestions.map((place, idx) => (
                    <li
                      key={idx}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSuggestionClick(place)}
                    >
                      {place.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Leaflet Map */}
            <div className="mt-2 h-48 border rounded overflow-visible relative z-10">
              {formData.latitude &&
              formData.longitude &&
              !isNaN(parseFloat(formData.latitude)) &&
              !isNaN(parseFloat(formData.longitude)) ? (
                <MapComponent
                  latitude={parseFloat(formData.latitude)}
                  longitude={parseFloat(formData.longitude)}
                  onLocationChange={async (lat: number, lng: number) => {
                    const placeName = await fetchPlaceName(lat, lng);
                    setSearchQuery(placeName);
                    setFormData((prev: any) => ({
                      ...prev,
                      latitude: lat.toFixed(6),
                      longitude: lng.toFixed(6),
                    }));
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-sm text-gray-500">
                  Location not selected{" "}
                  <span className="text-[10px]">
                    (സ്ഥലം തിരഞ്ഞെടുത്തിട്ടില്ല)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="bg-white border-2 border-gray-400 rounded-[8px] overflow-auto">
        <h3 className="text-[16px] font-[600] pb-2 border-b-2 border-[var(--sidebar)] p-[16px]">
          Other Vehicle Involved{" "}
          <span className="text-[14px]">(മറ്റ് വാഹനം ഉൾപ്പെട്ടത്)</span>
        </h3>
        <div className="space-y-4 p-[16px]">
          <div>
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Type of Other Vehicle Involved{" "}
              <span className="text-[10px]">(മറ്റ് വാഹനത്തിന്റെ തരം)</span>
            </label>
            <input
              name="typeOfOtherVehicle"
              value={formData.typeOfOtherVehicle}
              onChange={handleChange}
              className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
            />
          </div>
          <div>
            <label className="text-[12px] text-[#374151] mb-[6px]">
              Vehicle Reg. Number{" "}
              <span className="text-[10px]">(വാഹന രജിസ്ട്രേഷൻ നമ്പർ)</span>
            </label>
            <input
              name="involvedVehicleRegNumbers"
              value={formData.involvedVehicleRegNumbers}
              onChange={handleChange}
              className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccidentBasicDetailsForm;
