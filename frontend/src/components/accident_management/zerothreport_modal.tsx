import React, { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';

interface Props {
    closeHandler: () => void;
    caseSelectHandler: (selectedData: any) => void;
}

interface BusData {
    bonnetNo: string
    driver_name: string;
    driver_phn_no: string;
    conductor_name: string;
    conductor_phn_no: string;
    "operated depot": string;
    "Schedule Number": string | null;
}

interface UserData {
    pen_no: string;
    user_first_name: string;
    user_last_name: string;
    designation: string;
    phn_no: string;
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

    const [allBuses, setAllBuses] = useState<BusData[]>([]);
    const [filteredBuses, setFilteredBuses] = useState<BusData[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [allUsers, setAllUsers] = useState<UserData[]>([]);
    const [allDrivers, setAllDrivers] = useState<UserData[]>([]);
    const [allConductors, setAllConductors] = useState<UserData[]>([]);
    const [filteredDrivers, setFilteredDrivers] = useState<UserData[]>([]);
    const [filteredConductors, setFilteredConductors] = useState<UserData[]>([]);
    const [userLoading, setUserLoading] = useState(false);
    const [userError, setUserError] = useState('');

    // Separate states for dropdown visibility
    const [showBusDropdown, setShowBusDropdown] = useState(false);
    const [showDriverDropdown, setShowDriverDropdown] = useState(false);
    const [showConductorDropdown, setShowConductorDropdown] = useState(false);

    // Refs for each dropdown container
    const busRef = useRef<HTMLDivElement>(null);
    const driverRef = useRef<HTMLDivElement>(null);
    const conductorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchBusData = async () => {
            try {
                setLoading(true);
                setError('');
                const response = await fetch('/api/getAllBusInfo');

                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status}`);
                }

                const result = await response.json();
                if (result.data && Array.isArray(result.data)) {
                    const mappedBuses = result.data.map((bus: any) => ({
                        bonnetNo: bus.bonet_number,
                        driver_name: bus.driver_name,
                        driver_phn_no: bus.driver_phn_no,
                        conductor_name: bus.conductor_name,
                        conductor_phn_no: bus.conductor_phn_no,
                        "operated depot": bus["operated depot"],
                        "Schedule Number": bus["Schedule Number"]
                    }));
                    setAllBuses(mappedBuses);
                } else {
                    setError('Invalid bus data format');
                    setAllBuses([]);
                }
            } catch (err) {
                console.error('Bus fetch error:', err);
                setError('Failed to load bus data');
                setAllBuses([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBusData();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setUserLoading(true);
                setUserError('');
                const response = await fetch('/api/getAllUserInfo');

                if (!response.ok) {
                    throw new Error(`Failed to fetch: ${response.status}`);
                }

                const result = await response.json();

                if (result.body && Array.isArray(result.body)) {
                    setAllUsers(result.body);

                    const drivers = result.body.filter((user: UserData) =>
                        user.designation.toLowerCase().includes('driver')
                    );

                    const conductors = result.body.filter((user: UserData) =>
                        user.designation.toLowerCase().includes('conductor')
                    );

                    setAllDrivers(drivers);
                    setAllConductors(conductors);
                } else {
                    setUserError('Invalid user data format');
                    setAllUsers([]);
                }
            } catch (err) {
                console.error('User fetch error:', err);
                setUserError('Failed to load user data');
                setAllUsers([]);
            } finally {
                setUserLoading(false);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (bonnetNo.trim() === '') {
            setFilteredBuses(allBuses.slice(0, 5));
        } else {
            const filtered = allBuses.filter(bus =>
                bus.bonnetNo.toLowerCase().includes(bonnetNo.toLowerCase())
            ).slice(0, 5);
            setFilteredBuses(filtered);
        }
    }, [bonnetNo, allBuses]);

    useEffect(() => {
        if (driverPenNo.trim() === '') {
            setFilteredDrivers(allDrivers.slice(0, 5));
        } else {
            const filtered = allDrivers.filter(driver =>
                driver.pen_no.toLowerCase().includes(driverPenNo.toLowerCase()) ||
                `${driver.user_first_name} ${driver.user_last_name}`.toLowerCase().includes(driverPenNo.toLowerCase())
            ).slice(0, 5);
            setFilteredDrivers(filtered);
        }
    }, [driverPenNo, allDrivers]);

    useEffect(() => {
        if (conductorPenNo.trim() === '') {
            setFilteredConductors(allConductors.slice(0, 5));
        } else {
            const filtered = allConductors.filter(conductor =>
                conductor.pen_no.toLowerCase().includes(conductorPenNo.toLowerCase()) ||
                `${conductor.user_first_name} ${conductor.user_last_name}`.toLowerCase().includes(conductorPenNo.toLowerCase())
            ).slice(0, 5);
            setFilteredConductors(filtered);
        }
    }, [conductorPenNo, allConductors]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Close bus dropdown if clicked outside
            if (busRef.current && !busRef.current.contains(event.target as Node)) {
                setShowBusDropdown(false);
            }
            // Close driver dropdown if clicked outside
            if (driverRef.current && !driverRef.current.contains(event.target as Node)) {
                setShowDriverDropdown(false);
            }
            // Close conductor dropdown if clicked outside
            if (conductorRef.current && !conductorRef.current.contains(event.target as Node)) {
                setShowConductorDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectBus = (busNumber: string) => {
        setBonnetNo(busNumber);
        setShowBusDropdown(false);
    };

    const handleSelectDriver = (penNo: string) => {
        setDriverPenNo(penNo);
        setShowDriverDropdown(false);
    };

    const handleSelectConductor = (penNo: string) => {
        setConductorPenNo(penNo);
        setShowConductorDropdown(false);
    };

    const handleClear = () => {
        setBonnetNo("");
        setDriverPenNo("");
        setConductorPenNo("");
        setBusDetails(null);
        // Close all dropdowns when clearing
        setShowBusDropdown(false);
        setShowDriverDropdown(false);
        setShowConductorDropdown(false);
    };

    const handleConfirm = async () => {
        if (!bonnetNo || !driverPenNo || !conductorPenNo) {
            toast.error("Please fill all fields");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bonet_no: bonnetNo,
                    driver_pen_no: driverPenNo.trim(),
                    conductor_pen_no: conductorPenNo.trim()
                })
            });

            const data = await response.json();
            if (data.status_code === "200") {
                const busInfo = data.body[0];
                setBusDetails(busInfo);
                const combinedData = {
                    busNumber: bonnetNo,
                    driver: {
                        penNumber: driverPenNo,
                        name: busInfo.driver_name,
                        phone: busInfo.driver_phn_no,
                    },
                    conductor: {
                        penNumber: conductorPenNo,
                        name: busInfo.conductor_name,
                        phone: busInfo.conductor_phn_no,
                    },
                    depot: busInfo["operated depot"],
                    schedule: busInfo["Schedule Number"],
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
                    <div className="flex flex-col relative" ref={busRef}>
                        <label>Bus Number (Bonnet No)</label>
                        <input
                            type="text"
                            value={bonnetNo}
                            onChange={(e) => {
                                setBonnetNo(e.target.value);
                                setShowBusDropdown(true);
                            }}
                            onFocus={() => setShowBusDropdown(true)}
                            placeholder="Enter bus number"
                            className="w-full px-3 py-2 border rounded-sm"
                        />

                        {showBusDropdown && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-sm shadow-lg top-full">
                                {loading && <div className="p-2 text-center">Loading buses...</div>}

                                {error && (
                                    <div className="p-2 text-red-500">
                                        {error} - <button
                                            onClick={() => window.location.reload()}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Retry
                                        </button>
                                    </div>
                                )}

                                {!loading && !error && filteredBuses.length === 0 && (
                                    <div className="p-2 text-gray-500">No matching buses found</div>
                                )}

                                {!loading && !error && filteredBuses.length > 0 && (
                                    <ul>
                                        {filteredBuses.map((bus) => (
                                            <li
                                                key={bus.bonnetNo}
                                                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => handleSelectBus(bus.bonnetNo)}
                                            >
                                                {bus.bonnetNo}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Driver PEN Number Field */}
                    <div className="flex flex-col relative" ref={driverRef}>
                        <label>Driver PEN Number</label>
                        <input
                            type="text"
                            value={driverPenNo}
                            onChange={(e) => {
                                setDriverPenNo(e.target.value);
                                setShowDriverDropdown(true);
                            }}
                            onFocus={() => setShowDriverDropdown(true)}
                            placeholder="Enter driver PEN number"
                            className="w-full px-3 py-2 border rounded-sm"
                        />

                        {showDriverDropdown && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-sm shadow-lg top-full">
                                {userLoading && <div className="p-2 text-center">Loading drivers...</div>}

                                {userError && (
                                    <div className="p-2 text-red-500">
                                        {userError} - <button
                                            onClick={() => window.location.reload()}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Retry
                                        </button>
                                    </div>
                                )}

                                {!userLoading && !userError && filteredDrivers.length === 0 && (
                                    <div className="p-2 text-gray-500">No matching drivers found</div>
                                )}

                                {!userLoading && !userError && filteredDrivers.length > 0 && (
                                    <ul>
                                        {filteredDrivers.map((driver) => (
                                            <li
                                                key={driver.pen_no}
                                                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => handleSelectDriver(driver.pen_no)}
                                            >
                                                {driver.pen_no} - {driver.user_first_name} {driver.user_last_name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Conductor PEN Number Field */}
                    <div className="flex flex-col relative" ref={conductorRef}>
                        <label>Conductor PEN Number</label>
                        <input
                            type="text"
                            value={conductorPenNo}
                            onChange={(e) => {
                                setConductorPenNo(e.target.value);
                                setShowConductorDropdown(true);
                            }}
                            onFocus={() => setShowConductorDropdown(true)}
                            placeholder="Enter conductor PEN number"
                            className="w-full px-3 py-2 border rounded-sm"
                        />

                        {showConductorDropdown && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-sm shadow-lg top-full">
                                {userLoading && <div className="p-2 text-center">Loading conductors...</div>}

                                {userError && (
                                    <div className="p-2 text-red-500">
                                        {userError} - <button
                                            onClick={() => window.location.reload()}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Retry
                                        </button>
                                    </div>
                                )}

                                {!userLoading && !userError && filteredConductors.length === 0 && (
                                    <div className="p-2 text-gray-500">No matching conductors found</div>
                                )}

                                {!userLoading && !userError && filteredConductors.length > 0 && (
                                    <ul>
                                        {filteredConductors.map((conductor) => (
                                            <li
                                                key={conductor.pen_no}
                                                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => handleSelectConductor(conductor.pen_no)}
                                            >
                                                {conductor.pen_no} - {conductor.user_first_name} {conductor.user_last_name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
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