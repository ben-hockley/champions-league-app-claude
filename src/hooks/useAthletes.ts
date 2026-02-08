"use client";

import useSWR from "swr";
import type { NormalizedAthlete } from "@/types/athlete";

interface AthletesResponse {
  athletes: NormalizedAthlete[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useAthletes(page = 1, limit = 24) {
  const { data, error, isLoading } = useSWR<AthletesResponse>(
    `/api/athletes?page=${page}&limit=${limit}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes
      errorRetryCount: 3,
    }
  );

  return {
    athletes: data?.athletes || [],
    totalCount: data?.totalCount || 0,
    totalPages: data?.totalPages || 0,
    isLoading,
    isError: !!error,
    error,
  };
}
