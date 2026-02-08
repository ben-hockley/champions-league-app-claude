"use client";

import { useState, useCallback, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAllAthletes } from "@/hooks/useAllAthletes";
import { useFilteredPlayers } from "@/hooks/useFilteredPlayers";
import { buildFilterSearchParams } from "@/lib/urlStateManager";
import PlayerGrid from "@/components/PlayerGrid";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import PaginationControls from "@/components/PaginationControls";

function PlayersPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { athletes, isLoading, isError } = useAllAthletes();

  // Compute age bounds from data
  const dataAgeBounds = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    for (const a of athletes) {
      if (a.age != null) {
        if (a.age < min) min = a.age;
        if (a.age > max) max = a.age;
      }
    }
    return {
      min: min === Infinity ? 16 : min,
      max: max === -Infinity ? 45 : max,
    };
  }, [athletes]);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedClubs, setSelectedClubs] = useState<string[]>(() => {
    const c = searchParams.get("clubs");
    return c ? c.split(",").filter(Boolean) : [];
  });
  const [selectedCountries, setSelectedCountries] = useState<string[]>(() => {
    const c = searchParams.get("countries");
    return c ? c.split(",").filter(Boolean) : [];
  });
  const [ageRange, setAgeRange] = useState<{ min: number; max: number } | null>(() => {
    const min = parseInt(searchParams.get("ageMin") || "", 10);
    const max = parseInt(searchParams.get("ageMax") || "", 10);
    if (!isNaN(min) || !isNaN(max)) {
      return {
        min: isNaN(min) ? 16 : min,
        max: isNaN(max) ? 45 : max,
      };
    }
    return null; // Will use data bounds
  });
  const [page, setPage] = useState(() => {
    const p = parseInt(searchParams.get("page") || "1", 10);
    return isNaN(p) || p < 1 ? 1 : p;
  });

  // Effective age range: from URL/user state or data bounds
  const effectiveAgeRange = ageRange ?? dataAgeBounds;

  const {
    paginatedPlayers,
    totalResults,
    totalPages,
    currentPage,
    startIndex,
    endIndex,
    allClubs,
    allCountries,
    minAge,
    maxAge,
  } = useFilteredPlayers({
    athletes,
    searchTerm: search,
    selectedClubs,
    selectedCountries,
    ageRange: effectiveAgeRange,
    currentPage: page,
    playersPerPage: 25,
  });

  // Sync state to URL
  useEffect(() => {
    const newUrl = buildFilterSearchParams({
      searchTerm: search,
      selectedClubs,
      selectedCountries,
      ageRange: ageRange ?? { min: 0, max: 0 },
      currentPage: page,
    });
    const currentUrl = window.location.search || "";
    if (newUrl !== currentUrl) {
      router.replace(`/players${newUrl}`, { scroll: false });
    }
  }, [search, selectedClubs, selectedCountries, ageRange, page, router]);

  const resetPage = useCallback(() => setPage(1), []);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
      resetPage();
    },
    [resetPage]
  );

  const handleClubChange = useCallback(
    (clubs: string[]) => {
      setSelectedClubs(clubs);
      resetPage();
    },
    [resetPage]
  );

  const handleCountryChange = useCallback(
    (countries: string[]) => {
      setSelectedCountries(countries);
      resetPage();
    },
    [resetPage]
  );

  const handleAgeRangeChange = useCallback(
    (range: { min: number; max: number }) => {
      setAgeRange(range);
      resetPage();
    },
    [resetPage]
  );

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearch("");
    setSelectedClubs([]);
    setSelectedCountries([]);
    setAgeRange(null);
    setPage(1);
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
            totalResults={search ? totalResults : undefined}
          />
          <FilterPanel
            availableClubs={allClubs}
            selectedClubs={selectedClubs}
            onClubChange={handleClubChange}
            availableCountries={allCountries}
            selectedCountries={selectedCountries}
            onCountryChange={handleCountryChange}
            minAge={minAge}
            maxAge={maxAge}
            ageRange={effectiveAgeRange}
            onAgeRangeChange={handleAgeRangeChange}
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

          {!isLoading && totalResults > 0 && (
            <p className="text-sm text-gray-500 mb-4">
              Showing {startIndex}–{endIndex} of {totalResults} players
            </p>
          )}

          <PlayerGrid athletes={paginatedPlayers} isLoading={isLoading} />

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalResults={totalResults}
            startIndex={startIndex}
            endIndex={endIndex}
          />
        </div>
      </div>
    </div>
  );
}

export default function PlayersPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-400">
          Loading…
        </div>
      }
    >
      <PlayersPageContent />
    </Suspense>
  );
}
