'use client';

import { useEffect, useState } from 'react';
import BusTable from '@/components/depot/BusTable';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface Bus {
  id: number;
  vehicle_no: string;
  registration_number: string;
  body_type: string;
  bonet_number: string;
  rc_id: string;
  insurance_id: string;
  pollution_certificate: string;
  zone: string;
  schedule_number: string;
  isActive: boolean;
  fuel_type?: string;
  registration_date?: string;
  class?: string;
  created_at?: string;
}

export default function VehiclePage() {
  const [busData, setBusData] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Moved outside useEffect so it can be reused
  const fetchBuses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/getAllBusInfo');
      const raw = await res.json();
      const data = Array.isArray(raw) ? raw : raw.data;
      console.log(data);
      
      if (!Array.isArray(data)) throw new Error('Invalid data format');

      const formatted = data.map((bus: any): Bus => ({
        id: bus.id,
        vehicle_no: bus.vehicle_no || 'N/A',
        registration_number: bus.registration_number || 'N/A',
        body_type: bus.body_type || 'N/A',
        bonet_number: bus.bonet_number || 'N/A',
        rc_id: bus.rc_id || 'N/A',
        insurance_id: bus.insurance_id || 'N/A',
        pollution_certificate: bus.pollution_certificate || 'N/A',
        zone: bus.zone || 'N/A',
        schedule_number: bus.schedule_number || 'N/A',
        isActive: bus.isactive ?? true,
        fuel_type: bus.fuel_type || 'N/A',
        registration_date: bus.registration_date || 'N/A',
        class: bus.class || 'N/A',
        created_at: bus.created_at || 'N/A',
      }));

      setBusData(formatted);
    } catch (error) {
      console.error('Failed to load bus data:', error);
      toast.error('Failed to load bus data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

const handleDeactivateStatus = async (bonet_number: string) => {
  console.log('Deactivating bus:', bonet_number);

  try {
    
    const response = await fetch(`/api/updateBusinfoDeactivate?bonet_number=${bonet_number}`, {
      method: 'PATCH',
    });

    if (!response.ok) throw new Error('Deactivation failed');

    const updatedBus = await response.json();
    toast.success(updatedBus.message || 'Bus deactivated successfully');

    // ✅ Re-fetch bus list from DB to reflect changes
    await fetchBuses();
    // Refresh local state
    setBusData(prev =>
      prev.map(bus =>
        bus.bonet_number === bonet_number
          ? { ...bus, isActive: false }
          : bus
      )
    );
  } catch (error) {
    console.error('Deactivation error:', error);
    toast.error('Failed to deactivate bus');
  }
};

  if (loading) {
    return <div className="p-4 text-base sm:text-lg">Loading buses...</div>;
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xs sm:text-lg md:text-xl font-semibold">
          Vehicle List (Buses)
        </h1>
      </div>

      <div className="w-full overflow-x-auto">
        <BusTable busData={busData} handleToggleStatus={handleDeactivateStatus} />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
