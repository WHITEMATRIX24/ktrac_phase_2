// components/CustomNode.tsx
import React from "react";
import { Handle, Position } from "reactflow";

const CustomNode = ({ data }: any) => {
  return (
    <div className="rounded border border-[var(--sidebar-bg)] bg-white shadow-sm p-0 m-0">
      {data.label}
      <Handle type="target" position={Position.Top} style={{ opacity: 0, }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </div>
  );
};

export default CustomNode;
