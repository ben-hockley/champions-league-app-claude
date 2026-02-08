"use client";

import useSWR from "swr";
import type { NormalizedAthlete } from "@/types/athlete";

interface AllAthletesResponse {
  athletes: NormalizedAthlete[];
  totalCount: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useAllAthletes() {
  const { data, error, isLoading } = useSWR<AllAthletesResponse>(
    `/api/athletes`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 1800000, // 30 minutes
      shouldRetryOnError: false,
    }
  );

  return {
    athletes: data?.athletes || [],
    totalCount: data?.totalCount || 0,
    isLoading,
    isError: !!error,
    error,
  };
}
