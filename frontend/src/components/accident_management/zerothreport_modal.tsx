import React, { useState, useEffect, ChangeEvent } from "react";

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
interface Driver {
    id: number;
    gNumber: string;
    name: string;
    phone: string;
}
interface Conductor {
    id: number;
    gNumber: string;
    name: string;
    phone: string;
}
const AddZerothReportModal = ({
    closeHandler,
    caseSelectHandler,
}: Props) => {
    const [bonnetNo, setBonnetNo] = useState("");
    const [selectedBus, setSelectedBus] = useState<BusData | null>(null);
    const [filteredBuses, setFilteredBuses] = useState<BusData[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDriverDropdown, setShowDriverDropdown] = useState(false);
    const [driverSearchTerm, setDriverSearchTerm] = useState('');
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [selectedConductor, setSelectedConductor] = useState<Conductor | null>(null);

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
        setSelectedBus(null);
        setSelectedDriver(null);
        setSelectedConductor(null);
        setDriverSearchTerm('');
        setConductorSearchTerm('');
        setFilteredBuses([]);
        setShowDropdown(false);
    };


    const handleConfirm = () => {
        if (!selectedBus || !selectedDriver || !selectedConductor) {
            alert("Please select a bus, driver and conductor");
            return;
        }

        const combinedData = {
            ...selectedBus,
            driver: {
                penNumber: selectedDriver.gNumber,
                name: selectedDriver.name,
                phone: selectedDriver.phone
            },
            conductor: {
                penNumber: selectedConductor.gNumber,
                name: selectedConductor.name,
                phone: selectedConductor.phone
            }
        };

        caseSelectHandler(combinedData);
        closeHandler();
    };

    const dummyDrivers: Driver[] = [
        { id: 1, gNumber: "G12345", name: "Raj Kumar", phone: "9876543210" },
        { id: 2, gNumber: "G23456", name: "Vijay Singh", phone: "9876543211" },
        { id: 3, gNumber: "G34567", name: "Manoj Patel", phone: "9876543212" },
    ];
    const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>(dummyDrivers);
    const handleDriverSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setDriverSearchTerm(term);
        setFilteredDrivers(
            dummyDrivers.filter(driver =>
                driver.gNumber.toLowerCase().includes(term.toLowerCase()) ||
                driver.name.toLowerCase().includes(term.toLowerCase())
            )
        );
        setShowDriverDropdown(term.length > 0);
    };

    const handleDriverSelect = (driver: Driver) => {
        setSelectedDriver(driver);
        setDriverSearchTerm(driver.gNumber);
        setShowDriverDropdown(false);
    };

    const clearDriverSelection = () => {
        setSelectedDriver(null);
        setDriverSearchTerm('');
    };


    const dummyConductors: Conductor[] = [
        { id: 1, gNumber: "C12345", name: "Suresh Kumar", phone: "9876543220" },
        { id: 2, gNumber: "C23456", name: "Ramesh Singh", phone: "9876543221" },
        { id: 3, gNumber: "C34567", name: "Kumar Patel", phone: "9876543222" },
    ];
    const [conductorSearchTerm, setConductorSearchTerm] = useState('');
    const [showConductorDropdown, setShowConductorDropdown] = useState(false);
    const [filteredConductors, setFilteredConductors] = useState<Conductor[]>(dummyConductors);
    const handleConductorSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setConductorSearchTerm(term);
        setFilteredConductors(
            dummyConductors.filter(conductor =>
                conductor.gNumber.toLowerCase().includes(term.toLowerCase()) ||
                conductor.name.toLowerCase().includes(term.toLowerCase())
            )
        );
        setShowConductorDropdown(term.length > 0);
    };


    const handleConductorSelect = (conductor: Conductor) => {
        setSelectedConductor(conductor);
        setConductorSearchTerm(conductor.gNumber);
        setShowConductorDropdown(false);
    };

    const clearConductorSelection = () => {
        setSelectedConductor(null);
        setConductorSearchTerm('');
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

                <div className="w-full flex flex-col md:flex-row gap-5 text-sm px-3 py-2">
                    {/* Bus Number Field */}
                    <div className="flex flex-col relative flex-1">
                        <label>Bus Number</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={bonnetNo}
                                onChange={(e) => setBonnetNo(e.target.value)}
                                placeholder="Search bus number"
                                className="w-full px-3 py-2 border rounded-sm"
                                onFocus={() => bonnetNo.length > 0 && setShowDropdown(true)}
                            />
                            {bonnetNo && (
                                <button
                                    onClick={() => setBonnetNo('')}
                                    className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {showDropdown && filteredBuses.length > 0 && (
                            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg z-10 mt-1 max-h-60 overflow-y-auto">
                                {filteredBuses.map((bus) => (
                                    <div
                                        key={bus.BUSNO}
                                        onClick={() => handleBusSelect(bus)}
                                        className="p-2 hover:bg-gray-100 cursor-pointer border-b text-sm"
                                    >
                                        {bus.BUSNO}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Driver Field */}
                    <div className="flex flex-col flex-1">
                        <label>Driver PEN Number</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search driver"
                                value={selectedDriver ? selectedDriver.gNumber : driverSearchTerm}
                                onChange={handleDriverSearch}
                                className="w-full px-3 py-2 border rounded-sm"
                            />
                            {selectedDriver ? (
                                <button
                                    onClick={clearDriverSelection}
                                    className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            ) : (
                                driverSearchTerm && (
                                    <button
                                        onClick={() => setDriverSearchTerm('')}
                                        className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                                    >
                                        ✕
                                    </button>
                                )
                            )}

                            {showDriverDropdown && filteredDrivers.length > 0 && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                    {filteredDrivers.map((driver) => (
                                        <div
                                            key={driver.id}
                                            className="p-2 hover:bg-gray-100 cursor-pointer border-b text-sm"
                                            onClick={() => handleDriverSelect(driver)}
                                        >
                                            {driver.gNumber} - {driver.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Conductor Field */}
                    <div className="flex flex-col flex-1">
                        <label>Conductor PEN Number</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search conductor"
                                value={selectedConductor ? selectedConductor.gNumber : conductorSearchTerm}
                                onChange={handleConductorSearch}
                                className="w-full px-3 py-2 border rounded-sm"
                            />
                            {selectedConductor ? (
                                <button
                                    onClick={clearConductorSelection}
                                    className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            ) : (
                                conductorSearchTerm && (
                                    <button
                                        onClick={() => setConductorSearchTerm('')}
                                        className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                                    >
                                        ✕
                                    </button>
                                )
                            )}

                            {showConductorDropdown && filteredConductors.length > 0 && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                    {filteredConductors.map((conductor) => (
                                        <div
                                            key={conductor.id}
                                            className="p-2 hover:bg-gray-100 cursor-pointer border-b text-sm"
                                            onClick={() => handleConductorSelect(conductor)}
                                        >
                                            {conductor.gNumber} - {conductor.name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>



                <div className="flex items-center px-3 py-2 bg-slate-50 mt-auto sticky bottom-0">
                    <div className="flex gap-3 ms-auto">
                        <button
                            onClick={handleClear}
                            className="border px-3 py-1 rounded-sm bg-white hover:bg-gray-100 text-sm"
                        >
                            Clear All
                        </button>
                        <button
                            onClick={handleConfirm}
                            className={`border px-3 py-1 rounded-sm text-white text-sm
                                ${selectedBus && selectedDriver && selectedConductor
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-gray-400 cursor-not-allowed"}`}
                            disabled={!selectedBus || !selectedDriver || !selectedConductor}
                        >
                            Confirm Selection
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddZerothReportModal;