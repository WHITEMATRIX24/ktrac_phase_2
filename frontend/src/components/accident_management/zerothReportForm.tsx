"use client";

import React, { useState, useEffect, useRef, ChangeEvent, DragEvent, FormEvent, useCallback } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { debounce } from '@mui/material';

interface MediaFile {
    id: string;
    url: string;
    type: 'image' | 'video';
    file: File;
}
interface Vehicle {
    id: number;
    busNumber: string;
    accidentDate: string;
    timeOfAccident: string;
    driver: Driver;
    conductor: Conductor;
    schedule: string;
    depot: string;
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

interface AccidentReportFormProps {
    selectedVehicle: Vehicle;
}
interface LocationSuggestion {
    display_name: string;
    lat: string;
    lon: string;
    name: string;
    address?: {  // Make address optional
        name?: string;
        town?: string;  // Add missing common properties
        village?: string;
        hamlet?: string;
        county?: string;
        state?: string;
    };
}

const AccidentReportForm = ({ selectedVehicle }: AccidentReportFormProps) => {
    const [activeTab, setActiveTab] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [accidentId, setAccidentId] = useState<string | null>(null);
    const [isSubmittingDocumentation, setIsSubmittingDocumentation] = useState(false);
    const [locationSuggestions, setLocationSuggestions] = useState<LocationSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
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
        homeDepot: '',
        operatedDepot: '',
        scheduleNumber: '',
        description: '',
        driverName: '',
        driverPhone: '',
        conductorName: '',
        conductorPhone: '',
    });

    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);

    const tabLabels = [
        { label: "Location Details" },
        { label: "Accident & Crew" },
        { label: "Documentation" }
    ];

    // Initialize form with selected vehicle data
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            operatedDepot: selectedVehicle.depot || "",
            scheduleNumber: selectedVehicle.schedule || "",
            driverName: selectedVehicle.driver.name,
            driverPhone: selectedVehicle.driver.phone,
            conductorName: selectedVehicle.conductor.name,
            conductorPhone: selectedVehicle.conductor.phone,
        }));
    }, [selectedVehicle]);

    // useEffect(() => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             async (position) => {
    //                 const lat = position.coords.latitude.toFixed(6);
    //                 const lon = position.coords.longitude.toFixed(6);

    //                 setLocationPermission(true);

    //                 try {
    //                     const response = await fetch(
    //                         `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
    //                     );
    //                     const data = await response.json();
    //                     const address = data.address || {};
    //                     setLocationData({
    //                         address: data.display_name || '',
    //                         place: address.hamlet || address.village || '',
    //                         district: address.county || address.district || '',
    //                         state: address.state || '',
    //                         latitude: lat,
    //                         longitude: lon,
    //                         policeStation: '',
    //                     });
    //                 } catch (error) {
    //                     console.error("Error fetching address:", error);
    //                 }
    //             },
    //             (error) => {
    //                 console.error("Location permission denied:", error);
    //                 setLocationPermission(false);
    //             }
    //         );
    //     } else {
    //         console.log("Geolocation not supported");
    //     }
    // }, []);
    const fetchLocationSuggestions = useCallback(
        debounce(async (query: string) => {
            if (!query.trim()) {
                setLocationSuggestions([]);
                return;
            }

            try {
                setIsFetchingSuggestions(true);
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
                );
                const data = await response.json();
                setLocationSuggestions(data.slice(0, 5)); // Limit to 5 suggestions
            } catch (error) {
                console.error("Error fetching location suggestions:", error);
            } finally {
                setIsFetchingSuggestions(false);
            }
        }, 300),
        []
    );

    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocationData(prev => ({ ...prev, address: value }));

        // Only fetch suggestions when user types more than 3 characters
        if (value.length > 2) {
            fetchLocationSuggestions(value);
            setShowSuggestions(true);
        } else {
            setLocationSuggestions([]);
        }
    };

    const handleSuggestionSelect = (suggestion: LocationSuggestion) => {
        console.log(suggestion)
        console.log(suggestion.name)
        setLocationData(prev => ({
            ...prev,
            address: suggestion.display_name,
            place: suggestion.name
                ?? suggestion.address?.town
                ?? suggestion.address?.village
                ?? suggestion.address?.hamlet
                ?? '',
            district: suggestion.address?.county ?? '',
            state: suggestion.address?.state ?? '',
            latitude: suggestion.lat,
            longitude: suggestion.lon,
        }));
        setLocationSuggestions([]);
        setShowSuggestions(false);
    };
    const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocationData(prev => ({ ...prev, [name]: value }));
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

    const formatDateToISO = (dateString: string) => {
        const [day, month, year] = dateString.split('-');
        return `${year}-${month}-${day}`;
    };

    const handleSubmitAccidentDetails = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const payload = {
                vehicle_info: [
                    { bonet_no: selectedVehicle.busNumber || '' }
                ],
                location_info: [
                    {
                        address: locationData.address,
                        place: locationData.place,
                        district: locationData.district,
                        state: locationData.state
                    }
                ],
                Geolocation: [
                    {
                        latitude: locationData.latitude,
                        longitude: locationData.longitude,
                        nearest_police_station: locationData.policeStation
                    }
                ],
                "Accident Details": [
                    {
                        date_of_accident: formatDateToISO(formData.dateOfAccident),
                        time_of_accident: formData.timeOfAccident,
                        operated_depot: formData.operatedDepot,
                        schedule_number: formData.scheduleNumber,
                        description: formData.description
                    }
                ],
                crew_information: [
                    {
                        driver_name: formData.driverName,
                        driver_phn_no: formData.driverPhone,
                        conductor_name: formData.conductorName,
                        conductor_phn_no: formData.conductorPhone
                    }
                ]
            };

            const response = await fetch('/api/submitZeroReportDetails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('Failed to submit accident details');

            const result = await response.json();
            setAccidentId(result.accident_id);
            setIsFormSubmitted(true);
            setActiveTab(2);
        } catch (error) {
            setSubmitError('Failed to submit accident details. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitDocumentation = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmittingDocumentation(true);

        if (!accidentId) {
            alert("Accident ID is missing. Please submit accident details first.");
            return;
        }

        if (mediaFiles.length === 0) {
            alert("Please upload at least one photo");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('accidentId', accidentId);
            mediaFiles.forEach((media, index) => {
                formData.append(`media_${index}`, media.file);
            });

            const response = await fetch('/api/upload-media', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Failed to upload media');


        } catch (error) {
            alert('Error submitting documentation. Please try again.');
        } finally {
            setIsSubmittingDocumentation(false);
        }
    };
    const isTab0Complete = () => {
        return (
            locationData.address.trim() !== '' &&
            locationData.place.trim() !== '' &&
            locationData.district.trim() !== '' &&
            locationData.state.trim() !== '' &&
            locationData.latitude.trim() !== '' &&
            locationData.longitude.trim() !== '' &&
            locationData.policeStation.trim() !== ''
        );
    };
    const handleCancel = () => {
        setFormData({
            timeOfAccident: '',
            dateOfAccident: '',
            homeDepot: '',
            operatedDepot: '',
            scheduleNumber: '',
            description: '',
            driverName: '',
            driverPhone: '',
            conductorName: '',
            conductorPhone: '',
        });
        setMediaFiles([]);
    };
    return (
        <div>
            <div className="flex flex-col flex-1 mt-2">
                <div className="flex flex-col flex-1"></div>
                <div className='flex flex-col'>
                    <div className="flex border-b border-t border-gray-200 bg-white overflow-x-auto flex-shrink-0">
                        {tabLabels.map((tab, index) => {
                            const isDisabled = (isFormSubmitted && index !== 2) || (index === 2 && !accidentId);
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    disabled={isDisabled}
                                    className={`flex items-center px-4 py-2.5 text-[12px] font-medium whitespace-nowrap bg-transparent transition-all duration-200 border-b-2
                                                        ${activeTab === index
                                            ? 'text-[var(--sidebar)] border-[var(--sidebar)] bg-white'
                                            : isDisabled
                                                ? 'text-gray-400 cursor-not-allowed'
                                                : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'}`}
                                    onClick={() => !isDisabled && setActiveTab(index)}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}

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

                                <div className="mb-3 relative">
                                    <label className="text-[12px] font-[600] text-gray-700 mb-1">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={locationData.address}
                                        onChange={handleAddressChange}
                                        className="w-full py-2 px-3 border border-gray-300 rounded text-xs"
                                        placeholder="Start typing to search for location..."
                                    />

                                    {showSuggestions && locationSuggestions.length > 0 && (
                                        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-b shadow-lg mt-1">
                                            {locationSuggestions.map((suggestion, index) => (
                                                <div
                                                    key={index}
                                                    className="p-2 hover:bg-gray-100 cursor-pointer text-xs border-b border-gray-100 last:border-b-0"
                                                    onClick={() => handleSuggestionSelect(suggestion)}
                                                >
                                                    {suggestion.display_name}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {isFetchingSuggestions && (
                                        <div className="absolute right-3 top-8">
                                            <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="text-[12px] font-[600] text-gray-700 mb-1">Accident Place</label>
                                    <input
                                        name="place"
                                        value={locationData.place}
                                        onChange={handleLocationChange}
                                        className="w-full py-2 px-3 border border-gray-300 rounded text-xs"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                    <div>
                                        <label className="text-[12px] font-[600] text-gray-700 mb-1">District</label>
                                        <input
                                            name="district"
                                            value={locationData.district}
                                            onChange={handleLocationChange}
                                            className="w-full py-2 px-3 border border-gray-300 rounded text-xs"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[12px] font-[600] text-gray-700 mb-1">State</label>
                                        <input
                                            name="state"
                                            value={locationData.state}
                                            onChange={handleLocationChange}
                                            className="w-full py-2 px-3 border border-gray-300 rounded text-xs"
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
                                            name="latitude"
                                            value={locationData.latitude}
                                            onChange={handleLocationChange}
                                            className="w-full py-2 px-3 border border-gray-300 rounded text-xs"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[12px] font-[600] text-gray-700 mb-1">Longitude</label>
                                        <input
                                            name="longitude"
                                            value={locationData.longitude}
                                            onChange={handleLocationChange}
                                            className="w-full py-2 px-3 border border-gray-300 rounded text-xs"
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="text-[12px] font-[600] text-gray-700 mb-1">Nearest Police Station</label>
                                    <input
                                        name="policeStation"
                                        value={locationData.policeStation}
                                        onChange={handleLocationChange}
                                        className="w-full py-2 px-3 border border-gray-300 rounded text-xs"
                                    />
                                </div>

                                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                                    <p className="text-[11px] text-blue-800">
                                        Search for the accident location using the address field. As you type, suggestions will appear.
                                        Select a suggestion to automatically fill location details.
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
                                            value={formData.scheduleNumber ?? ""}
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
                                                value={formData.driverName}
                                                readOnly
                                                className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-gray-100"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-[12px] font-[600] text-gray-700 mb-1">Driver Phone</label>
                                            <input
                                                type="tel"
                                                name="driverPhone"
                                                value={formData.driverPhone || ''}
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
                                                value={formData.conductorName || ''}
                                                readOnly
                                                className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-gray-100"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-[12px] font-[600] text-gray-700 mb-1">Conductor Phone</label>
                                            <input
                                                type="tel"
                                                name="conductorPhone"
                                                value={formData.conductorPhone || ''}
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




            <div className="border-t-1 border-grey-500 py-[10px] px-[16px] flex justify-between">

                <div className="flex gap-3">
                    {activeTab > 0 && !isFormSubmitted && (
                        <button
                            type="button"
                            onClick={() => setActiveTab(activeTab - 1)}
                            className="flex items-center justify-center px-5 py-1 text-[12px] font-medium bg-green-500 text-white rounded hover:bg-green-600 transition-all"
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Previous
                        </button>
                    )}
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex items-center justify-center px-5 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100 transition-all"
                    >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                    </button>
                    {activeTab === 0 && (
                        <button
                            type="button"
                            onClick={() => setActiveTab(1)}
                            disabled={!isTab0Complete()} // Disabled if fields not filled
                            className={`flex items-center justify-center px-5 py-1 text-sm font-medium text-white rounded transition-all
                                ${!isTab0Complete()
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-[var(--sidebar)] hover:bg-[#001670]'}`}
                        >
                            Next
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </button>
                    )}

                    {activeTab === 1 && (
                        <button
                            type="button"
                            onClick={handleSubmitAccidentDetails}
                            disabled={isSubmitting}
                            className={`flex items-center justify-center px-5 py-1 text-sm font-medium text-white rounded transition-all
                                        ${isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-[var(--sidebar)] hover:bg-[#001670]'}`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </span>
                            ) : (
                                <>
                                    <Check className="w-4 h-4 mr-2" />
                                    Submit Details
                                </>
                            )}
                        </button>
                    )}

                    {activeTab === 2 && (
                        <button
                            type="button"
                            onClick={handleSubmitDocumentation}
                            disabled={isSubmittingDocumentation}
                            className={`flex items-center justify-center px-5 py-1 text-sm font-medium text-white rounded transition-all
                                        ${isSubmittingDocumentation
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-[var(--sidebar)] hover:bg-[#001670]'}`}
                        >
                            {isSubmittingDocumentation ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </span>
                            ) : (
                                <>
                                    <Check className="w-4 h-4 mr-2" />
                                    Submit Documentation
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>


    );
};

export default AccidentReportForm;