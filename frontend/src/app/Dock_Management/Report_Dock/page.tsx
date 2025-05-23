"use client"
import * as React from "react";
import { Bus, X } from 'lucide-react';
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
}

const dummyVehicles: Vehicle[] = [
    {
        BUSNO: 'RPC200',
        NAME: 'LL',
        REGNO: 'KL15A7845',
        BODYTYPE: 'ETX',
        SCHEDULE: '48',
        CLASS: 'Deluxe',
        DEPOT: 'KKD'
    }
];

const ReportBusDock: React.FC = () => {
    const [selectedVehicle, setSelectedVehicle] = React.useState<Vehicle | null>(null);
    const [dockForm, setDockForm] = React.useState({
        slNo: '',
        bonnetNo: '',
        dockReason: '',
        todayStatus: '',
        reportedBy: ''
    });

    const handleVehicleSelect = (event: any, value: Vehicle | null) => {
        setSelectedVehicle(value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDockForm({ ...dockForm, [e.target.name]: e.target.value });
    };

    const handleCancel = () => {
        setSelectedVehicle(null);
        setDockForm({
            slNo: '',
            bonnetNo: '',
            dockReason: '',
            todayStatus: '',
            reportedBy: ''
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ selectedVehicle, dockForm });
    };

    return (
        <div>
            <div className="m-4 text-xs">
                <div className="flex flex-wrap">

                    <div className=" w-full px-2">
                        <div className="bg-white shadow rounded-lg border-0 p-6">
                            <div className="flex items-center mb-4">
                                <Bus className="w-5 h-5 text-blue-600 mr-2" />
                                <h2 className="text-sm font-semibold">Report Bus Dock</h2>
                            </div>
                            <hr className="mb-4" />
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <div className="w-full md:w-1/2">
                                        <label className="block font-semibold mb-2">Select Vehicle No</label>
                                        <Autocomplete
                                            size="small"
                                            options={dummyVehicles}
                                            getOptionLabel={(option) => option.BUSNO}
                                            onChange={handleVehicleSelect}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    className="text-xs"
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
                                    <>
                                        <div className="flex flex-wrap mb-4 gap-4">
                                            <div><span className="font-semibold">Name:</span> {selectedVehicle.NAME}</div>
                                            <div><span className="font-semibold">Body Type:</span> {selectedVehicle.BODYTYPE}</div>
                                            <div><span className="font-semibold">Schedule:</span> {selectedVehicle.SCHEDULE}</div>
                                            <div><span className="font-semibold">Class:</span> {selectedVehicle.CLASS}</div>
                                            <div><span className="font-semibold">Allotted Depot:</span> {selectedVehicle.DEPOT}</div>
                                        </div>

                                        <hr className="mb-4" />
                                        <h3 className="font-semibold mt-3 mb-2">Dock Report Form</h3>
                                        <div className="grid grid-cols-3 gap-4">

                                            <div>
                                                <label className="block font-semibold mb-1">Bonnet No</label>
                                                <input
                                                    value={selectedVehicle.BUSNO}
                                                    disabled
                                                    className="w-full p-2 border rounded text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1">Reg No</label>
                                                <input
                                                    value={selectedVehicle.REGNO}
                                                    disabled
                                                    className="w-full p-2 border rounded text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1">Dock Reason</label>
                                                <input
                                                    name="dockReason"
                                                    value={dockForm.dockReason}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1">Today Status</label>
                                                <input
                                                    name="todayStatus"
                                                    value={dockForm.todayStatus}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1">Alloted Depo</label>
                                                <input

                                                    value={selectedVehicle.DEPOT}
                                                    disabled
                                                    className="w-full p-2 border rounded text-xs"
                                                />
                                            </div>
                                            <div>
                                                <label className="block font-semibold mb-1">Reported By</label>
                                                <input
                                                    name="reportedBy"
                                                    value={dockForm.reportedBy}
                                                    onChange={handleChange}
                                                    className="w-full p-2 border rounded text-xs"
                                                />
                                            </div>

                                        </div>

                                        <div className="mt-4 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={handleCancel}
                                                className="mr-2 px-4 py-2 text-sm border rounded flex items-center"
                                            >
                                                <X className="w-4 h-4 mr-1" /> Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 text-sm bg-green-500 text-white rounded"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportBusDock;