import axios from "axios";
import type {
  AthletesListResponse,
  AthleteDetails,
  TeamInfo,
  NormalizedAthlete,
} from "@/types/athlete";

const API_BASE =
  process.env.NEXT_PUBLIC_ESPN_API_BASE_URL ||
  "https://sports.core.api.espn.com/v2/sports/soccer/leagues/uefa.champions";

const httpClient = axios.create({
  timeout: 15000,
});

export async function fetchAllAthleteRefs(
  limit = 1000
): Promise<AthletesListResponse> {
  const firstPage = (
    await httpClient.get<AthletesListResponse>(
      `${API_BASE}/athletes?limit=${limit}&page=1`
    )
  ).data;

  const allItems = [...firstPage.items];

  if (firstPage.pageCount > 1) {
    for (let page = 2; page <= firstPage.pageCount; page++) {
      try {
        const { data } = await httpClient.get<AthletesListResponse>(
          `${API_BASE}/athletes?limit=${limit}&page=${page}`
        );
        allItems.push(...data.items);
      } catch (error) {
        console.error(`Failed to fetch athletes page ${page}:`, error);
      }
    }
  }

  return {
    ...firstPage,
    items: allItems,
    count: allItems.length,
  };
}

export async function fetchAthleteDetails(
  athleteId: string
): Promise<AthleteDetails> {
  const { data } = await httpClient.get<AthleteDetails>(
    `${API_BASE}/athletes/${athleteId}`
  );
  return data;
}

export async function fetchFromRef<T>(refUrl: string): Promise<T> {
  const { data } = await httpClient.get<T>(refUrl);
  return data;
}

export async function fetchTeamInfo(teamRefUrl: string): Promise<TeamInfo> {
  return fetchFromRef<TeamInfo>(teamRefUrl);
}

export async function fetchNormalizedAthlete(
  athleteId: string
): Promise<NormalizedAthlete> {
  const details = await fetchAthleteDetails(athleteId);

  let teamName: string | undefined;
  let teamLogo: string | undefined;

  if (details.team?.$ref) {
    try {
      const team = await fetchTeamInfo(details.team.$ref);
      teamName = team.displayName || team.name;
      teamLogo = team.logos?.[0]?.href;
    } catch {
      // Team info unavailable
    }
  }

  return {
    id: details.id,
    firstName: details.firstName,
    lastName: details.lastName,
    fullName: details.fullName,
    displayName: details.displayName,
    age: details.age,
    dateOfBirth: details.dateOfBirth,
    citizenship: details.citizenship,
    jersey: details.jersey,
    position: details.position?.displayName,
    positionAbbreviation: details.position?.abbreviation,
    headshot: details.headshot?.href,
    flagHref: details.flag?.href,
    weight: details.displayWeight,
    height: details.displayHeight,
    teamName,
    teamLogo,
  };
}
