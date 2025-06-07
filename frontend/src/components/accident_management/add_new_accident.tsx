import React, { useState, useEffect } from "react";

interface Props {
    closeHandler: () => void;
    caseSelectHandler: (selectedData: any) => void;
}

const dummyData = [
    {
        BUSNO: 'RPC200',
        NAME: 'LL',
        REGNO: 'KL15A0645',
        BODYTYPE: 'ETX',
        SCHEDULE: '48',
        CLASS: 'ORD',
        DEPOT: 'KKD',
        AGE: 4,
        ZONE: 'Central'
    },
    {
        BUSNO: 'RPC292',
        NAME: 'LL',
        REGNO: 'KL15A0845',
        BODYTYPE: 'ETX',
        SCHEDULE: '48',
        CLASS: 'SFP',
        DEPOT: 'KTM',
        AGE: 3,
        ZONE: 'South'
    },
    {
        BUSNO: 'RPC202',
        NAME: 'LL',
        REGNO: 'KL15A0845',
        BODYTYPE: 'ETX',
        SCHEDULE: '48',
        CLASS: 'SFP',
        DEPOT: 'CGR',
        AGE: 5,
        ZONE: 'North'
    }
];

interface BusData {
    BUSNO: string;
    NAME: string;
    REGNO: string;
    BODYTYPE: string;
    SCHEDULE: string;
    CLASS: string;
    DEPOT: string;
    AGE: number;
    ZONE: string;
}

const AddNewAccidentModal = ({
    closeHandler,
    caseSelectHandler,
}: Props) => {
    const [bonnetNo, setBonnetNo] = useState("");
    const [accidentDate, setAccidentDate] = useState("");
    const [timeOfAccident, setAccidentTime] = useState("");
    const [selectedBus, setSelectedBus] = useState<BusData | null>(null);
    const [filteredBuses, setFilteredBuses] = useState<BusData[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);

    // Filter buses based on input
    useEffect(() => {
        if (bonnetNo.length > 0) {
            const filtered = dummyData.filter(bus =>
                bus.BUSNO.toLowerCase().includes(bonnetNo.toLowerCase())
            );
            setFilteredBuses(filtered);
            setShowDropdown(true);
        } else {
            setFilteredBuses([]);
            setShowDropdown(false);
        }
    }, [bonnetNo]);

    const handleBusSelect = (bus: BusData) => {
        setSelectedBus(bus);
        setBonnetNo(bus.BUSNO);
        setShowDropdown(false);
    };

    const handleClear = () => {
        setBonnetNo("");
        setAccidentDate("");
        setAccidentTime("");
        setSelectedBus(null);
        setFilteredBuses([]);
        setShowDropdown(false);
    };

    const handleConfirm = () => {
        if (!selectedBus || !accidentDate || !timeOfAccident) {
            alert("Please select a bus, date, and time");
            return;
        }

        const combinedData = {
            ...selectedBus,
            accidentDate,
            timeOfAccident
        };

        caseSelectHandler(combinedData);
        closeHandler();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-dvh bg-black/30 flex justify-center items-center z-50 ">
            <div className="relative bg-white flex flex-col gap-2 w-[35rem] min-h-[20rem] rounded-sm overflow-hidden p-2">
                <div className="flex gap-3 justify-between items-center bg-slate-50 px-3 py-2">
                    <h4 className="font-bold">Add New Accident</h4>
                    <button
                        onClick={closeHandler}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="w-full grid grid-cols-3 gap-5 text-[12px] px-3 py-2">
                    <div className="flex flex-col relative">
                        <label>Bus Number</label>
                        <input
                            type="text"
                            value={bonnetNo}
                            onChange={(e) => setBonnetNo(e.target.value)}
                            placeholder="Search bus number"
                            className="px-3 py-2 border rounded-sm"
                            onFocus={() => bonnetNo.length > 0 && setShowDropdown(true)}
                        />

                        {showDropdown && filteredBuses.length > 0 && (
                            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg z-10 mt-1 max-h-60 overflow-y-auto">
                                {filteredBuses.map((bus) => (
                                    <div
                                        key={bus.BUSNO}
                                        onClick={() => handleBusSelect(bus)}
                                        className="p-2 hover:bg-gray-100 cursor-pointer border-b"
                                    >
                                        {bus.BUSNO}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <label>Date</label>
                        <input
                            type="date"
                            value={accidentDate}
                            onChange={(e) => setAccidentDate(e.target.value)}
                            className="px-3 py-2 border rounded-sm"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label>Time</label>
                        <input
                            type="time"
                            value={timeOfAccident}
                            onChange={(e) => setAccidentTime(e.target.value)}
                            className="px-3 py-2 border rounded-sm"
                        />
                    </div>
                </div>

                {selectedBus && (
                    <div className="mx-3 rounded-sm border p-3 text-[12px]">
                        <h6 className="font-medium mb-2">Selected Bus Details</h6>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <span className="text-gray-500">Bus No:</span> {selectedBus.BUSNO}
                            </div>
                            <div>
                                <span className="text-gray-500">Registration:</span> {selectedBus.REGNO}
                            </div>
                            <div>
                                <span className="text-gray-500">Depot:</span> {selectedBus.DEPOT}
                            </div>
                            <div>
                                <span className="text-gray-500">Schedule:</span> {selectedBus.SCHEDULE}
                            </div>
                            <div>
                                <span className="text-gray-500">Body Type:</span> {selectedBus.BODYTYPE}
                            </div>
                            <div>
                                <span className="text-gray-500">Class:</span> {selectedBus.CLASS}
                            </div>
                            <div>
                                <span className="text-gray-500">Age:</span> {selectedBus.AGE} years
                            </div>
                            <div>
                                <span className="text-gray-500">Zone:</span> {selectedBus.ZONE}
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex items-center px-3 py-2 bg-slate-50">
                    <div className="flex gap-3 ms-auto">
                        <button
                            onClick={handleClear}
                            className="border px-3 py-1 rounded-sm bg-white hover:bg-gray-100"
                        >
                            Clear
                        </button>
                        {selectedBus && (
                            <button
                                onClick={handleConfirm}
                                className="border px-3 py-1 rounded-sm bg-green-600 text-white hover:bg-green-700"
                                disabled={!accidentDate || !timeOfAccident}
                            >
                                Confirm Selection
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNewAccidentModal;