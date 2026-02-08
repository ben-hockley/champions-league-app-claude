import { NextResponse } from "next/server";
import { fetchNormalizedAthlete } from "@/lib/api/espn";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const athlete = await fetchNormalizedAthlete(id);
    return NextResponse.json(athlete);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch athlete";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
