"use client";

import { useMemo } from "react";
import type { NormalizedAthlete } from "@/types/athlete";

interface UseFilteredPlayersParams {
  athletes: NormalizedAthlete[];
  searchTerm: string;
  selectedClubs: string[];
  selectedCountries: string[];
  ageRange: { min: number; max: number };
  currentPage: number;
  playersPerPage?: number;
}

export function useFilteredPlayers({
  athletes,
  searchTerm,
  selectedClubs,
  selectedCountries,
  ageRange,
  currentPage,
  playersPerPage = 24,
}: UseFilteredPlayersParams) {
  const filterMetadata = useMemo(() => {
    const clubs = new Set<string>();
    const countries = new Set<string>();
    let minAge = Infinity;
    let maxAge = -Infinity;

    for (const a of athletes) {
      if (a.teamName) clubs.add(a.teamName);
      if (a.citizenship) countries.add(a.citizenship);
      if (a.age != null) {
        if (a.age < minAge) minAge = a.age;
        if (a.age > maxAge) maxAge = a.age;
      }
    }

    return {
      allClubs: Array.from(clubs).sort(),
      allCountries: Array.from(countries).sort(),
      minAge: minAge === Infinity ? 16 : minAge,
      maxAge: maxAge === -Infinity ? 45 : maxAge,
    };
  }, [athletes]);

  const filteredAthletes = useMemo(() => {
    let result = athletes;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (a) =>
          a.displayName.toLowerCase().includes(term) ||
          a.fullName.toLowerCase().includes(term) ||
          a.citizenship?.toLowerCase().includes(term) ||
          a.teamName?.toLowerCase().includes(term) ||
          a.position?.toLowerCase().includes(term)
      );
    }

    if (selectedClubs.length > 0) {
      result = result.filter(
        (a) => a.teamName && selectedClubs.includes(a.teamName)
      );
    }

    if (selectedCountries.length > 0) {
      result = result.filter(
        (a) => a.citizenship && selectedCountries.includes(a.citizenship)
      );
    }

    if (
      ageRange.min !== filterMetadata.minAge ||
      ageRange.max !== filterMetadata.maxAge
    ) {
      result = result.filter(
        (a) =>
          a.age != null && a.age >= ageRange.min && a.age <= ageRange.max
      );
    }

    return result;
  }, [athletes, searchTerm, selectedClubs, selectedCountries, ageRange, filterMetadata.minAge, filterMetadata.maxAge]);

  const paginationData = useMemo(() => {
    const totalResults = filteredAthletes.length;
    const totalPages = Math.max(1, Math.ceil(totalResults / playersPerPage));
    const safePage = Math.min(currentPage, totalPages);
    const startIndex = (safePage - 1) * playersPerPage;
    const endIndex = Math.min(startIndex + playersPerPage, totalResults);
    const paginatedPlayers = filteredAthletes.slice(startIndex, endIndex);

    return {
      paginatedPlayers,
      totalResults,
      totalPages,
      currentPage: safePage,
      startIndex: totalResults > 0 ? startIndex + 1 : 0,
      endIndex,
    };
  }, [filteredAthletes, currentPage, playersPerPage]);

  return {
    ...paginationData,
    ...filterMetadata,
  };
}
