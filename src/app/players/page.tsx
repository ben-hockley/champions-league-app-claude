"use client";

import { useState, useCallback } from "react";
import { useAthletes } from "@/hooks/useAthletes";
import { useFilteredAthletes } from "@/hooks/useFilteredAthletes";
import PlayerGrid from "@/components/PlayerGrid";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";

export default function PlayersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("");

  const { athletes, totalPages, isLoading, isError } = useAthletes(page, 24);
  const { filteredAthletes } = useFilteredAthletes(athletes, {
    search,
    position,
  });

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearch("");
    setPosition("");
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
        Champions League Players
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0 space-y-4">
          <SearchBar
            value={search}
            onChange={handleSearchChange}
            placeholder="Search players..."
          />
          <FilterPanel
            positions={["Goalkeeper", "Defender", "Midfielder", "Forward"]}
            selectedPosition={position}
            onPositionChange={setPosition}
            onClear={handleClearFilters}
          />
        </aside>

        {/* Main content */}
        <div className="flex-1">
          {isError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <p className="font-medium">Failed to load players</p>
              <p className="text-sm">
                Please try refreshing the page. The ESPN API may be temporarily
                unavailable.
              </p>
            </div>
          )}

          <PlayerGrid athletes={filteredAthletes} isLoading={isLoading} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                ← Previous
              </button>
              <span className="text-sm text-gray-500">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
