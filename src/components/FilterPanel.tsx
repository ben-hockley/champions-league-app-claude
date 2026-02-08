"use client";

interface FilterPanelProps {
  positions: string[];
  selectedPosition: string;
  onPositionChange: (position: string) => void;
  onClear: () => void;
}

const POSITION_OPTIONS = [
  { value: "", label: "All Positions" },
  { value: "Goalkeeper", label: "Goalkeeper" },
  { value: "Defender", label: "Defender" },
  { value: "Midfielder", label: "Midfielder" },
  { value: "Forward", label: "Forward" },
];

export default function FilterPanel({
  selectedPosition,
  onPositionChange,
  onClear,
}: FilterPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
          Filters
        </h3>
        <button
          onClick={onClear}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          Clear All
        </button>
      </div>
      <div>
        <label
          htmlFor="position-filter"
          className="block text-xs font-medium text-gray-500 mb-1"
        >
          Position
        </label>
        <select
          id="position-filter"
          value={selectedPosition}
          onChange={(e) => onPositionChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {POSITION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
