"use client";

import { useState, useRef, useEffect } from "react";

interface CountryFilterProps {
  availableCountries: string[];
  selectedCountries: string[];
  onCountryChange: (countries: string[]) => void;
}

export default function CountryFilter({
  availableCountries,
  selectedCountries,
  onCountryChange,
}: CountryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCountry = (country: string) => {
    if (selectedCountries.includes(country)) {
      onCountryChange(selectedCountries.filter((c) => c !== country));
    } else {
      onCountryChange([...selectedCountries, country]);
    }
  };

  return (
    <div ref={ref} className="relative">
      <label className="block text-xs font-medium text-gray-500 mb-1">
        Country / Nationality
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white flex items-center justify-between"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">
          {selectedCountries.length === 0
            ? "All Countries"
            : `${selectedCountries.length} countr${selectedCountries.length > 1 ? "ies" : "y"} selected`}
        </span>
        <span className="ml-2 text-gray-400">{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          <div className="flex justify-between px-3 py-2 border-b border-gray-100 text-xs">
            <button
              type="button"
              onClick={() => onCountryChange([...availableCountries])}
              className="text-blue-600 hover:text-blue-800"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={() => onCountryChange([])}
              className="text-blue-600 hover:text-blue-800"
            >
              Clear
            </button>
          </div>
          <ul role="listbox" aria-label="Select countries">
            {availableCountries.map((country) => (
              <li key={country}>
                <label className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={selectedCountries.includes(country)}
                    onChange={() => toggleCountry(country)}
                    className="rounded border-gray-300"
                  />
                  <span className="truncate">{country}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
