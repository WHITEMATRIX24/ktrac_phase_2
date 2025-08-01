"use client";
import { dateToLocaleFormater } from "@/utils/dateFormater";
import { Divider } from "@mui/material";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface Props {
  caseSelectHandler: (selectedData: any) => void;
}

const dateToday = () => {
  const date = new Date();
  const isoString = date.toISOString();
  const dateToday = isoString.split("T")[0];
  return dateToday;
};

const ReferenceNumberSearchModal = ({ caseSelectHandler }: Props) => {
  const [date, setDate] = useState(dateToday());
  const [district, setDistrict] = useState("");
  const [depo, setDepo] = useState("");
  const [bonnetNo, setBonnetNo] = useState("");
  const [showBonnetDropDown, setShowBonnetDropDown] = useState(false);
  const [accidentList, setAccidentList] = useState<{}[] | null>([]);
  const [allBusInfo, setAllbusinfo] = useState([]);
  const [filteredBusinfo, setFilteredbusInfo] = useState([]);
  const [allDepos, setAllDepos] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accidentReferenceNumber, setAccidentReferencenumber] =
    useState<string>("");
  const bonnetNumberContainrerRef = useRef<HTMLDivElement | null>(null);
  const bonnetnumberInputRef = useRef<HTMLInputElement | null>(null);

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
        console.log(data);

        setAccidentList(data.data ? [data.data] : []);
      } else {
        const response = await fetch(
          `/api/zerothForInspectorAndWorkshop?date=${date}&district=${district}&depo=${depo}&bonnet_no=${bonnetNo}`
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
    // console.log(selectedData);
    caseSelectHandler(selectedData);
  };

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

  const getAllBusInfoHandler = async () => {
    try {
      const response = await fetch("/api/getAllBusInfo");
      const data = await response.json();
      setFilteredbusInfo(data.data);
      setAllbusinfo(data.data);
    } catch (error) {
      console.log("error on getting bus details");
    }
  };

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
    handleSearch();
    getAllBusInfoHandler();
    getAllDepoHandler();
  }, []);

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

  return (
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
                  {filteredBusinfo ? (
                    filteredBusinfo.map((d: any) => (
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
                    ))
                  ) : (
                    <p>something went wrong</p>
                  )}
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
                Operated Depot /
                <span className="text-[10px]">
                  {" "}
                  പ്രവർത്തിപ്പിക്കുന്ന ഡിപ്പോ
                </span>
              </label>
              <select
                onChange={(e) => setDepo(e.target.value)}
                className="px-3 py-2 border rounded-sm"
                value={depo}
              >
                <option value="">Select Depot</option>
                {allDepos &&
                  allDepos.length > 1 &&
                  allDepos.map((depo: any) =>
                    depo.depot.map((d: any) => (
                      <option key={d["depot-abv"]} value={d["depot-name"]}>
                        {d["depot-name"]}
                      </option>
                    ))
                  )}
              </select>
            </div>
          </div>
          <div className="h-full border w-0"></div>
          <div className="flex flex-col w-[40%]">
            <h6>Accident Reference Number</h6>
            <input
              type="text"
              placeholder="Enter Accident Reference"
              value={accidentReferenceNumber}
              onChange={(e) => setAccidentReferencenumber(e.target.value)}
              className="flex-1 border px-3 py-2 bg-white rounded-sm"
            />
          </div>
        </div>
        <div className="flex items-center px-3 py-2 bg-slate-50">
          <div className="flex gap-3 ms-auto">
            <button
              onClick={handleClear}
              className="border px-3 py-1 rounded-sm bg-white"
            >
              Clear
            </button>
            <button
              onClick={handleSearch}
              className="border px-3 py-1 rounded-sm bg-[var(--sidebar-bg)] text-white"
            >
              Search
            </button>
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
                  <span className="ml-1">
                    {d.location_info?.place
                      ? d.location_info?.place
                      : d.accident_location_details?.accident_place ||
                        "No place available"}
                  </span>
                </p>
                <p>
                  Operated Depot:{" "}
                  <span className="ml-1">
                    {d.location_info?.operated_depot
                      ? d.location_info.operated_depot
                      : d.accident_details.operated_depot ||
                        "depot not available"}{" "}
                    {/* raise after demo same data on 2 different keys while using filter and search with reference number */}
                  </span>
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
  );
};

export default ReferenceNumberSearchModal;
