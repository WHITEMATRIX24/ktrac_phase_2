'use client';

import * as React from 'react';
import { AlertTriangle, Clock, User, MapPin, Camera, Video, X, LogOut } from 'lucide-react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { Input } from '@mui/material';

interface Vehicle {
    BUSNO: string;
    NAME: string;
    REGNO: string;
    DEPOT: string;
}

const dummyVehicles: Vehicle[] = [
    {
        BUSNO: 'RPC200',
        NAME: 'LL',
        REGNO: 'KL15A0645',
        DEPOT: 'KKD'
    },
    {
        BUSNO: 'RPC292',
        NAME: 'LL',
        REGNO: 'KL15A0845',
        DEPOT: 'KTM'
    },
    {
        BUSNO: 'RPC202',
        NAME: 'LL',
        REGNO: 'KL15A0845',
        DEPOT: 'CGR'
    }
];

const ZerothReportForm: React.FC = () => {
    const [selectedVehicle, setSelectedVehicle] = React.useState<Vehicle | null>(null);
    const router = useRouter();
    const [formData, setFormData] = React.useState({
        timeOfAccident: '',
        severity: '',
        driverName: '',
        driverPhone: '',
        conductorName: '',
        conductorPhone: '',
        accidentState: '',
        accidentDistrict: '',
        accidentPlace: '',
    });

    const [files, setFiles] = React.useState({
        frontView: null as File | null,
        rearView: null as File | null,
        sideView: null as File | null,
        damageCloseUp: null as File | null,
        video: null as File | null,
    });

    const handleVehicleSelect = (event: any, value: Vehicle | null) => {
        setSelectedVehicle(value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof files) => {
        if (e.target.files && e.target.files[0]) {
            setFiles(prev => ({ ...prev, [field]: e.target.files![0] }));
        }
    };

    const handleRemoveFile = (field: keyof typeof files) => {
        setFiles(prev => ({ ...prev, [field]: null }));
    };

    const handleCancel = () => {
        setSelectedVehicle(null);
        setFormData({
            timeOfAccident: '',
            severity: '',
            driverName: '',
            driverPhone: '',
            conductorName: '',
            conductorPhone: '',
            accidentState: '',
            accidentDistrict: '',
            accidentPlace: '',
        });
        setFiles({
            frontView: null,
            rearView: null,
            sideView: null,
            damageCloseUp: null,
            video: null,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedVehicle) {
            alert("Please select a vehicle");
            return;
        }

        // Form submission logic would go here
        console.log('Zeroth report submitted:', { ...formData, ...files, vehicle: selectedVehicle });
        alert('Zeroth report submitted successfully!');
        handleCancel();
    };
    const handleLogout = () => {
        // You can also clear localStorage/cookies here if needed
        router.push('/')
    }

    return (
        <div className="m-4 text-xs">
            <div className="flex flex-row justify-between m-4">
                <div className="flex items-center mb-2 sm:mb-0">
                    <AlertTriangle className="w-7 h-7 text-red-600 mr-2" />
                    <h2 className="text-[20px] sm:text-[24px] font-semibold">
                        Zeroth Accident Report
                    </h2>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center px-3 py-1 text-red-600 hover:bg-grey-300 rounded-md text-sm sm:text-base cursor-pointer"
                >
                    <LogOut className="w-4 h-4 mr-1 text-red-600" />
                    Logout
                </button>
            </div>
            <div className="flex flex-wrap">

                <div className="w-full px-2">
                    <div className="bg-white shadow rounded-lg border-0 p-6">

                        {/* <hr className="mb-4" /> */}

                        <div className="mb-6">
                            <div className="w-full md:w-1/2">
                                <label className="block font-semibold mb-2 text-[12px]">Select Vehicle</label>
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
                                            placeholder="Search by Bonnet No."
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className=" p-3 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <div className="bg-blue-100 p-2 rounded-full mr-3">
                                                <Clock className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <h3 className="font-medium text-sm">Accident Details</h3>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3 ">
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Time of Accident</label>
                                                <input
                                                    type="time"
                                                    name="timeOfAccident"
                                                    value={formData.timeOfAccident}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Bonnet No.</label>
                                                <input
                                                    value={selectedVehicle.BUSNO}
                                                    className="w-full p-2 border rounded text-xs bg-gray-100"
                                                    readOnly
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Severity</label>
                                                <select
                                                    name="severity"
                                                    value={formData.severity}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                    required
                                                >
                                                    <option value="">Select Severity</option>
                                                    <option value="Minor">Minor</option>
                                                    <option value="Major">Major</option>
                                                    <option value="Severe">Severe</option>
                                                    <option value="Fatal">Fatal</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Vehicle Towed Status</label>
                                                <select
                                                    name="severity"
                                                    value={formData.severity}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                    required
                                                >
                                                    <option value="">Select Status</option>
                                                    <option value="Minor">Yes</option>
                                                    <option value="Major">No</option>

                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className=" p-3 rounded-lg">
                                        <div className="flex items-center mb-2">
                                            <div className="bg-green-100 p-2 rounded-full mr-3">
                                                <User className="w-4 h-4 text-green-600" />
                                            </div>
                                            <h3 className="font-medium text-sm">Crew Information</h3>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3">
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Driver Name</label>
                                                <input
                                                    name="driverName"
                                                    value={formData.driverName}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Driver Phone No.</label>
                                                <input
                                                    type="tel"
                                                    name="driverPhone"
                                                    value={formData.driverPhone}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                    required
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
                                                <label className="block font-medium mb-1 text-xs">Conductor Phone No.</label>
                                                <input
                                                    type="tel"
                                                    name="conductorPhone"
                                                    value={formData.conductorPhone}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className=" p-3 rounded-lg md:col-span-2">
                                        <div className="flex items-center mb-2">
                                            <div className="bg-purple-100 p-2 rounded-full mr-3">
                                                <MapPin className="w-4 h-4 text-purple-600" />
                                            </div>
                                            <h3 className="font-medium text-sm">Accident Location</h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Accident State</label>
                                                <input
                                                    name="accidentState"
                                                    value={formData.accidentState}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Accident District</label>
                                                <input
                                                    name="accidentDistrict"
                                                    value={formData.accidentDistrict}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block font-medium mb-1 text-xs">Accident Place</label>
                                                <input
                                                    name="accidentPlace"
                                                    value={formData.accidentPlace}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-orange-100 p-2 rounded-full mr-3">
                                            <Camera className="w-4 h-4 text-orange-600" />
                                        </div>
                                        <h3 className="font-medium text-sm">Accident Documentation</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                        {[
                                            { id: 'frontView', label: 'Front View', icon: <Camera className="w-4 h-4 mr-2" /> },
                                            { id: 'rearView', label: 'Rear View', icon: <Camera className="w-4 h-4 mr-2" /> },
                                            { id: 'sideView', label: 'Side View', icon: <Camera className="w-4 h-4 mr-2" /> },
                                            { id: 'damageCloseUp', label: 'Damage Close-up', icon: <Camera className="w-4 h-4 mr-2" /> },
                                            { id: 'video', label: 'Video', icon: <Video className="w-4 h-4 mr-2" /> },
                                        ].map((item) => (
                                            <div key={item.id} className="border rounded-lg p-3 flex flex-col">
                                                <label className="flex items-center font-medium mb-2 text-xs text-gray-700">
                                                    {item.icon}
                                                    {item.label}
                                                </label>

                                                {files[item.id as keyof typeof files] ? (
                                                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded text-xs mt-auto">
                                                        <span className="truncate">{files[item.id as keyof typeof files]?.name}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveFile(item.id as keyof typeof files)}
                                                            className="text-red-500 ml-2"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-4 cursor-pointer text-center h-full">
                                                        <span className="text-gray-400 text-xs mb-1">Click to upload</span>
                                                        <input
                                                            type="file"
                                                            accept={item.id === 'video' ? 'video/*' : 'image/*'}
                                                            onChange={(e) => handleFileChange(e, item.id as keyof typeof files)}
                                                            className="hidden"
                                                        />
                                                        <div className="bg-gray-100 p-2 rounded-full">
                                                            {item.id === 'video' ? (
                                                                <Video className="w-5 h-5 text-gray-400" />
                                                            ) : (
                                                                <Camera className="w-5 h-5 text-gray-400" />
                                                            )}
                                                        </div>
                                                    </label>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>


                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="px-4 py-2 text-sm border rounded flex items-center"
                                    >
                                        <X className="w-4 h-4 mr-1" /> Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm bg-[var(--sidebar)] text-white rounded flex items-center"
                                    >
                                        Submit Zeroth Report
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ZerothReportForm;