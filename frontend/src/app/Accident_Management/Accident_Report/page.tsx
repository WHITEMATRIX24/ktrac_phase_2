'use client';

import * as React from 'react';
import { Bus, Car, X, Upload, AlertTriangle, ChevronLeft, ChevronRight, Clipboard, TriangleAlert, Wrench } from 'lucide-react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

interface Vehicle {
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

const dummyVehicles: Vehicle[] = [
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

const PrimaryAccidentReport: React.FC = () => {
    const [selectedVehicle, setSelectedVehicle] = React.useState<Vehicle | null>(null);
    const [activeTab, setActiveTab] = React.useState(0);
    const [attachments, setAttachments] = React.useState<File[]>([]);
    const initialFormState = {
        // Primary Details
        accidentRefNo: '',
        dateOfAccident: '',
        bonnetNo: '',
        regNo: '',
        ksrcOrKswift: '',
        busClass: '',
        operatedDepot: '',
        operatedDepotZone: '',
        homeDepot: '',
        ageOfBus: 0,
        typeOfOtherVehicle: '',
        involvedVehicleRegNumbers: '',
        accidentState: '',
        accidentDistrict: '',
        accidentPlace: '',
        gpsLatitude: '',
        gpsLongitude: '',
        jurisdictionDepot: '',
        policeStation: '',
        timeOfAccident: '',
        timeZone: '',
        remarks: '',

        // Damages Happened
        severity: '',
        accidentType: '',
        typeOfCollision: '',
        primaryCause: '',
        primaryResponsibility: '',
        fatalitiesCrew: '',
        fatalitiesPassengers: '',
        fatalitiesThirdParty: '',
        majorInjuriesCrew: '',
        minorInjuriesCrew: '',
        majorInjuriesPassengers: '',
        minorInjuriesPassengers: '',
        majorInjuriesThirdParty: '',
        minorInjuriesThirdParty: '',

        // Service Details
        scheduleNumber: '',
        operatedScheduleName: '',
        accidentOccurred: '',
        roadClassification: '',
        roadCondition: '',
        weatherCondition: '',
        trafficDensity: '',
        damageToBus: '',
        thirdPartyPropertiesDamaged: '',
        driverName: '',
        driverCategory: '',
        driverPenId: '',
        driverPhone: '',
        conductorName: '',
        conductorPenId: '',
        conductorPhone: '',
        inquiryInspectorName: '',
        inspectorPhone: '',

        // Recovery Phase
        dockedOrServiceAfter: '',
        takenForRepair: '',
        gdEntered: '',
        firRegistered: '',
        costOfDamage: '',
        amountSettledWithDriver: '',
        codSettledWithOtherVehicle: '',
        codRecovered: '',
        caseSettled: '',
        recoveryRemarks: '',
    };

    const [formData, setFormData] = React.useState(initialFormState);
    const handleVehicleSelect = (event: any, value: Vehicle | null) => {
        setSelectedVehicle(value);
        if (value) {
            // Set default values based on selected vehicle
            setFormData(prev => ({
                ...prev,
                bonnetNo: value.BUSNO,
                regNo: value.REGNO,
                busClass: value.CLASS,
                operatedDepot: value.DEPOT,
                homeDepot: value.DEPOT,
                ageOfBus: value.AGE,
            }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setAttachments(prev => [...prev, ...newFiles]);
        }
    };

    const handleRemoveFile = (index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    const handleCancel = () => {
        setSelectedVehicle(null);
        setFormData(initialFormState);
        setAttachments([]);
        setActiveTab(0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Form submission logic would go here
        console.log('Form submitted:', formData);
        alert('Accident report submitted successfully!');
        handleCancel();
    };





    // const totalFatalities =
    //     Number(formData.fatalitiesCrew || 0) +
    //     Number(formData.fatalitiesPassengers || 0) +
    //     Number(formData.fatalitiesThirdParty || 0);

    // const totalMajorInjuries =
    //     Number(formData.majorInjuriesCrew || 0) +
    //     Number(formData.majorInjuriesPassengers || 0) +
    //     Number(formData.majorInjuriesThirdParty || 0);

    // const totalMinorInjuries =
    //     Number(formData.minorInjuriesCrew || 0) +
    //     Number(formData.minorInjuriesPassengers || 0) +
    //     Number(formData.minorInjuriesThirdParty || 0);
    const tabLabels = [
        { label: "Primary Details", icon: <Clipboard className="w-4 h-4 mr-1" /> },
        { label: "Damages", icon: <TriangleAlert className="w-4 h-4 mr-1" /> },
        { label: "Service Details", icon: <Bus className="w-4 h-4 mr-1" /> },
        { label: "Recovery", icon: <Wrench className="w-4 h-4 mr-1" /> },
    ];

    return (
        <div className="m-4 text-xs">
            <div className="flex flex-wrap">
                <div className="w-full px-2">
                    <div className="bg-white shadow h-[80vh] overflow-scroll rounded-lg border-0 p-6">
                        <div className="flex items-center mb-4">
                            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                            <h2 className="text-[14px] font-semibold">Primary Accident Report</h2>
                        </div>
                        <hr className="mb-4" />

                        <div className="mb-6">
                            <div className="w-full md:w-1/2">
                                <label className="block font-semibold mb-2 text-[12px]">Select Vehicle No</label>
                                <Autocomplete
                                    size="small"
                                    options={dummyVehicles}
                                    getOptionLabel={(option) => option.BUSNO}
                                    onChange={handleVehicleSelect}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            className="text-[12px]"
                                            InputProps={{
                                                ...params.InputProps,
                                                className: "h-9 text-xs"
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        {selectedVehicle && (
                            <form onSubmit={handleSubmit}>
                                {/* Custom Tab Navigation */}
                                <div className="flex border-b mb-6">
                                    {tabLabels.map((tab, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className={`px-4 py-2 text-xs font-medium cursor-pointer focus:outline-none border-b-2 ${activeTab === index
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-gray-500 hover:text-blue-500'
                                                } flex items-center`}
                                            onClick={() => setActiveTab(index)}
                                        >
                                            {tab.icon}
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Primary Details Tab */}
                                {activeTab === 0 && (
                                    <div className="mb-4">
                                        <h3 className="font-semibold text-sm mb-3 flex items-center">
                                            <Car className="w-4 h-4 mr-2 text-blue-600" />
                                            Primary Details
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Accident Reference Number</label>
                                                <input
                                                    name="accidentRefNo"
                                                    value={formData.accidentRefNo}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                    placeholder="DEPOTABV/MM/YY/SL No"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Date of Accident</label>
                                                <input
                                                    type="date"
                                                    name="dateOfAccident"
                                                    value={formData.dateOfAccident}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Bonnet No</label>
                                                <input
                                                    name="bonnetNo"
                                                    value={formData.bonnetNo}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs bg-gray-100"
                                                    readOnly
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Reg. No</label>
                                                <input
                                                    name="regNo"
                                                    value={formData.regNo}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs bg-gray-100"
                                                    readOnly
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">KSRTC/KSWIFT</label>
                                                <select
                                                    name="ksrcOrKswift"
                                                    value={formData.ksrcOrKswift}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="KSRTC">KSRTC</option>
                                                    <option value="KSWIFT">KSWIFT</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Bus Class</label>
                                                <input
                                                    name="busClass"
                                                    value={formData.busClass}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs bg-gray-100"
                                                    readOnly
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Operated Depot</label>
                                                <input
                                                    name="operatedDepot"
                                                    value={formData.operatedDepot}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs bg-gray-100"
                                                    readOnly
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Operated Depot Zone</label>
                                                <input
                                                    name="operatedDepotZone"
                                                    value={formData.operatedDepotZone}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Home Depot</label>
                                                <input
                                                    name="homeDepot"
                                                    value={formData.homeDepot}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs bg-gray-100"
                                                    readOnly
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Age of Bus (years)</label>
                                                <input
                                                    type="number"
                                                    name="ageOfBus"
                                                    value={formData.ageOfBus}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs bg-gray-100"
                                                    readOnly
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Type of Other Vehicle(s)</label>
                                                <input
                                                    name="typeOfOtherVehicle"
                                                    value={formData.typeOfOtherVehicle}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                    placeholder="e.g., Car, Truck, Motorcycle"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Involved Vehicle Reg. Numbers</label>
                                                <input
                                                    name="involvedVehicleRegNumbers"
                                                    value={formData.involvedVehicleRegNumbers}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                    placeholder="Separate with commas"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Accident State</label>
                                                <input
                                                    name="accidentState"
                                                    value={formData.accidentState}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Accident District</label>
                                                <input
                                                    name="accidentDistrict"
                                                    value={formData.accidentDistrict}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Accident Place</label>
                                                <input
                                                    name="accidentPlace"
                                                    value={formData.accidentPlace}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">GPS Coordinates</label>
                                                <div className="flex gap-2">
                                                    <input
                                                        name="gpsLatitude"
                                                        value={formData.gpsLatitude}
                                                        onChange={handleChange}
                                                        className="w-full p-2 border rounded text-xs"
                                                        placeholder="Latitude"
                                                    />
                                                    <input
                                                        name="gpsLongitude"
                                                        value={formData.gpsLongitude}
                                                        onChange={handleChange}
                                                        className="w-full p-2 border rounded text-xs"
                                                        placeholder="Longitude"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Jurisdiction Depot</label>
                                                <input
                                                    name="jurisdictionDepot"
                                                    value={formData.jurisdictionDepot}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Police Station</label>
                                                <input
                                                    name="policeStation"
                                                    value={formData.policeStation}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Time of Accident</label>
                                                <input
                                                    type="time"
                                                    name="timeOfAccident"
                                                    value={formData.timeOfAccident}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Time Zone</label>
                                                <input
                                                    name="timeZone"
                                                    value={formData.timeZone}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                    placeholder="e.g., IST"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block font-medium mb-1 text-xs">Remarks</label>
                                                <textarea
                                                    name="remarks"
                                                    value={formData.remarks}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                    rows={3}
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block font-medium mb-1 text-xs">Attachments</label>
                                                <div className="border rounded p-3">
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        {attachments.map((file, index) => (
                                                            <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded text-xs">
                                                                <span className="mr-2">{file.name}</span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveFile(index)}
                                                                    className="text-red-500"
                                                                >
                                                                    <X size={14} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <label className="flex items-center justify-center gap-2 text-blue-600 cursor-pointer text-xs">
                                                        <Upload size={16} />
                                                        <span>Upload photos/videos/documents</span>
                                                        <input
                                                            type="file"
                                                            multiple
                                                            onChange={handleFileChange}
                                                            className="hidden"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Damages Happened Tab */}
                                {activeTab === 1 && (
                                    <div>
                                        <h3 className="font-semibold text-sm mb-3 flex items-center">
                                            <Car className="w-4 h-4 mr-2 text-red-600" />
                                            Damages Happened
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Severity</label>
                                                <select
                                                    name="severity"
                                                    value={formData.severity}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Minor">Minor</option>
                                                    <option value="Major">Major</option>
                                                    <option value="Fatal">Fatal</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Accident Type</label>
                                                <select
                                                    name="accidentType"
                                                    value={formData.accidentType}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Collision">Collision</option>
                                                    <option value="Rollover">Rollover</option>
                                                    <option value="Fire">Fire</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Type of Collision</label>
                                                <select
                                                    name="typeOfCollision"
                                                    value={formData.typeOfCollision}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Head-on">Head-on</option>
                                                    <option value="Rear-end">Rear-end</option>
                                                    <option value="Side-impact">Side-impact</option>
                                                    <option value="Multi-vehicle">Multi-vehicle</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Primary Cause</label>
                                                <input
                                                    name="primaryCause"
                                                    value={formData.primaryCause}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Primary Responsibility</label>
                                                <select
                                                    name="primaryResponsibility"
                                                    value={formData.primaryResponsibility}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="KSRTC Driver">KSRTC Driver</option>
                                                    <option value="Other Vehicle">Other Vehicle</option>
                                                    <option value="Shared">Shared</option>
                                                    <option value="External Factors">External Factors</option>
                                                </select>
                                            </div>

                                            {/* Fatalities Section */}
                                            <div className="md:col-span-2 mt-3">
                                                <h4 className="font-medium mb-2 text-xs border-b pb-1">Fatalities</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div>
                                                        <label className="block font-medium mb-1 text-xs">KSRTC Crew</label>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            name="fatalitiesCrew"
                                                            value={formData.fatalitiesCrew}
                                                            onChange={handleChange}
                                                            className="w-full p-2 border rounded text-xs"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block font-medium mb-1 text-xs">Passengers</label>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            name="fatalitiesPassengers"
                                                            value={formData.fatalitiesPassengers}
                                                            onChange={handleChange}
                                                            className="w-full p-2 border rounded text-xs"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block font-medium mb-1 text-xs">3rd Party</label>
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            name="fatalitiesThirdParty"
                                                            value={formData.fatalitiesThirdParty}
                                                            onChange={handleChange}
                                                            className="w-full p-2 border rounded text-xs"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Injuries Section */}
                                            <div className="md:col-span-2 mt-3">
                                                <h4 className="font-medium mb-2 text-xs border-b pb-1">Injuries</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div>
                                                        <h5 className="font-medium mb-2 text-xs text-gray-600">KSRTC Crew</h5>
                                                        <div className="space-y-2">
                                                            <div>
                                                                <label className="block font-medium mb-1 text-xs">Major</label>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    name="majorInjuriesCrew"
                                                                    value={formData.majorInjuriesCrew}
                                                                    onChange={handleChange}
                                                                    className="w-full p-2 border rounded text-xs"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block font-medium mb-1 text-xs">Minor</label>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    name="minorInjuriesCrew"
                                                                    value={formData.minorInjuriesCrew}
                                                                    onChange={handleChange}
                                                                    className="w-full p-2 border rounded text-xs"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h5 className="font-medium mb-2 text-xs text-gray-600">Passengers</h5>
                                                        <div className="space-y-2">
                                                            <div>
                                                                <label className="block font-medium mb-1 text-xs">Major</label>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    name="majorInjuriesPassengers"
                                                                    value={formData.majorInjuriesPassengers}
                                                                    onChange={handleChange}
                                                                    className="w-full p-2 border rounded text-xs"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block font-medium mb-1 text-xs">Minor</label>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    name="minorInjuriesPassengers"
                                                                    value={formData.minorInjuriesPassengers}
                                                                    onChange={handleChange}
                                                                    className="w-full p-2 border rounded text-xs"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h5 className="font-medium mb-2 text-xs text-gray-600">3rd Party</h5>
                                                        <div className="space-y-2">
                                                            <div>
                                                                <label className="block font-medium mb-1 text-xs">Major</label>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    name="majorInjuriesThirdParty"
                                                                    value={formData.majorInjuriesThirdParty}
                                                                    onChange={handleChange}
                                                                    className="w-full p-2 border rounded text-xs"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block font-medium mb-1 text-xs">Minor</label>
                                                                <input
                                                                    type="number"
                                                                    min="0"
                                                                    name="minorInjuriesThirdParty"
                                                                    value={formData.minorInjuriesThirdParty}
                                                                    onChange={handleChange}
                                                                    className="w-full p-2 border rounded text-xs"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Totals Section */}
                                            {/* <div className="md:col-span-2 mt-3">
                                                <h4 className="font-medium mb-2 text-xs border-b pb-1">Totals</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div className="bg-red-50 p-3 rounded">
                                                        <label className="block font-medium mb-1 text-xs">Total Fatalities</label>
                                                        <div className="text-lg font-bold">{totalFatalities}</div>
                                                    </div>
                                                    <div className="bg-yellow-50 p-3 rounded">
                                                        <label className="block font-medium mb-1 text-xs">Total Major Injuries</label>
                                                        <div className="text-lg font-bold">{totalMajorInjuries}</div>
                                                    </div>
                                                    <div className="bg-blue-50 p-3 rounded">
                                                        <label className="block font-medium mb-1 text-xs">Total Minor Injuries</label>
                                                        <div className="text-lg font-bold">{totalMinorInjuries}</div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                )}

                                {/* Service Details Tab */}
                                {activeTab === 2 && (
                                    <div>
                                        <h3 className="font-semibold text-sm mb-3 flex items-center">
                                            <Bus className="w-4 h-4 mr-2 text-green-600" />
                                            Service Details
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Schedule Number (Cdit)</label>
                                                <input
                                                    name="scheduleNumber"
                                                    value={formData.scheduleNumber}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Operated Schedule Name</label>
                                                <input
                                                    name="operatedScheduleName"
                                                    value={formData.operatedScheduleName}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Accident Occurred</label>
                                                <select
                                                    name="accidentOccurred"
                                                    value={formData.accidentOccurred}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="During Operation">During Operation</option>
                                                    <option value="At Depot">At Depot</option>
                                                    <option value="During Maintenance">During Maintenance</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Road Classification</label>
                                                <select
                                                    name="roadClassification"
                                                    value={formData.roadClassification}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="National Highway">National Highway</option>
                                                    <option value="State Highway">State Highway</option>
                                                    <option value="Major District Road">Major District Road</option>
                                                    <option value="Rural Road">Rural Road</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Road Condition</label>
                                                <select
                                                    name="roadCondition"
                                                    value={formData.roadCondition}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Good">Good</option>
                                                    <option value="Fair">Fair</option>
                                                    <option value="Poor">Poor</option>
                                                    <option value="Under Construction">Under Construction</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Weather Condition</label>
                                                <select
                                                    name="weatherCondition"
                                                    value={formData.weatherCondition}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Clear">Clear</option>
                                                    <option value="Rainy">Rainy</option>
                                                    <option value="Foggy">Foggy</option>
                                                    <option value="Stormy">Stormy</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Traffic Density</label>
                                                <select
                                                    name="trafficDensity"
                                                    value={formData.trafficDensity}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Low">Low</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="High">High</option>
                                                    <option value="Very High">Very High</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Damage to Bus</label>
                                                <select
                                                    name="damageToBus"
                                                    value={formData.damageToBus}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Minor">Minor</option>
                                                    <option value="Moderate">Moderate</option>
                                                    <option value="Severe">Severe</option>
                                                    <option value="Totaled">Totaled</option>
                                                </select>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block font-medium mb-1 text-xs">3rd Party Properties Damaged</label>
                                                <textarea
                                                    name="thirdPartyPropertiesDamaged"
                                                    value={formData.thirdPartyPropertiesDamaged}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                    rows={2}
                                                    placeholder="Describe damaged properties..."
                                                />
                                            </div>

                                            {/* Crew Information */}
                                            <div className="md:col-span-2 mt-3">
                                                <h4 className="font-medium mb-2 text-xs border-b pb-1">Crew Information</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block font-medium mb-1 text-xs">Driver Name</label>
                                                        <input
                                                            name="driverName"
                                                            value={formData.driverName}
                                                            onChange={handleChange}
                                                            className="w-full p-2 border rounded text-xs"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block font-medium mb-1 text-xs">Driver Category</label>
                                                        <input
                                                            name="driverCategory"
                                                            value={formData.driverCategory}
                                                            onChange={handleChange}
                                                            className="w-full p-2 border rounded text-xs"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block font-medium mb-1 text-xs">Driver Pen/Id No</label>
                                                        <input
                                                            name="driverPenId"
                                                            value={formData.driverPenId}
                                                            onChange={handleChange}
                                                            className="w-full p-2 border rounded text-xs"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block font-medium mb-1 text-xs">Driver Phone No.</label>
                                                        <input
                                                            name="driverPhone"
                                                            value={formData.driverPhone}
                                                            onChange={handleChange}
                                                            className="w-full p-2 border rounded text-xs"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block font-medium mb-1 text-xs">Conductor Name</label>
                                                        <input
                                                            name="conductorName"
                                                            value={formData.conductorName}
                                                            onChange={handleChange}
                                                            className="w-full p-2 border rounded text-xs"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block font-medium mb-1 text-xs">Conductor Pen/Id No</label>
                                                        <input
                                                            name="conductorPenId"
                                                            value={formData.conductorPenId}
                                                            onChange={handleChange}
                                                            className="w-full p-2 border rounded text-xs"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block font-medium mb-1 text-xs">Conductor Phone No.</label>
                                                        <input
                                                            name="conductorPhone"
                                                            value={formData.conductorPhone}
                                                            onChange={handleChange}
                                                            className="w-full p-2 border rounded text-xs"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Inspector Information */}
                                            <div className="md:col-span-2 mt-3">
                                                <h4 className="font-medium mb-2 text-xs border-b pb-1">Inspector Information</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block font-medium mb-1 text-xs">Inquiry Inspector Name (KSRTC)</label>
                                                        <input
                                                            name="inquiryInspectorName"
                                                            value={formData.inquiryInspectorName}
                                                            onChange={handleChange}
                                                            className="w-full p-2 border rounded text-xs"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block font-medium mb-1 text-xs">Inspector Phone No.</label>
                                                        <input
                                                            name="inspectorPhone"
                                                            value={formData.inspectorPhone}
                                                            onChange={handleChange}
                                                            className="w-full p-2 border rounded text-xs"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Recovery Phase Tab */}
                                {activeTab === 3 && (
                                    <div>
                                        <h3 className="font-semibold text-sm mb-3 flex items-center">
                                            <Bus className="w-4 h-4 mr-2 text-purple-600" />
                                            Recovery Phase
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Docked/Service After Accident</label>
                                                <select
                                                    name="dockedOrServiceAfter"
                                                    value={formData.dockedOrServiceAfter}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Docked">Docked</option>
                                                    <option value="Service Continued">Service Continued</option>
                                                    <option value="Not Applicable">Not Applicable</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Taken for Repair Work</label>
                                                <select
                                                    name="takenForRepair"
                                                    value={formData.takenForRepair}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">GD Entered in Police Station</label>
                                                <select
                                                    name="gdEntered"
                                                    value={formData.gdEntered}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                    <option value="Pending">Pending</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">FIR Registered</label>
                                                <select
                                                    name="firRegistered"
                                                    value={formData.firRegistered}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                    <option value="Pending">Pending</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Cost of Damage Assessed Amount (₹)</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    name="costOfDamage"
                                                    value={formData.costOfDamage}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Amount Settled with KSRTC Driver (₹)</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    name="amountSettledWithDriver"
                                                    value={formData.amountSettledWithDriver}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">COD Settled with Other Vehicle (₹)</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    name="codSettledWithOtherVehicle"
                                                    value={formData.codSettledWithOtherVehicle}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">COD Recovered</label>
                                                <select
                                                    name="codRecovered"
                                                    value={formData.codRecovered}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                    <option value="Partial">Partial</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Case Settled</label>
                                                <select
                                                    name="caseSettled"
                                                    value={formData.caseSettled}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                >
                                                    <option value="">Select</option>
                                                    <option value="Yes">Yes</option>
                                                    <option value="No">No</option>
                                                    <option value="In Progress">In Progress</option>
                                                </select>
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block font-medium mb-1 text-xs">Remarks</label>
                                                <textarea
                                                    name="recoveryRemarks"
                                                    value={formData.recoveryRemarks}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                    rows={3}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="mt-8 flex justify-between">
                                    <div>
                                        {activeTab > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => setActiveTab(activeTab - 1)}
                                                className="px-4 py-2 text-sm bg-gray-200 rounded flex items-center"
                                            >
                                                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                                            </button>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        {activeTab < 3 && (
                                            <button
                                                type="button"
                                                onClick={() => setActiveTab(activeTab + 1)}
                                                className="px-4 py-2 text-sm bg-blue-100 rounded flex items-center"
                                            >
                                                Next <ChevronRight className="w-4 h-4 ml-1" />
                                            </button>
                                        )}

                                        {activeTab === 3 && (
                                            <button
                                                type="submit"
                                                className="px-4 py-2 text-sm bg-[var(--sidebar)] text-white rounded"
                                            >
                                                Submit Report
                                            </button>
                                        )}

                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="px-4 py-2 text-sm border rounded flex items-center"
                                        >
                                            <X className="w-4 h-4 mr-1" /> Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrimaryAccidentReport;