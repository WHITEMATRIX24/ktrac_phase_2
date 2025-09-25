import { AccidentReference, Photo } from "@/models/PrimaryData";
import React from "react";

interface Props {
  formData: any | null;
}

const PrimaryBasicDetails = ({ formData }: Props) => {
      const [previewImage, setPreviewImage] = React.useState<string | null>(null);
    

  return (
     <div className="mb-4 p-2">
                        <div className="flex gap-2 min-h-[67vh] mb-1">
                          {/* Left: Report Details Card */}
                          <div className="w-[70%] bg-white border-2 border-gray-400 rounded-[8px] overflow-auto">
                            <h3 className="text-[16px] font-[600] pb-2 border-b-2 border-[var(--sidebar)] p-[16px]">
                              Accident Spot Report Details{" "}
                              <span className="text-[12px]">
                                (അപകട സ്ഥല റിപ്പോർട്ട് വിവരങ്ങൾ)
                              </span>
                            </h3>

                            <div className="space-y-4 p-[16px]">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                    Time of Accident{" "}
                                    <span className="text-[10px]">
                                      (അപകട സമയം)
                                    </span>
                                  </label>
                                  <div className="text-[12px] text-[var(--sidebar-bg)]">
                                    {formData?.timeOfAccident}
                                  </div>
                                </div>
                                <div>
                                  <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                    Date of Accident{" "}
                                    <span className="text-[10px]">
                                      (അപകട തീയതി)
                                    </span>
                                  </label>
                                  <div className="text-[12px] text-[var(--sidebar-bg)]">
                                    {formData?.accidentDate}
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                    Bonnet No{" "}
                                    <span className="text-[10px]">
                                      (ബോണറ്റ് നമ്പർ)
                                    </span>
                                  </label>
                                  <div className="text-[12px] text-[var(--sidebar-bg)]">
                                    {formData?.busNo}
                                  </div>
                                </div>
                                <div>
                                  <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                    Schedule Number{" "}
                                    <span className="text-[10px]">
                                      (ഷെഡ്യൂൾ നമ്പർ)
                                    </span>
                                  </label>
                                  <div className="text-[12px] text-[var(--sidebar-bg)]">
                                    {formData?.scheduleNumber}
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                    Operated Depot{" "}
                                    <span className="text-[10px]">
                                      (പ്രവർത്തിക്കുന്ന ഡിപ്പോ)
                                    </span>
                                  </label>
                                  <div className="text-[12px] text-[var(--sidebar-bg)]">
                                    {formData?.operatedDepot}
                                  </div>
                                </div>
                                <div>
                                  <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                    Home Depot{" "}
                                    <span className="text-[10px]">
                                      (ഹോം ഡിപ്പോ)
                                    </span>
                                  </label>
                                  <div className="text-[12px] text-[var(--sidebar-bg)]">
                                    {formData?.homeDepot}
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                    Driver Name{" "}
                                    <span className="text-[10px]">
                                      (ഡ്രൈവറുടെ പേര്)
                                    </span>
                                  </label>
                                  <div className="text-[12px] text-[var(--sidebar-bg)]">
                                    {formData?.driverName}
                                  </div>
                                </div>
                                <div>
                                  <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                    Driver Phone{" "}
                                    <span className="text-[10px]">
                                      (ഡ്രൈവറുടെ ഫോൺ നമ്പർ)
                                    </span>
                                  </label>
                                  <div className="text-[12px] text-[var(--sidebar-bg)]">
                                    {formData?.driverPhone}
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                    Conductor Name{" "}
                                    <span className="text-[10px]">
                                      (കണ്ടക്ടറുടെ പേര്)
                                    </span>
                                  </label>
                                  <div className="text-[12px] text-[var(--sidebar-bg)]">
                                    {formData?.conductorName}
                                  </div>
                                </div>
                                <div>
                                  <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                    Conductor Phone{" "}
                                    <span className="text-[10px]">
                                      (കണ്ടക്ടറുടെ ഫോൺ നമ്പർ)
                                    </span>
                                  </label>
                                  <div className="text-[12px] text-[var(--sidebar-bg)]">
                                    {formData?.conductorPhone}
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                    Accident Location{" "}
                                    <span className="text-[10px]">
                                      (അപകട സ്ഥലം)
                                    </span>
                                  </label>
                                  <div className="text-[12px] text-[var(--sidebar-bg)]">
                                    {formData?.accidentPlace}
                                  </div>
                                </div>
                                <div>
                                  <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                    Police Station{" "}
                                    <span className="text-[10px]">
                                      (പോലീസ് സ്റ്റേഷൻ)
                                    </span>
                                  </label>
                                  <div className="text-[12px] text-[var(--sidebar-bg)]">
                                    {formData?.policeStation}
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div>
                                  <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                    State{" "}
                                    <span className="text-[10px]">
                                      (സംസ്ഥാനം)
                                    </span>
                                  </label>
                                  <div className="text-[12px] text-[var(--sidebar-bg)]">
                                    {formData?.accidentState}
                                  </div>
                                </div>
                                <div>
                                  <label className="text-xs font-semibold text-gray-700 mb-0 block ms-1">
                                    District{" "}
                                    <span className="text-[10px]">(ജില്ല)</span>
                                  </label>
                                  <div className="text-[12px] text-[var(--sidebar-bg)] ms-1">
                                    {formData?.accidentDistrict}
                                  </div>
                                </div>
                              </div>

                              <div>
                                <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                  Description{" "}
                                  <span className="text-[10px]">(വിവരണം)</span>
                                </label>
                                <div className="text-[12px] text-[var(--sidebar-bg)]">
                                  {formData?.description}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Right: Images Card */}
                          <div className="w-[30%] bg-white border-2 border-gray-400 rounded-[8px] overflow-y-scroll max-h-[67vh]">
                            <h3 className="text-[16px] font-[600] pb-2 border-b-2 border-[var(--sidebar)] p-[16px]">
                              Uploaded Images{" "}
                              <span className="text-[12px]">
                                (അപ്ലോഡ് ചെയ്ത ചിത്രങ്ങൾ)
                              </span>
                            </h3>

                            <div className="grid grid-cols-1 gap-3 p-[16px]">
                              {formData?.photos?.map(
                                (photo: Photo, index: number) => (
                                  <div
                                    key={index}
                                    className="cursor-pointer"
                                    onClick={() =>
                                      setPreviewImage(photo.download_url)
                                    }
                                  >
                                    <div className="bg-gray-200 border border-gray-300 rounded h-auto flex items-center justify-center">
                                      <img
                                        src={photo.download_url}
                                        alt="accident image"
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Fullscreen Image Modal */}
                        {previewImage && (
                          <div
                            className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center"
                            onClick={() => setPreviewImage(null)}
                          >
                            <div className="max-w-4xl w-full p-4">
                              <div className="rounded-lg overflow-hidden">
                                <div className="p-3 flex justify-between items-center">
                                  <h3 className="font-medium"></h3>
                                  <button
                                    className="text-gray-500 hover:text-gray-700"
                                    onClick={() => setPreviewImage(null)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </button>
                                </div>
                                <div className="p-4 flex justify-center">
                                  <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="max-h-[70vh] object-contain"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
  );
};

export default PrimaryBasicDetails;
