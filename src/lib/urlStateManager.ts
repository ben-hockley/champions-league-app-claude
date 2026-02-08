import type { FilterState } from "@/types/filters";

export function parseFiltersFromURL(
  searchParams: URLSearchParams,
  defaultMinAge: number,
  defaultMaxAge: number
): FilterState {
  const searchTerm = searchParams.get("search") || "";
  const clubsParam = searchParams.get("clubs");
  const selectedClubs = clubsParam ? clubsParam.split(",").filter(Boolean) : [];
  const countriesParam = searchParams.get("countries");
  const selectedCountries = countriesParam
    ? countriesParam.split(",").filter(Boolean)
    : [];
  const ageMin = parseInt(searchParams.get("ageMin") || "", 10);
  const ageMax = parseInt(searchParams.get("ageMax") || "", 10);
  const page = parseInt(searchParams.get("page") || "1", 10);

  return {
    searchTerm,
    selectedClubs,
    selectedCountries,
    ageRange: {
      min: isNaN(ageMin) ? defaultMinAge : ageMin,
      max: isNaN(ageMax) ? defaultMaxAge : ageMax,
    },
    currentPage: isNaN(page) || page < 1 ? 1 : page,
  };
}

export function buildFilterSearchParams(filters: FilterState): string {
  const params = new URLSearchParams();

  if (filters.searchTerm) {
    params.set("search", filters.searchTerm);
  }
  if (filters.selectedClubs.length > 0) {
    params.set("clubs", filters.selectedClubs.join(","));
  }
  if (filters.selectedCountries.length > 0) {
    params.set("countries", filters.selectedCountries.join(","));
  }
  if (filters.ageRange.min) {
    params.set("ageMin", String(filters.ageRange.min));
  }
  if (filters.ageRange.max) {
    params.set("ageMax", String(filters.ageRange.max));
  }
  if (filters.currentPage > 1) {
    params.set("page", String(filters.currentPage));
  }

  const str = params.toString();
  return str ? `?${str}` : "";
}
