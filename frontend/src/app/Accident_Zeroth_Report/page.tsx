"use client";

import React, { useState, useEffect, useRef, ChangeEvent, DragEvent, FormEvent } from 'react';
import { AlertTriangle, LogOut, Camera, X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import AddZerothReportModal from '@/components/accident_management/zerothreport_modal';
import { useRouter } from 'next/navigation';

type MediaFile = {
    id: string;
    url: string;
    type: 'image' | 'video';
    file: File;
};
interface Vehicle {
    id: number;
    BUSNO: string;
    accidentDate: string;
    timeOfAccident: string;
    driver: Driver;
    conductor: Conductor;
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

const ZerothReport = () => {
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [isVehicleModalSearch, setIsVehicleModalSearch] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [locationPermission, setLocationPermission] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
    const [selectedConductor, setSelectedConductor] = useState<Conductor | null>(null);

    const [locationData, setLocationData] = useState({
        address: '',
        place: '',
        district: '',
        state: '',
        latitude: '',
        longitude: '',
        policeStation: '',
    });

    const [formData, setFormData] = useState({
        timeOfAccident: '',
        dateOfAccident: new Date().toISOString().split("T")[0],
        homeDepot: 'Main Depot',
        operatedDepot: 'City Center Depot',
        scheduleNumber: '',
        description: '',
        driverName: '',
        driverPhone: '',
        conductorName: '',
        conductorPhone: '',
        severity: '',
        vehicleTowed: '',
    });

    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);

    const tabLabels = [
        { label: "Location Details" },
        { label: "Accident & Crew" },
        { label: "Documentation" }
    ];

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude.toFixed(6);
                    const lon = position.coords.longitude.toFixed(6);

                    setLocationPermission(true);

                    try {
                        const response = await fetch(
                            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
                        );
                        const data = await response.json();
                        console.log(data)
                        const address = data.address || {};
                        console.log("adredd", address)
                        setLocationData({
                            address: data.display_name || '',
                            place: address.hamlet || address.village || '',
                            district: address.county || address.district || '',
                            state: address.state || '',
                            latitude: lat,
                            longitude: lon,
                            policeStation: '',
                        });
                    } catch (error) {
                        console.error("Error fetching address:", error);
                    }
                },
                (error) => {
                    console.error("Location permission denied:", error);
                    setLocationPermission(false);
                }
            );
        } else {
            console.log("Geolocation not supported");
        }
    }, []);


    const handleVehicleSelect = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setSelectedDriver(vehicle.driver);
        setSelectedConductor(vehicle.conductor);
        setIsVehicleModalSearch(false);

    };


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const newFiles: MediaFile[] = Array.from(e.target.files).map(file => ({
            id: `${file.name}-${Date.now()}`,
            file,
            type: file.type.startsWith('video') ? 'video' : 'image',
            url: URL.createObjectURL(file),
        }));
        setMediaFiles(prev => [...prev, ...newFiles]);
    };

    const handleRemoveFile = (id: string) => {
        setMediaFiles(prev => prev.filter(file => file.id !== id));
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (!e.dataTransfer.files) return;

        const newFiles: MediaFile[] = Array.from(e.dataTransfer.files).map(file => ({
            id: `${file.name}-${Date.now()}`,
            file,
            type: file.type.startsWith('video') ? 'video' : 'image',
            url: URL.createObjectURL(file),
        }));
        setMediaFiles(prev => [...prev, ...newFiles]);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', { ...formData, ...locationData, mediaFiles });
        alert('Zeroth Report submitted successfully!');
    };
    const router = useRouter()
    const handleLogout = () => {
        // Clear any auth tokens or user state here
        localStorage.clear() // or remove specific keys like localStorage.removeItem("token")


        router.push("/") // Adjust path as needed
    }

    const handleCancel = () => {
        setSelectedVehicle(null);
        setFormData({
            timeOfAccident: '',
            dateOfAccident: '',
            homeDepot: 'KKD',
            operatedDepot: 'KKD',
            scheduleNumber: '',
            description: '',
            driverName: '',
            driverPhone: '',
            conductorName: '',
            conductorPhone: '',
            severity: '',
            vehicleTowed: '',
        });
        setMediaFiles([]);
    };
    return (
        <div className="min-h-screen bg-gray-50 text-xs flex flex-col">
            {/* Top Bar */}
            <div className="flex flex-row justify-between items-center p-4 bg-white shadow-sm">
                <div className="flex items-center">
                    <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                    <h2 className="text-[16px] font-semibold">Accident Spot Report</h2>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center px-3 py-1 text-red-600 hover:bg-gray-100 rounded-md text-sm cursor-pointer"
                >
                    <LogOut className="w-4 h-4 mr-1 text-red-600" />
                    Logout
                </button>
            </div>

            {/* Vehicle Search Bar */}
            <div className="p-3 border-b border-grey-300 mt-1">
                <div className="flex items-center gap-3">
                    <h6 className="font-[500] text-[12px]">
                        Vehicle Number <span className="text-red-600">*</span>
                    </h6>
                    <input
                        type="text"
                        value={selectedVehicle ? selectedVehicle.BUSNO : ""}
                        placeholder="Search and select bus number"
                        onClick={() => setIsVehicleModalSearch(true)}
                        readOnly
                        className="w-[70%] md:w-[83%] py-1 px-2.5 text-xs bg-white border border-gray-300 rounded-[3px]"
                    />

                    <button
                        onClick={() => setIsVehicleModalSearch(true)}
                        className="px-3 py-1 text-white cursor-pointer bg-[var(--sidebar)] rounded text-xs whitespace-nowrap"
                    >
                        Select Vehicle
                    </button>
                </div>
            </div>

            {/* Vehicle Selection Modal */}
            {isVehicleModalSearch && (
                <AddZerothReportModal
                    closeHandler={() => setIsVehicleModalSearch(false)}
                    caseSelectHandler={handleVehicleSelect}
                />
            )}

            {/* Main Form Content */}
            {selectedVehicle && (
                <div className="flex flex-col flex-1 mt-2">
                    <div className="flex flex-col flex-1">
                        {/* Tabs */}
                        <div className='flex flex-col'>
                            <div className="flex border-b border-t border-gray-200 bg-white overflow-x-auto flex-shrink-0">
                                {tabLabels.map((tab, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`flex items-center px-4 py-2.5 text-[12px] font-medium whitespace-nowrap bg-transparent transition-all duration-200 border-b-2
                          ${activeTab === index
                                                ? 'text-[var(--sidebar)] border-[var(--sidebar)] bg-white'
                                                : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'}`}
                                        onClick={() => setActiveTab(index)}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                            <div className="h-0.5 bg-gray-200 flex-shrink-0">
                                <div
                                    className="h-full bg-[var(--sidebar)] transition-all duration-300 ease-in-out"
                                    style={{
                                        width: `${((activeTab + 1) / tabLabels.length) * 100}%`
                                    }}
                                />
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1 overflow-auto p-4">
                            {/* Location Details Tab */}
                            {activeTab === 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                                    <div className="bg-white border rounded-[4px] p-4 overflow-auto h-full md:min-h-[65vh]">
                                        <h3 className="text-[14px] font-[600] mb-3 text-[#1a202c] pb-2 border-b-2 border-[var(--sidebar)]">
                                            Location Information
                                        </h3>

                                        <div className="mb-3">
                                            <label className="text-[12px] font-[600] text-gray-700 mb-1">Address</label>
                                            <textarea
                                                value={locationData.address}
                                                readOnly
                                                className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-gray-50"
                                                rows={3}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="text-[12px] font-[600] text-gray-700 mb-1">Accident Place</label>
                                            <input
                                                value={locationData.place}
                                                readOnly
                                                className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-gray-50"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                            <div>
                                                <label className="text-[12px] font-[600] text-gray-700 mb-1">District</label>
                                                <input
                                                    value={locationData.district}
                                                    readOnly
                                                    className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-gray-50"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[12px] font-[600] text-gray-700 mb-1">State</label>
                                                <input
                                                    value={locationData.state}
                                                    readOnly
                                                    className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-gray-50"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white border rounded-[4px] p-4 overflow-auto h-full md:min-h-[65vh] mb-[50px] md:mb-0">
                                        <h3 className="text-[14px] font-[600] mb-3 text-[#1a202c] pb-2 border-b-2 border-[var(--sidebar)]">
                                            Geolocation
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                            <div>
                                                <label className="text-[12px] font-[600] text-gray-700 mb-1">Latitude</label>
                                                <input
                                                    value={locationData.latitude}
                                                    readOnly
                                                    className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-gray-50"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[12px] font-[600] text-gray-700 mb-1">Longitude</label>
                                                <input
                                                    value={locationData.longitude}
                                                    readOnly
                                                    className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-gray-50"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="text-[12px] font-[600] text-gray-700 mb-1">Nearest Police Station</label>
                                            <input
                                                value={locationData.policeStation}
                                                readOnly
                                                className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-gray-50"
                                            />
                                        </div>

                                        <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                                            <p className="text-[11px] text-blue-800">
                                                {locationPermission
                                                    ? "Location data fetched successfully. This information is prefilled based on your current location."
                                                    : "Location permission not granted. Please enable location services for accurate reporting."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Accident & Crew Tab */}
                            {activeTab === 1 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full ">
                                    {/* Accident Details */}
                                    <div className="bg-white border border-gray-200 rounded p-4 overflow-auto h-full md:min-h-[65vh]">
                                        <h3 className="text-[14px] font-[600] mb-3 text-[#1a202c] pb-2 border-b-2 border-[var(--sidebar)]">Accident Details</h3>

                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-[12px] font-[600] text-gray-700 mb-1">Date of Accident</label>
                                                    <input
                                                        type="date"
                                                        name="dateOfAccident"
                                                        value={formData.dateOfAccident}
                                                        onChange={handleChange}
                                                        className="w-full py-2 px-3 border border-gray-300 rounded text-xs"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[12px] font-[600] text-gray-700 mb-1">Time of Accident</label>
                                                    <input
                                                        type="time"
                                                        name="timeOfAccident"
                                                        value={formData.timeOfAccident}
                                                        onChange={handleChange}
                                                        className="w-full py-2 px-3 border border-gray-300  rounded text-xs"
                                                    />
                                                </div>

                                            </div>

                                            {/* <div>
                                                <label className="text-[12px] font-[600] text-gray-700 mb-1">Home Depot</label>
                                                <input
                                                    name="homeDepot"
                                                    value={formData.homeDepot}
                                                    onChange={handleChange}
                                                    className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-gray-50"
                                                    readOnly
                                                />
                                            </div> */}

                                            <div>
                                                <label className="text-[12px] font-[600] text-gray-700 mb-1">Operated Depot</label>
                                                <input
                                                    name="operatedDepot"
                                                    value={formData.operatedDepot}
                                                    onChange={handleChange}
                                                    className="w-full py-2 px-3 border border-gray-300 rounded text-xs"

                                                />
                                            </div>

                                            <div>
                                                <label className="text-[12px] font-[600] text-gray-700 mb-1">Schedule Number</label>
                                                <input
                                                    name="scheduleNumber"
                                                    placeholder="Enter Schedule Number"
                                                    value={formData.scheduleNumber}
                                                    onChange={handleChange}
                                                    className="w-full py-2 px-3 border border-gray-300 rounded text-xs"
                                                />
                                            </div>

                                            <div>
                                                <label className="text-[12px] font-[600] text-gray-700 mb-1">Description</label>
                                                <textarea
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    className="w-full py-2 px-3 border border-gray-300 rounded text-xs"
                                                    rows={3}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Crew Information */}
                                    <div className="bg-white border border-gray-200 rounded p-4 overflow-auto h-full md:min-h-[65vh] mb-[50px] md:mb-0">
                                        <h3 className="text-[14px] font-[600] mb-3 text-[#1a202c] pb-2 border-b-2 border-[var(--sidebar)]">Crew Information</h3>

                                        <div className="space-y-4">


                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-[12px] font-[600] text-gray-700 mb-1">Driver Name</label>
                                                    <input
                                                        name="driverName"
                                                        value={selectedDriver?.name || ''}
                                                        readOnly
                                                        className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-gray-100"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-[12px] font-[600] text-gray-700 mb-1">Driver Phone</label>
                                                    <input
                                                        type="tel"
                                                        name="driverPhone"
                                                        value={selectedDriver?.phone || ''}
                                                        readOnly
                                                        className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-gray-100"
                                                    />
                                                </div>
                                            </div>



                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-[12px] font-[600] text-gray-700 mb-1">Conductor Name</label>
                                                    <input
                                                        name="conductorName"
                                                        value={selectedConductor?.name || ''}
                                                        readOnly
                                                        className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-gray-100"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="text-[12px] font-[600] text-gray-700 mb-1">Conductor Phone</label>
                                                    <input
                                                        type="tel"
                                                        name="conductorPhone"
                                                        value={selectedConductor?.phone || ''}
                                                        readOnly
                                                        className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-gray-100"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Documentation Tab */}
                            {activeTab === 2 && (
                                <div className="flex flex-col lg:flex-row gap-[6px]">
                                    {/* Left Section - Upload Form */}
                                    <div className="w-full lg:w-1/2 h-full bg-white border border-gray-300 rounded-[4px] p-[16px] overflow-auto md:min-h-[65vh] sm:min-h-[50vh]">
                                        <h3 className="text-[14px] font-semibold mb-3 text-gray-900 pb-2 border-b-2 border-[var(--sidebar)]">
                                            Accident Documentation
                                        </h3>

                                        <div
                                            className={`flex-1 border-2 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-dashed border-gray-300'} 
                rounded-lg p-6 mb-4 flex flex-col items-center justify-center cursor-pointer`}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <input
                                                type="file"
                                                multiple
                                                onChange={handleFileChange}
                                                className="hidden"
                                                ref={fileInputRef}
                                            />
                                            <div className="text-center">
                                                <div className="bg-gray-100 p-3 rounded-full inline-block mb-3">
                                                    <Camera className="w-6 h-6 text-gray-500" />
                                                </div>
                                                <p className="text-sm font-medium text-gray-700">
                                                    {isDragging ? 'Drop files here' : 'Click or drag files to upload'}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Upload images or videos of the accident scene
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-auto p-3 bg-gray-50 rounded border border-gray-200">
                                            <h4 className="text-xs font-semibold mb-2">Upload Guidelines</h4>
                                            <ul className="text-xs text-gray-600 space-y-1">
                                                <li>• Upload clear photos showing the accident from multiple angles</li>
                                                <li>• Include close-up shots of any vehicle damage</li>
                                                <li>• Maximum file size: 5MB per image, 20MB for video</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Right Section - Uploaded Images */}
                                    <div className="w-full lg:w-1/2 bg-white border border-gray-300 rounded-[4px] p-[16px] overflow-auto min-h-[50vh] md:min-h-[65vh] mb-[50px] md:mb-2">
                                        <h3 className="text-[14px] font-semibold mb-3 text-gray-900 pb-2 border-b-2 border-[var(--sidebar)]">
                                            Uploaded Images
                                        </h3>

                                        {mediaFiles.length > 0 ? (
                                            <div className="mb-4">
                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                                    {mediaFiles.map((media) => (
                                                        <div key={media.id} className="relative border rounded-lg overflow-hidden h-32">
                                                            {media.type === 'video' ? (
                                                                <video src={media.url} className="w-full h-full object-cover" controls />
                                                            ) : (
                                                                <img src={media.url} alt="Uploaded media" className="w-full h-full object-cover" />
                                                            )}
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleRemoveFile(media.id);
                                                                }}
                                                                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-red-100"
                                                            >
                                                                <X size={14} className="text-gray-600" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-500">No images are uploaded.</p>
                                        )}
                                    </div>
                                </div>

                            )}
                        </div>
                    </div>

                    {/* Form Actions - Fixed at bottom */}


                    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
                        <div className="flex justify-between items-center">

                            {/* Left Buttons */}
                            <div className="flex gap-3">
                                {activeTab > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab(activeTab - 1)}
                                        className="flex items-center justify-center px-5 py-1 text-[12px] font-medium bg-green-500 text-white rounded hover:bg-green-600 transition-all
                     sm:px-5 sm:py-1 sm:text-base"
                                        aria-label="Previous"
                                    >
                                        <ChevronLeft className="w-4 h-4 sm:mr-2" />
                                        <span className="hidden sm:inline text-[12px]">Previous</span>
                                    </button>
                                )}

                                {activeTab < tabLabels.length - 1 &&
                                    !(formData.severity === "Insignificant" && activeTab === 2) && (
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab(activeTab + 1)}
                                            className="flex items-center justify-center px-5 py-1 text-sm font-medium bg-[var(--sidebar)] text-white rounded hover:bg-[#001670] transition-all
                       sm:px-5 sm:py-1 sm:text-base"
                                            aria-label="Next"
                                        >
                                            <span className="hidden sm:inline text-[12px]">Next</span>
                                            <ChevronRight className="w-4 h-4 sm:ml-2 text-[12px]" />
                                        </button>
                                    )}
                            </div>

                            {/* Right Buttons */}
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex items-center justify-center px-5 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-all
                   sm:px-5 sm:py-1 sm:text-base"
                                    aria-label="Cancel"
                                >
                                    <X className="w-4 h-4 sm:mr-2" />
                                    <span className="hidden sm:inline text-[12px]">Cancel</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="flex items-center justify-center px-5 py-1 text-sm font-medium bg-[var(--sidebar)] text-white rounded hover:bg-[#001670] transition-all
                   sm:px-5 sm:py-1 sm:text-base"
                                    aria-label="Submit Report"
                                >
                                    <Check className="w-4 h-4 sm:mr-2" />
                                    <span className="hidden sm:inline text-[12px]">Submit Report</span>
                                </button>
                            </div>
                        </div>
                    </div>



                </div>
            )}
        </div>
    );
};

export default ZerothReport;