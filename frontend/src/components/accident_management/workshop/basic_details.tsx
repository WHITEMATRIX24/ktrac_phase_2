import { SelectedAccidentWorkshopModel } from "@/app/Accident_Management/Work_Shop/page";
import React from "react";

interface Props {
  basicDetails: SelectedAccidentWorkshopModel | null;
}

const BasicDetails = ({ basicDetails }: Props) => {
  return (
    <div className="relative grid grid-cols-2 gap-3 overflow-auto h-full mx-3 rounded-m">
      <div className="p-3 overflow-y-auto bg-white border rounded-sm flex flex-col gap-3 w-full">
        <div className="border-b-2 border-sidebar py-2">
          <h6 className="text-sm font-semibold">Basic</h6>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Bonnet No. / <span className="text-[10px]">ബസ് നം</span>
          </label>
          <p className="text-sidebar">{basicDetails?.bonet_no}</p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Date of accident / <span className="text-[10px]">അപകട തീയതി</span>
          </label>
          <p className="text-sidebar">{basicDetails?.date_of_accident}</p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            District / <span className="text-[10px]">ജില്ല</span>
          </label>
          <p className="text-sidebar">{basicDetails?.district}</p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Operated Depot /{" "}
            <span className="text-[10px]">പ്രവർത്തിപ്പിക്കുന്ന ഡിപ്പോ</span>
          </label>
          <p className="text-sidebar">{basicDetails?.operated_depot}</p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[12px]">
            Description / <span className="text-[10px]">വിവരണം</span>
          </label>
          <p className="text-sidebar">{basicDetails?.description}</p>
        </div>
      </div>
      <div className="p-3 overflow-y-auto bg-white border rounded-sm flex flex-col gap-3 w-full">
        <div className="border-b-2 border-sidebar py-2">
          <h6 className="text-sm font-semibold">Photos</h6>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {basicDetails?.photos.map((photo, index) => (
            <div
              key={index}
              className="bg-gray-200 border border-gray-300 rounded h-auto flex items-center justify-center"
            >
              <img
                src={photo.download_url}
                alt="accident image"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
