"use client";

import { useMemo } from "react";
import type { NormalizedAthlete } from "@/types/athlete";

interface FilterOptions {
  search: string;
  position: string;
}

export function useFilteredAthletes(
  athletes: NormalizedAthlete[],
  filters: FilterOptions
) {
  const filtered = useMemo(() => {
    let result = athletes;

    if (filters.search) {
      const term = filters.search.toLowerCase();
      result = result.filter(
        (a) =>
          a.displayName.toLowerCase().includes(term) ||
          a.fullName.toLowerCase().includes(term) ||
          a.citizenship?.toLowerCase().includes(term) ||
          a.teamName?.toLowerCase().includes(term)
      );
    }

    if (filters.position) {
      result = result.filter((a) =>
        a.position?.toLowerCase().includes(filters.position.toLowerCase())
      );
    }

    return result;
  }, [athletes, filters.search, filters.position]);

  return { filteredAthletes: filtered };
}
