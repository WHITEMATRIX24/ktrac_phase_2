import React, { useState } from "react";

interface HistoryEntry {
  version: number;
  operation: string;
  changed_by: string;
  changed_at: string;
  old_data: Record<string, any>;
  new_data: Record<string, any>;
}
interface HistoryTableProps {
  historyData: HistoryEntry[];
}


const HistoryTable: React.FC<HistoryTableProps> = ({ historyData }) => {
const [expandedVersion, setExpandedVersion] = useState<string | null>(null);

  const formatDate = (iso: string) => new Date(iso).toLocaleString();

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Update History</h2>
      {historyData && historyData.length > 0 ? (
  historyData
    .filter((entry) =>
      Object.values(entry.new_data).some(
        (val) => val !== null && val !== undefined
      )
    )
    .map((entry) => {
      const {
        version,
        operation,
        changed_by,
        changed_at,
        old_data,
        new_data,
      } = entry;

      const entryKey = `${version}-${changed_at}`;
      const isExpanded = expandedVersion === entryKey;

      const changedFields = Object.keys(old_data || {}).filter((key) => {
        return (
          new_data?.[key] !== undefined &&
          JSON.stringify(old_data[key]) !== JSON.stringify(new_data?.[key])
        );
      });

      return (
        <div
          key={entryKey}
          className="mb-4 border rounded-md shadow-sm bg-gray-50"
        >
          <button
            onClick={() =>
              setExpandedVersion(isExpanded ? null : entryKey)
            }
            className="w-full text-left px-4 py-2 bg-gray-200 hover:bg-gray-300 font-medium flex justify-between"
          >
            <span>
              Version {version} – {operation} by {changed_by}
            </span>
            <span className="text-sm text-gray-600">
              {formatDate(changed_at)}
            </span>
          </button>

          {isExpanded && (
            <div className="p-4">
              <table className="w-full text-sm border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">Field</th>
                    <th className="p-2 border">Old Value</th>
                    <th className="p-2 border">New Value</th>
                  </tr>
                </thead>
                <tbody>
                  {changedFields.map((field) => (
                    <tr key={field}>
                      <td className="p-2 border font-medium">{field}</td>
                      <td className="p-2 border text-red-600">
                        {renderValue(old_data[field])}
                      </td>
                      <td className="p-2 border text-green-600">
                        {renderValue(new_data[field])}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {changedFields.length === 0 && (
                <p className="text-gray-500 italic pt-2">
                  No detectable field-level changes.
                </p>
              )}
            </div>
          )}
        </div>
      );
    })
) : (
  <p>No version history available.</p>
)}


    </div>
  );
};

// Helper to render values (including nested or array values)
const renderValue = (value:unknown) => {
  if (Array.isArray(value)) {
    return value.length > 0
      ? value.map((item, index) => (
          <div key={index} className="text-xs">
            {typeof item === "object" ? JSON.stringify(item, null, 2) : item}
          </div>
        ))
      : "[]";
  } else if (typeof value === "object" && value !== null) {
    return (
      <pre className="whitespace-pre-wrap text-xs bg-gray-100 p-2 rounded">
        {JSON.stringify(value, null, 2)}
      </pre>
    );
  } else if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  } else if (value === null || value === undefined) {
    return <span className="text-gray-400 italic">null</span>;
  } else {
    return value.toString();
  }
};

export default HistoryTable;
