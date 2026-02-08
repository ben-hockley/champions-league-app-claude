export interface AthleteRef {
  $ref: string;
}

export interface AthletesListResponse {
  count: number;
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  items: AthleteRef[];
}

export interface AthleteDetails {
  id: string;
  uid: string;
  guid: string;
  firstName: string;
  lastName: string;
  fullName: string;
  displayName: string;
  shortName: string;
  weight?: number;
  displayWeight?: string;
  height?: number;
  displayHeight?: string;
  age?: number;
  dateOfBirth?: string;
  gender?: string;
  citizenship?: string;
  slug?: string;
  jersey?: string;
  flag?: {
    href: string;
    alt: string;
  };
  position?: {
    id: string;
    name: string;
    displayName: string;
    abbreviation: string;
  };
  team?: {
    $ref: string;
  };
  headshot?: {
    href: string;
    alt: string;
  };
  statistics?: {
    $ref: string;
  };
}

export interface TeamInfo {
  id: string;
  name: string;
  displayName: string;
  abbreviation: string;
  shortDisplayName?: string;
  logos?: Array<{
    href: string;
    alt: string;
    width: number;
    height: number;
  }>;
}

export interface StatisticCategory {
  name: string;
  displayName: string;
  stats: Array<{
    name: string;
    displayName: string;
    value: number;
    displayValue?: string;
  }>;
}

export interface AthleteStatistics {
  splits: {
    categories: StatisticCategory[];
  };
}

export interface NormalizedAthlete {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  displayName: string;
  age?: number;
  dateOfBirth?: string;
  citizenship?: string;
  jersey?: string;
  position?: string;
  positionAbbreviation?: string;
  headshot?: string;
  flagHref?: string;
  weight?: string;
  height?: string;
  teamName?: string;
  teamLogo?: string;
}
