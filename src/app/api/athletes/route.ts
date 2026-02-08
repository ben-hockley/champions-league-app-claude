import { NextResponse } from "next/server";
import {
  fetchAllAthleteRefs,
  fetchNormalizedAthlete,
} from "@/lib/api/espn";
import type { NormalizedAthlete } from "@/types/athlete";

export async function GET() {
  try {
    const athleteRefs = await fetchAllAthleteRefs(1000);
    const totalCount = athleteRefs.items.length;

    const results = await Promise.all(
      athleteRefs.items.map(async (item) => {
        const idMatch = item.$ref.match(/athletes\/(\d+)/);
        const athleteId = idMatch ? idMatch[1] : "";

        if (!athleteId) {
          return null;
        }

        try {
          return await fetchNormalizedAthlete(athleteId);
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
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch athletes";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
