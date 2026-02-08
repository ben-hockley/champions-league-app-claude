import { NextResponse } from "next/server";
import { fetchAllAthleteRefs, fetchAthleteDetails } from "@/lib/api/espn";
import type { NormalizedAthlete } from "@/types/athlete";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = Math.min(limit, 1000);
    const offset = (page - 1) * pageSize;

    const athleteRefs = await fetchAllAthleteRefs(1000);
    const totalCount = athleteRefs.items.length;
    const pageItems = athleteRefs.items.slice(offset, offset + pageSize);

    const results = await Promise.all(
      pageItems.map(async (item) => {
        const refUrl = item.$ref;
        const idMatch = refUrl.match(/athletes\/(\d+)/);
        const athleteId = idMatch ? idMatch[1] : "";

        if (!athleteId) {
          return null;
        }

        try {
          const details = await fetchAthleteDetails(athleteId);
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
          } as NormalizedAthlete;
        } catch {
          return null;
        }
      })
    );

    const athletes = results.filter(
      (a): a is NormalizedAthlete => a !== null
    );

    return NextResponse.json({
      athletes,
      totalCount,
      page,
      pageSize,
      totalPages: Math.ceil(totalCount / pageSize),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch athletes";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
