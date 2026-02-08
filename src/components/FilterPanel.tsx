"use client";

import ClubFilter from "./ClubFilter";
import CountryFilter from "./CountryFilter";
import AgeRangeFilter from "./AgeRangeFilter";

interface FilterPanelProps {
  availableClubs: string[];
  selectedClubs: string[];
  onClubChange: (clubs: string[]) => void;
  availableCountries: string[];
  selectedCountries: string[];
  onCountryChange: (countries: string[]) => void;
  minAge: number;
  maxAge: number;
  ageRange: { min: number; max: number };
  onAgeRangeChange: (range: { min: number; max: number }) => void;
  onClear: () => void;
}

export default function FilterPanel({
  availableClubs,
  selectedClubs,
  onClubChange,
  availableCountries,
  selectedCountries,
  onCountryChange,
  minAge,
  maxAge,
  ageRange,
  onAgeRangeChange,
  onClear,
}: FilterPanelProps) {
  const activeCount =
    (selectedClubs.length > 0 ? 1 : 0) +
    (selectedCountries.length > 0 ? 1 : 0) +
    (ageRange.min !== minAge || ageRange.max !== maxAge ? 1 : 0);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
          Filters
          {activeCount > 0 && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
              {activeCount}
            </span>
          )}
        </h3>
        <button
          onClick={onClear}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          Clear All
        </button>
      </div>
      <div className="space-y-4">
        <ClubFilter
          availableClubs={availableClubs}
          selectedClubs={selectedClubs}
          onClubChange={onClubChange}
        />
        <CountryFilter
          availableCountries={availableCountries}
          selectedCountries={selectedCountries}
          onCountryChange={onCountryChange}
        />
        <AgeRangeFilter
          minAge={minAge}
          maxAge={maxAge}
          currentRange={ageRange}
          onRangeChange={onAgeRangeChange}
        />
      </div>
    </div>
  );
}
