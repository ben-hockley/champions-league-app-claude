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
    `/api/athletes?page=1&limit=1000`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 600000, // 10 minutes
      errorRetryCount: 3,
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
