"use client";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";

interface Props {
  filter_key: string;
  data: any[];
  onSelectHanlder: (selectedData: any) => void;
  dataIsLoading: boolean;
  label: string;
}

const InputFilter = ({
  data,
  filter_key,
  dataIsLoading,
  onSelectHanlder,
  label,
}: Props) => {
  const [searchData, setSearchData] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const dropDownListRef = useRef<HTMLUListElement>(null);

  // ON CHANGE HANDLER
  const handleChange = (searchValue: string) => {
    if (!searchValue) {
      setSearchData(searchValue);
      setShowDropDown(false);
      return;
    }

    setSearchData(searchValue);
    const result = data.filter((d) =>
      d[filter_key].toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(result);
    setShowDropDown(true);
  };

  //   ON SELECT HANDLER
  const handleSelect = (selectedData: any) => {
    setSearchData(selectedData[label]);
    setShowDropDown(false);
    onSelectHanlder(selectedData);
  };

  // LIST CONTAINER AUTOMATICALLY CLOSE
  const handleInputFilterDropDownClose = (e: MouseEvent) => {
    if (
      dropDownListRef.current &&
      !dropDownListRef.current.contains(e.target as Node)
    ) {
      setShowDropDown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleInputFilterDropDownClose);
    return () => {
      document.removeEventListener("click", handleInputFilterDropDownClose);
    };
  }, []);

  return (
    <div className="relative">
      <Input
        onChange={(e) => handleChange(e.target.value)}
        value={searchData}
        className="bg-white h-8 w-full"
      />
      {showDropDown && (
        <ul
          ref={dropDownListRef}
          className="absolute border-2 rounded-sm top-10 w-48 h-52 bg-white z-10 flex flex-col px-3 py-3 gap-3 overflow-auto"
        >
          {dataIsLoading ? (
            <p>loading...</p>
          ) : !dataIsLoading && filteredData.length < 1 ? (
            <p>No data found</p>
          ) : (
            !dataIsLoading &&
            filteredData.length > 0 &&
            filteredData.map((filteredData, index) => (
              <li
                onClick={() => handleSelect(filteredData)}
                key={index}
                className="border-b-1 cursor-pointer"
              >
                {filteredData[label]}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default InputFilter;
