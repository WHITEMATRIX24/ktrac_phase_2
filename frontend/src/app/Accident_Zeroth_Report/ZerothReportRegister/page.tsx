"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, LogOut } from 'lucide-react';

type BusData = {
    bonet_number: string;
};

const ZerothReportReg = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        bonnetNumber: '',
        operatedDepot: '',
    });

    const [allBuses, setAllBuses] = useState<BusData[]>([]);
    const [filteredBuses, setFilteredBuses] = useState<BusData[]>([]);
    const [busLoading, setBusLoading] = useState(false);
    const [busError, setBusError] = useState('');
    const [showBusDropdown, setShowBusDropdown] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const busRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchBusData = async () => {
            try {
                setBusLoading(true);
                setBusError('');
                const response = await fetch('/api/getAllBusInfo');

                if (!response.ok) throw new Error(`Failed to fetch buses: ${response.status}`);

                const result = await response.json();
                if (result.data && Array.isArray(result.data)) {
                    setAllBuses(result.data);
                    setFilteredBuses(result.data);
                } else {
                    throw new Error('Unexpected bus data format');
                }
            } catch (err) {
                setBusError('Failed to load bus data: ' + (err as Error).message);
            } finally {
                setBusLoading(false);
            }
        };

        fetchBusData();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (busRef.current && !busRef.current.contains(event.target as Node)) {
                setShowBusDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));

        if (name === 'bonnetNumber') {
            const term = value.toLowerCase();
            setFilteredBuses(allBuses.filter(bus =>
                bus.bonet_number?.toLowerCase().includes(term)
            ));
            setShowBusDropdown(true);
        }
    };

    const handleSelectBus = (bonnetNo: string) => {
        setFormData(prev => ({ ...prev, bonnetNumber: bonnetNo }));
        setShowBusDropdown(false);
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.bonnetNumber) newErrors.bonnetNumber = 'Bonnet number is required';
        if (!formData.operatedDepot) newErrors.operatedDepot = 'Operated depot is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            sessionStorage.setItem(
                'accidentData',
                JSON.stringify({
                    bonnetNumber: formData.bonnetNumber,
                    operatedDepot: formData.operatedDepot,
                })
            );
            router.push('/Accident_Zeroth_Report/ZerothForm');
        }
    };


    const handleLogout = () => {
        localStorage.clear();
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="flex justify-between items-center p-4 bg-white shadow-sm">
                <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                    <h2 className="text-lg font-semibold">
                        Accident Spot Report - Registration
                    </h2>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center text-red-600 hover:bg-gray-100 px-3 py-1 rounded text-sm"
                >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                </button>
            </div>

            <div className="flex-1 p-4 w-full h-full ">
                <div className="bg-white border rounded-sm shadow-sm w-full min-h-[80vh] p-4 sm:p-6">
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-800">
                            Enter Vehicle Details <br />
                            വാഹന വിശദാംശങ്ങൾ നൽകുക
                        </h3>
                        {/* <p className="text-sm text-gray-600">
                            Please provide required information to proceed <br />
                            തുടരാൻ ആവശ്യമായ വിവരങ്ങൾ നൽകുക
                        </p> */}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col gap-4 md:flex-row">
                            <div className="flex-1 relative" ref={busRef}>
                                <label className="text-sm font-medium text-gray-700 mb-1 block">
                                    Bus Number (Bonnet No) <span className="text-red-600">*</span>
                                    <span className="text-xs text-gray-500 block">
                                        ബസ് നമ്പർ (ബോണറ്റ് നമ്പർ)
                                    </span>
                                </label>
                                <input
                                    name="bonnetNumber"
                                    value={formData.bonnetNumber}
                                    onChange={handleChange}
                                    onFocus={() => setShowBusDropdown(true)}
                                    className={`w-full px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 ${errors.bonnetNumber ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Search bus number / ബസ് നമ്പർ തിരയുക"
                                    autoComplete="off"
                                />
                                {errors.bonnetNumber && (
                                    <p className="text-xs text-red-600 mt-1">{errors.bonnetNumber}</p>
                                )}
                                {showBusDropdown && (
                                    <div className="absolute z-10 w-full bg-white border mt-1 rounded shadow max-h-60 overflow-y-auto">
                                        {busLoading ? (
                                            <div className="p-3 text-center text-gray-500">Loading buses... / ബസുകൾ ലോഡ് ചെയ്യുന്നു...</div>
                                        ) : busError ? (
                                            <div className="p-3 text-red-500">{busError}</div>
                                        ) : filteredBuses.length === 0 ? (
                                            <div className="p-3 text-center text-gray-500">No matching buses found / അനുയോജ്യമായ ബസുകൾ കണ്ടെത്തിയില്ല</div>
                                        ) : (
                                            <ul>
                                                {filteredBuses.map((bus, index) => (
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

                            <div className="flex-1">
                                <label className="text-sm font-medium text-gray-700 mb-1 block">
                                    Operated Depot <span className="text-red-600">*</span>
                                    <span className="text-xs text-gray-500 block ">

                                        ഓപ്പറേറ്റഡ്  ഡിപ്പോ
                                    </span>
                                </label>
                                <input
                                    name="operatedDepot"
                                    value={formData.operatedDepot}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 ${errors.operatedDepot ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Enter operated depot / ഡിപ്പോ നാമം നൽകുക"
                                />
                                {errors.operatedDepot && (
                                    <p className="text-xs text-red-600 mt-1">{errors.operatedDepot}</p>
                                )}
                            </div>
                        </div>

                        <div className="pt-2 flex justify-center md:justify-end">
                            <button
                                type="submit"
                                className="py-2.5 px-4 bg-[var(--sidebar)] text-white rounded hover:bg-[#001670] transition-colors text-sm font-medium shadow-md"
                            >
                                Continue / തുടരുക
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default ZerothReportReg;
