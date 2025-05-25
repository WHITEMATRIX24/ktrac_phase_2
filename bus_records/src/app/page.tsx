"use client";
import Image from "next/image";
import React from "react";
import { useState } from "react";

export default function Home() {
  const [locationAccess, setLocationAccess] = useState(false);
  const [busRoute, setBusRoute] = useState<
    {
      startPlace: String;
      ETD: String;
      endPlace: String;
      ETA: String;
    }[]
  >();

  const handleSearch = () => {
    const data = [
      {
        startPlace: "kottayam",
        ETD: " 26-May-25 12:00pm",
        endPlace: "Changanacherry",
        ETA: "26-May-25 01:00pm",
      },
      {
        startPlace: "Ernakulam",
        ETD: " 26-May-25 12:00pm",
        endPlace: "Thiruvanathapuram",
        ETA: "26-May-25 01:00pm",
      },
    ];
    setBusRoute(data);
  };

  return (
    <div className="relative grid grid-cols-10 h-dvh">
      <div className="col-span-3 bg-gray-200 h-full flex flex-col gap-5 p-4 justify-between">
        <div className="flex flex-col gap-5">
          <div className="flex gap-3 items-center">
            <Image alt="logo" src={"/logo.png"} width={80} height={80} />
            <h6 className="font-semibold text-xl">Ktrac</h6>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 w-full">
              <div className="flex flex-col gap-3 w-full">
                <input
                  type="text"
                  className="w-full px-3 py-2 outline-none border bg-white border-gray-300 rounded-md"
                  placeholder="enter the place"
                  value="kottayam"
                  readOnly
                />

                <input
                  type="text"
                  className="w-full px-3 py-2 outline-none border bg-white border-gray-300 rounded-md"
                  placeholder="search destination"
                />
              </div>
              <div className="flex flex-col justify-evenly">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-dashed-icon lucide-circle-dashed"
                >
                  <path d="M10.1 2.182a10 10 0 0 1 3.8 0" />
                  <path d="M13.9 21.818a10 10 0 0 1-3.8 0" />
                  <path d="M17.609 3.721a10 10 0 0 1 2.69 2.7" />
                  <path d="M2.182 13.9a10 10 0 0 1 0-3.8" />
                  <path d="M20.279 17.609a10 10 0 0 1-2.7 2.69" />
                  <path d="M21.818 10.1a10 10 0 0 1 0 3.8" />
                  <path d="M3.721 6.391a10 10 0 0 1 2.7-2.69" />
                  <path d="M6.391 20.279a10 10 0 0 1-2.69-2.7" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-map-pin-icon lucide-map-pin"
                >
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="w-[93.5%] px-3 py-2 bg-blue-500 text-white rounded-md"
            >
              Search
            </button>
          </div>
        </div>
        <p className="text-center text-gray-400 text-sm">
          Managed by whitematrix
        </p>
      </div>
      <div className="col-span-7 h-full w-full flex flex-col gap-3 px-3">
        <h6 className="w-full px-5 py-4 text-2xl font-semibold">Bus Lists</h6>
        {busRoute?.map((route, index) => (
          <div
            key={index}
            className="w-full border border-gray-200 rounded-xl flex justify-between px-8 py-5 bg-gray-50 items-center"
          >
            <div className="flex flex-col gap-1">
              <h6 className="text-xl font-semibold italic">
                {route.startPlace}
              </h6>
              <p className="text-sm font-extralight">ETD: {route.ETD}</p>
            </div>
            {/* svg */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-move-right-icon lucide-move-right"
            >
              <path d="M18 8L22 12L18 16" />
              <path d="M2 12H22" />
            </svg>
            <div className="flex flex-col gap-1">
              <h6 className="text-xl font-semibold italic">{route.endPlace}</h6>
              <p className="text-sm font-extralight">ETA: {route.ETA}</p>
            </div>
          </div>
        ))}
      </div>
      {!locationAccess && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-500/50 flex justify-center items-center">
          <div className="w-95 h-52 bg-white rounded-xl flex flex-col justify-center items-center gap-5">
            <div className="text-center">
              <h6 className="text-xl font-semibold">Location Access</h6>
              <p className="font-light text-gray-500">
                Allow location access to find the bus route
              </p>
            </div>
            <div className="flex gap-5">
              <button className="px-5 py-2 rounded-md bg-red-800 text-white cursor-pointer">
                reject
              </button>
              <button
                onClick={() => setLocationAccess(true)}
                className="px-5 py-2 rounded-md bg-green-800 text-white cursor-pointer"
              >
                Allow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
