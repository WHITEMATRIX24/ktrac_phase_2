import React, { useState, ChangeEvent } from "react";
import toast from "react-hot-toast";

interface Props {
    closeHandler: () => void;
    caseSelectHandler: (selectedData: any) => void;
}

interface BusData {
    driver_name: string;
    driver_phn_no: string;
    conductor_name: string;
    conductor_phn_no: string;
    "operated depot": string;
    "Schedule Number": string | null;
}

const AddZerothReportModal = ({
    closeHandler,
    caseSelectHandler,
}: Props) => {
    const [bonnetNo, setBonnetNo] = useState("");
    const [driverPenNo, setDriverPenNo] = useState("");
    const [conductorPenNo, setConductorPenNo] = useState("");
    const [busDetails, setBusDetails] = useState<BusData | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleClear = () => {
        setBonnetNo("");
        setDriverPenNo("");
        setConductorPenNo("");
        setBusDetails(null);
    };

    const handleConfirm = async () => {
        if (!bonnetNo || !driverPenNo || !conductorPenNo) {
            toast.error("Please fill all fields");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("https://5xrhx7t63zdswfhc2ztypyyo440spcxl.lambda-url.ap-south-1.on.aws/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bonet_no: bonnetNo,
                    driver_pen_no: driverPenNo,
                    conductor_pen_no: conductorPenNo,
                }),
            });


            const data = await response.json();

            if (data.status_code === "200") {
                setBusDetails(data.body[0]);

                const combinedData = {
                    busNumber: bonnetNo,
                    driver: {
                        penNumber: driverPenNo,
                        name: data.body[0].driver_name,
                        phone: data.body[0].driver_phn_no,
                    },
                    conductor: {
                        penNumber: conductorPenNo,
                        name: data.body[0].conductor_name,
                        phone: data.body[0].conductor_phn_no,
                    },
                    depot: data.body[0]["operated depot"],
                    schedule: data.body[0]["Schedule Number"],
                };

                caseSelectHandler(combinedData);
                closeHandler();
            } else {
                toast.error(data.message || "An error occurred");
            }
        } catch (error) {
            toast.error("Failed to fetch bus details");
            console.error("API Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-dvh bg-black/30 flex justify-center items-center z-500 p-4">
            <div className="relative bg-white flex flex-col gap-2 w-full max-w-md md:max-w-2xl lg:max-w-3xl min-h-[20rem] rounded-sm overflow-hidden p-2 max-h-[90vh] overflow-y-auto">
                <div className="flex gap-3 justify-between items-center bg-slate-50 px-3 py-2 sticky top-0">
                    <h4 className="font-bold">Add New Accident</h4>
                    <button
                        onClick={closeHandler}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="w-full flex flex-col gap-5 text-sm px-3 py-2">
                    {/* Bus Number Field */}
                    <div className="flex flex-col">
                        <label>Bus Number (Bonnet No)</label>
                        <input
                            type="text"
                            value={bonnetNo}
                            onChange={(e) => setBonnetNo(e.target.value)}
                            placeholder="Enter bus number"
                            className="w-full px-3 py-2 border rounded-sm"
                        />
                    </div>

                    {/* Driver PEN Number Field */}
                    <div className="flex flex-col">
                        <label>Driver PEN Number</label>
                        <input
                            type="text"
                            value={driverPenNo}
                            onChange={(e) => setDriverPenNo(e.target.value)}
                            placeholder="Enter driver PEN number"
                            className="w-full px-3 py-2 border rounded-sm"
                        />
                    </div>

                    {/* Conductor PEN Number Field */}
                    <div className="flex flex-col">
                        <label>Conductor PEN Number</label>
                        <input
                            type="text"
                            value={conductorPenNo}
                            onChange={(e) => setConductorPenNo(e.target.value)}
                            placeholder="Enter conductor PEN number"
                            className="w-full px-3 py-2 border rounded-sm"
                        />
                    </div>

                    {/* Display Bus Details */}
                    {busDetails && (
                        <div className="mt-4 p-3 border border-green-200 bg-green-50 rounded-sm">
                            <h4 className="font-bold text-green-800 mb-2">Bus Details</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                    <span className="font-semibold">Driver:</span> {busDetails.driver_name}
                                </div>
                                <div>
                                    <span className="font-semibold">Phone:</span> {busDetails.driver_phn_no}
                                </div>
                                <div>
                                    <span className="font-semibold">Conductor:</span> {busDetails.conductor_name}
                                </div>
                                <div>
                                    <span className="font-semibold">Phone:</span> {busDetails.conductor_phn_no}
                                </div>
                                <div>
                                    <span className="font-semibold">Depot:</span> {busDetails["operated depot"]}
                                </div>
                                <div>
                                    <span className="font-semibold">Schedule:</span> {busDetails["Schedule Number"] || "N/A"}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center px-3 py-2 bg-slate-50 mt-auto sticky bottom-0">
                    <div className="flex gap-3 ms-auto">
                        <button
                            onClick={handleClear}
                            className="border px-3 py-1 rounded-sm bg-white hover:bg-gray-100 text-sm"
                            disabled={isLoading}
                        >
                            Clear All
                        </button>
                        <button
                            onClick={handleConfirm}
                            className={`border px-3 py-1 rounded-sm text-white text-sm
                                ${bonnetNo && driverPenNo && conductorPenNo && !isLoading
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-gray-400 cursor-not-allowed"}`}
                            disabled={!bonnetNo || !driverPenNo || !conductorPenNo || isLoading}
                        >
                            {isLoading ? "Loading..." : "Confirm Selection"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddZerothReportModal;