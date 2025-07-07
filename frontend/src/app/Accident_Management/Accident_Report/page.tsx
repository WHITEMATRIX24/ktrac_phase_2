'use client';

import * as React from 'react';
import { Bus, X, Upload, Wrench } from 'lucide-react';
import Autocomplete from '@mui/material/Autocomplete';

import dynamic from 'next/dynamic';
import ReferenceNumberSearchModal from '@/components/accident_management/search_referencenumber_modal';
import AddNewAccidentModal from '@/components/accident_management/add_new_accident';
import AddZerothReportModal from '@/components/accident_management/zerothreport_modal';
import AccidentReportForm from '@/components/accident_management/zerothReportForm';
import CombinedAccidentComponent from '@/components/accident_management/zerothreport_modal';

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
interface Photo {
    download_url: string;
    expires_at: string;
}

interface AccidentReference {
    id: string;
    refNo: string;
    busNo: string;
    regNo: string;
    ksrcOrKswift: string;
    busClass: string;
    operatedDepotZone: string;
    ageOfBus: number;
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
    photos: Photo[];
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
interface Bus {
    id: number;
    bonet_number: string;
    registration_number: string;
    class: string;
    insurance_id: string;
    rc_id: string;
    pollution_certificate: string;
    body_type: string;
    age: number;
    zone: string;
    vehicle_no: string;
    created_at: string;
    created_by: string;
    updated_at: string;
    updated_by: string | null;
    schedule_no: number;
    operated_depot: string;
}


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
        takenForRepair: false,
        gdEntered: '',
        firRegistered: '',
        costOfDamage: '',
        amountSettledWithDriver: '',
        codSettledWithOtherVehicle: false,
        codRecovered: false,
        caseSettled: false,
        recoveryRemarks: '',
    };

    const [formData, setFormData] = React.useState(initialFormState);
    const handleSearchSelect = (accidentData: any) => {
        console.log("accident", accidentData);
        const mappedData: AccidentReference = {
            id: accidentData.accident_id,
            refNo: accidentData.accident_id,
            busNo: accidentData.vehicle_info.bonet_no,
            regNo: accidentData.vehicle_info.vehicle_register_no,
            accidentPlace: accidentData.location_info.place,
            accidentDate: accidentData.accident_details.date_of_accident,
            policeStation: accidentData.geolocation.nearest_police_station,
            timeOfAccident: accidentData.accident_details.time_of_accident,
            ksrcOrKswift: '', // not provided
            busClass: '', // not provided
            operatedDepotZone: '', // not provided
            ageOfBus: 0, // not provided
            operatedDepot: accidentData.accident_details.operated_depot,
            homeDepot: '',
            scheduleNumber: accidentData.accident_details.schedule_number,
            driverName: accidentData.crew_information.driver_name,
            driverPhone: accidentData.crew_information.driver_phn_no,
            conductorName: accidentData.crew_information.conductor_name,
            conductorPhone: accidentData.crew_information.conductor_phn_no,
            accidentState: accidentData.location_info.state,
            accidentDistrict: accidentData.location_info.district,
            accidentLatitude: accidentData.geolocation.latitude.toString(),
            accidentLongitude: accidentData.geolocation.longitude.toString(),
            description: accidentData.accident_details.description,
            photos: accidentData?.photos?.download_urls?.map((item: any) => ({
                download_url: item.download_url,
                expires_at: item.generated_at,
            })) || [],
        };
        console.log("photo check", mappedData);

        setZeroSelectedVehicle(null);
        setSelectedReference(mappedData);

        setFormData(prev => ({
            ...prev,
            accidentRefNo: mappedData.refNo,
            bonnetNo: mappedData.busNo,
            regNo: mappedData.regNo,
            ksrcOrKswift: mappedData.ksrcOrKswift,
            busClass: mappedData.busClass,
            operatedDepotZone: mappedData.operatedDepotZone,
            ageOfBus: mappedData.ageOfBus,
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
        const booleanFields = ['takenForRepair', 'codSettledWithOtherVehicle', 'codRecovered', 'caseSettled'];

        const updatedFormData = {
            ...formData,
            [name]: numericFields.includes(name)
                ? parseInt(value) || 0
                : booleanFields.includes(name)
                    ? value === 'true'
                    : value,
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
        const costOfDamage = Number(updatedFormData.costOfDamage) || 0;

        let severity = 'not-defined';

        if (totalFatalities > 0) {
            severity = 'Fatal';
        } else if (costOfDamage < 5000) {
            severity = 'Insignificant';
        } else if (costOfDamage <= 50000) {
            severity = 'Minor';
        } else {
            severity = 'Major';
        }


        setFormData({
            ...updatedFormData,
            totalFatalities,
            totalMajorInjuries,
            totalMinorInjuries,
            severity,
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Stop page refresh

        const datePart = formData.dateOfAccident;   // e.g. "2025-06-17"
        const timePart = formData.timeOfAccident;   // e.g. "14:30:00"
        const combinedDateTime = `${datePart}T${timePart}`;

        const primaryPayload = {
            accident_id: formData.accidentRefNo,
            operated_depot_zone: formData.operatedDepotZone,
            operated_schedule_name: formData.operatedScheduleName,
            type_of_other_vehicle: formData.typeOfOtherVehicle,
            involved_vehicle_reg_numbers: formData.involvedVehicleRegNumbers,
            home_depot: formData.homeDepot,
            jurisdiction_depot: formData.jurisdictionDepot,
            police_station_jurisdiction: formData.nearestPoliceStation,
            accident_state: formData.accidentState,
            accident_district: formData.accidentDistrict,
            accident_place: formData.accidentPlace,
            created_by: "adminksrtc"
        };
        const damagePayload = {
            accident_id: formData.accidentRefNo,
            damage_description: formData.damageToBus,
            third_party_properties_damaged: formData.thirdPartyPropertiesDamaged,
            created_by: "admin@ktrac"
        };
        const accidentDetailsPayload = {
            accident_id: formData.accidentRefNo,
            accident_occurred: formData.accidentOccurred,
            accident_type: formData.accidentType,
            type_of_collision: formData.typeOfCollision,
            primary_cause_of_accident: formData.primaryCause,
            primary_responsibilities: formData.primaryResponsibility,
            fatalities_ksrtc_crew: formData.fatalitiesKsrtcCrew,
            fatalities_passengers: formData.fatalitiesPassengers,
            fatalities_third_party: formData.fatalitiesThirdParty,
            major_injuries_ksrtc_crew: formData.majorInjuriesKsrtcCrew,
            minor_injuries_ksrtc_crew: formData.minorInjuriesKsrtcCrew,
            major_injuries_passengers: formData.majorInjuriesPassengers,
            minor_injuries_passengers: formData.minorInjuriesPassengers,
            major_injuries_third_party: formData.majorInjuriesThirdParty,
            minor_injuries_third_party: formData.minorInjuriesThirdParty
        };
        const inspectorPayload = {
            accident_id: formData.accidentRefNo,
            inspector_name: formData.inquiryInspectorName,
            inspector_phone: formData.inspectorPhone,
            created_by: "admin@ksrtc"
        };
        const onRoadPayload = {
            accident_id: formData.accidentRefNo,
            road_classification_code: formData.roadClassification,
            road_condition_code: formData.roadCondition,
            weather_condition_code: formData.weatherCondition,
            traffic_density_code: formData.trafficDensity,
            created_by: "admin@ksrtc"
        };
        const recoveryPayload = {
            accident_id: formData.accidentRefNo,
            docked_or_service: formData.dockedOrServiceAfter,
            taken_for_repair: formData.takenForRepair,
            gd_enter_police_station: formData.gdEntered,
            cost_damage_assessed_amount: Number(formData.costOfDamage),
            amount_settled_with_driver: Number(formData.amountSettledWithDriver),
            cod_settled_other_vehicle: formData.codSettledWithOtherVehicle,
            cod_recovered: formData.codRecovered,
            case_settled: formData.caseSettled,
            severity: formData.severity,
            remarks: "remarks is hardcoded",
            created_by: "admin@ksrtc",
            created_at: "2025-06-27T04:50:01.332672"
        };


        try {
            await Promise.all([
                fetch("/api/addPrimaryDetails", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(primaryPayload)
                }),
                fetch("/api/addDamageDetails", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(damagePayload)
                }),
                fetch("/api/addAccidentDetails", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(accidentDetailsPayload)
                }),
                fetch("/api/addPrimaryInspectorDetails", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(inspectorPayload)
                }),
                fetch("/api/addOnRoadDetails", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(onRoadPayload)
                }),
                fetch("/api/addRecoveryDetails", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(recoveryPayload)
                })
            ]);

            alert("All accident details submitted successfully.");
            window.location.reload();
        } catch (error) {
            console.error("Submission failed", error);
            alert("Error during submission. Please check logs.");
        }

    };


    const handlePopupClose = () => {
        setShowSuccessPopup(false);
        handleCancel();
    };
    const [collisionOptions, setCollisionOptions] = React.useState<string[]>([
        "Select Type of Collision", "Head On Collision", "Hit Behind By KSRTC", "Hit Behind by Thrid Party", "Hit Side by KSRTC", "Hit Side by Thirdparty", "Hit behind Serial", "Hit Front by Ksrtc"
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

    // Define tabs conditionally based on zeroth report status
    const tabLabels = zerothReportFilled
        ? [
            { label: "Details" },
            { label: "Primary Details" },
            { label: "Accident Overview" },
            { label: "Damage & Inspection" },
            { label: "Recovery" },
        ]
        : [
            { label: "Zeroth Report" },
            { label: "Primary Details" },
            { label: "Accident Overview" },
            { label: "Damage & Inspection" },
            { label: "Recovery" },
        ];

    return (
        <div className="my-0 text-xs">
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
                                className="px-4 py-2 bg-[var(--sidebar-bg)] text-white rounded hover:bg-blue-700 transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {selectedReference === null ? (
                <CombinedAccidentComponent caseSelectHandler={handleSearchSelect} />
            ) : (

                <div className="flex flex-wrap py-2">
                    <div className="w-full px-0">
                        <div className="border-0 p-0">
                            {(selectedVehicle || selectedReference) && (
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <div className="flex flex-col">
                                            {/* Tab Navigation */}
                                            <h2 className="text-[18px] font-[600] text-[var(--themeRed)] px-4 mb-2 text-center"> {formData.accidentRefNo?.replaceAll('_', '/')}</h2>
                                            <div className="flex border-b border-gray-200 bg-[var(--sidebar-bg)] overflow-x-auto flex-shrink-0">

                                                {tabLabels.map((tab, index) => {

                                                    return (
                                                        <button
                                                            key={index}
                                                            type="button"

                                                            className={`flex items-center px-4 py-2.5 text-[14px] text-white font-medium whitespace-nowrap bg-transparent transition-all duration-200 border-b-2
                                                                ${activeTab === index
                                                                    ? 'text-[var(--sidebar-bg)] border-white bg-gray-500'

                                                                    : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50'}`}
                                                            onClick={() => {
                                                                setActiveTab(index);
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
                                                    className="h-full bg-[var(--sidebar-bg)] transition-all duration-300 ease-in-out"
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
                                                        <h3 className="text-[14px] font-[600] mb-[12px] text-[#1a202c] pb-[12px] border-b-2 border-[var(--sidebar-bg)]">
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
                                                        <h4 className="text-[14px] font-[600] mb-[12px] text-[#1a202c] pb-[12px] border-b-2 border-[var(--sidebar-bg)]">
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
                                                                <label className="text-[12px] text-[#374151] mb-[6px]">Nearest Police Station</label>
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
                                                <div className="flex gap-2 min-h-[67vh] mb-1">
                                                    {/* Left: Report Details Card */}
                                                    <div className="w-[70%] bg-white border-2 border-gray-400 rounded-[8px] overflow-auto">
                                                        <h3 className="text-[16px] font-[600] pb-2 border-b-2 border-[var(--sidebar)] p-[16px]">
                                                            Accident Spot Report Details <span className="text-[12px]">(അപകട സ്ഥല റിപ്പോർട്ട് വിവരങ്ങൾ)</span>
                                                        </h3>

                                                        <div className="space-y-4 p-[16px]">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                                                        Time of Accident <span className="text-[10px]">(അപകട സമയം)</span>
                                                                    </label>
                                                                    <div className="text-[12px] text-[var(--sidebar-bg)]">{formData.timeOfAccident}</div>
                                                                </div>
                                                                <div>
                                                                    <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                                                        Date of Accident <span className="text-[10px]">(അപകട തീയതി)</span>
                                                                    </label>
                                                                    <div className="text-[12px] text-[var(--sidebar-bg)]">{formData.dateOfAccident}</div>
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                                                        Bonnet No <span className="text-[10px]">(ബോണറ്റ് നമ്പർ)</span>
                                                                    </label>
                                                                    <div className="text-[12px] text-[var(--sidebar-bg)]">{formData.bonnetNo}</div>
                                                                </div>
                                                                <div>
                                                                    <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                                                        Schedule Number <span className="text-[10px]">(ഷെഡ്യൂൾ നമ്പർ)</span>
                                                                    </label>
                                                                    <div className="text-[12px] text-[var(--sidebar-bg)]">{formData.scheduleNumber}</div>
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                                                        Operated Depot <span className="text-[10px]">(പ്രവർത്തിക്കുന്ന ഡിപ്പോ)</span>
                                                                    </label>
                                                                    <div className="text-[12px] text-[var(--sidebar-bg)]">{formData.operatedDepot}</div>
                                                                </div>
                                                                <div>
                                                                    <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                                                        Home Depot <span className="text-[10px]">(ഹോം ഡിപ്പോ)</span>
                                                                    </label>
                                                                    <div className="text-[12px] text-[var(--sidebar-bg)]">{formData.homeDepot}</div>
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                                                        Driver Name <span className="text-[10px]">(ഡ്രൈവറുടെ പേര്)</span>
                                                                    </label>
                                                                    <div className="text-[12px] text-[var(--sidebar-bg)]">{formData.driverName}</div>
                                                                </div>
                                                                <div>
                                                                    <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                                                        Driver Phone <span className="text-[10px]">(ഡ്രൈവറുടെ ഫോൺ നമ്പർ)</span>
                                                                    </label>
                                                                    <div className="text-[12px] text-[var(--sidebar-bg)]">{formData.driverPhone}</div>
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                                                        Conductor Name <span className="text-[10px]">(കണ്ടക്ടറുടെ പേര്)</span>
                                                                    </label>
                                                                    <div className="text-[12px] text-[var(--sidebar-bg)]">{formData.conductorName}</div>
                                                                </div>
                                                                <div>
                                                                    <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                                                        Conductor Phone <span className="text-[10px]">(കണ്ടക്ടറുടെ ഫോൺ നമ്പർ)</span>
                                                                    </label>
                                                                    <div className="text-[12px] text-[var(--sidebar-bg)]">{formData.conductorPhone}</div>
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                                                        Accident Location <span className="text-[10px]">(അപകട സ്ഥലം)</span>
                                                                    </label>
                                                                    <div className="text-[12px] text-[var(--sidebar-bg)]">{formData.accidentPlace}</div>
                                                                </div>
                                                                <div>
                                                                    <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                                                        Police Station <span className="text-[10px]">(പോലീസ് സ്റ്റേഷൻ)</span>
                                                                    </label>
                                                                    <div className="text-[12px] text-[var(--sidebar-bg)]">{formData.nearestPoliceStation}</div>
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                                <div>
                                                                    <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                                                        State <span className="text-[10px]">(സംസ്ഥാനം)</span>
                                                                    </label>
                                                                    <div className="text-[12px] text-[var(--sidebar-bg)]">{formData.accidentState}</div>
                                                                </div>
                                                                <div>
                                                                    <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                                                        District <span className="text-[10px]">(ജില്ല)</span>
                                                                    </label>
                                                                    <div className="text-[12px] text-[var(--sidebar-bg)]">{formData.accidentDistrict}</div>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <label className="text-xs font-semibold text-gray-700 mb-0 block">
                                                                    Description <span className="text-[10px]">(വിവരണം)</span>
                                                                </label>
                                                                <div className="text-[12px] text-[var(--sidebar-bg)]">{formData.description}</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Right: Images Card */}
                                                    <div className="w-[30%] bg-white border-2 border-gray-400 rounded-[8px] overflow-y-scroll max-h-[67vh]">
                                                        <h3 className="text-[16px] font-[600] pb-2 border-b-2 border-[var(--sidebar)] p-[16px]">
                                                            Uploaded Images <span className="text-[12px]">(അപ്ലോഡ് ചെയ്ത ചിത്രങ്ങൾ)</span>
                                                        </h3>

                                                        <div className="grid grid-cols-1 gap-3 p-[16px]">
                                                            {selectedReference?.photos?.map((photo: Photo, index: number) => (
                                                                <div
                                                                    key={index}
                                                                    className="cursor-pointer"
                                                                    onClick={() => setPreviewImage(photo.download_url)}
                                                                >
                                                                    <div className="bg-gray-200 border border-gray-300 rounded h-auto flex items-center justify-center">
                                                                        <img
                                                                            src={photo.download_url}
                                                                            alt="accident image"
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    </div>

                                                                </div>
                                                            ))}
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
                                                            <div className="rounded-lg overflow-hidden">
                                                                <div className="p-3 flex justify-between items-center">
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
                                                                <div className="p-4 flex justify-center">
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
                                            <div className="h-full">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-3 sm:p-4 md:p-2 mb-1.5">

                                                    {/* LEFT: Basic Details */}
                                                    <div className="bg-white border-2 border-gray-400 rounded-[8px] overflow-auto">
                                                        <h3 className="text-[16px] font-[600] pb-2 border-b-2 border-[var(--sidebar)] p-[16px]">
                                                            Basic Details <span className="text-[12px]">(അടിസ്ഥാന വിവരങ്ങൾ)</span>
                                                        </h3>
                                                        <div className="space-y-4 p-[16px]">
                                                            <div className="grid gird-cols-2 md:grid-cols-2 gap-2">
                                                                <div>
                                                                    <label className="text-[12px] text-[#374151] mb-[6px] ">
                                                                        Schedule Number (Cdit) <span className="text-[10px]">(ഷെഡ്യൂൾ നമ്പർ (സിഡിറ്റ്))</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        name="scheduleNumber"
                                                                        value={formData.scheduleNumber}
                                                                        readOnly
                                                                        className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] bg-gray-50 rounded text-xs"
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <label className="text-[12px] text-[#374151] mb-[6px]">
                                                                        Schedule Name <span className="text-[10px]">(ഷെഡ്യൂൾ പേര്)</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        name="operatedScheduleName"
                                                                        className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <label className="text-[12px] text-[#374151] mb-[6px]">
                                                                    Home Depot <span className="text-[10px]">(ഹോം ഡിപ്പോ)</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="homeDepot"
                                                                    value={formData.homeDepot}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                />
                                                            </div>

                                                            {/* Location Input + Map */}
                                                            <div>
                                                                <label className="text-[12px] text-[#374151] mb-[6px]">
                                                                    Accident Location (Lat, Long) <span className="text-[10px]">(അപകട സ്ഥലം (ലാറ്റിറ്റ്യൂഡ്, ലോംഗിറ്റ്യൂഡ്))</span>
                                                                </label>
                                                                <div className="flex gap-2">
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Latitude (ലാറ്റിറ്റ്യൂഡ്)"
                                                                        name="latitude"
                                                                        value={formData.latitude}
                                                                        onChange={handleChange}
                                                                        className="w-1/2 py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Longitude (ലോംഗിറ്റ്യൂഡ്)"
                                                                        name="longitude"
                                                                        value={formData.longitude}
                                                                        onChange={handleChange}
                                                                        className="w-1/2 py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
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
                                                                            Location not selected <span className="text-[10px]">(സ്ഥലം തിരഞ്ഞെടുത്തിട്ടില്ല)</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* RIGHT: Other Vehicle Involved */}
                                                    <div className="bg-white border-2 border-gray-400 rounded-[8px] overflow-auto">
                                                        <h3 className="text-[16px] font-[600] pb-2 border-b-2 border-[var(--sidebar)] p-[16px]">
                                                            Other Vehicle Involved <span className="text-[12px]">(മറ്റ് വാഹനം ഉൾപ്പെട്ടത്)</span>
                                                        </h3>
                                                        <div className="space-y-4 p-[16px]">
                                                            <div>
                                                                <label className="text-[12px] text-[#374151] mb-[6px]">
                                                                    Type of Other Vehicle Involved <span className="text-[10px]">(മറ്റ് വാഹനത്തിന്റെ തരം)</span>
                                                                </label>
                                                                <input
                                                                    name="typeOfOtherVehicle"
                                                                    value={formData.typeOfOtherVehicle}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="text-[12px] text-[#374151] mb-[6px]">
                                                                    Vehicle Reg. Number <span className="text-[10px]">(വാഹന രജിസ്ട്രേഷൻ നമ്പർ)</span>
                                                                </label>
                                                                <input
                                                                    name="involvedVehicleRegNumbers"
                                                                    value={formData.involvedVehicleRegNumbers}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                />
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
                                                    <div className="bg-white border-2 border-gray-400 rounded-[8px] overflow-auto">
                                                        <h3 className="text-[16px] font-[600] pb-2 border-b-2 border-[var(--sidebar)] p-[16px]">
                                                            Accident Details <span className="text-[12px]">(അപകട വിവരങ്ങൾ)</span>
                                                        </h3>
                                                        <div className="space-y-4 p-[16px]">
                                                            <div>
                                                                <label className="text-[12px] text-[#374151] mb-[6px]">
                                                                    Accident Type <span className="text-[10px]">(അപകടത്തിന്റെ തരം)</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="accidentType"
                                                                    value={formData.accidentType}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="text-[12px] text-[#374151] mb-[6px]">
                                                                    Accident Occurred <span className="text-[10px]">(അപകടം സംഭവിച്ചത്)</span>
                                                                </label>
                                                                <select
                                                                    name="accidentOccurred"
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                >
                                                                    <option value="">Select Status (സ്ഥിതി തിരഞ്ഞെടുക്കുക)</option>
                                                                    <option value="Middle of Service">Middle of Service (സേവനത്തിന്റെ മധ്യത്തിൽ)</option>
                                                                    <option value="Start of Service">Start of Service(സേവനത്തിന്റെ തുടക്കത്തിൽ)</option>
                                                                    <option value="End of Service">End of Service(സേവനത്തിൻ്റെ അവസാനം)</option>
                                                                </select>
                                                            </div>

                                                            <div>
                                                                <label className="text-[12px] text-[#374151] mb-[6px]">
                                                                    Type of Collision <span className="text-[10px]">(ഘർഷണത്തിന്റെ തരം)</span>
                                                                </label>
                                                                <select
                                                                    name="typeOfCollision"
                                                                    value={formData.typeOfCollision}
                                                                    onChange={handleCollisionChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                >
                                                                    {collisionOptions.map((opt) => (
                                                                        <option key={opt} value={opt}>{opt}</option>
                                                                    ))}
                                                                    <option value="custom">Add custom... (ഇഷ്ടാനുസൃതം ചേർക്കുക) </option>
                                                                </select>

                                                                {formData.typeOfCollision === 'custom' && (
                                                                    <input
                                                                        type="text"
                                                                        value={customCollision}
                                                                        onChange={(e) => setCustomCollision(e.target.value)}
                                                                        onBlur={handleAddCustomCollision}
                                                                        className="w-full py-[8px] px-[12px] mt-[6px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                    />
                                                                )}
                                                            </div>

                                                            <div>
                                                                <label className="text-[12px] text-[#374151] mb-[6px]">
                                                                    Primary Cause of Accident <span className="text-[10px]">(അപകടത്തിന്റെ പ്രാഥമിക കാരണം)</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="primaryCause"
                                                                    value={formData.primaryCause}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="text-[12px] text-[#374151] mb-[6px]">
                                                                    Primary Responsibility for the Accident <span className="text-[10px]">(അപകടത്തിനുള്ള പ്രാഥമിക ഉത്തരവാദിത്തം)</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="primaryResponsibility"
                                                                    value={formData.primaryResponsibility}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* RIGHT: Service Information */}
                                                    <div className="bg-white border-2 border-gray-400 rounded-[8px] overflow-auto">
                                                        <h3 className="text-[16px] font-[600] pb-2 border-b-2 border-[var(--sidebar)] p-[16px]">
                                                            Service Information <span className="text-[12px]">(സേവന വിവരങ്ങൾ)</span>
                                                        </h3>
                                                        <div className="space-y-4 p-[16px]">
                                                            <div>
                                                                <label className="text-[12px] text-[#374151] mb-[6px]">
                                                                    Road Classification <span className="text-[10px]">(റോഡ് വർഗ്ഗീകരണം)</span>
                                                                </label>
                                                                <select
                                                                    name="roadClassification"
                                                                    value={formData.roadClassification}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                >
                                                                    <option value="">Select Classification</option>
                                                                    <option value="NH_ROAD">National Highway (ദേശീയ പാത)</option>
                                                                    <option value="SH_ROAD">State Highway (സംസ്ഥാന പാത)</option>
                                                                    <option value="DR_ROAD">District Road (ജില്ലാ റോഡ്)</option>
                                                                    <option value="RR_ROAD">Rural Road (ഗ്രാമീണ റോഡ്)</option>
                                                                    <option value="BUS_STATION">Bus Station (ബസ് സ്റ്റേഷൻ)</option>
                                                                    <option value="BY_ROAD">By Road</option>
                                                                </select>
                                                            </div>

                                                            <div>
                                                                <label className="text-[12px] text-[#374151] mb-[6px]">
                                                                    Road Condition <span className="text-[10px]">(റോഡിന്റെ അവസ്ഥ)</span>
                                                                </label>
                                                                <select
                                                                    name="roadCondition"
                                                                    value={formData.roadCondition}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                >
                                                                    <option value="">Select Condition (അവസ്ഥ തിരഞ്ഞെടുക്കുക)</option>
                                                                    <option value="DOWN_HILL">Down Hill (കുന്നിൻ താഴെ)</option>
                                                                    <option value="FLAT">Flat (നിരപ്പായ)</option>
                                                                    <option value="FLOOD">Flood</option>
                                                                    <option value="U_TURN">Hairpin Down (ഹെയർപിൻP)</option>
                                                                </select>
                                                            </div>

                                                            <div>
                                                                <label className="text-[12px] text-[#374151] mb-[6px]">
                                                                    Weather Condition <span className="text-[10px]">(കാലാവസ്ഥ)</span>
                                                                </label>
                                                                <select
                                                                    name="weatherCondition"
                                                                    value={formData.weatherCondition}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                >
                                                                    <option value="">Select Condition (അവസ്ഥ തിരഞ്ഞെടുക്കുക)</option>
                                                                    <option value="SUNNY">Sunny (വെളിച്ചം)</option>
                                                                    <option value="RAINY">Rainy (മഴ)</option>
                                                                    <option value="FOGGY">Foggy (മൂടൽമഞ്ഞ്)</option>
                                                                    <option value="NIGHT">Stormy (കൊടുങ്കാറ്റ്)</option>
                                                                </select>
                                                            </div>

                                                            <div>
                                                                <label className="text-[12px] text-[#374151] mb-[6px]">
                                                                    Traffic Density <span className="text-[10px]">(ട്രാഫിക് സാന്ദ്രത)</span>
                                                                </label>
                                                                <select
                                                                    name="trafficDensity"
                                                                    value={formData.trafficDensity}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                >
                                                                    <option value="">Select Density (സാന്ദ്രത തിരഞ്ഞെടുക്കുക)</option>
                                                                    <option value="LIGHT">Low (കുറഞ്ഞ)</option>
                                                                    <option value="MODERATE">Medium (ഇടത്തരം)</option>
                                                                    <option value="HEAVY">High (കൂടുതൽ)</option>

                                                                </select>
                                                            </div>

                                                            {/* <div>
                                                                <label className="text-[12px] text-[#374151] mb-[6px]">
                                                                    Description <span className="text-[10px]">(വിവരണം)</span>
                                                                </label>
                                                                <textarea
                                                                    name="primarydescription"
                                                                    value={formData.primarydescription}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs"
                                                                    rows={5}
                                                                />
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}



                                        {/* Service Details Tab */}
                                        {activeTab === 3 && (
                                            <div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[65vh] sm:gap-6 p-3 sm:p-4 md:p-2 mb-1.5">
                                                    <div className="bg-white border-2 border-gray-400 rounded-[8px] overflow-auto">
                                                        <h3 className="text-[16px] font-[600] pb-2 border-b-2 border-[var(--sidebar)] p-[16px]">
                                                            Damage & Inspection <span className="text-[12px]">(നാശനഷ്ടവും പരിശോധനയും)</span>
                                                        </h3>
                                                        <div className="space-y-2 p-[16px]">
                                                            <div>
                                                                <label className="text-[12px] text-[#374151] mb-2 block">
                                                                    Damage to the Bus <span className="text-[10px]">(ബസ്സിനുണ്ടായ നാശനഷ്ടം)</span>
                                                                </label>

                                                                <textarea
                                                                    name="damageToBus"
                                                                    value={formData.damageToBus}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                    rows={3}
                                                                />
                                                            </div>


                                                            <div>
                                                                <label className="text-[12px] text-[#374151] mb-2 block">
                                                                    3rd Party Properties Damaged <span className="text-[10px]">(മൂന്നാം കക്ഷിയുടെ സ്വത്തുക്കൾക്കുണ്ടായ നാശനഷ്ടം)</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="thirdPartyPropertiesDamaged"
                                                                    value={formData.thirdPartyPropertiesDamaged}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="text-[12px] text-[#374151] mb-2 block">
                                                                    Inquiry Inspector Name (Ksrtc) <span className="text-[10px]">(വിചാരണ പരിശോധകരുടെ പേര് (കെ.എസ്.ആർ.ടി.സി))</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="inquiryInspectorName"
                                                                    value={formData.inquiryInspectorName}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="text-[12px] text-[#374151] mb-2 block">
                                                                    Inspector Phone No. <span className="text-[10px]">(പരിശോധകരുടെ ഫോൺ നമ്പർ)</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="inspectorPhone"
                                                                    value={formData.inspectorPhone}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="text-[12px] text-[#374151] mb-2 block">
                                                                    Jurisdiction (Depot) <span className="text-[10px]">(അധികാരപരിധി (ഡിപ്പോ))</span>
                                                                </label>
                                                                <input
                                                                    name="jurisdictionDepot"
                                                                    value={formData.jurisdictionDepot}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="text-xs text-gray-700 mb-0 block">
                                                                    Police Station <span className="text-[10px]">(പോലീസ് സ്റ്റേഷൻ)</span>
                                                                </label>
                                                                <input
                                                                    name="nearestPoliceStation"
                                                                    value={formData.nearestPoliceStation}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="bg-white border-2 border-gray-400 rounded-[8px] overflow-auto">
                                                        <h3 className="text-[16px] font-[600] pb-2 border-b-2 border-[var(--sidebar)] p-[16px]">
                                                            Injury & Fatality Details <span className="text-[12px]">(പരിക്കുകളും മരണങ്ങളും)</span>
                                                        </h3>

                                                        {formData.severity === "Insignificantiou" ? (
                                                            <div className="text-sm text-gray-500">
                                                                No injury or fatality details required for insignificant severity. <span className="text-[10px]">(ചെറിയ തീവ്രതയ്ക്ക് പരിക്ക് അല്ലെങ്കിൽ മരണ വിവരങ്ങൾ ആവശ്യമില്ല)</span>
                                                            </div>
                                                        ) : (
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-[16px]">
                                                                <div>
                                                                    <label className="text-[12px] text-[#374151] min-h-[3rem] block">
                                                                        Fatalities (KSRTC Crew) <span className="text-[10px]">(മരണങ്ങൾ (കെ.എസ്.ആർ.ടി.സി ക്രൂ))</span>
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        name="fatalitiesKsrtcCrew"
                                                                        value={formData.fatalitiesKsrtcCrew || ''}
                                                                        onChange={handleChange}
                                                                        className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs bg-white"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="text-[12px] text-[#374151] min-h-[3rem] block">
                                                                        Fatalities (Passengers) <span className="text-[10px]">(മരണങ്ങൾ (യാത്രക്കാർ))</span>
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        name="fatalitiesPassengers"
                                                                        value={formData.fatalitiesPassengers || ''}
                                                                        onChange={handleChange}
                                                                        className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs bg-white"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="text-[12px] text-[#374151] min-h-[3rem] block">
                                                                        Fatalities (3rd Party) <span className="text-[10px]">(മരണങ്ങൾ (മൂന്നാം കക്ഷി))</span>
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        name="fatalitiesThirdParty"
                                                                        value={formData.fatalitiesThirdParty || ''}
                                                                        onChange={handleChange}
                                                                        className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs bg-white"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="text-[12px] text-[#374151] min-h-[3rem] block">
                                                                        Major Injuries (KSRTC Crew) <span className='text-[10px]'>(കടുത്ത പരിക്കുകൾ (കെ.എസ്.ആർ.ടി.സി ക്രൂ))</span>
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        name="majorInjuriesKsrtcCrew"
                                                                        value={formData.majorInjuriesKsrtcCrew || ''}
                                                                        onChange={handleChange}
                                                                        className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs bg-white"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="text-[12px] text-[#374151] min-h-[3rem] block">
                                                                        Major Injuries (Passengers) <span className="text-[10px]">(കടുത്ത പരിക്കുകൾ (യാത്രക്കാർ))</span>
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        name="majorInjuriesPassengers"
                                                                        value={formData.majorInjuriesPassengers || ''}
                                                                        onChange={handleChange}
                                                                        className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs bg-white"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="text-[12px] text-[#374151] min-h-[3rem] block">
                                                                        Major Injuries (3rd Party) <span className="text-[10px]">(കടുത്ത പരിക്കുകൾ (മൂന്നാം കക്ഷി))</span>
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        name="majorInjuriesThirdParty"
                                                                        value={formData.majorInjuriesThirdParty || ''}
                                                                        onChange={handleChange}
                                                                        className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs bg-white"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="text-[12px] text-[#374151] min-h-[3rem] block">
                                                                        Minor Injuries (KSRTC Crew) <span className="text-[10px]">(ചെറിയ പരിക്കുകൾ (കെ.എസ്.ആർ.ടി.സി ക്രൂ))</span>
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        name="minorInjuriesKsrtcCrew"
                                                                        value={formData.minorInjuriesKsrtcCrew || ''}
                                                                        onChange={handleChange}
                                                                        className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs bg-white"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="text-[12px] text-[#374151] min-h-[3rem] block">
                                                                        Minor Injuries (Passengers) <span className="text-[10px]">(ചെറിയ പരിക്കുകൾ (യാത്രക്കാർ))</span>
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        name="minorInjuriesPassengers"
                                                                        value={formData.minorInjuriesPassengers || ''}
                                                                        onChange={handleChange}
                                                                        className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs bg-white"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="text-[12px] text-[#374151] min-h-[3rem] block">
                                                                        Minor Injuries (3rd Party) <span className="text-[10px]">(ചെറിയ പരിക്കുകൾ (മൂന്നാം കക്ഷി))</span>
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        name="minorInjuriesThirdParty"
                                                                        value={formData.minorInjuriesThirdParty || ''}
                                                                        onChange={handleChange}
                                                                        className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs bg-white"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="text-[12px] text-[#374151] min-h-[3rem] block">
                                                                        Total Fatalities <span className="text-[10px]">(ആകെ മരണങ്ങൾ)</span>
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        name="totalFatalities"
                                                                        value={formData.totalFatalities}
                                                                        readOnly
                                                                        className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs bg-white"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="text-[12px] text-[#374151] min-h-[3rem] block">
                                                                        Total Major Injuries <span className="text-[10px]">(ആകെ കടുത്ത പരിക്കുകൾ)</span>
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        name="totalMajorInjuries"
                                                                        value={formData.totalMajorInjuries}
                                                                        onChange={handleChange}
                                                                        className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs bg-white"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="text-[12px] text-[#374151] min-h-[3rem] block">
                                                                        Total Minor Injuries <span className="text-[10px]">(ആകെ ചെറിയ പരിക്കുകൾ)</span>
                                                                    </label>
                                                                    <input
                                                                        type="number"
                                                                        name="totalMinorInjuries"
                                                                        value={formData.totalMinorInjuries}
                                                                        onChange={handleChange}
                                                                        className="w-full py-[8px] px-[12px] border border-[#d1d5db] rounded text-xs bg-white"
                                                                    />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}


                                        {/* Recovery Phase Tab */}
                                        {activeTab === 4 && (
                                            <div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-3 sm:p-4 md:p-2 mb-1.5">
                                                    {/* LEFT: Recovery Details */}
                                                    <div className="bg-white border-2 border-gray-400 rounded-[8px] overflow-auto">
                                                        <h3 className="text-[16px] font-[600] pb-2 border-b-2 border-[var(--sidebar)] p-[16px]">
                                                            Recovery Details <span className="text-[12px]">(പുനരുപയോഗ വിവരങ്ങൾ)</span>
                                                        </h3>
                                                        <div className="space-y-5 p-[16px]">
                                                            {/* Docked/Service After Accident */}
                                                            <div className="mb-3">
                                                                <label className="text-[12px] text-[#374151] mb-[6px] block">
                                                                    Docked/Service after Accident <span className="text-[10px]">(ഡോക്ക് ചെയ്തത്/അപകടത്തിന് ശേഷം സേവനം)</span>
                                                                </label>
                                                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 gap-y-2 mt-2">
                                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                                        <input
                                                                            type="radio"
                                                                            name="dockedOrServiceAfter"
                                                                            value="Docked"
                                                                            onChange={handleChange}
                                                                            className="w-[14px] h-[14px] mb-2"
                                                                            checked={formData.dockedOrServiceAfter === "Docked"}
                                                                        />
                                                                        <span className="text-xs font-medium">Docked <span className="text-[10px]">(ഡോക്ക് ചെയ്തത്)</span></span>
                                                                    </label>
                                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                                        <input
                                                                            type="radio"
                                                                            name="dockedOrServiceAfter"
                                                                            value="Service"
                                                                            onChange={handleChange}
                                                                            className="w-[14px] h-[14px] mb-2"
                                                                            checked={formData.dockedOrServiceAfter === "Service"}
                                                                        />
                                                                        <span className="text-xs font-medium">
                                                                            Service after Accident <span className="text-[10px]">(അപകടത്തിന് ശേഷം സേവനം)</span>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>


                                                            {/* Taken For Repair Work */}
                                                            <div className="mb-3">
                                                                <label className="text-[12px] text-[#374151] mb-[6px] block">
                                                                    Taken for Repair Work <span className="text-[10px]">(റിപ്പയർ ജോലിക്കായി എടുത്തത്)</span>
                                                                </label>
                                                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 gap-y-2 mt-2">
                                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                                        <input
                                                                            type="radio"
                                                                            name="takenForRepair"
                                                                            value="true"
                                                                            onChange={handleChange}
                                                                            className="w-[14px] h-[14px] mb-2"
                                                                            checked={formData.takenForRepair === true}
                                                                        />
                                                                        <span className="text-xs font-medium">Yes <span className="text-[10px]">(അതെ)</span></span>
                                                                    </label>
                                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                                        <input
                                                                            type="radio"
                                                                            name="takenForRepair"
                                                                            value="false"
                                                                            onChange={handleChange}
                                                                            className="w-[14px] h-[14px] mb-2"
                                                                            checked={formData.takenForRepair === false}
                                                                        />
                                                                        <span className="text-xs font-medium">No <span className="text-[10px]">(ഇല്ല)</span></span>
                                                                    </label>
                                                                </div>
                                                            </div>


                                                            {/* GD Entered */}
                                                            <div className="mb-3">
                                                                <label className="text-[12px] text-[#374151] mb-[6px] block">
                                                                    GD entered in Police Station <span className="text-[10px]">(പോലീസ് സ്റ്റേഷനിൽ ജി.ഡി. എൻറർ ചെയ്തത്)</span>
                                                                </label>
                                                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 gap-y-2 mt-2">
                                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                                        <input
                                                                            type="radio"
                                                                            name="gdEntered"
                                                                            value="Entered"
                                                                            onChange={handleChange}
                                                                            className="w-[14px] h-[14px] mb-2"
                                                                            checked={formData.gdEntered === "Entered"}
                                                                        />
                                                                        <span className="text-xs font-medium">Yes <span className="text-[10px]">(അതെ)</span></span>
                                                                    </label>
                                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                                        <input
                                                                            type="radio"
                                                                            name="gdEntered"
                                                                            value="Not Entered"
                                                                            onChange={handleChange}
                                                                            className="w-[14px] h-[14px] mb-2"
                                                                            checked={formData.gdEntered === "Not Entered"}
                                                                        />
                                                                        <span className="text-xs font-medium">No <span className="text-[10px]">(ഇല്ല)</span></span>
                                                                    </label>
                                                                </div>
                                                            </div>

                                                            <div className="mb-3">
                                                                <label className="text-[12px] text-[#374151] mb-[6px] block">
                                                                    Case Settled or Not <span className="text-[10px]">(കേസ് തീർന്നതാണോ?)</span>
                                                                </label>
                                                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 gap-y-2 mt-2">
                                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                                        <input
                                                                            type="radio"
                                                                            name="caseSettled"
                                                                            value="true"
                                                                            onChange={handleChange}
                                                                            className="w-[14px] h-[14px]"
                                                                            checked={formData.caseSettled === true}
                                                                        />
                                                                        <span className="text-xs font-medium">Yes <span className="text-[10px]">(തീർന്നു)</span></span>
                                                                    </label>
                                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                                        <input
                                                                            type="radio"
                                                                            name="caseSettled"
                                                                            value="false"
                                                                            onChange={handleChange}
                                                                            className="w-[14px] h-[14px]"
                                                                            checked={formData.caseSettled === false}
                                                                        />
                                                                        <span className="text-xs font-medium">No <span className="text-[10px]">(ഇനിയും തീരാനുണ്ട്)</span></span>
                                                                    </label>
                                                                </div>
                                                            </div>

                                                            {/* FIR Registered */}

                                                        </div>
                                                    </div>

                                                    {/* RIGHT: Cost & Settlement */}
                                                    <div className="bg-white border-2 border-gray-400 rounded-[8px] overflow-auto">
                                                        <h3 className="text-[16px] font-[600] pb-2 border-b-2 border-[var(--sidebar)] p-[16px]">
                                                            Cost & Settlement <span className="text-[12px]">(ചെലവും തീർപ്പും)</span>
                                                        </h3>
                                                        <div className="space-y-4 p-[16px]">
                                                            <div>
                                                                <label className="text-[12px] text-[#374151] mb-[6px]">
                                                                    Cost of Damage Assessed Amount (₹) <span className="text-[10px]">(നാശനഷ്ടത്തിനുള്ള മൂല്യനിർണ്ണയം)</span>
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    name="costOfDamage"
                                                                    value={formData.costOfDamage}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="text-[12px] text-[#374151] mb-[6px]">
                                                                    Amount Settled with KSRTC Driver (₹) <span className="text-[10px]">(കെ.എസ്.ആർ.ടി.സി ഡ്രൈവറുമായി തീർപ്പാക്കിയ തുക)</span>
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    name="amountSettledWithDriver"
                                                                    value={formData.amountSettledWithDriver}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="text-[12px] text-[#374151] ">
                                                                    Severity  <span className="text-[10px]">(നാശനഷ്ടത്തിനുള്ള മൂല്യനിർണ്ണയം)</span>
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    name="severity"
                                                                    value={formData.severity}
                                                                    readOnly

                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] bg-gray-100 rounded text-xs bg-white"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="text-[12px] text-[#374151] mb-[6px]">
                                                                    COD Settled with Other Vehicle (₹) <span className="text-[10px]">(മറ്റ് വാഹനവുമായി തീർപ്പാക്കിയ സി.ഒ.ഡി.)</span>
                                                                </label>
                                                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 gap-y-2 mt-2">
                                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                                        <input
                                                                            type="radio"
                                                                            name="codSettledWithOtherVehicle"
                                                                            value="true"
                                                                            onChange={handleChange}
                                                                            className="w-[14px] h-[14px] mb-2"
                                                                            checked={formData.codSettledWithOtherVehicle === true}
                                                                        />
                                                                        <span className="text-xs font-medium">Yes <span className="text-[10px]">(അതെ)</span></span>
                                                                    </label>
                                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                                        <input
                                                                            type="radio"
                                                                            name="codSettledWithOtherVehicle"
                                                                            value="false"
                                                                            onChange={handleChange}
                                                                            className="w-[14px] h-[14px] mb-2"
                                                                            checked={formData.codSettledWithOtherVehicle === false}
                                                                        />
                                                                        <span className="text-xs font-medium">No <span className="text-[10px]">(ഇല്ല)</span></span>
                                                                    </label>
                                                                </div>
                                                            </div>

                                                            {/* COD Recovered */}
                                                            <div className="mb-3">
                                                                <label className="text-[12px] text-[#374151] mb-[6px] block">
                                                                    COD Recovered <span className="text-[10px]">(സി.ഒ.ഡി. വീണ്ടെടുത്തത്)</span>
                                                                </label>
                                                                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-5 gap-y-2 mt-2">
                                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                                        <input
                                                                            type="radio"
                                                                            name="codRecovered"
                                                                            value="true"
                                                                            onChange={handleChange}
                                                                            className="w-[14px] h-[14px]"
                                                                            checked={formData.codRecovered === true}
                                                                        />
                                                                        <span className="text-xs font-medium">Yes <span className="text-[10px]">(അതെ)</span></span>
                                                                    </label>
                                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                                        <input
                                                                            type="radio"
                                                                            name="codRecovered"
                                                                            value="false"
                                                                            onChange={handleChange}
                                                                            className="w-[14px] h-[14px]"
                                                                            checked={formData.codRecovered === false}
                                                                        />
                                                                        <span className="text-xs font-medium">No <span className="text-[10px]">(ഇല്ല)</span></span>
                                                                    </label>
                                                                </div>
                                                            </div>


                                                            {/* Case Settled */}


                                                            <div>
                                                                <label className="text-[12px] text-[#374151] mb-[6px]">
                                                                    Remarks <span className="text-[10px]">(അഭിപ്രായങ്ങൾ)</span>
                                                                </label>
                                                                <textarea
                                                                    name="remarks"
                                                                    value={formData.remarks}
                                                                    onChange={handleChange}
                                                                    className="w-full py-[8px] px-[12px] border-1 border-[#d1d5db] rounded text-xs bg-white"
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
                                                    formData.severity === "Insignificantui" && activeTab === 2 ? null : (
                                                        <button
                                                            type="button"
                                                            onClick={() => setActiveTab(activeTab + 1)}
                                                            className="bg-sidebar font-[500] text-white px-5 py-1 rounded disabled:bg-gray-400"
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
                                                    className="px-5 py-1 font-[500] text-sm border ] text-white bg-[var(--themeRed)] rounded flex items-center"
                                                >
                                                    Cancel
                                                </button>

                                                {activeTab > 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setActiveTab(activeTab + 1)}
                                                        className="px-5 py-1 font-[500] bg-white text-sm border rounded flex items-center"
                                                    >
                                                        Save Draft
                                                    </button>
                                                )}

                                                {/* Submit if severity is insignificant and on tab 2 */}
                                                {activeTab === 2 && formData.severity === "Insignificantuio" && (
                                                    <button
                                                        type="submit"
                                                        className="bg-sidebar font-[500] text-white px-5 py-1 rounded-xs disabled:bg-gray-400"
                                                    >
                                                        Submit Report
                                                    </button>
                                                )}

                                                {/* Submit on last tab if severity is not insignificant */}
                                                {activeTab === tabLabels.length - 1 && (
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
                                <AccidentReportForm />
                            )}
                        </div>

                    </div>
                </div>
            )}
            {isReferenceModalSearchOpen && (
                <ReferenceNumberSearchModal
                    caseSelectHandler={handleSearchSelect}
                />
            )}
            {isVehicleSearchOpen && (
                <CombinedAccidentComponent
                    caseSelectHandler={handleVehicleSelect}
                />
            )}
        </div >
    );
};

export default PrimaryAccidentReport;