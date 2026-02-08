"use client";

import useSWR from "swr";
import type { NormalizedAthlete } from "@/types/athlete";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useAthleteDetails(id: string | null) {
  const { data, error, isLoading } = useSWR<NormalizedAthlete>(
    id ? `/api/athletes/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000,
    }
  );

  return {
    athlete: data || null,
    isLoading,
    isError: !!error,
    error,
  };
}
