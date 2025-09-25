'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ConfirmationModal from './ConfirmationModal';

interface Bus {
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

interface BusTableProps {
  busData: Bus[];
  handleToggleStatus: (bonet_number: string) => void;
}

export default function BusTable({ busData, handleToggleStatus }: BusTableProps) {
  const [selectedBonets, setSelectedBonets] = useState<string[]>([]);
  const [selectedBonet, setSelectedBonet] = useState<string | null>(null);
  const [showBulkConfirmModal, setShowBulkConfirmModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  //Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  //Filtered data
  const filteredData = useMemo(
    () =>
      busData.filter(
        (bus) =>
          bus.bonet_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bus.registration_number?.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [busData, searchTerm]
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleConfirmToggle = async () => {
    if (selectedBonets.length > 0) {
      for (const bon of selectedBonets) {
        const bus = busData.find((b) => b.bonet_number === bon);
        if (bus?.isActive) {
          handleToggleStatus(bon);
        }
      }
      setSelectedBonets([]);
      setShowBulkConfirmModal(false);
    } else if (selectedBonet !== null) {
      const bus = busData.find((b) => b.bonet_number === selectedBonet);
      if (bus?.isActive) {
        handleToggleStatus(selectedBonet);
      }
      setSelectedBonet(null);
    }
  };

  return (
    <>
      {/* Search */}
      <div className="flex flex-col sm:flex-row sm:justify-end items-start sm:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Bonet or Registration Number"
          className="px-3 py-2 text-sm border rounded-md w-full sm:w-[250px]"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset page when search changes
          }}
        />

        <Button
          variant="destructive"
          disabled={selectedBonets.length === 0}
          onClick={() => setShowBulkConfirmModal(true)}
        >
          Deactivate Selected
        </Button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto border rounded-md shadow-sm max-h-[500px]">
        <table className="min-w-[1200px] w-full text-[12px] font-medium">
          <thead>
            <tr className="sticky top-0 z-10 bg-[#135144] text-white">
              <th className="py-2 px-2">
                <input
                  type="checkbox"
                  checked={
                    currentData.length > 0 &&
                    currentData.every(
                      (bus) =>
                        !bus.isActive || selectedBonets.includes(bus.bonet_number)
                    )
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      const activeBonets = currentData
                        .filter((bus) => bus.isActive)
                        .map((bus) => bus.bonet_number);
                      setSelectedBonets(activeBonets);
                    } else {
                      setSelectedBonets([]);
                    }
                  }}
                />
              </th>
              <th className="py-2 px-2">Body Type</th>
              <th className="py-2 px-2">Class</th>
              <th className="py-2 px-2">Fuel</th>
              <th className="py-2 px-2">Vehicle No</th>
              <th className="py-2 px-2">Bonet No</th>
              <th className="py-2 px-2">Zone</th>
              <th className="py-2 px-2">Schedule</th>
              <th className="py-2 px-2">Registration No</th>
              <th className="py-2 px-2">Reg Date</th>
              <th className="py-2 px-2">Status</th>
              <th className="py-2 px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((bus) => (
                <tr key={bus.id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-2">
                    <input
                      type="checkbox"
                      disabled={!bus.isActive}
                      checked={selectedBonets.includes(bus.bonet_number)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedBonets((prev) => [...prev, bus.bonet_number]);
                        } else {
                          setSelectedBonets((prev) =>
                            prev.filter((bon) => bon !== bus.bonet_number)
                          );
                        }
                      }}
                    />
                  </td>
                  <td className="py-2 px-2">{bus.body_type}</td>
                  <td className="py-2 px-2">{bus.class}</td>
                  <td className="py-2 px-2">{bus.fuel_type}</td>
                  <td className="py-2 px-2">{bus.vehicle_no}</td>
                  <td className="py-2 px-2">{bus.bonet_number}</td>
                  <td className="py-2 px-2">{bus.zone}</td>
                  <td className="py-2 px-2">{bus.schedule_number}</td>
                  <td className="py-2 px-2">{bus.registration_number}</td>
                  <td className="py-2 px-2">
                    {bus.registration_date
                      ? new Date(bus.registration_date).toLocaleDateString('en-GB')
                      : 'N/A'}
                  </td>
                  <td className="py-2 px-2">
                    <Badge
                      variant="outline"
                      className={`text-[10px] px-2 py-0.5 ${bus.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-500'
                        }`}
                    >
                      {bus.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="py-2 px-2">
                    {bus.isActive && (
                      <Button
                        variant="destructive"
                        size="sm"
                        className="text-[10px] px-2 py-1"
                        onClick={() => setSelectedBonet(bus.bonet_number)}
                      >
                        Deactivate
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={16} className="text-center py-4 text-sm text-gray-500">
                  No buses match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              size="sm"
              className={
                currentPage === page
                  ? 'bg-[#135144] text-white border-none shadow-none focus:outline-none focus:ring-0 hover:bg-[#0f4035]'
                  : 'bg-transparent border border-gray-300 text-gray-700 shadow-none focus:outline-none focus:ring-0 hover:bg-gray-200'
              }
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>




          ))}

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* Confirmation Modals */}
      {selectedBonet && (
        <ConfirmationModal
          title="Change Bus Status"
          message="Please confirm that you wish to deactivate this bus."
          onConfirm={handleConfirmToggle}
          onCancel={() => setSelectedBonet(null)}
        />
      )}

      {showBulkConfirmModal && (
        <ConfirmationModal
          title="Change Status of Selected"
          message={`Please confirm that you wish to deactivate ${selectedBonets.length} selected bus(es).`}
          onConfirm={handleConfirmToggle}
          onCancel={() => setShowBulkConfirmModal(false)}
        />
      )}
    </>
  );
}
