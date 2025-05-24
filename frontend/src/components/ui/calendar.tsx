"use client";

import React from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";


type CalendarDropdownProps = {
  selected: Date | null;
  onSelect: (date: Date | null) => void;
};

export function CalendarDropdown({ selected, onSelect }: CalendarDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block"  ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center px-4 py-1 border rounded bg-white shadow-sm hover:bg-gray-100"
      >
        <span>
          {selected ? format(selected, "PPP") : "Select a date"}
        </span>
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-2 bg-white border rounded shadow-lg">
          <DayPicker
            mode="single"
            selected={selected ?? undefined}
            onSelect={(date) => {
              onSelect(date ?? null); // Normalize to null
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
