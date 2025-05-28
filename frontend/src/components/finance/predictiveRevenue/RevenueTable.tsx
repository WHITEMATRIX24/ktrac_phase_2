"use client";

import React from "react";

interface RevenueItem {
  date: string;
  depot: string;
  forecast: number;
  collection: number;
}

interface RevenueTableProps {
  data: RevenueItem[];
}

const RevenueTable: React.FC<RevenueTableProps> = ({ data }) => {
  const groupedByMonth = data.reduce((acc, item) => {
    const monthKey = new Date(item.date).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    if (!acc[monthKey]) acc[monthKey] = [];
    acc[monthKey].push(item);
    return acc;
  }, {} as Record<string, RevenueItem[]>);

  return (
    <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4 mx-4">
      <h6 className="text-sm font-semibold text-gray-800 mb-4">
        Revenue Forecast Table
      </h6>
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs text-left">
          <thead className="text-gray-600 font-medium">
            <tr>
              <th className="px-3 py-2 border-b text-left">Depot</th>
              <th className="px-3 py-2 border-b text-right">Forecast</th>
              <th className="px-3 py-2 border-b text-right">Collection (INR)</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {Object.entries(groupedByMonth).map(([month, entries]) => (
              <React.Fragment key={month}>
                <tr className="bg-gray-100 text-sm">
                  <td colSpan={3} className="px-3 py-2 font-semibold text-gray-700">
                    {month}
                  </td>
                </tr>
                {entries.map((item, index) => (
                  <tr key={`${month}-${index}`} className="hover:bg-gray-50">
                    <td className="px-3 py-2 border-b">{item.depot}</td>
                    <td className="px-3 py-2 border-b text-right">
                      ₹{item.forecast.toLocaleString()}
                    </td>
                    <td className="px-3 py-2 border-b text-right">
                      ₹{item.collection.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueTable;
