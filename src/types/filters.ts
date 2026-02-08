export interface FilterState {
  searchTerm: string;
  selectedClubs: string[];
  selectedCountries: string[];
  ageRange: {
    min: number;
    max: number;
  };
  currentPage: number;
}

export interface PaginationMetadata {
  totalResults: number;
  totalPages: number;
  currentPage: number;
  playersPerPage: number;
  startIndex: number;
  endIndex: number;
}

export interface FilterMetadata {
  allClubs: string[];
  allCountries: string[];
  minAge: number;
  maxAge: number;
}
