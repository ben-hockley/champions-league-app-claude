"use client";

interface AgeRangeFilterProps {
  minAge: number;
  maxAge: number;
  currentRange: { min: number; max: number };
  onRangeChange: (range: { min: number; max: number }) => void;
}

export default function AgeRangeFilter({
  minAge,
  maxAge,
  currentRange,
  onRangeChange,
}: AgeRangeFilterProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">
        Age Range: {currentRange.min} – {currentRange.max}
      </label>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 w-8">Min</span>
          <input
            type="range"
            min={minAge}
            max={maxAge}
            value={currentRange.min}
            onChange={(e) => {
              const val = Number(e.target.value);
              onRangeChange({
                min: Math.min(val, currentRange.max),
                max: currentRange.max,
              });
            }}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            aria-label="Minimum age"
          />
          <span className="text-xs text-gray-600 w-6 text-right">
            {currentRange.min}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 w-8">Max</span>
          <input
            type="range"
            min={minAge}
            max={maxAge}
            value={currentRange.max}
            onChange={(e) => {
              const val = Number(e.target.value);
              onRangeChange({
                min: currentRange.min,
                max: Math.max(val, currentRange.min),
              });
            }}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            aria-label="Maximum age"
          />
          <span className="text-xs text-gray-600 w-6 text-right">
            {currentRange.max}
          </span>
        </div>
      </div>
    </div>
  );
}
