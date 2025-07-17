"use client";

import React from "react";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "@/components/customNode"; // Adjust the path as needed


interface HistoryEntry {
  version: number;
  operation: string;
  changed_by: string;
  changed_at: string;
  old_data: Record<string, any>;
  new_data: Record<string, any>;
}

interface HistoryDAGProps {
  historyData: HistoryEntry[];
}

const HistoryDAG: React.FC<HistoryDAGProps> = ({ historyData }) => {
    const nodeTypes = {
  custom: CustomNode,
};

  if (!historyData || historyData.length === 0)
    return <p>No version history available.</p>;
  // 🔧 Helper to shorten long values
  const shortValue = (val: any): string => {
    if (val === null || val === undefined) return "null";
    const str = typeof val === "object" ? JSON.stringify(val) : String(val);
    return str.length > 30 ? str.slice(0, 30) + "…" : str;
  };
  // Add this helper function inside your component
const formatFieldName = (field: string) => {
  return field
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};


 const changedEntries = historyData.filter((entry) => {
  const changedFields = Object.keys(entry.new_data || {}).filter((key) => {
    return (
      entry.new_data?.[key] !== undefined &&
      JSON.stringify(entry.old_data?.[key]) !== JSON.stringify(entry.new_data?.[key])
    );
  });
  return changedFields.length > 0;
});

const nodes: Node[] = changedEntries.map((entry, index) => {
  const nodeId = `${entry.version}-${entry.changed_at}`;
  const changedFields = Object.keys(entry.new_data || {}).filter((key) => {
    return (
      entry.new_data?.[key] !== undefined &&
      JSON.stringify(entry.old_data?.[key]) !== JSON.stringify(entry.new_data?.[key])
    );
  });

  return {
    id: nodeId,
    type: "custom",
    position: { x: 15, y: index * 200 },
    data: {
      label: (
        <div className="bg-white rounded-md shadow-lg p-3 w-[450px] text-[12px] flex gap-4 border border-green-300">
          {/* LEFT: Version info */}
          <div className="flex flex-col text-center justify-center w-[120px] border-r pr-2">
            <span className="font-semibold text-[13px]">
              🧾 Version {changedEntries.length-index}
            </span>
            <span className="text-gray-600 mt-1 text-[11px]">👤 {formatFieldName(entry.changed_by)}</span>
            <span className="text-gray-600 text-[9px] mt-1">
              🕒 {new Date(entry.changed_at).toLocaleString()}
            </span>
          </div>

          {/* RIGHT: Changes */}
          <div className="flex-1 pl-2 max-h-40 overflow-y-auto">
            {changedFields.map((field) => (
              <div key={field} className="text-[11px] mb-1">
                <span className="font-medium text-gray-700">
                  ✏️ {formatFieldName(field)}
                </span>
                <br />
                <span className="text-gray-800 line-through">
                  {formatFieldName(shortValue(entry.old_data?.[field]))}
                </span>{" "}
                ➔{" "}
                <span className="text-gray-800">
                  {formatFieldName(shortValue(entry.new_data?.[field]))}
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  };
});



const edges: Edge[] = changedEntries.slice(1).map((entry, index) => {
  const source = changedEntries[index];
  const target = entry;

  const sourceId = `${source.version}-${source.changed_at}`;
  const targetId = `${target.version}-${target.changed_at}`;

  return {
    id: `e${sourceId}-${targetId}`,
    source: sourceId,
    target: targetId,
    animated: true,
  };
});



  return (
    <div className="w-full h-[70vh]  m-3 p-3 rounded bg-white flex justify-start">
      <ReactFlow
  nodes={nodes}
  edges={edges}
  nodeTypes={nodeTypes} // 👈 apply it her
  defaultViewport={{ x: 20, y: 0, zoom: 1 }} // show left edge from start
  zoomOnScroll
  panOnScroll
>
  <Controls className="!right-4 !left-auto"/>
</ReactFlow>


    </div>
  );
};

export default HistoryDAG;
