'use client';

import * as React from 'react';
import { Bus, X, Upload, Wrench } from 'lucide-react';
import Autocomplete from '@mui/material/Autocomplete';

import dynamic from 'next/dynamic';
import ReferenceNumberSearchModal from '@/components/accident_management/search_referencenumber_modal';
import AddNewAccidentModal from '@/components/accident_management/add_new_accident';
import AddZerothReportModal from '@/components/accident_management/zerothreport_modal';
import AccidentReportForm from '@/components/accident_management/zerothReportForm';

const MapComponent = dynamic(
    () => import('@/components/MapComponent'),
    {
        ssr: false,
        loading: () => <div className="flex items-center justify-center h-full text-sm text-gray-500">Loading map...</div>
    }
);


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

interface AccidentReference {
    id: string;
    refNo: string;
    busNo: string;
    accidentPlace: string;
    accidentDate: string;
    policeStation: string;
    timeOfAccident: string;
    homeDepot: string;
    operatedDepot: string;
    scheduleNumber: string;
    driverName: string;
    driverPhone: string;
    conductorName: string;
    conductorPhone: string;
    accidentState: string;
    accidentDistrict: string;
    description: string;
    photos: string[];
    accidentLatitude: string;
    accidentLongitude: string;

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


// const dummyAccidentReferences: AccidentReference[] = [
//     {
//         id: 'REF-2023-001',
//         refNo: 'KKD/06/25/01',
//         busNo: 'RPC200',
//         accidentPlace: 'Main Road, Kochi',
//         accidentDate: '2023-06-15',
//         policeStation: 'Ernakulam South',
//         timeOfAccident: '14:30',
//         homeDepot: 'KKD',
//         operatedDepot: 'KKD',
//         scheduleNumber: '48',
//         driverName: 'Rajesh Kumar',
//         driverPhone: '9876543210',
//         conductorName: 'Suresh Nair',
//         conductorPhone: '9876543211',
//         accidentState: 'Kerala',
//         accidentDistrict: 'Ernakulam',
//         description: 'Collision with private car',
//         accidentLatitude: "9.9312",
//         accidentLongitude: " 76.2673",
//         photos: []
//     },
//     {
//         id: 'REF-2023-002',
//         refNo: 'KTM/07/25/05',
//         busNo: 'RPC292',
//         accidentPlace: 'MG Road, Trivandrum',
//         accidentDate: '2023-07-22',
//         policeStation: 'Thiruvananthapuram East',
//         timeOfAccident: '10:15',
//         homeDepot: 'KTM',
//         operatedDepot: 'KTM',
//         scheduleNumber: '52',
//         driverName: 'Manoj Pillai',
//         driverPhone: '9876543222',
//         conductorName: 'Deepak Kumar',
//         conductorPhone: '9876543223',
//         accidentState: 'Kerala',
//         accidentDistrict: 'Thiruvananthapuram',
//         description: 'Rear-ended by truck',
//         accidentLatitude: "8.5241",
//         accidentLongitude: "76.9366",
//         photos: []
//     },
//     {
//         id: 'REF-2023-003',
//         refNo: 'CGR/08/25/12',
//         busNo: 'RPC202',
//         accidentPlace: 'Central Junction, Kottayam',
//         accidentDate: '2023-08-10',
//         policeStation: 'Kottayam Town',
//         timeOfAccident: '16:45',
//         homeDepot: 'CGR',
//         operatedDepot: 'CGR',
//         scheduleNumber: '34',
//         driverName: 'Anil Nair',
//         driverPhone: '9876543333',
//         conductorName: 'Vijay Mohan',
//         conductorPhone: '9876543334',
//         accidentState: 'Kerala',
//         accidentDistrict: 'Kottayam',
//         description: 'Side collision with auto rickshaw',
//         accidentLatitude: "9.5916",
//         accidentLongitude: "76.5222",
//         photos: []
//     }
// ];

const PrimaryAccidentReport: React.FC = () => {
    const [selectedVehicle, setSelectedVehicle] = React.useState<Vehicle | null>(null);
    const [zeroSelectedVehicle, setZeroSelectedVehicle] = React.useState<Vehicle | null>(null);
    const [activeTab, setActiveTab] = React.useState(0);
    const [attachments, setAttachments] = React.useState<File[]>([]);
    const [showSuccessPopup, setShowSuccessPopup] = React.useState(false);
    const [generatedRefNo, setGeneratedRefNo] = React.useState('');
    const [searchMode, setSearchMode] = React.useState<'reference' | 'bus'>('reference');
    const [selectedReference, setSelectedReference] = React.useState<AccidentReference | null>(null);
    const [previewImage, setPreviewImage] = React.useState<string | null>(null);
    const [driverSearchTerm, setDriverSearchTerm] = React.useState('');
    const [filteredDrivers, setFilteredDrivers] = React.useState<Driver[]>([]);
    const [showDriverDropdown, setShowDriverDropdown] = React.useState(false);
    const [conductorSearchTrem, setConductorSearchTearm] = React.useState('');
    const [filteredConductors, setFilteredConductors] = React.useState<Conductor[]>([]);
    const [showConductorDropdown, setShowConductorDropdown] = React.useState(false);
    const zerothReportFilled = !!selectedReference;
    const [isReferenceModalSearchOpen, setIsReferenceModalSearch] =
        React.useState<boolean>(false);
    const [isVehicleSearchOpen, setIsVehicleModalSearch] =
        React.useState<boolean>(false);
    const handleSearchModalClose = () => setIsReferenceModalSearch(false);
    const handleVehicleModalClose = () => setIsVehicleModalSearch(false);
    const initialFormState = {
        // Zeroth Report Details
        timeOfAccident: '',
        bonnetNo: '',
        dateOfAccident: '',
        homeDepot: '',
        operatedDepot: '',
        scheduleNumber: '',
        driverName: '',
        driverPhone: '',
        conductorName: '',
        conductorPhone: '',
        accidentState: '',
        accidentDistrict: '',
        accidentPlace: '',
        nearestPoliceStation: '',
        description: '',
        primarydescription: '',

        // Primary Details
        accidentRefNo: '',
        regNo: '',
        ksrcOrKswift: '',
        busClass: '',
        operatedDepotZone: '',
        ageOfBus: 0,
        typeOfOtherVehicle: '',
        involvedVehicleRegNumbers: '',
        latitude: '',
        longitude: '',
        jurisdictionDepot: '',
        timeZone: '',
        remarks: '',

        // Damages Happened
        severity: '',
        accidentType: '',
        typeOfCollision: '',
        primaryCause: '',
        primaryResponsibility: '',
        fatalitiesKsrtcCrew: 0,
        fatalitiesPassengers: 0,
        fatalitiesThirdParty: 0,
        majorInjuriesKsrtcCrew: 0,
        minorInjuriesKsrtcCrew: 0,
        majorInjuriesPassengers: 0,
        minorInjuriesPassengers: 0,
        majorInjuriesThirdParty: 0,
        minorInjuriesThirdParty: 0,
        totalFatalities: 0,
        totalMajorInjuries: 0,
        totalMinorInjuries: 0,
        // Service Details
        operatedScheduleName: '',
        accidentOccurred: '',
        roadClassification: '',
        roadCondition: '',
        weatherCondition: '',
        trafficDensity: '',
        damageToBus: '',
        thirdPartyPropertiesDamaged: '',
        driverCategory: '',
        driverPenId: '',
        conductorPenId: '',
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
    const handleSearchSelect = (selectedData: any) => {
        // Map modal response to AccidentReference structure
        const mappedData: AccidentReference = {
            id: selectedData.accedent_ref_no,
            refNo: selectedData.accedent_ref_no,
            busNo: selectedData.bus_no,
            accidentPlace: selectedData.accidentPlace,
            accidentDate: selectedData.accedent_date,
            policeStation: selectedData.policeStation,
            timeOfAccident: selectedData.timeOfAccident,
            homeDepot: selectedData.homeDepot,
            operatedDepot: selectedData.operatedDepot,
            scheduleNumber: selectedData.scheduleNumber,
            driverName: selectedData.driverName,
            driverPhone: selectedData.driverPhone,
            conductorName: selectedData.conductorName,
            conductorPhone: selectedData.conductorPhone,
            accidentState: selectedData.accidentState,
            accidentDistrict: selectedData.accidentDistrict,
            accidentLatitude: selectedData.accidentLatitude,
            accidentLongitude: selectedData.accidentLongitude,
            description: selectedData.description,
            photos: selectedData.photos || [],
        };
        setZeroSelectedVehicle(null);
        // Update state with selected data
        setSelectedReference(mappedData);
        setFormData(prev => ({
            ...prev,
            accidentRefNo: mappedData.refNo,
            bonnetNo: mappedData.busNo,
            accidentPlace: mappedData.accidentPlace,
            dateOfAccident: mappedData.accidentDate,
            policeStation: mappedData.policeStation,
            timeOfAccident: mappedData.timeOfAccident,
            homeDepot: mappedData.homeDepot,
            operatedDepot: mappedData.operatedDepot,
            scheduleNumber: mappedData.scheduleNumber,
            driverName: mappedData.driverName,
            driverPhone: mappedData.driverPhone,
            conductorName: mappedData.conductorName,
            conductorPhone: mappedData.conductorPhone,
            accidentState: mappedData.accidentState,
            accidentDistrict: mappedData.accidentDistrict,
            latitude: mappedData.accidentLatitude,
            longitude: mappedData.accidentLongitude,
            description: mappedData.description,
            fatalitiesKsrtcCrew: 0,
            fatalitiesPassengers: 0,
            fatalitiesThirdParty: 0,
            majorInjuriesKsrtcCrew: 0,
            minorInjuriesKsrtcCrew: 0,
            majorInjuriesPassengers: 0,
            minorInjuriesPassengers: 0,
            majorInjuriesThirdParty: 0,
            minorInjuriesThirdParty: 0,
            totalFatalities: 0,
            totalMajorInjuries: 0,
            totalMinorInjuries: 0,
        }));
    };
    const handleVehicleSelect = (value: any) => {
        setSelectedVehicle(null)
        setSelectedReference(null);
        setZeroSelectedVehicle(value);
        if (value) {
            setFormData(prev => ({
                ...prev,
                bonnetNo: value.BUSNO,
                regNo: value.REGNO,
                busClass: value.CLASS,
                operatedDepot: value.DEPOT,
                homeDepot: value.DEPOT,
                ageOfBus: value.AGE,
                dateOfAccident: value.accidentDate,
                timeOfAccident: value.timeOfAccident,
            }));
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        const numericFields = [
            'fatalitiesKsrtcCrew',
            'fatalitiesPassengers',
            'fatalitiesThirdParty',
            'majorInjuriesKsrtcCrew',
            'majorInjuriesPassengers',
            'majorInjuriesThirdParty',
            'minorInjuriesKsrtcCrew',
            'minorInjuriesPassengers',
            'minorInjuriesThirdParty',
            'totalFatalities',
            'totalMajorInjuries',
            'totalMinorInjuries',
        ];

        const updatedFormData = {
            ...formData,
            [name]: numericFields.includes(name) ? parseInt(value) || 0 : value,
        };

        const totalFatalities =
            Number(updatedFormData.fatalitiesKsrtcCrew) +
            Number(updatedFormData.fatalitiesPassengers) +
            Number(updatedFormData.fatalitiesThirdParty);

        const totalMajorInjuries =
            Number(updatedFormData.majorInjuriesKsrtcCrew) +
            Number(updatedFormData.majorInjuriesPassengers) +
            Number(updatedFormData.majorInjuriesThirdParty);

        const totalMinorInjuries =
            Number(updatedFormData.minorInjuriesKsrtcCrew) +
            Number(updatedFormData.minorInjuriesPassengers) +
            Number(updatedFormData.minorInjuriesThirdParty);

        setFormData({
            ...updatedFormData,
            totalFatalities,
            totalMajorInjuries,
            totalMinorInjuries,
        });
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
        setSelectedReference(null);
        setFormData(initialFormState);
        setAttachments([]);
        setActiveTab(0);
    };

    const generateReferenceNumber = () => {
        if (!formData.operatedDepot || !formData.dateOfAccident) {
            return "ERROR: Missing depot or date";
        }

        const depot = formData.operatedDepot;
        const date = new Date(formData.dateOfAccident);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        const nextSeq = 1;
        const seqStr = nextSeq.toString().padStart(2, '0');

        return `${depot}/${month}/${year}/${seqStr}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const refNo = generateReferenceNumber();
        setGeneratedRefNo(refNo);
        const updatedFormData = { ...formData, accidentRefNo: refNo };
        setFormData(updatedFormData);
        console.log('Form submitted:', updatedFormData);
        setShowSuccessPopup(true);
    };

    const handlePopupClose = () => {
        setShowSuccessPopup(false);
        handleCancel();
    };
    const [collisionOptions, setCollisionOptions] = React.useState<string[]>([
        "Select Type of Collision", "Head On Collision", "Hit Behind By KSRTC", "Hit Behind by Thrid Party", "Hit Side by KSRTC"
    ]);
    const [customCollision, setCustomCollision] = React.useState<string>("");

    const handleCollisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prev) => ({ ...prev, typeOfCollision: e.target.value }));
    };

    const handleAddCustomCollision = () => {
        if (customCollision.trim() && !collisionOptions.includes(customCollision)) {
            setCollisionOptions((prev) => [...prev, customCollision]);
            setFormData((prev) => ({ ...prev, typeOfCollision: customCollision }));
            setCustomCollision("");
        }
    };
    const drivers: Driver[] = [
        { id: 1, gNumber: 'G123', name: 'Raj Sharma', phone: '9876543210' },
        { id: 2, gNumber: 'G456', name: 'Vikram Singh', phone: '9876543211' },
        { id: 3, gNumber: 'G789', name: 'Arjun Patel', phone: '9876543212' },
    ];
    const handleDriverSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setDriverSearchTerm(term);

        if (term.length > 1) {
            const filtered = drivers.filter(driver =>
                driver.gNumber.toLowerCase().includes(term.toLowerCase()) ||
                driver.name.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredDrivers(filtered);
            setShowDriverDropdown(true);
        } else {
            setShowDriverDropdown(false);
        }
    };
    const handleDriverSelect = (driver: Driver) => {
        setFormData(prev => ({
            ...prev,
            driverName: driver.name,
            driverPhone: driver.phone
        }));
        setDriverSearchTerm(driver.gNumber);
        setShowDriverDropdown(false);
    };
    const conductors: Conductor[] = [
        { id: 1, gNumber: 'G123', name: 'Raj Sharma', phone: '9876543210' },
        { id: 2, gNumber: 'G456', name: 'Vikram Singh', phone: '9876543211' },
        { id: 3, gNumber: 'G789', name: 'Arjun Patel', phone: '9876543212' },
    ];
    const handleConductorSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setConductorSearchTearm(term);

        if (term.length > 1) {
            const filtered = conductors.filter(conductor =>
                conductor.gNumber.toLowerCase().includes(term.toLowerCase()) ||
                conductor.name.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredConductors(filtered);
            setShowConductorDropdown(true);
        } else {
            setShowConductorDropdown(false);
        }
    };
    const handleConductorSelect = (conductor: Conductor) => {
        setFormData(prev => ({
            ...prev,
            conductorName: conductor.name,
            conductorPhone: conductor.phone
        }));
        setConductorSearchTearm(conductor.gNumber);
        setShowConductorDropdown(false);
    };

    // const renderReferenceSection = () => (
    //     <div className="flex items-center gap-2.5 px-4 py-2.5 flex-shrink-0 border-b border-blue-100 bg-blue-50">
    //         <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">
    //             {searchMode === 'reference' ? 'Accident Reference Number' : 'Bus Number'}
    //             <span className="text-red-600">*</span>
    //         </span>

    //         {searchMode === 'reference' ? (
    //             <div className="flex-1">
    //                 <Autocomplete
    //                     options={dummyAccidentReferences}
    //                     getOptionLabel={(option) => `${option.refNo} - ${option.busNo}`}
    //                     renderOption={(props, option) => {
    //                         const { key, ...rest } = props;
    //                         return (
    //                             <li
    //                                 key={key}
    //                                 {...rest}
    //                                 className="text-xs p-2 hover:bg-gray-100 cursor-pointer"
    //                             >
    //                                 <div className="font-medium">{option.refNo}</div>
    //                                 <div className="text-gray-500">
    //                                     Bus: {option.busNo} | Place: {option.accidentPlace}
    //                                 </div>
    //                             </li>
    //                         );
    //                     }}

    //                     value={selectedReference}
    //                     onChange={handleReferenceSelect}
    //                     renderInput={(params) => (
    //                         <div ref={params.InputProps.ref} className="relative">
    //                             <input
    //                                 {...params.inputProps}
    //                                 className="w-full py-1.5 px-2.5 text-xs bg-white border border-gray-300 rounded-[3px]"
    //                                 placeholder="Search and select accident reference"
    //                             />
    //                             <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
    //                                 <svg
    //                                     className="w-4 h-4 text-gray-400"
    //                                     fill="none"
    //                                     stroke="currentColor"
    //                                     viewBox="0 0 24 24"
    //                                 >
    //                                     <path
    //                                         strokeLinecap="round"
    //                                         strokeLinejoin="round"
    //                                         strokeWidth="2"
    //                                         d="M19 9l-7 7-7-7"
    //                                     ></path>
    //                                 </svg>
    //                             </div>
    //                         </div>
    //                     )}
    //                 />
    //             </div>
    //         ) : (
    //             <div className="flex-1">
    //                 <Autocomplete
    //                     options={dummyVehicles}
    //                     getOptionLabel={(option) => option.BUSNO}
    //                     value={selectedVehicle}
    //                     onChange={handleVehicleSelect}
    //                     renderInput={(params) => (
    //                         <div ref={params.InputProps.ref} className="relative">
    //                             <input
    //                                 {...params.inputProps}
    //                                 className="w-full py-1.5 px-2.5 text-xs bg-white border border-gray-300 rounded-[3px]"
    //                                 placeholder="Search by bus number"
    //                             />
    //                             <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
    //                                 <svg
    //                                     className="w-4 h-4 text-gray-400"
    //                                     fill="none"
    //                                     stroke="currentColor"
    //                                     viewBox="0 0 24 24"
    //                                 >
    //                                     <path
    //                                         strokeLinecap="round"
    //                                         strokeLinejoin="round"
    //                                         strokeWidth="2"
    //                                         d="M19 9l-7 7-7-7"
    //                                     ></path>
    //                                 </svg>
    //                             </div>
    //                         </div>
    //                     )}
    //                 />
    //             </div>
    //         )}

    //         <button
    //             type="button"
    //             className="py-1.5 px-3 text-xs font-medium text-white bg-blue-600 border border-blue-600 rounded-[3px] cursor-pointer whitespace-nowrap hover:bg-blue-700"
    //         >
    //             {searchMode === 'reference' ? 'Search' : 'Select'}
    //         </button>

    //         <button
    //             type="button"
    //             className="text-xs text-blue-600 underline whitespace-nowrap"
    //             onClick={() => setSearchMode(searchMode === 'reference' ? 'bus' : 'reference')}
    //         >
    //             {searchMode === 'reference'
    //                 ? 'Search by Bus Number instead'
    //                 : 'Search by Accident Reference instead'}
    //         </button>
    //     </div>
    // );

    // Define tabs conditionally based on zeroth report status
    const tabLabels = zerothReportFilled
        ? [
            { label: "Details" },
            { label: "Primary Details" },
            { label: "Damages" },
            { label: "Service Details" },
            { label: "Recovery" },
        ]
        : [
            { label: "Zeroth Report" },
            { label: "Primary Details" },
            { label: "Damages" },
            { label: "Service Details" },
            { label: "Recovery" },
        ];

    return (
        <div className="my-4 text-xs">
            {showSuccessPopup && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-500">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Report Submitted Successfully!</h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Your accident report has been submitted with reference number:
                            </p>
                            <div className="bg-gray-100 p-3 rounded-md mb-4">
                                <span className="font-mono text-blue-600">{generatedRefNo}</span>
                            </div>
                            <button
                                onClick={handlePopupClose}
                                className="px-4 py-2 bg-[var(--sidebar)] text-white rounded hover:bg-blue-700 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-3 px-3">
                <h6 className="font-[500] text-[12px]">
                    Accident Reference Number <span className="text-red-600">*</span>
                </h6>
                <input
                    type="text"
                    value={selectedReference ? selectedReference.refNo : ""}
                    placeholder="search and select accident reference number"
                    readOnly
                    className="w-[73%] py-1 px-2.5 text-xs bg-white border border-gray-300 rounded-[3px]"
                />
                <button
                    onClick={() => setIsReferenceModalSearch(true)}
                    className="px-3 py-1 text-white cursor-pointer bg-sidebar rounded-xs"
                >
                    Search
                </button>
                <button
                    onClick={() => setIsVehicleModalSearch(true)}
                    className="px-3 py-1 text-white cursor-pointer bg-sidebar rounded-xs"
                >
                    Add New
                </button>
            </div>

            <div className="flex flex-wrap py-2">
                <div className="w-full px-0">
                    <div className="border-0 p-0">
                        {(selectedVehicle || selectedReference) && (
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <div className="flex flex-col">
                                        {/* Tab Navigation */}
                                        <div className="flex border-b border-gray-200 bg-white overflow-x-auto flex-shrink-0">
                                            {tabLabels.map((tab, index) => {
                                                const isDisabled = formData.severity === "Insignificant" && (index === tabLabels.length - 1 || index === tabLabels.length - 2);
                                                return (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        disabled={isDisabled}
                                                        className={`flex items-center px-4 py-2.5 text-[12px] font-medium whitespace-nowrap bg-transparent transition-all duration-200 border-b-2
                                                                ${activeTab === index
                                                                ? 'text-[var(--sidebar)] border-[var(--sidebar)] bg-white'
                                                                : isDisabled
                                                                    ? 'text-gray-400 border-transparent cursor-not-allowed'
                                                                    : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'}`}
                                                        onClick={() => {
                                                            if (!isDisabled) setActiveTab(index);
                                                        }}
                                                    >
                                                        {tab.label}
                                                    </button>
                                                );
                                            })}
                                        </div>


                                        {/* Progress Bar */}
                                        <div className="h-0.5 bg-gray-200 flex-shrink-0">
                                            <div
                                                className="h-full bg-[var(--sidebar)] transition-all duration-300 ease-in-out"
                                                style={{
                                                    width: `${((activeTab + 1) / tabLabels.length) * 100}%`
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>



                                    {/* Zeroth Report Tab (when not filled) */}
                                    {!zerothReportFilled && activeTab === 0 && (
                                        <div className="h-full">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-3 sm:p-4 md:p-2 mb-1.5">
                                                {/* Left Section: Accident Details */}
                                                <div className='bg-white border-1 border-grey-600 rounded-[4px] p-[16px] overflow-auto'>
                                                    <h3 className="text-[14px] font-[600] mb-[12px] text-[#1a202c] pb-[12px] border-b-2 border-[var(--sidebar)]">
                                                        Accident Details
                                                    </h3>
                                                    <div className="space-y-4">
                                                        <div className="grid grid-cols-3 gap-2">
                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Time of Accident</label>
                                                                <input
                                                                    type="time"
                                                                    name="timeOfAccident"
                                                                    value={formData.timeOfAccident}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Date of Accident</label>
                                                                <input
                                                                    type="date"
                                                                    name="dateOfAccident"
                                                                    value={formData.dateOfAccident}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Home Depot</label>
                                                            <input
                                                                name="homeDepot"
                                                                value={formData.homeDepot}
                                                                onChange={handleChange}
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-gray-100"
                                                                readOnly
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Operated Depot</label>
                                                            <input
                                                                name="operatedDepot"
                                                                value={formData.operatedDepot}
                                                                onChange={handleChange}
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-gray-100"
                                                                readOnly
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Schedule Number</label>
                                                            <input
                                                                name="scheduleNumber"
                                                                placeholder="Enter Schedule Number"
                                                                value={formData.scheduleNumber}
                                                                onChange={handleChange}
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Description</label>
                                                            <textarea
                                                                name="description"
                                                                value={formData.description}
                                                                onChange={handleChange}
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                                rows={5}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right Section: Personnel & Location */}
                                                <div className="bg-white border-1 border-grey-600 rounded-[4px] p-[16px] overflow-auto">
                                                    <h4 className="text-[14px] font-[600] mb-[12px] text-[#1a202c] pb-[12px] border-b-2 border-[var(--sidebar)]">
                                                        Crew & Location
                                                    </h4>
                                                    <div className="space-y-4">
                                                        <div className="grid grid-cols-3 gap-2">
                                                            {/* G-Number Search */}
                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">G Number</label>
                                                                <div className="relative">
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Enter G Number"
                                                                        value={driverSearchTerm}
                                                                        onChange={handleDriverSearch}
                                                                        className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                                    />
                                                                    {showDriverDropdown && filteredDrivers.length > 0 && (
                                                                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                                                            {filteredDrivers.map((driver) => (
                                                                                <div
                                                                                    key={driver.id}
                                                                                    className="px-4 py-2 text-xs hover:bg-blue-50 cursor-pointer"
                                                                                    onClick={() => handleDriverSelect(driver)}
                                                                                >
                                                                                    {driver.gNumber} - {driver.name}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Driver Name */}
                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Driver Name</label>
                                                                <input
                                                                    name="driverName"
                                                                    value={formData.driverName}
                                                                    readOnly
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-gray-100"
                                                                />
                                                            </div>

                                                            {/* Driver Phone */}
                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Driver Phone No.</label>
                                                                <input
                                                                    name="driverPhone"
                                                                    value={formData.driverPhone}
                                                                    readOnly
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-gray-100"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-3 gap-2">
                                                            {/* G-Number Search */}
                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">G Number</label>
                                                                <div className="relative">
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Enter G Number"
                                                                        value={conductorSearchTrem}
                                                                        onChange={handleConductorSearch}
                                                                        className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                                    />
                                                                    {showConductorDropdown && filteredConductors.length > 0 && (
                                                                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                                                            {filteredConductors.map((conductor) => (
                                                                                <div
                                                                                    key={conductor.id}
                                                                                    className="px-4 py-2 text-xs hover:bg-blue-50 cursor-pointer"
                                                                                    onClick={() => handleConductorSelect(conductor)}
                                                                                >
                                                                                    {conductor.gNumber} - {conductor.name}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Driver Name */}
                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Conductor Name</label>
                                                                <input
                                                                    name="driverName"
                                                                    value={formData.conductorName}
                                                                    readOnly
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-gray-100"
                                                                />
                                                            </div>

                                                            {/* Driver Phone */}
                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Conductor Phone No.</label>
                                                                <input
                                                                    name="driverPhone"
                                                                    value={formData.conductorPhone}
                                                                    readOnly
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-gray-100"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-2">
                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Accident Place</label>
                                                                <input
                                                                    name="accidentPlace"
                                                                    value={formData.accidentPlace}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Accident District</label>
                                                                <input
                                                                    name="accidentDistrict"
                                                                    value={formData.accidentDistrict}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Accident State</label>
                                                                <input
                                                                    name="accidentState"
                                                                    value={formData.accidentState}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Nearest Police Station</label>
                                                            <input
                                                                name="nearestPoliceStation"
                                                                value={formData.nearestPoliceStation}
                                                                onChange={handleChange}
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                            />
                                                        </div>



                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Attachments</label>
                                                            <div className="border-1 border-[#d1d5db] rounded p-3 h-[100px]">
                                                                {/* Image Preview Gallery */}
                                                                <div className="flex flex-wrap gap-2 mb-3">
                                                                    {attachments.map((file, index) => (
                                                                        <div key={index} className="relative">
                                                                            {file.type.startsWith('image/') ? (
                                                                                <div className="group relative">
                                                                                    <img
                                                                                        src={URL.createObjectURL(file)}
                                                                                        alt={`Preview ${index}`}
                                                                                        className="h-16 w-16 object-cover rounded border"
                                                                                    />
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() => handleRemoveFile(index)}
                                                                                        className="absolute -top-2 -right-2 bg-red-500 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                                    >
                                                                                        <X size={14} className="text-white" />
                                                                                    </button>
                                                                                </div>
                                                                            ) : (
                                                                                <div className="flex items-center bg-gray-100 px-3 py-1 rounded text-xs">
                                                                                    <span className="mr-2 truncate max-w-[80px]">{file.name}</span>
                                                                                    <button
                                                                                        type="button"
                                                                                        onClick={() => handleRemoveFile(index)}
                                                                                        className="text-red-500"
                                                                                    >
                                                                                        <X size={14} />
                                                                                    </button>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>

                                                                {/* Upload Button */}
                                                                <label className="flex items-center justify-center gap-2 text-blue-600 cursor-pointer text-xs">
                                                                    <Upload size={16} />
                                                                    <span>Upload photos/videos/documents</span>
                                                                    <input
                                                                        type="file"
                                                                        multiple
                                                                        onChange={handleFileChange}
                                                                        className="hidden"
                                                                        accept="image/*,video/*,.pdf,.doc,.docx"
                                                                    />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {zerothReportFilled && activeTab === 0 && (
                                        <div className="mb-4 p-2">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[64vh] sm:gap-6 mb-4">
                                                {/* Left: Report Details Card */}
                                                <div className="bg-white border-1 border-grey-600 rounded-[4px] p-[16px] overflow-auto ">
                                                    <h3 className="text-[14px] font-[600] mb-3 text-[#1a202c] pb-2 border-b-2 border-[var(--sidebar)]">

                                                        Accident Spot Report Details
                                                    </h3>

                                                    <div className="space-y-4">


                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {/* <div >
                                                                <label className="text-xs font-semibold text-gray-700 mb-0 block">Reference Number:</label>
                                                                <div className="text-[12px]">{selectedReference?.refNo}</div>
                                                            </div> */}
                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-700 mb-0 block">Time of Accident</label>
                                                                <div className="text-[12px]">{formData.timeOfAccident}</div>
                                                            </div>
                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-700 mb-0 block">Date of Accident</label>
                                                                <div className="text-[12px]">{formData.dateOfAccident}</div>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-700 mb-0 block">Bonnet No</label>
                                                                <div className="text-[12px]">{formData.bonnetNo}</div>
                                                            </div>
                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-700 mb-0 block">Schedule Number</label>
                                                                <div className="text-[12px]">{formData.scheduleNumber}</div>
                                                            </div>

                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-700 mb-0 block">Operated Depot</label>
                                                                <div className="text-[12px]">{formData.operatedDepot}</div>
                                                            </div>
                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-700 mb-0 block">Home Depot</label>
                                                                <div className="text-[12px]">{formData.homeDepot}</div>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-700 mb-0 block">Driver Name</label>
                                                                <div className="text-[12px]">{formData.driverName}</div>
                                                            </div>
                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-700 mb-0 block">Driver Phone</label>
                                                                <div className="text-[12px]">{formData.driverPhone}</div>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-700 mb-0 block">Conductor Name</label>
                                                                <div className="text-[12px]">{formData.conductorName}</div>
                                                            </div>
                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-700 mb-0 block">Conductor Phone</label>
                                                                <div className="text-[12px]">{formData.conductorPhone}</div>
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-700 mb-0 block">Accident Location</label>
                                                                <div className="text-[12px]">{formData.accidentPlace}</div>
                                                            </div>
                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-700 mb-0 block">Police Station</label>
                                                                <div className="text-[12px]">{formData.nearestPoliceStation}</div>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-700 mb-0 block">State</label>
                                                                <div className="text-[12px]">{formData.accidentState}</div>
                                                            </div>
                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-700 mb-0 block">District</label>
                                                                <div className="text-[12px]">{formData.accidentDistrict}</div>
                                                            </div>

                                                        </div>
                                                        <div>
                                                            <label className="text-xs font-semibold text-gray-700 mb-0 block">Description</label>
                                                            <div className="text-[12px]">{formData.description}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right: Images Card */}
                                                <div className="bg-white border border-gray-300 rounded-[4px] p-4">
                                                    <h3 className="text-[14px] font-semibold mb-3 text-gray-900 pb-2 border-b-2 border-[var(--sidebar)]">
                                                        Uploaded Images
                                                    </h3>

                                                    <div className="grid grid-cols-2 gap-3">
                                                        {/* Hardcoded 4 images */}
                                                        <div
                                                            className="cursor-pointer"
                                                            onClick={() => setPreviewImage("https://res.cloudinary.com/dpo91btlc/image/upload/v1749304400/8_xhmi5s.png")}
                                                        >
                                                            <div className="bg-gray-200 border border-gray-300 rounded h-24 flex items-center justify-center">
                                                                <div className="text-gray-500 text-center h-full w-full">
                                                                    <img
                                                                        src="https://res.cloudinary.com/dpo91btlc/image/upload/v1749304400/8_xhmi5s.png"
                                                                        alt="accident"
                                                                        className="h-full w-full object-fit"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className="cursor-pointer"
                                                            onClick={() => setPreviewImage("https://res.cloudinary.com/dpo91btlc/image/upload/v1749303818/Capture_owmfke.png")}
                                                        >
                                                            <div className="bg-gray-200 border border-gray-300 rounded h-24 flex items-center justify-center">
                                                                <div className="text-gray-500 text-center h-full w-full">
                                                                    <img
                                                                        src="https://res.cloudinary.com/dpo91btlc/image/upload/v1749303818/Capture_owmfke.png"
                                                                        alt="accident"
                                                                        className="h-full w-full object-fit"
                                                                    />
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div
                                                            className="cursor-pointer"
                                                            onClick={() => setPreviewImage("https://res.cloudinary.com/dpo91btlc/image/upload/v1749304400/8_xhmi5s.png")}
                                                        >
                                                            <div className="bg-gray-200 border border-gray-300 rounded h-24 flex items-center justify-center">
                                                                <div className="text-gray-500 text-center h-full w-full">
                                                                    <img
                                                                        src="https://res.cloudinary.com/dpo91btlc/image/upload/v1749304400/8_xhmi5s.png"
                                                                        alt="accident"
                                                                        className="h-full w-full object-fit"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div
                                                            className="cursor-pointer"
                                                            onClick={() => setPreviewImage("https://res.cloudinary.com/dpo91btlc/image/upload/v1749304400/8_xhmi5s.png")}
                                                        >
                                                            <div className="bg-gray-200 border border-gray-300 rounded h-24 flex items-center justify-center">
                                                                <div className="text-gray-500 text-center h-full w-full">
                                                                    <img
                                                                        src="https://res.cloudinary.com/dpo91btlc/image/upload/v1749304400/8_xhmi5s.png"
                                                                        alt="accident"
                                                                        className="h-full w-full object-fit"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                            {/* Fullscreen Image Modal */}
                                            {previewImage && (
                                                <div
                                                    className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center"
                                                    onClick={() => setPreviewImage(null)}
                                                >
                                                    <div className="max-w-4xl w-full p-4">
                                                        <div className=" rounded-lg overflow-hidden">
                                                            <div className="p-3  flex justify-between items-center">
                                                                <h3 className="font-medium"></h3>
                                                                <button
                                                                    className="text-gray-500 hover:text-gray-700"
                                                                    onClick={() => setPreviewImage(null)}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                            <div className="p-4 flex justify-center ">
                                                                <img
                                                                    src={previewImage}
                                                                    alt="Preview"
                                                                    className="max-h-[70vh] object-contain"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Primary Details Tab */}

                                    {activeTab === 1 && (
                                        <div className=" h-full ">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-3 sm:p-4 md:p-2 mb-1.5">

                                                {/* LEFT: Basic Details */}
                                                <div className='bg-white border-1 border-grey-600 rounded-[4px] min-h-[65vh] p-[16px] overflow-auto'>
                                                    <h3 className="text-[14px] font-[600] mb-[12px] text-[#1a202c] pb-[12px] border-b-2 border-[var(--sidebar)]">Basic Details</h3>
                                                    <div className="space-y-4">

                                                        {/* Date */}
                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]" >Severity</label>
                                                            <select
                                                                name="severity"
                                                                value={formData.severity}
                                                                onChange={handleChange}
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                            >
                                                                <option value="">Select Severity</option>
                                                                <option value="Insignificant">Insignificant</option>
                                                                <option value="Minor">Minor</option>
                                                                <option value="Major">Major</option>
                                                                <option value="Fatal">Fatal</option>
                                                            </select>

                                                        </div>


                                                        {/* Location Input + Map */}
                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Accident Location (Lat, Long)</label>
                                                            <div className="flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Latitude"
                                                                    name="latitude"
                                                                    value={formData.latitude}
                                                                    onChange={handleChange}
                                                                    className="w-1/2 py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    placeholder="Longitude"
                                                                    name="longitude"
                                                                    value={formData.longitude}
                                                                    onChange={handleChange}
                                                                    className="w-1/2 py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                                />
                                                            </div>

                                                            {/* Map using Leaflet */}
                                                            <div className="mt-2 h-48 border rounded overflow-hidden">
                                                                {formData.latitude && formData.longitude &&
                                                                    !isNaN(parseFloat(formData.latitude)) &&
                                                                    !isNaN(parseFloat(formData.longitude)) ? (
                                                                    <MapComponent
                                                                        latitude={parseFloat(formData.latitude)}
                                                                        longitude={parseFloat(formData.longitude)}
                                                                        onLocationChange={(lat, lng) => {
                                                                            setFormData((prev) => ({
                                                                                ...prev,
                                                                                latitude: lat.toFixed(6),
                                                                                longitude: lng.toFixed(6),
                                                                            }));
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <div className="flex items-center justify-center h-full text-sm text-gray-500">
                                                                        Location not selected
                                                                    </div>
                                                                )}
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>

                                                {/* RIGHT: Other Vehicle Involved */}
                                                <div className="bg-white border-1 border-grey-600 rounded-[4px] p-[16px] overflow-auto">
                                                    <h4 className="text-[14px] font-[600] mb-[12px] text-[#1a202c] pb-[12px] border-b-2 border-[var(--sidebar)]">Other Vehicle Involved</h4>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Type of Other Vehicle Involved</label>
                                                            <input name="otherVehicleRegNo" placeholder="Enter Type of Other Vehicle Involved" value={formData.typeOfOtherVehicle} onChange={handleChange} className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
                                                        </div>
                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Vehicle Reg. Number</label>
                                                            <input name="otherVehicleRegNo" placeholder="Enter Involved Vehicle Registration Number" value={formData.involvedVehicleRegNumbers} onChange={handleChange} className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
                                                        </div>
                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Jurisdiction (Depot)</label>
                                                            <input name="jurisdiction" placeholder="Enter Jurisdiction Depo Name" value={formData.jurisdictionDepot} onChange={handleChange} className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" />
                                                        </div>
                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Description</label>
                                                            <textarea name="otherVehicleDescription" placeholder="Enter Details" value={formData.primarydescription} onChange={handleChange} className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs" rows={5} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    )}


                                    {/* Damages Happened Tab */}
                                    {activeTab === 2 && (
                                        <div className="h-full">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-3 sm:p-4 md:p-2 mb-1.5 min-h-[65vh]">

                                                {/* LEFT: Accident Details */}
                                                <div className="bg-white border-1 border-grey-600 rounded-[4px] p-[16px] overflow-auto">
                                                    <h3 className="text-[14px] font-[600] mb-[12px] text-[#1a202c] pb-[12px] border-b-2 border-[var(--sidebar)]">Accident Details</h3>
                                                    <div className="space-y-4">

                                                        {/* Accident Type */}
                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Accident Type</label>
                                                            <input
                                                                type="text"
                                                                name="accidentType"
                                                                value={formData.accidentType}
                                                                onChange={handleChange}
                                                                placeholder="Enter accident type"
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                            />
                                                        </div>

                                                        {/* Type of Collision */}
                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Type of Collision</label>
                                                            <select
                                                                name="typeOfCollision"
                                                                value={formData.typeOfCollision}
                                                                onChange={handleCollisionChange}
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                            >
                                                                {collisionOptions.map((opt) => (
                                                                    <option key={opt} value={opt}>{opt}</option>
                                                                ))}
                                                                <option value="custom">Add custom...</option>
                                                            </select>

                                                            {formData.typeOfCollision === 'custom' && (
                                                                <input
                                                                    type="text"
                                                                    placeholder="Enter custom collision type"
                                                                    value={customCollision}
                                                                    onChange={(e) => setCustomCollision(e.target.value)}
                                                                    onBlur={handleAddCustomCollision}
                                                                    className="w-full py-[8px] px-[12px] mt-[6px] border-1 border-[#d1d5db] rounded text-xs"
                                                                />
                                                            )}
                                                        </div>

                                                        {/* Primary Cause of Accident */}
                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Primary Cause of Accident</label>
                                                            <input
                                                                type="text"
                                                                name="primaryCause"
                                                                value={formData.primaryCause}
                                                                onChange={handleChange}
                                                                placeholder="Enter primary cause"
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                            />
                                                        </div>

                                                        {/* Primary Responsibility */}
                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">Primary Responsibility for the Accident</label>
                                                            <input
                                                                type="text"
                                                                name="primaryResponsibility"
                                                                value={formData.primaryResponsibility}
                                                                onChange={handleChange}
                                                                placeholder="Enter responsibility"
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                            />
                                                        </div>

                                                    </div>
                                                </div>
                                                {/* RIGHT: Injury & Fatality Details */}
                                                <div className="bg-white border-1 border-grey-600 rounded-[4px] p-[16px] overflow-auto">
                                                    <h3 className="text-[14px] font-[600] mb-[12px] text-[#1a202c] pb-[12px] border-b-2 border-[var(--sidebar)]">Injury & Fatality Details</h3>


                                                    {formData.severity === "Insignificant" ? (
                                                        // If insignificant, show only up to Primary Responsibility (which is on the left), so here show minimal or no injury fields
                                                        <div className="text-sm text-gray-500">No injury or fatality details required for insignificant severity.</div>
                                                    ) : (

                                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                                            {/* Individual input boxes */}
                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px] block">Fatalities (KSRTC Crew)</label>
                                                                <input type="number" name="fatalitiesKsrtcCrew" value={formData.fatalitiesKsrtcCrew || ''} onChange={handleChange} placeholder="0" className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs" />
                                                            </div>
                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px] block">Fatalities (Passengers)</label>
                                                                <input type="number" name="fatalitiesPassengers" value={formData.fatalitiesPassengers || ''} onChange={handleChange} placeholder="0" className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs" />
                                                            </div>
                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px] block">Fatalities (3rd Party)</label>
                                                                <input type="number" name="fatalitiesThirdParty" value={formData.fatalitiesThirdParty || ''} onChange={handleChange} placeholder="0" className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs" />
                                                            </div>
                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px] block">Major Injuries (KSRTC Crew)</label>
                                                                <input type="number" name="majorInjuriesKsrtcCrew" value={formData.majorInjuriesKsrtcCrew || ''} onChange={handleChange} placeholder="0" className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs" />
                                                            </div>

                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px] block">Major Injuries (Passengers)</label>
                                                                <input type="number" name="majorInjuriesPassengers" value={formData.majorInjuriesPassengers || ''} onChange={handleChange} placeholder="0" className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs" />
                                                            </div>
                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px] block">Major Injuries (3rd Party)</label>
                                                                <input type="number" name="majorInjuriesThirdParty" value={formData.majorInjuriesThirdParty || ''} onChange={handleChange} placeholder="0" className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs" />
                                                            </div>
                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px] block">Minor Injuries (KSRTC Crew)</label>
                                                                <input type="number" name="minorInjuriesKsrtcCrew" value={formData.minorInjuriesKsrtcCrew || ''} onChange={handleChange} placeholder="0" className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs" />
                                                            </div>

                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px] block">Minor Injuries (Passengers)</label>
                                                                <input type="number" name="minorInjuriesPassengers" value={formData.minorInjuriesPassengers || ''} onChange={handleChange} placeholder="0" className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs" />
                                                            </div>

                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px] block">Minor Injuries (3rd Party)</label>
                                                                <input type="number" name="minorInjuriesThirdParty" value={formData.minorInjuriesThirdParty || ''} onChange={handleChange} placeholder="0" className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs" />
                                                            </div>
                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px] block">Total Fatalities</label>
                                                                <input
                                                                    type="number"
                                                                    name="totalFatalities"
                                                                    value={formData.totalFatalities}
                                                                    readOnly
                                                                    className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px] block">Total Major Injuries</label>
                                                                <input type="number" name="totalMajorInjuries" value={formData.totalMajorInjuries || ''} onChange={handleChange} placeholder="0" className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs" />
                                                            </div>
                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px] block">Total Minor Injuries</label>
                                                                <input type="number" name="totalMinorInjuries" value={formData.totalMinorInjuries || ''} onChange={handleChange} placeholder="0" className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                    )}


                                    {/* Service Details Tab */}
                                    {activeTab === 3 && (
                                        <div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[65vh] sm:gap-6 p-3 sm:p-4 md:p-2 mb-1.5">
                                                {/* LEFT: Service Information */}
                                                <div className='bg-white border-1 border-grey-600 rounded-[4px] p-[16px] overflow-auto'>
                                                    <h4 className="text-[14px] font-[600] mb-[12px] text-[#1a202c] pb-[12px] border-b-2 border-[var(--sidebar)]">
                                                        Service Information
                                                    </h4>
                                                    <div className="space-y-4">
                                                        <div className="grid gird-cols-2 md:grid-cols-2 gap-2">
                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
                                                                    Schedule Number (Cdit)
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="scheduleNumber"
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
                                                                    Operated Schedule Name
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="operatedScheduleName"
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
                                                                Accident Occurred
                                                            </label>
                                                            <select
                                                                name="accidentOccurred"
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                            >
                                                                <option value="">Select Status</option>
                                                                <option value="Yes">Yes</option>
                                                                <option value="No">No</option>
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
                                                                Road Classification
                                                            </label>
                                                            <select
                                                                name="roadClassification"
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                            >
                                                                <option value="">Select Classification</option>
                                                                <option value="National Highway">National Highway</option>
                                                                <option value="State Highway">State Highway</option>
                                                                <option value="District Road">District Road</option>
                                                                <option value="Rural Road">Rural Road</option>
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
                                                                Road Condition
                                                            </label>
                                                            <select
                                                                name="roadCondition"
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                            >
                                                                <option value="">Select Condition</option>
                                                                <option value="Good">Good</option>
                                                                <option value="Average">Average</option>
                                                                <option value="Poor">Poor</option>
                                                                <option value="Under Construction">Under Construction</option>
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
                                                                Weather Condition
                                                            </label>
                                                            <select
                                                                name="weatherCondition"
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                            >
                                                                <option value="">Select Condition</option>
                                                                <option value="Clear">Clear</option>
                                                                <option value="Rainy">Rainy</option>
                                                                <option value="Foggy">Foggy</option>
                                                                <option value="Stormy">Stormy</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
                                                                Traffic Density
                                                            </label>
                                                            <select
                                                                name="trafficDensity"
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                            >
                                                                <option value="">Select Density</option>
                                                                <option value="Low">Low</option>
                                                                <option value="Medium">Medium</option>
                                                                <option value="High">High</option>
                                                                <option value="Congested">Congested</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* RIGHT: Damage & Inspection */}
                                                <div className='bg-white border-1 border-grey-600 rounded-[4px] p-[16px] overflow-auto'>
                                                    <h4 className="text-[14px] font-[600] mb-[12px] text-[#1a202c] pb-[12px] border-b-2 border-[var(--sidebar)]">
                                                        Damage & Inspection
                                                    </h4>
                                                    <div className="space-y-4">


                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
                                                                Damage To The Bus
                                                            </label>
                                                            <select
                                                                name="damageToBus"
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                            >
                                                                <option value="">Select Severity</option>
                                                                <option value="Minor">Minor</option>
                                                                <option value="Moderate">Moderate</option>
                                                                <option value="Severe">Severe</option>
                                                                <option value="Totaled">Totaled</option>
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
                                                                3rd Party Properties Damaged
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="thirdPartyPropertiesDamaged"
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
                                                                Category
                                                            </label>
                                                            <select
                                                                name="category"
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                            >
                                                                <option value="">Select Category</option>
                                                                <option value="Collision">Collision</option>
                                                                <option value="Non-Collision">Non-Collision</option>
                                                                <option value="Passenger Injury">Passenger Injury</option>
                                                                <option value="Property Damage">Property Damage</option>
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
                                                                Inquiry Inspector Name (Ksrtc)
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="inspectorName"
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
                                                                Inspector Phone No.
                                                            </label>
                                                            <input
                                                                type="tel"
                                                                name="inspectorPhone"
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Recovery Phase Tab */}
                                    {activeTab === 4 && (
                                        <div>


                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-3 sm:p-4 md:p-2 mb-1.5">
                                                {/* LEFT: Recovery Details */}
                                                <div className='bg-white border-1 border-grey-600 rounded-[4px] p-[16px] overflow-auto'>
                                                    <h4 className="text-[14px] font-[600] mb-[12px] text-[#1a202c] pb-[12px] border-b-2 border-[var(--sidebar)]">
                                                        Recovery Details
                                                    </h4>
                                                    <div className="space-y-4">
                                                        {/* Docked/Service After Accident - Radio Group */}
                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px] block">
                                                                Docked/Service After Accident
                                                            </label>
                                                            <div className="flex gap-3 mt-1.5 flex-wrap">
                                                                <label className="flex items-center gap-1.5 cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        name="dockedService"
                                                                        value="Docked"
                                                                        className="w-[14px] h-[14px] m-0"
                                                                    />
                                                                    <span className="text-xs font-medium">Docked</span>
                                                                </label>
                                                                <label className="flex items-center gap-1.5 cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        name="dockedService"
                                                                        value="Service After Accident"
                                                                        className="w-[14px] h-[14px] m-0"
                                                                    />
                                                                    <span className="text-xs font-medium">Service After Accident</span>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        {/* Taken For Repair Work - Radio Group */}
                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px] block">
                                                                Taken For Repair Work
                                                            </label>
                                                            <div className="flex gap-3 mt-1.5 flex-wrap">
                                                                <label className="flex items-center gap-1.5 cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        name="repairWork"
                                                                        value="Yes"
                                                                        className="w-[14px] h-[14px] m-0"
                                                                    />
                                                                    <span className="text-xs font-medium">Yes</span>
                                                                </label>
                                                                <label className="flex items-center gap-1.5 cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        name="repairWork"
                                                                        value="No"
                                                                        className="w-[14px] h-[14px] m-0"
                                                                    />
                                                                    <span className="text-xs font-medium">No</span>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        {/* GD Entered - Radio Group */}
                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px] block">
                                                                GD Entered In Police Station
                                                            </label>
                                                            <div className="flex gap-3 mt-1.5 flex-wrap">
                                                                <label className="flex items-center gap-1.5 cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        name="gdEntered"
                                                                        value="Yes"
                                                                        className="w-[14px] h-[14px] m-0"
                                                                    />
                                                                    <span className="text-xs font-medium">Yes</span>
                                                                </label>
                                                                <label className="flex items-center gap-1.5 cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        name="gdEntered"
                                                                        value="No"
                                                                        className="w-[14px] h-[14px] m-0"
                                                                    />
                                                                    <span className="text-xs font-medium">No</span>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        {/* FIR Registered - Radio Group */}
                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px] block">
                                                                FIR Registered
                                                            </label>
                                                            <div className="flex gap-3 mt-1.5 flex-wrap">
                                                                <label className="flex items-center gap-1.5 cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        name="firRegistered"
                                                                        value="Yes"
                                                                        className="w-[14px] h-[14px] m-0"
                                                                    />
                                                                    <span className="text-xs font-medium">Yes</span>
                                                                </label>
                                                                <label className="flex items-center gap-1.5 cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        name="firRegistered"
                                                                        value="No"
                                                                        className="w-[14px] h-[14px] m-0"
                                                                    />
                                                                    <span className="text-xs font-medium">No</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* RIGHT: Cost & Settlement */}
                                                <div className='bg-white border-1 border-grey-600 rounded-[4px] p-[16px] overflow-auto'>
                                                    <h4 className="text-[14px] font-[600] mb-[12px] text-[#1a202c] pb-[12px] border-b-2 border-[var(--sidebar)]">
                                                        Cost & Settlement
                                                    </h4>
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
                                                                Cost Of Damage Assessed Amount (₹)
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name="damageCost"
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
                                                                Amount Settled With KSRTC Driver (₹)
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name="settledWithDriver"
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
                                                                COD Settled With Other Vehicle (₹)
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name="codOtherVehicle"
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                            />
                                                        </div>

                                                        {/* COD Recovered - Radio Group */}
                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px] block">
                                                                COD Recovered
                                                            </label>
                                                            <div className="flex gap-3 mt-1.5 flex-wrap">
                                                                <label className="flex items-center gap-1.5 cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        name="codRecovered"
                                                                        value="Yes"
                                                                        className="w-[14px] h-[14px] m-0"
                                                                    />
                                                                    <span className="text-xs font-medium">Yes</span>
                                                                </label>
                                                                <label className="flex items-center gap-1.5 cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        name="codRecovered"
                                                                        value="No"
                                                                        className="w-[14px] h-[14px] m-0"
                                                                    />
                                                                    <span className="text-xs font-medium">No</span>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        {/* Case Settled - Radio Group */}
                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px] block">
                                                                Case Settled Or Not
                                                            </label>
                                                            <div className="flex gap-3 mt-1.5 flex-wrap">
                                                                <label className="flex items-center gap-1.5 cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        name="caseSettled"
                                                                        value="Settled"
                                                                        className="w-[14px] h-[14px] m-0"
                                                                    />
                                                                    <span className="text-xs font-medium">Settled</span>
                                                                </label>
                                                                <label className="flex items-center gap-1.5 cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        name="caseSettled"
                                                                        value="Not Settled"
                                                                        className="w-[14px] h-[14px] m-0"
                                                                    />
                                                                    <span className="text-xs font-medium">Not Settled</span>
                                                                </label>
                                                                <label className="flex items-center gap-1.5 cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        name="caseSettled"
                                                                        value="In Progress"
                                                                        className="w-[14px] h-[14px] m-0"
                                                                    />
                                                                    <span className="text-xs font-medium">In Progress</span>
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="text-[12px] font-[600] text-[#374151] mb-[6px]">
                                                                Remarks
                                                            </label>
                                                            <textarea
                                                                name="remarks"
                                                                className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                                rows={3}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="border-t-1 border-grey-500 py-[10px] px-[16px] flex justify-between">
                                        <div className='flex gap-[16px]'>
                                            {activeTab > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveTab(activeTab - 1)}
                                                    className="px-5 py-1 text-sm font-[500] bg-[#059669] text-white rounded-xs flex items-center"
                                                >
                                                    Previous
                                                </button>
                                            )}

                                            {activeTab < tabLabels.length - 1 && (
                                                formData.severity === "Insignificant" && activeTab === 2 ? null : (
                                                    <button
                                                        type="button"
                                                        onClick={() => setActiveTab(activeTab + 1)}
                                                        className="bg-sidebar font-[500] text-white px-5 py-1 rounded-xs disabled:bg-gray-400"
                                                    >
                                                        Next
                                                    </button>
                                                )
                                            )}
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={handleCancel}
                                                className="px-5 py-1 font-[500] bg-white text-sm border border-[#d1d5db] rounded flex items-center"
                                            >
                                                Cancel
                                            </button>

                                            {activeTab > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => setActiveTab(activeTab + 1)}
                                                    className="px-5 py-1 font-[500] bg-white text-sm border border-[#d1d5db] rounded flex items-center"
                                                >
                                                    Save Draft
                                                </button>
                                            )}

                                            {/* Submit if severity is insignificant and on tab 2 */}
                                            {activeTab === 2 && formData.severity === "Insignificant" && (
                                                <button
                                                    type="submit"
                                                    className="bg-sidebar font-[500] text-white px-5 py-1 rounded-xs disabled:bg-gray-400"
                                                >
                                                    Submit Report
                                                </button>
                                            )}

                                            {/* Submit on last tab if severity is not insignificant */}
                                            {formData.severity !== "Insignificant" && activeTab === tabLabels.length - 1 && (
                                                <button
                                                    type="submit"
                                                    className="bg-sidebar font-[500] text-white px-5 py-1 rounded-xs disabled:bg-gray-400"
                                                >
                                                    Submit Report
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                </div>

                            </form>
                        )}
                        {zeroSelectedVehicle && (
                            <AccidentReportForm
                                selectedVehicle={zeroSelectedVehicle}

                            />
                        )}
                    </div>

                </div>
            </div>
            {isReferenceModalSearchOpen && (
                <ReferenceNumberSearchModal
                    closeHandler={handleSearchModalClose}
                    caseSelectHandler={handleSearchSelect}
                />
            )}
            {isVehicleSearchOpen && (
                <AddZerothReportModal
                    closeHandler={handleVehicleModalClose}
                    caseSelectHandler={handleVehicleSelect}
                />
            )}
        </div >
    );
};

export default PrimaryAccidentReport;