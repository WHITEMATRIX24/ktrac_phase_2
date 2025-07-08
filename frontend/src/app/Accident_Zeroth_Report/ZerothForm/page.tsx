"use client";

import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  DragEvent,
  FormEvent,
} from "react";
import { AlertTriangle, LogOut, Camera, X, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type MediaFile = {
  id: string;
  url: string;
  type: "image" | "video";
  file: File;
};

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

type UserData = {
  pen_no: string;
  user_first_name: string;
  user_last_name: string;
  user_phone: string;
  designation: string;
};

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

interface PoliceStation {
  id: number;
  name: string;
  district: string;
  contact: string;
}

interface Depot {
  id: number;
  name: string;
  district: string;
  contact: string;
}

const ZerothReport = () => {
  const router = useRouter();
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [locationPermission, setLocationPermission] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedConductor, setSelectedConductor] = useState<Conductor | null>(
    null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [accidentId, setAccidentId] = useState<string | null>(null);
  const [isSubmittingDocumentation, setIsSubmittingDocumentation] =
    useState(false);
  const [accidentRefernceId, setAccidentRefernceId] = useState<string | null>(
    null
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [driverCategory, setDriverCategory] = useState<string>("");
  const [allDrivers, setAllDrivers] = useState<UserData[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<UserData[]>([]);
  const [showDriverDropdown, setShowDriverDropdown] = useState(false);
  const driverRef = useRef<HTMLDivElement>(null);
  const [allConductors, setAllConductors] = useState<UserData[]>([]);
  const [filteredConductors, setFilteredConductors] = useState<UserData[]>([]);
  const [showConductorDropdown, setShowConductorDropdown] = useState(false);
  const conductorRef = useRef<HTMLDivElement>(null);
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [driverSearchText, setDriverSearchText] = useState("");
  const [conductorSearchText, setConductorSearchText] = useState("");
  const policeStations: PoliceStation[] = [
    {
      id: 1,
      name: "Cantonment PS",
      district: "Thiruvananthapuram",
      contact: "0471‑2330248",
    },
    {
      id: 2,
      name: "Museum PS",
      district: "Thiruvananthapuram",
      contact: "0471‑2315096",
    },
    {
      id: 3,
      name: "Kollam East PS",
      district: "Kollam",
      contact: "0474‑2760000",
    },
    {
      id: 4,
      name: "Neendakara Coastal PS",
      district: "Kollam",
      contact: "0474‑2763333",
    },
    {
      id: 5,
      name: "Alappuzha North PS",
      district: "Alappuzha",
      contact: "0477‑2230804",
    },
    {
      id: 6,
      name: "Alappuzha Vallikunnam PS",
      district: "Alappuzha",
      contact: "0479‑2335240",
    },
    {
      id: 7,
      name: "Kozhikode Feroke PS",
      district: "Kozhikode",
      contact: "0495‑2482230",
    },
    {
      id: 8,
      name: "Malappuram PS",
      district: "Malappuram",
      contact: "0483‑2730000",
    },
    {
      id: 9,
      name: "Palakkad North PS",
      district: "Palakkad",
      contact: "0491‑2862264",
    },
    {
      id: 10,
      name: "Thrissur Town East PS",
      district: "Thrissur",
      contact: "0487‑2424192",
    },
    {
      id: 11,
      name: "Thrissur Town West PS",
      district: "Thrissur",
      contact: "0487‑2363608",
    },
    {
      id: 12,
      name: "Pathanamthitta PS",
      district: "Pathanamthitta",
      contact: "0468‑2222266",
    },
    {
      id: 13,
      name: "Kottayam East PS",
      district: "Kottayam",
      contact: "0481‑2560333",
    },
    { id: 14, name: "Idukki PS", district: "Idukki", contact: "04862‑232300" },
    {
      id: 15,
      name: "Ernakulam North PS",
      district: "Ernakulam",
      contact: "0484‑2352100",
    },
    {
      id: 16,
      name: "Kannur Town PS",
      district: "Kannur",
      contact: "0497‑2722100",
    },
    {
      id: 17,
      name: "Wayanad Kalpetta PS",
      district: "Wayanad",
      contact: "04936‑282433",
    },
    {
      id: 18,
      name: "Kasargod PS",
      district: "Kasargod",
      contact: "04994‑235100",
    },
  ];

  const depots: Depot[] = [
    {
      id: 1,
      name: "ANAYARA",
      district: "Thiruvananthapuram",
      contact: "0471-2749400",
    },
    {
      id: 2,
      name: "ARYANAD",
      district: "Thiruvananthapuram",
      contact: "0472-2853900",
    },
    {
      id: 3,
      name: "ATTINGAL",
      district: "Thiruvananthapuram",
      contact: "0470-2622202",
    },
    {
      id: 4,
      name: "EENCHAKKAL",
      district: "Thiruvananthapuram",
      contact: "0471-2501180",
    },
    {
      id: 5,
      name: "KANIYAPURAM",
      district: "Thiruvananthapuram",
      contact: "0471-2752533",
    },
    {
      id: 6,
      name: "KATTAKADA",
      district: "Thiruvananthapuram",
      contact: "0471-2290381",
    },
    {
      id: 7,
      name: "KILIMANOOR",
      district: "Thiruvananthapuram",
      contact: "0470-2672217",
    },
    {
      id: 8,
      name: "NEDUMANGAD",
      district: "Thiruvananthapuram",
      contact: "0472-2812235",
    },
    {
      id: 9,
      name: "NEYYATINKARA",
      district: "Thiruvananthapuram",
      contact: "0471-2222243",
    },
    {
      id: 10,
      name: "PALODE",
      district: "Thiruvananthapuram",
      contact: "0472-2840259",
    },
    {
      id: 11,
      name: "PAPPANAMCODE",
      district: "Thiruvananthapuram",
      contact: "0471-2494002",
    },
    {
      id: 12,
      name: "PARASSALA",
      district: "Thiruvananthapuram",
      contact: "0471-2202058",
    },
    {
      id: 13,
      name: "PEROORKADA",
      district: "Thiruvananthapuram",
      contact: "0471-2433683",
    },
    {
      id: 14,
      name: "POOVAR",
      district: "Thiruvananthapuram",
      contact: "0471-2210047",
    },
    {
      id: 15,
      name: "TVM CENTRAL",
      district: "Thiruvananthapuram",
      contact: "0471-2323886",
    },
    {
      id: 16,
      name: "TVM CITY",
      district: "Thiruvananthapuram",
      contact: "0471-2463029",
    },
    {
      id: 17,
      name: "VELLANAD",
      district: "Thiruvananthapuram",
      contact: "0472-2884686",
    },
    {
      id: 18,
      name: "VELLARADA",
      district: "Thiruvananthapuram",
      contact: "0471-2242029",
    },
    {
      id: 19,
      name: "VENJARAMOODU",
      district: "Thiruvananthapuram",
      contact: "0472-2874141",
    },
    {
      id: 20,
      name: "VIKASBHAVAN",
      district: "Thiruvananthapuram",
      contact: "0471-2307890",
    },
    {
      id: 21,
      name: "VITHURA",
      district: "Thiruvananthapuram",
      contact: "0472-2858686",
    },
    {
      id: 22,
      name: "VIZHINJAM",
      district: "Thiruvananthapuram",
      contact: "0471-2481365",
    },
    { id: 23, name: "ARYANKAVU", district: "Kollam", contact: "0475-2211300" },
    {
      id: 24,
      name: "CHADAYAMANGALAM",
      district: "Kollam",
      contact: "0474-2476200",
    },
    { id: 25, name: "CHATHANNUR", district: "Kollam", contact: "0474-2592900" },
    {
      id: 26,
      name: "KARUNAGAPALLY",
      district: "Kollam",
      contact: "0476-2620466",
    },
    { id: 27, name: "KOLLAM", district: "Kollam", contact: "0474-2752008" },
    {
      id: 28,
      name: "KOTTARAKKARA",
      district: "Kollam",
      contact: "0474-2452622",
    },
    {
      id: 29,
      name: "KULATHUPUZHA",
      district: "Kollam",
      contact: "0475-2318777",
    },
    {
      id: 30,
      name: "PATHANAPURAM",
      district: "Kollam",
      contact: "0475-2354010",
    },
    { id: 31, name: "PUNALUR", district: "Kollam", contact: "0475-2222626" },
    {
      id: 32,
      name: "ADOOR",
      district: "Pathanamthitta",
      contact: "0473-4224764",
    },
    {
      id: 33,
      name: "KONNI",
      district: "Pathanamthitta",
      contact: "0468-2244555",
    },
    {
      id: 34,
      name: "MALLAPALLY",
      district: "Pathanamthitta",
      contact: "0469-2785080",
    },
    {
      id: 35,
      name: "PAMBA",
      district: "Pathanamthitta",
      contact: "0473-5203445",
    },
    {
      id: 36,
      name: "PANDALAM",
      district: "Pathanamthitta",
      contact: "0473-4255800",
    },
    {
      id: 37,
      name: "PATHANAMTHITTA",
      district: "Pathanamthitta",
      contact: "0468-2222366",
    },
    {
      id: 38,
      name: "RANNI",
      district: "Pathanamthitta",
      contact: "04735-225253",
    },
    {
      id: 39,
      name: "THIRUVALLA",
      district: "Pathanamthitta",
      contact: "0469-2602945",
    },
    {
      id: 40,
      name: "ALAPPUZHA",
      district: "Alappuzha",
      contact: "0477-2252501",
    },
    {
      id: 41,
      name: "CHENGANOOR",
      district: "Alappuzha",
      contact: "0479-2452352",
    },
    {
      id: 42,
      name: "CHERTHALA",
      district: "Alappuzha",
      contact: "0478-2812582",
    },
    {
      id: 43,
      name: "EDATHUVA",
      district: "Alappuzha",
      contact: "0477-2215400",
    },
    {
      id: 44,
      name: "HARIPPAD",
      district: "Alappuzha",
      contact: "0479-2412620",
    },
    {
      id: 45,
      name: "KAYAMKULAM",
      district: "Alappuzha",
      contact: "0479-2442022",
    },
    {
      id: 46,
      name: "MAVELIKARA",
      district: "Alappuzha",
      contact: "0479-2302282",
    },
    { id: 47, name: "ALUVA", district: "Ernakulam", contact: "0484-2624242" },
    {
      id: 48,
      name: "ANKAMALI",
      district: "Ernakulam",
      contact: "0484-2453050",
    },
    {
      id: 49,
      name: "ERNAKULAM",
      district: "Ernakulam",
      contact: "0484-2372033",
    },
    {
      id: 50,
      name: "KOOTHATTUKULAM",
      district: "Ernakulam",
      contact: "0485-2253444",
    },
    {
      id: 51,
      name: "KOTHAMANGALAM",
      district: "Ernakulam",
      contact: "0485-2862202",
    },
    {
      id: 52,
      name: "MOOVATTUPUZHA",
      district: "Ernakulam",
      contact: "0485-2832321",
    },
    {
      id: 53,
      name: "NORTH PARAVUR",
      district: "Ernakulam",
      contact: "0484-2442373",
    },
    {
      id: 54,
      name: "PERUMBAVOOR",
      district: "Ernakulam",
      contact: "0484-2523416",
    },
    { id: 55, name: "PIRAVOM", district: "Ernakulam", contact: "0485-2265533" },
    {
      id: 56,
      name: "CHANGANASSERY",
      district: "Kottayam",
      contact: "0481-2420245",
    },
    {
      id: 57,
      name: "EERATTUPETTAH",
      district: "Kottayam",
      contact: "0482-2272230",
    },
    { id: 58, name: "ERUMELY", district: "Kottayam", contact: "0482-8212345" },
    { id: 59, name: "KOTTAYAM", district: "Kottayam", contact: "0481-2562908" },
    { id: 60, name: "PALA", district: "Kottayam", contact: "0482-2212250" },
    {
      id: 61,
      name: "PONKUNNAM",
      district: "Kottayam",
      contact: "0482-8221333",
    },
    { id: 62, name: "VAIKOM", district: "Kottayam", contact: "0482-9231210" },
    {
      id: 63,
      name: "CHALAKUDY",
      district: "Thrissur",
      contact: "0480-2701638",
    },
    {
      id: 64,
      name: "GURUVAYOOR",
      district: "Thrissur",
      contact: "0487-2556450",
    },
    {
      id: 65,
      name: "IRINJALAKKUDA",
      district: "Thrissur",
      contact: "0480-2823990",
    },
    {
      id: 66,
      name: "KODUNGALOOR",
      district: "Thrissur",
      contact: "0480-2803155",
    },
    { id: 67, name: "MALA", district: "Thrissur", contact: "0480-2890438" },
    {
      id: 68,
      name: "PUTHUKKADU",
      district: "Thrissur",
      contact: "0480-2751648",
    },
    { id: 69, name: "THRISSUR", district: "Thrissur", contact: "0487-2421150" },
    { id: 70, name: "KATTAPPANA", district: "Idukki", contact: "0486-8252333" },
    { id: 71, name: "KUMALY", district: "Idukki", contact: "0486-9224242" },
    {
      id: 72,
      name: "MOOLAMATTOM",
      district: "Idukki",
      contact: "0486-2252045",
    },
    { id: 73, name: "MUNNAR", district: "Idukki", contact: "0486-5230201" },
    {
      id: 74,
      name: "NEDUMKANDAM",
      district: "Idukki",
      contact: "04868-234533",
    },
    { id: 75, name: "THODUPUZHA", district: "Idukki", contact: "0486-2222388" },
    { id: 76, name: "CHITOOR", district: "Palakkad", contact: "0492-3227488" },
    {
      id: 77,
      name: "MANNARGHAT",
      district: "Palakkad",
      contact: "0491-2520098",
    },
    { id: 78, name: "PALAKKAD", district: "Palakkad", contact: "0491-2520098" },
    {
      id: 79,
      name: "VADAKKANCHERY",
      district: "Palakkad",
      contact: "0492-2255001",
    },
    {
      id: 80,
      name: "MALAPPURAM",
      district: "Malappuram",
      contact: "0483-2734950",
    },
    {
      id: 81,
      name: "NILAMBUR",
      district: "Malappuram",
      contact: "04931-223929",
    },
    {
      id: 82,
      name: "PERINTHAMANNA",
      district: "Malappuram",
      contact: "0494-2666396",
    },
    {
      id: 83,
      name: "PONNANI",
      district: "Malappuram",
      contact: "0494-2666396",
    },
    { id: 84, name: "KALPETTA", district: "Wayanad", contact: "0493-6202611" },
    {
      id: 85,
      name: "MANANTHAVADY",
      district: "Wayanad",
      contact: "0493-5240640",
    },
    {
      id: 86,
      name: "SULTHAN BATHERY",
      district: "Wayanad",
      contact: "0493-6220217",
    },
    { id: 87, name: "KANHANGAD", district: "Kannur", contact: "0467-2200055" },
    { id: 88, name: "KANNUR", district: "Kannur", contact: "0497-2707777" },
    { id: 89, name: "PAYYANUR", district: "Kannur", contact: "0498-5203062" },
    { id: 90, name: "THALASSERY", district: "Kannur", contact: "0490-2343333" },
    {
      id: 91,
      name: "KOZHIKODE",
      district: "Kozhikode",
      contact: "0495-2723796",
    },
    {
      id: 92,
      name: "THAMARASSERY",
      district: "Kozhikode",
      contact: "0495-2222217",
    },
    {
      id: 93,
      name: "THIRUVAMBADY",
      district: "Kozhikode",
      contact: "0495-2254500",
    },
    {
      id: 94,
      name: "THOTTILPALAM",
      district: "Kozhikode",
      contact: "0496-2566200",
    },
    {
      id: 95,
      name: "VADAKARA",
      district: "Kozhikode",
      contact: "0496-2523377",
    },
    {
      id: 96,
      name: "KASARAGOD",
      district: "Kasaragod",
      contact: "0499-4230677",
    },
    {
      id: 97,
      name: "BANGALORE",
      district: "Bangalore",
      contact: "0802-6756666",
    },
  ];

  const [filteredPoliceStations, setFilteredPoliceStations] = useState<
    PoliceStation[]
  >([]);
  const [filteredDepots, setFilteredDepots] = useState<Depot[]>([]);

  const [locationData, setLocationData] = useState({
    address: "",
    place: "",
    district: "",
    state: "",
    latitude: "",
    longitude: "",
    policeStation: "",
    policeStationContact: "",
  });

  const [formData, setFormData] = useState({
    bonnetNumber: "",
    timeOfAccident: "",
    dateOfAccident: new Date().toISOString().split("T")[0],
    homeDepot: "",
    operatedDepot: "",
    scheduleNumber: "",
    scheduleName: "",
    description: "",
    driverPenNo: "",
    driverName: "",
    driverPhone: "",
    conductorPenNo: "",
    conductorName: "",
    conductorPhone: "",
    nearestDepoName: "",
    depotContact: "",
    timeZone: "",
  });

  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);

  const tabLabels = [
    { label: "Location Details" },
    { label: "Accident & Crew" },
    { label: "Documentation" },
  ];

  useEffect(() => {
    const data = sessionStorage.getItem("accidentData");
    if (data) {
      const { bonnetNumber, operatedDepot, referenceNumber } = JSON.parse(data);
      setFormData((prev) => ({
        ...prev,
        bonnetNumber,
        operatedDepot,
      }));
      setAccidentRefernceId(referenceNumber);
    }
  }, []);

  useEffect(() => {
    if (locationData.district) {
      const filteredStations = policeStations.filter(
        (station) => station.district === locationData.district
      );
      setFilteredPoliceStations(filteredStations);

      const filteredDepotsList = depots.filter(
        (depot) => depot.district === locationData.district
      );
      setFilteredDepots(filteredDepotsList);
    }
  }, [locationData.district]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/getAllUserInfo");
        if (!response.ok)
          throw new Error(`Failed to fetch: ${response.status}`);
        const result = await response.json();
        const allUsers = result.body || result;

        const drivers = allUsers.filter((user: UserData) =>
          user.designation.toLowerCase().includes("driver")
        );

        const conductors = allUsers.filter(
          (user: UserData) => !user.designation.toLowerCase().includes("driver")
        );

        setAllDrivers(drivers);
        setFilteredDrivers(drivers);
        setAllConductors(conductors);
        setFilteredConductors(conductors);
      } catch (error) {
        console.error("User fetch error:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        driverRef.current &&
        !driverRef.current.contains(event.target as Node)
      ) {
        setShowDriverDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterDrivers = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredDrivers(allDrivers);
      return;
    }
    const term = searchTerm.toLowerCase();
    const filtered = allDrivers.filter((driver) =>
      `${driver.user_first_name} ${driver.user_last_name}`
        .toLowerCase()
        .includes(term)
    );
    setFilteredDrivers(filtered);
  };

  const handleSelectDriver = (driver: UserData) => {
    setFormData((prev) => ({
      ...prev,
      driverPenNo: driver.pen_no,
      driverName: `${driver.user_first_name} ${driver.user_last_name}`,
      driverPhone: driver.user_phone || "",
    }));
    setDriverSearchText(`${driver.user_first_name} ${driver.user_last_name}`);
    setSelectedDriver({
      id: 0,
      gNumber: driver.pen_no,
      name: `${driver.user_first_name} ${driver.user_last_name}`,
      phone: driver.user_phone || "",
    });
    setShowDriverDropdown(false);
  };

  const filterConductors = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredConductors(allConductors);
      return;
    }
    const term = searchTerm.toLowerCase();
    const filtered = allConductors.filter(
      (conductor) =>
        conductor.pen_no?.toLowerCase().includes(term) ||
        conductor.user_first_name?.toLowerCase().includes(term) ||
        conductor.user_last_name?.toLowerCase().includes(term)
    );
    setFilteredConductors(filtered);
  };

  const handleSelectConductor = (conductor: UserData) => {
    setFormData((prev) => ({
      ...prev,
      conductorPenNo: conductor.pen_no,
      conductorName: `${conductor.user_first_name} ${conductor.user_last_name}`,
      conductorPhone: conductor.user_phone || "",
    }));
    setConductorSearchText(conductor.pen_no);
    setShowConductorDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        conductorRef.current &&
        !conductorRef.current.contains(event.target as Node)
      ) {
        setShowConductorDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchLocationSuggestions = async (query: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&addressdetails=1&limit=5`
      );
      const data = await response.json();
      setLocationSuggestions(data);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const handleLocationSelect = (suggestion: any) => {
    const address = suggestion.address;
    const district =
      address.county || address.district || address.state_district || "";

    setLocationData((prev) => ({
      ...prev,
      address: suggestion.display_name,
      place: address.village || address.town || address.city || "",
      district: district,
      state: address.state || "",
      latitude: suggestion.lat,
      longitude: suggestion.lon,
    }));

    setLocationQuery(suggestion.display_name);
    setShowLocationSuggestions(false);
  };

  const calculateTimeSlot = (time: string) => {
    if (!time) return "";
    const [hoursStr, minutesStr] = time.split(":");
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10) / 60;
    const totalHours = hours + minutes;

    if (totalHours >= 4 && totalHours < 8) return "04:00-08:00";
    if (totalHours >= 8 && totalHours < 11) return "08:00-11:00";
    if (totalHours >= 11 && totalHours < 15) return "11:00-15:00";
    if (totalHours >= 15 && totalHours < 18) return "15:00-18:00";
    if (totalHours >= 18 && totalHours < 22) return "18:00-22:00";
    if (totalHours >= 22 || totalHours < 4) return "22:00-04:00";
    return "";
  };

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
            const address = data.address || {};
            const district =
              address.county ||
              address.district ||
              address.state_district ||
              "";

            setLocationData({
              address: data.display_name || "",
              place: address.village || address.town || address.city || "",
              district: district,
              state: address.state || "",
              latitude: lat,
              longitude: lon,
              policeStation: "",
              policeStationContact: "",
            });

            setLocationQuery(data.display_name || "");
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

  useEffect(() => {
    if (locationQuery.length > 2) {
      const handler = setTimeout(() => {
        fetchLocationSuggestions(locationQuery);
      }, 300);
      return () => clearTimeout(handler);
    } else {
      setLocationSuggestions([]);
    }
  }, [locationQuery]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "timeOfAccident") {
      const slot = calculateTimeSlot(value);
      setTimeSlot(slot);
      setFormData((prev) => ({ ...prev, timeZone: slot }));
    }
  };

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocationData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePoliceStationSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const stationId = parseInt(e.target.value);
    const station = policeStations.find((s) => s.id === stationId);

    if (station) {
      setLocationData((prev) => ({
        ...prev,
        policeStation: station.id.toString(),
        policeStationName: station.name,
        policeStationContact: station.contact,
      }));
    } else {
      setLocationData((prev) => ({
        ...prev,
        policeStation: "",
        policeStationName: "",
        policeStationContact: "",
      }));
    }
  };

  const handleDepotSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const depotId = parseInt(e.target.value);
    const depot = depots.find((d) => d.id === depotId);

    if (depot) {
      setFormData((prev) => ({
        ...prev,
        nearestDepoName: depot.name,
        depotContact: depot.contact,
      }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles: MediaFile[] = Array.from(e.target.files).map((file) => ({
      id: `${file.name}-${Date.now()}`,
      file,
      type: file.type.startsWith("video") ? "video" : "image",
      url: URL.createObjectURL(file),
    }));
    setMediaFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (id: string) => {
    setMediaFiles((prev) => prev.filter((file) => file.id !== id));
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

    const newFiles: MediaFile[] = Array.from(e.dataTransfer.files).map(
      (file) => ({
        id: `${file.name}-${Date.now()}`,
        file,
        type: file.type.startsWith("video") ? "video" : "image",
        url: URL.createObjectURL(file),
      })
    );
    setMediaFiles((prev) => [...prev, ...newFiles]);
  };

  const handleSubmitAccidentDetails = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (mediaFiles.length === 0) {
        throw new Error("Please upload at least one photo of the accident");
      }

      const photoPromises = mediaFiles.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === "string") {
              resolve(reader.result);
            } else {
              reject(new Error("Failed to read file"));
            }
          };
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file.file);
        });
      });

      const photoBase64Strings = await Promise.all(photoPromises);
      const photosPayload = photoBase64Strings.map((base64) => ({
        base64: base64.split(",")[1] || base64,
        content_type: "image/jpeg",
      }));

      const payload = {
        accident_id: accidentRefernceId,
        location_info: {
          address: locationData.address,
          place: locationData.place,
          district: locationData.district,
          state: locationData.state,
          nearest_depo: formData.nearestDepoName,
          nearest_depo_contact_number: formData.depotContact,
        },
        geolocation: {
          latitude: parseFloat(locationData.latitude),
          longitude: parseFloat(locationData.longitude),
          nearest_police_station: locationData.policeStation,
          nearest_police_station_contact_number:
            locationData.policeStationContact,
          timezone_info: {
            timezone: "Asia/Kolkata",
            offset: "+05:30",
          },
        },
        accident_details: {
          date_of_accident: formData.dateOfAccident,
          time_of_accident: formData.timeOfAccident,
          time_zone_of_accident: formData.timeZone,
          operated_depot: formData.operatedDepot,
          schedule_number: formData.scheduleNumber,
          description: formData.description,
        },
        crew_information: {
          driver_type_code: driverCategory,
          driver_name: formData.driverName,
          driver_phn_no: formData.driverPhone,
          driver_pen_no: formData.driverPenNo,
          conductor_name: formData.conductorName,
          conductor_phn_no: formData.conductorPhone,
          conductor_pen_no: formData.conductorPenNo,
        },
        vehicle_info: {
          bonet_no: formData.bonnetNumber,
          vehicle_register_no: "",
          vehicle_make: "",
        },
        photos: photosPayload,
      };

      const response = await fetch("/api/submitZeroReportDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit accident report");
      }

      const result = await response.json();
      console.log("Accident report submitted successfully:", result);
      setShowSuccessModal(true);

      const id = setTimeout(() => {
        router.push("/Accident_Zeroth_Report/ZerothReportRegister");
      }, 3000);
      setTimeoutId(id);
    } catch (error) {
      console.error("Error submitting accident report:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to submit accident report. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (showSuccessModal) {
      let count = 3;
      const countdownInterval = setInterval(() => {
        count--;
        if (count <= 0) clearInterval(countdownInterval);
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [showSuccessModal]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  const handleCancel = () => {
    router.push("/Accident_Zeroth_Report/ZerothReportRegister");
  };
  const MalayalamText = ({ text }: { text: string }) => (
    <span className="text-[10px]">{text}</span>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-xs flex flex-col">
      {/* Top Bar */}
      <div className="p-4 bg-white shadow-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
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

        <h2 className="text-[16px] text-center font-semibold py-1 text-[var(--sidebar)]">
          {accidentRefernceId?.replaceAll("_", "/")}
        </h2>
      </div>

      {/* Main Form Content */}
      <div className="flex flex-col flex-1 mt-2">
        <div className="flex flex-col flex-1">
          {/* Tabs */}
          <div className="flex flex-col">
            <div className="flex border-b border-gray-200 bg-[var(--sidebar-bg)] overflow-x-auto flex-shrink-0">
              {tabLabels.map((tab, index) => {
                return (
                  <button
                    key={index}
                    type="button"
                    className={`flex items-center px-4 py-2.5 text-[12px] text-white font-medium whitespace-nowrap bg-transparent transition-all duration-200 border-b-2
                                            ${
                                              activeTab === index
                                                ? "text-[var(--sidebar-bg)] border-white bg-gray-500"
                                                : "text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-50"
                                            }`}
                    onClick={() => setActiveTab(index)}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
            <div className="h-0.5 bg-gray-200 flex-shrink-0">
              <div
                className="h-full bg-[var(--sidebar-bg)] transition-all duration-300 ease-in-out"
                style={{
                  width: `${((activeTab + 1) / tabLabels.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-auto p-4">
            {activeTab === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {" "}
                {/* Increased outer gap */}
                <div className="border-2 border-gray-400 rounded-[8px] overflow-auto min-h-[68vh]">
                  <h3 className="text-[16px] font-[600] pb-2 border-b-2 border-[var(--sidebar)] p-[16px]">
                    Accident Location Details (
                    <MalayalamText text="അപകടം നടന്ന സ്ഥലം സംബന്ധിച്ച വിശദാംശങ്ങൾ" />
                    )
                  </h3>
                  <div className="p-[16px]">
                    <div className="mb-4 relative">
                      {" "}
                      {/* Increased mb */}
                      <label className="text-[12px] text-gray-700 block mb-2">
                        {" "}
                        {/* Increased mb + min-height */}
                        Accident Place (
                        <MalayalamText text="അപകടം നടന്ന സ്ഥലം" />)
                      </label>
                      <input
                        value={locationQuery}
                        onChange={(e) => {
                          setLocationQuery(e.target.value);
                          setShowLocationSuggestions(true);
                        }}
                        onFocus={() => setShowLocationSuggestions(true)}
                        className="w-full py-2 px-3 border border-gray-300 rounded text-xs mt-auto bg-white" /* mt-auto for alignment */
                      />
                      {showLocationSuggestions &&
                        locationSuggestions.length > 0 && (
                          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                            {locationSuggestions.map((suggestion, index) => (
                              <div
                                key={index}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-xs"
                                onClick={() => handleLocationSelect(suggestion)}
                              >
                                {suggestion.display_name}
                              </div>
                            ))}
                          </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {" "}
                      {/* Increased gap and mb */}
                      <div className="flex flex-col h-full">
                        {" "}
                        {/* Flex container */}
                        <label className="text-[12px] text-gray-700 mb-2 ">
                          {" "}
                          {/* min-height */}
                          Accident District (
                          <MalayalamText text="അപകടം നടന്ന ജില്ല" />)
                        </label>
                        <input
                          name="district"
                          value={locationData.district}
                          onChange={handleLocationChange}
                          className="w-full py-2 px-3 border border-gray-300 rounded text-xs mt-auto bg-white" /* mt-auto */
                        />
                      </div>
                      <div className="flex flex-col h-full">
                        {" "}
                        {/* Flex container */}
                        <label className="text-[12px] text-gray-700 mb-2 ">
                          {" "}
                          {/* min-height */}
                          Accident State (
                          <MalayalamText text="അപകടം നടന്ന സംസ്ഥാനം" />)
                        </label>
                        <input
                          name="state"
                          value={locationData.state}
                          onChange={handleLocationChange}
                          className="w-full py-2 px-3 border border-gray-300 rounded text-xs mt-auto bg-white" /* mt-auto */
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {" "}
                      {/* Increased gap and mb */}
                      <div className="flex flex-col h-full">
                        {" "}
                        {/* Flex container */}
                        <label className="text-[12px] text-gray-700 mb-2 ">
                          {" "}
                          {/* min-height */}
                          Latitude (<MalayalamText text="അക്ഷാംശം" />)
                        </label>
                        <input
                          value={locationData.latitude}
                          onChange={handleLocationChange}
                          className="w-full py-2 px-3 border border-gray-300 rounded text-xs mt-auto bg-white" /* mt-auto */
                        />
                      </div>
                      <div className="flex flex-col h-full">
                        {" "}
                        {/* Flex container */}
                        <label className="text-[12px] text-gray-700 mb-2 ">
                          {" "}
                          {/* min-height */}
                          Longitude (<MalayalamText text="രേഖാംശം" />)
                        </label>
                        <input
                          value={locationData.longitude}
                          onChange={handleLocationChange}
                          className="w-full py-2 px-3 border border-gray-300 rounded text-xs mt-auto bg-white" /* mt-auto */
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Second Column - Nearby Assistance */}
                <div className="border-2 border-gray-400 rounded-[8px] overflow-auto">
                  <h3 className="text-[16px] font-[600] pb-2 border-b-2 border-[var(--sidebar)] p-[16px]">
                    {" "}
                    {/* Increased mb */}
                    Nearby Assistance Details (
                    <MalayalamText text="സമീപ സഹായ വിവരം" />)
                  </h3>
                  <div className="p-[16px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {" "}
                      {/* Increased gap and mb */}
                      <div className="flex flex-col h-full">
                        {" "}
                        {/* Flex container */}
                        <label className="text-[12px] text-gray-700 min-h-[2rem]">
                          {" "}
                          {/* min-height */}
                          Nearest Police Station (
                          <MalayalamText text="സമീപ പോലീസ് സ്റ്റേഷൻ" />)
                        </label>
                        <select
                          name="policeStation"
                          value={locationData.policeStation}
                          onChange={handlePoliceStationSelect}
                          className="w-full py-2 px-3 border border-gray-300 rounded text-xs mt-auto bg-white" /* mt-auto */
                        >
                          <option value="">Select Police Station</option>
                          {filteredPoliceStations.map((station) => (
                            <option key={station.id} value={station.id}>
                              {station.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col h-full">
                        {" "}
                        {/* Flex container */}
                        <label className="text-[12px] text-gray-700 min-h-[2rem]">
                          {" "}
                          {/* min-height */}
                          Police Station Contact (
                          <MalayalamText text="പോലീസ് സ്റ്റേഷനിൽ ബന്ധപ്പെടേണ്ട നമ്പർ" />
                          )
                        </label>
                        <input
                          value={locationData.policeStationContact}
                          readOnly
                          className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-gray-100 mt-auto bg-white" /* mt-auto */
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {" "}
                      {/* Increased gap */}
                      <div className="flex flex-col h-full">
                        {" "}
                        {/* Flex container */}
                        <label className="text-[12px] text-gray-700 min-h-[2rem]">
                          {" "}
                          {/* min-height */}
                          Nearest Depot (
                          <MalayalamText text="അപകടം നടന്ന സ്ഥലത്തോട് അടുത്തുള്ള ഡിപ്പോ" />
                          )
                        </label>
                        <select
                          value={formData.nearestDepoName}
                          onChange={handleDepotSelect}
                          className="w-full py-2 px-3 border border-gray-300 rounded text-xs mt-auto bg-white" /* mt-auto */
                        >
                          <option value="">Select Depot</option>
                          {filteredDepots.map((depot) => (
                            <option key={depot.id} value={depot.id}>
                              {depot.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col h-full">
                        {" "}
                        {/* Flex container */}
                        <label className="text-[12px] text-gray-700 min-h-[2rem]">
                          {" "}
                          {/* min-height */}
                          Depot Contact (
                          <MalayalamText text="ഡിപ്പോയുമായി ബന്ധപ്പെടാനുള്ള നമ്പർ" />
                          )
                        </label>
                        <input
                          value={formData.depotContact}
                          readOnly
                          className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-gray-100 mt-auto bg-white" /* mt-auto */
                        />
                      </div>
                    </div>
                  </div>
                  {/* Location permission message remains same */}
                </div>
              </div>
            )}

            {/* Accident & Crew Tab */}
            {activeTab === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full ">
                {/* Accident Details */}
                <div className="border-2 border-gray-400 rounded-[8px] overflow-auto min-h-[68vh]">
                  <h3 className="text-[16px] font-[600] pb-2 border-b-2 border-[var(--sidebar)] p-[16px]">
                    Accident Details (
                    <MalayalamText text="അപകടത്തിന്റെ വിശദാംശങ്ങൾ" />)
                  </h3>

                  <div className="space-y-4 p-[16px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[12px] text-gray-700 mb-1">
                          Date of Accident (
                          <MalayalamText text="അപകടം നടന്ന തീയതി" />)
                        </label>
                        <input
                          type="date"
                          name="dateOfAccident"
                          value={formData.dateOfAccident}
                          onChange={handleChange}
                          className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[12px] text-gray-700 mb-1">
                          Time of Accident (
                          <MalayalamText text="അപകടം നടന്ന സമയം" />)
                        </label>
                        <input
                          type="time"
                          name="timeOfAccident"
                          value={formData.timeOfAccident}
                          onChange={handleChange}
                          className="w-full py-2 px-3 border border-gray-300  rounded text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[12px] text-gray-700 mb-1">
                        Time Zone of Accident (
                        <MalayalamText text="അപകടം നടന്ന സമയ മേഖല" />)
                      </label>
                      <input
                        name="timeZone"
                        value={timeSlot}
                        readOnly
                        className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-gray-100 bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[12px] text-gray-700 mb-1">
                        Operated Depot (
                        <MalayalamText text="ഓപ്പറേറ്റഡ് ഡിപോട്" /> )
                      </label>
                      <input
                        name="operatedDepot"
                        value={formData.operatedDepot}
                        onChange={handleChange}
                        className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[12px] text-gray-700 mb-1">
                        Schedule Number (<MalayalamText text="ഷെഡ്യൂൾ നമ്പർ" />)
                      </label>
                      <input
                        name="scheduleNumber"
                        placeholder="Enter Schedule Number"
                        value={formData.scheduleNumber ?? ""}
                        onChange={handleChange}
                        className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-[12px] text-gray-700 mb-1">
                        Accident Description (
                        <MalayalamText text="അപകടത്തെക്കുറിച്ചുള്ള വിവരണം" />)
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-white"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Crew Information */}
                <div className="border-2 border-gray-400 rounded-[8px] overflow-auto">
                  <h3 className="text-[16px] font-[600] pb-2 border-b-2 border-[var(--sidebar)] p-[16px]">
                    Crew Information (<MalayalamText text="ക്രൂ വിവരങ്ങൾ" />)
                  </h3>

                  <div className="space-y-4 p-[16px]">
                    <div>
                      <label className="text-[12px] text-gray-700 mb-1">
                        Driver Category (<MalayalamText text="ഡ്രൈവർ വിഭാഗം" />)
                      </label>
                      <select
                        value={driverCategory}
                        onChange={(e) => setDriverCategory(e.target.value)}
                        className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-white"
                      >
                        <option value="">Select Category</option>
                        <option value="DC">DC</option>
                        <option value="DR">DR</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="relative" ref={driverRef}>
                        <label className="text-[12px] text-gray-700 mb-1">
                          Driver Name (<MalayalamText text="ഡ്രൈവറുടെ പേര്" />)
                        </label>
                        <input
                          type="text"
                          name="driverSearchText"
                          placeholder="Search driver by name"
                          value={driverSearchText}
                          className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-white"
                          onChange={(e) => {
                            setDriverSearchText(e.target.value);
                            filterDrivers(e.target.value);
                            setShowDriverDropdown(true);
                          }}
                          onFocus={() => setShowDriverDropdown(true)}
                        />

                        {showDriverDropdown && (
                          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                            {filteredDrivers.length === 0 ? (
                              <div className="p-3 text-center text-gray-500">
                                No matching drivers
                              </div>
                            ) : (
                              <ul>
                                {filteredDrivers.map((driver) => (
                                  <li
                                    key={driver.pen_no}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                                    onClick={() => handleSelectDriver(driver)}
                                  >
                                    <div className="font-medium text-xs">
                                      {driver.user_first_name}{" "}
                                      {driver.user_last_name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {driver.pen_no}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="text-[12px] text-gray-700 mb-1">
                          Driver Phone (
                          <MalayalamText text="ഡ്രൈവറുടെ ഫോൺ നമ്പർ" />)
                        </label>
                        <input
                          type="tel"
                          name="driverPhone"
                          value={formData.driverPhone}
                          onChange={handleChange}
                          className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-white"
                        />
                      </div>
                    </div>
                    <div className="relative" ref={conductorRef}>
                      <label className="text-[12px] text-gray-700 mb-1">
                        Conductor PEN Number (
                        <MalayalamText text="കണ്ടക്ടർ പെൻ നമ്പർ" />)
                      </label>
                      <input
                        type="text"
                        name="conductorSearchText"
                        placeholder="Search conductor by PEN number or name"
                        value={conductorSearchText}
                        className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-white"
                        onChange={(e) => {
                          setConductorSearchText(e.target.value);
                          filterConductors(e.target.value);
                          setShowConductorDropdown(true);
                        }}
                        onFocus={() => setShowConductorDropdown(true)}
                      />

                      {showConductorDropdown && (
                        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                          {filteredConductors.length === 0 ? (
                            <div className="p-3 text-center text-gray-500">
                              No matching conductors
                            </div>
                          ) : (
                            <ul>
                              {filteredConductors.map((conductor) => (
                                <li
                                  key={conductor.pen_no}
                                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                                  onClick={() =>
                                    handleSelectConductor(conductor)
                                  }
                                >
                                  <div className="font-medium text-xs">
                                    {conductor.pen_no}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {conductor.user_first_name}{" "}
                                    {conductor.user_last_name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {conductor.user_phone}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[12px] text-gray-700 mb-1">
                          Conductor Name (
                          <MalayalamText text="കണ്ടക്ടറുടെ പേര്" />)
                        </label>
                        <input
                          name="conductorName"
                          value={formData.conductorName}
                          readOnly
                          className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-gray-100 bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-[12px] text-gray-700 mb-1">
                          Conductor Phone (
                          <MalayalamText text="കണ്ടക്ടറുടെ ഫോൺ നമ്പർ" />)
                        </label>
                        <input
                          type="tel"
                          name="conductorPhone"
                          value={formData.conductorPhone}
                          onChange={handleChange}
                          className="w-full py-2 px-3 border border-gray-300 rounded text-xs bg-white"
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
                <div className="w-[50%] border-2 border-gray-400 rounded-[8px] overflow-auto min-h-[68vh]">
                  <h3 className="text-[16px] font-[600] pb-2 border-b-2 border-[var(--sidebar)] p-[16px]">
                    Accident Documentation (
                    <MalayalamText text="അപകടം സംബന്ധിച്ച ഡോക്യുമെന്റേഷൻ" />)
                  </h3>

                  <div
                    className={`flex-1 border-2 m-[16px] ${
                      isDragging
                        ? "border-blue-500 bg-blue-50"
                        : "border-dashed border-gray-300"
                    } 
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
                        {isDragging
                          ? "Drop files here"
                          : "Click or drag files to upload"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Upload images of the accident scene <br />
                        <MalayalamText text="അപകട സ്ഥലത്തിന്റെ ഫോട്ടോകൾ അപ്‌ലോഡ് ചെയ്യുക" />
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto p-3 bg-gray-50 rounded border border-gray-200 m-[16px]">
                    <h4 className="text-xs font-semibold mb-2">
                      {" "}
                      Guidelines to Upload Photos (ഫോട്ടോകൾ അപ്‌ലോഡ്
                      ചെയ്യുന്നതിനുള്ള മാർഗ്ഗനിർദ്ദേശങ്ങൾ)
                    </h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>
                        • Upload clear photos showing the accident from multiple
                        angles
                        <br />•{" "}
                        <MalayalamText text="വിവിധ കോണുകളിൽ നിന്ന് അപകടം കാണിക്കുന്ന വ്യക്തമായ ഫോട്ടോകൾ അപ്‌ലോഡ് ചെയ്യുക" />
                      </li>
                      <li>
                        • Include close-up shots of any vehicle damage
                        <br />•
                        <MalayalamText text=" വാഹനത്തിന്റെ നാശനഷ്ടം വ്യക്തമാക്കുന്ന ക്ലോസ്‌അപ്പ് ഫോട്ടോകൾ ഉൾപ്പെടുത്തുക" />
                      </li>
                      <li>
                        • Maximum file size: 5MB per image
                        <br />•{" "}
                        <MalayalamText text="ഓരോ ചിത്രത്തിന്റെയും പരമാവധി ഫയൽ വലുപ്പം: 5MB" />
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Section - Uploaded Images */}
                <div className="w-[50%] border-2 border-gray-400 rounded-[8px] overflow-auto">
                  <h3 className="text-[16px] font-[600] pb-2 border-b-2 border-[var(--sidebar)] p-[16px]">
                    Uploaded Images (
                    <MalayalamText text="അപ്‌ലോഡ് ചെയ്ത ഫോട്ടോകൾ" />)
                  </h3>

                  {mediaFiles.length > 0 ? (
                    <div className="m-[16px]">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {mediaFiles.map((media) => (
                          <div
                            key={media.id}
                            className="relative border rounded-lg overflow-hidden h-32"
                          >
                            {media.type === "video" ? (
                              <video
                                src={media.url}
                                className="w-full h-full object-cover"
                                controls
                              />
                            ) : (
                              <img
                                src={media.url}
                                alt="Uploaded media"
                                className="w-full h-full object-cover"
                              />
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
                    <p className="p-[16px] text-sm text-gray-500">
                      No images are uploaded. (
                      <MalayalamText text="ഫോട്ടോകളൊന്നും അപ്‌ലോഡ് ചെയ്തിട്ടില്ല." />
                      )
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Form Actions - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              {activeTab > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab - 1)}
                  className="flex items-center justify-center px-5 py-1 text-[12px] font-medium bg-green-500 text-white rounded hover:bg-green-600 transition-all"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>
              )}

              {activeTab <= 3 && (
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab + 1)}
                  className="flex items-center justify-center px-5 py-1 text-[12px] font-medium bg-[var(--sidebar)] text-white rounded hover:bg-green-600 transition-all"
                >
                  Next
                  <ChevronLeft className="w-4 h-4 ml-2 rotate-180" />
                </button>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center justify-center px-5 py-1 text-[12px] border border-gray-300 rounded hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>

              {activeTab === 3 - 1 && (
                <button
                  type="button"
                  onClick={handleSubmitAccidentDetails}
                  disabled={isSubmittingDocumentation}
                  className={`flex items-center justify-center px-5 py-1 text-[12px] font-medium text-white rounded transition-all ${
                    isSubmittingDocumentation
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[var(--sidebar)] hover:bg-[#001670]"
                  }`}
                >
                  {isSubmittingDocumentation ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <>Submit</>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full mx-4 transform transition-all duration-300 scale-95 animate-scaleIn">
            <div className="flex flex-col items-center">
              {/* Success icon animation */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-pulseOnce">
                <svg
                  className="w-12 h-12 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Success message */}
              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                Accident Reported Successfully!
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Reference ID: {accidentRefernceId}
              </p>

              {/* OK button */}
              <button
                onClick={() => {
                  if (timeoutId) clearTimeout(timeoutId);
                  setShowSuccessModal(false);
                  setSelectedVehicle(null);
                  router.push("/Accident_Zeroth_Report/ZerothReportRegister");
                }}
                className="px-8 py-3 bg-[var(--sidebar)] text-white rounded-lg hover:bg-[#001670] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--sidebar)] focus:ring-opacity-50 transform hover:scale-105 transition-transform duration-200"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZerothReport;
