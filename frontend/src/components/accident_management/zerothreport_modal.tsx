"use client";
import { dateToLocaleFormater } from "@/utils/dateFormater";
import { Divider } from "@mui/material";
import { Plus } from "lucide-react";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import ZerothReport from './zerothReportForm';


interface Props {
  caseSelectHandler: (selectedData: any) => void;
}

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


const dateToday = () => {
  const date = new Date();
  const isoString = date.toISOString();
  const dateToday = isoString.split("T")[0];
  return dateToday;
};

const CombinedAccidentComponent = ({ caseSelectHandler }: { caseSelectHandler?: (selectedData: any) => void }) => {
  const [date, setDate] = useState(dateToday());
  const [district, setDistrict] = useState("");
  const [depo, setDepo] = useState("");
  const [bonnetNo, setBonnetNo] = useState("");
  const [showBonnetDropDown, setShowBonnetDropDown] = useState(false);
  const [accidentList, setAccidentList] = useState<{}[] | null>([]);
    const [allBusInfo, setAllbusinfo] = useState<BusData[]>([]);
    const [filteredBusinfo, setFilteredbusInfo] = useState<BusData[]>([]);
  const [allDepos, setAllDepos] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
    const [zerothFrom, setZerothForm] = useState<boolean>(false);
    const depotRef = useRef<HTMLDivElement>(null);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [formData, setFormData] = useState({
        bonnetNumber: '',
        operatedDepot: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [apiLoading, setApiLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const busRef = useRef<HTMLDivElement>(null);
    const [depots, setDepots] = useState<{ name: string; abv: string }[]>([]);
    const [filteredDepots, setFilteredDepots] = useState<{ name: string; abv: string }[]>([]);
    const [showDepotDropdown, setShowDepotDropdown] = useState(false);
    const [accidentReferenceNumber, setAccidentReferencenumber] =
        useState<string>("");

  const bonnetNumberContainrerRef = useRef<HTMLDivElement | null>(null);
  const bonnetnumberInputRef = useRef<HTMLInputElement | null>(null);

  // Common bus data fetch
    useEffect(() => {
        const fetchBusData = async () => {
            try {
                const response = await fetch('/api/getAllBusInfo');
                if (!response.ok) throw new Error(`Failed to fetch buses: ${response.status}`);
                const result = await response.json();
                if (result.data && Array.isArray(result.data)) {
                    setAllbusinfo(result.data);
                    setFilteredbusInfo(result.data);
                } else {
                    throw new Error('Unexpected bus data format');
                }
            } catch (err) {
                console.error('Failed to load bus data:', err);
            }
        };



        fetchBusData();

    }, []);
    useEffect(() => {
        const fetchDepots = async () => {
            try {
                const res = await fetch('/api/getAllDepo');
                const json = await res.json();
                const flatDepots = json.data?.flatMap((dist: any) =>
                    dist.depot.map((d: any) => ({
                        name: d["depot-name"],
                        abv: d["depot-abv"]
                    }))
                ) || [];
                setDepots(flatDepots);
                setFilteredDepots(flatDepots);
                setAllDepos(flatDepots);
            } catch (err) {
                console.error("Depot fetch error:", err);
            }

        };
        fetchDepots();
    }, []);
    

  // search handler
  const handleSearch = async () => {
    if (!date && !bonnetNo && !district && !depo && !accidentReferenceNumber)
      return;

    if ((date || bonnetNo || district || depo) && accidentReferenceNumber)
      return alert("select either filter or reference number");

    try {
      !isLoading && setIsLoading(true);

      if (accidentReferenceNumber) {
        const response = await fetch(
          `/api/searchZerothReportById?accident_reference_number=${accidentReferenceNumber.replaceAll(
            "/",
            "_"
          )}`
        );
        const data = await response.json();
        // console.log(data);

        setAccidentList(data.data ? [data.data] : []);
      } else {
        const response = await fetch(
          `/api/searchZerothReport?date=${date}&district=${district}&depo=${depo}&bonnet_no=${bonnetNo}`
        );
        const data = await response.json();
        setAccidentList(data.data || []);
      }
    } catch (error) {
      console.log("error in filtering");
    } finally {
      setIsLoading(false);
    }
  };

  // clear handler
  const handleClear = () => {
    setAccidentList(null);
    setDate("");
    setBonnetNo("");
    setDistrict("");
    setDepo("");
  };

  // handle case select
  const handlecaseSelect = (selectedData: any) => {
        if (caseSelectHandler) {
            caseSelectHandler(selectedData);
        }
    };

  useEffect(() => {
      handleSearch();
    }, []);
  
  const handleSearchBonnetNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBonnetNo(value);
    setFilteredbusInfo((prevData) => {
      const filteredData = allBusInfo.filter((f: any) =>
        f.bonet_number.toLowerCase().includes(value.toLowerCase())
      );
      return filteredData;
    });
  };

  /* const getAllBusInfoHandler = async () => {
    try {
      const response = await fetch("/api/getAllBusInfo");
      const data = await response.json();
      setFilteredbusInfo(data.data);
      setAllbusinfo(data.data);
    } catch (error) {
      console.log("error on getting bus details");
    }
  }; */

  const getAllDepoHandler = async () => {
    try {
      const response = await fetch("/api/getAllDepos");
      const data = await response.json();
      setAllDepos(data.data);
    } catch (error) {
      console.log("error on getting depo details");
    }
  };



  useEffect(() => {
    const handleBonnetNumberContainerClose = (event: MouseEvent) => {
      if (
        bonnetNumberContainrerRef.current &&
        !bonnetNumberContainrerRef.current.contains(event?.target as Node) &&
        bonnetnumberInputRef.current &&
        !bonnetnumberInputRef.current.contains(event.target as Node)
      ) {
        setShowBonnetDropDown(false);
      }
    };

    document.addEventListener("click", handleBonnetNumberContainerClose);

    return () => {
      document.removeEventListener("click", handleBonnetNumberContainerClose);
    };
  }, []);
  
    // Registration form handlers
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));

        if (name === 'bonnetNumber') {
            const term = value.toLowerCase();
            setFilteredbusInfo(allBusInfo.filter(bus =>
                bus.bonet_number?.toLowerCase().includes(term)
            ));
            setShowBonnetDropDown(true);
        }
    };

    const handleSelectBus = (bonnetNo: string) => {
        setFormData(prev => ({ ...prev, bonnetNumber: bonnetNo }));
        setShowBonnetDropDown(false);
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.bonnetNumber) newErrors.bonnetNumber = 'Bonnet number is required';
        if (!formData.operatedDepot) newErrors.operatedDepot = 'Operated depot is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            setApiLoading(true);
            setApiError('');

            const response = await fetch('/api/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
                throw new Error(result.message || 'Validation failed');
            }

            sessionStorage.setItem('accidentData', JSON.stringify({
                bonnetNumber: formData.bonnetNumber,
                operatedDepot: formData.operatedDepot,
                referenceNumber: result.accident_id,
            }));
            setZerothForm(true);


        } catch (err) {
            setApiError('Failed to validate data: ' + (err as Error).message);
            console.error('Validation error:', err);
        } finally {
            setApiLoading(false);
        }
    };
    const MalayalamText = ({ text }: { text: string }) => (
        <span className="text-[10px]">{text}</span>
    );

 const toggleForm = () => {
        setShowRegistrationForm(!showRegistrationForm);
        setAccidentList(null);
        setApiError('');
    };
    if (zerothFrom) {
        return <ZerothReport />;
    }
  return (
    <div className="min-h-screen flex flex-col">
        <div className="flex-1 px-4 w-full h-full">
            {showRegistrationForm ? (
                        <div className="bg-white border rounded-sm shadow-sm w-full min-h-[80vh] p-4 sm:p-6 mt-3">
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
                                            onFocus={() => setShowBonnetDropDown(true)}
                                            className={`w-full px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 ${errors.bonnetNumber ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="Search bus number"
                                            autoComplete="off"
                                        />
                                        {errors.bonnetNumber && (
                                            <p className="text-xs text-red-600 mt-1">{errors.bonnetNumber}</p>
                                        )}
                                        {showBonnetDropDown && (
                                            <div className="absolute z-10 w-full bg-white border mt-1 rounded shadow max-h-60 overflow-y-auto">
                                                {isLoading ? (
                                                    <div className="p-3 text-center text-gray-500">
                                                        Loading buses... / <MalayalamText text=" ബസുകൾ ലോഡ് ചെയ്യുന്നു..." />
                                                    </div>
                                                ) : filteredBusinfo.length === 0 ? (
                                                    <div className="p-3 text-center text-gray-500">
                                                        No matching buses found / <MalayalamText text=" അനുയോജ്യമായ ബസുകൾ കണ്ടെത്തിയില്ല" />
                                                    </div>
                                                ) : (
                                                    <ul>
                                                        {filteredBusinfo.map((bus, index) => (
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
                                            <span className="text-[10px] text-gray-500 block">ഓപ്പറേറ്റഡ് ഡിപ്പോ</span>
                                        </label>
                                        <input
                                            name="operatedDepot"
                                            value={formData.operatedDepot}
                                            onChange={handleChange}
                                            onFocus={() => setShowDepotDropdown(true)}
                                            className={`w-full px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 ${errors.operatedDepot ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="Search depot by name or abbreviation"
                                            autoComplete="off"
                                        />
                                        {errors.operatedDepot && (
                                            <p className="text-xs text-red-600 mt-1">{errors.operatedDepot}</p>
                                        )}
                                        {showDepotDropdown && (
                                            <div className="absolute z-10 w-full bg-white border mt-1 rounded shadow max-h-60 overflow-y-auto">
                                                {filteredDepots.length === 0 ? (
                                                    <div className="p-3 text-center text-gray-500">
                                                        No matching depots / <MalayalamText text=" അനുയോജ്യമായ ഡിപ്പോകൾ കണ്ടെത്തിയില്ല" />
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
    
                                <div className="pt-2 flex justify-between">
                                    <button
                                        type="button"
                                        onClick={toggleForm}
                                        className="py-1 px-4 border text-gray-700 rounded hover:bg-gray-100 transition-colors text-[12px] font-medium"
                                    >
                                        Back to Search
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={apiLoading}
                                        className={`py-1 px-4 bg-[var(--sidebar-bg)] text-white rounded transition-colors text-[12px] font-medium shadow-md ${apiLoading ? 'opacity-70 cursor-not-allowed' : ''
                                            }`}
                                    >
                                        {apiLoading ? <span>Processing... </span> : <span>Continue</span>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
            <div className="w-full flex flex-col px-3 my-5">
              <div className="relative bg-white flex flex-col gap-5 rounded-sm">
                <div className="flex items-start gap-5 w-[79vw]">
                  <div className="grid grid-cols-2 gap-5 items-end text-[12px] w-[60%]">
                    <div className="flex flex-col">
                      <label>
                        Date /<span className="text-[10px]"> തീയതി</span>
                      </label>
                      <input
                        onChange={(e) => setDate(e.target.value)}
                        type="date"
                        className="px-3 py-2 border rounded-sm"
                        value={date}
                      />
                    </div>
                    <div className="relative flex flex-col">
                      <label>
                        Bonnet No. /<span className="text-[10px]"> ബോണറ്റ് നമ്പർ</span>
                      </label>
                      <input
                        ref={bonnetnumberInputRef}
                        type="text"
                        placeholder="Bonnet number"
                        className="px-3 py-2 border rounded-sm"
                        onClick={() => setShowBonnetDropDown(true)}
                        value={bonnetNo}
                        onChange={handleSearchBonnetNumber}
                      />
                      {showBonnetDropDown && (
                        <div
                          ref={bonnetNumberContainrerRef}
                          className="absolute border flex flex-col gap-1 top-14 bg-slate-50 rounded-sm px-3 py-2 w-40 h-52 overflow-auto"
                        >
                          {filteredBusinfo.map((d: any) => (
                            <button
                              onClick={() => {
                                setBonnetNo(d.bonet_number);
                                setShowBonnetDropDown(false);
                              }}
                              className="py-2 text-start"
                              key={d.bonet_number}
                            >
                              {d.bonet_number}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label>
                        District /<span className="text-[10px]"> ജില്ല</span>
                      </label>
                      <select
                        onChange={(e) => setDistrict(e.target.value)}
                        className="px-3 py-2 border rounded-sm"
                        value={district}
                      >
                        <option value="">Select District</option>
                        <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                        <option value="Kollam">Kollam</option>
                        <option value="Pathanamthitta">Pathanamthitta</option>
                        <option value="Alappuzha">Alappuzha</option>
                        <option value="Kottayam">Kottayam</option>
                        <option value="Idukki">Idukki</option>
                        <option value="Ernakulam">Ernakulam</option>
                        <option value="Thrissur">Thrissur</option>
                        <option value="Palakkad">Palakkad</option>
                        <option value="Malappuram">Malappuram</option>
                        <option value="Kozhikode">Kozhikode</option>
                        <option value="Wayanad">Wayanad</option>
                        <option value="Kannur">Kannur</option>
                        <option value="Kasaragod">Kasaragod</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                                        <label>
                                            Operated Depot /<span className="text-[10px]"> പ്രവർത്തിക്കുന്ന ഡിപ്പോ</span>
                                        </label>
                                        <select
                                            onChange={(e) => setDepo(e.target.value)}
                                            className="px-3 py-2 border rounded-sm"
                                            value={depo}
                                        >
                                            <option value="" disabled>
                                                Select Depot
                                            </option>
                                            {allDepos.length === 0 ? (
                                                <option disabled>No depots available</option>
                                            ) : (
                                                allDepos.map((d: any) => (
                                                    <option key={d.name} value={d.name}>
                                                        {`${d.abv.toUpperCase()} - ${d.name}`}
                                                    </option>
                                                ))
                                            )}

                                        </select>
                                    </div>
                  </div>
                  <div className="h-full border w-0"></div>
                  <div className="flex flex-col gap-3 w-[40%]">
                    <h6>
                      Accident Reference Number <span className="text-red-600">*</span>
                    </h6>
                    <input
                      type="text"
                      placeholder="Enter Accident Reference"
                      value={accidentReferenceNumber}
                      onChange={(e) => setAccidentReferencenumber(e.target.value)}
                      className="flex-1 border px-3 py-1 bg-white rounded-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center px-3 py-2 bg-slate-50">
                                        <div className="flex gap-3 ms-auto">
                                            <button onClick={handleClear} className="border px-3 py-1 rounded-sm bg-white">
                                                Clear
                                            </button>
                                            <button
                                                onClick={handleSearch}
                                                className="border px-3 py-1 rounded-sm bg-[var(--sidebar-bg)] text-white"
                                            >
                                                Search
                                            </button>
                                            {!showRegistrationForm && (
                                                <button
                                                    onClick={toggleForm}
                                                    className="flex items-center gap-2 bg-[var(--sidebar-bg)] text-white px-3 py-2 rounded text-[12px]"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                    Add Accident
                                                </button>
                                            )}
                                        </div>
                                    </div>
              </div>
        
              <div className="grid grid-cols-2 gap-3 py-5">
                {isLoading ? (
                  <p>loading...</p>
                ) : !isLoading && accidentList && accidentList?.length < 1 ? (
                  <p>no data found</p>
                ) : (
                  accidentList &&
                  accidentList.map((d: any) => (
                    <div
                      key={d.accident_id}
                      className="w-full px-3 py-5 flex flex-col bg-white cursor-pointer rounded-sm"
                      onClick={() => handlecaseSelect(d)}
                    >
                      <div className="flex flex-col gap-1">
                        <div className="font-semibold">
                          <label>Reference number:</label>
                          <label className="ml-1">
                            {d.accident_id.replaceAll("_", "/")}
                          </label>
                        </div>
                        <p>
                          Bonnet number:{" "}
                          <span className="ml-1">{d.vehicle_info.bonet_no}</span>
                        </p>
                        <p>
                          Accident Place:{" "}
                          <span className="ml-1">{d.location_info.place}</span>
                        </p>
                        <p>
                          Operated Depot:{" "}
                          <span className="ml-1">{d.location_info.operated_depot}</span>
                        </p>
                        <p>
                          Accident Date:{" "}
                          <span className="ml-1">
                            {dateToLocaleFormater(d.accident_details.date_of_accident)}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
             )}
        </div>
    </div>
  );
};

export default CombinedAccidentComponent;
