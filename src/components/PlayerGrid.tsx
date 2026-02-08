"use client";

import type { NormalizedAthlete } from "@/types/athlete";
import PlayerCard from "./PlayerCard";
import LoadingSkeleton from "./LoadingSkeleton";

interface PlayerGridProps {
  athletes: NormalizedAthlete[];
  isLoading?: boolean;
}

export default function PlayerGrid({ athletes, isLoading }: PlayerGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <LoadingSkeleton key={i} type="card" />
        ))}
      </div>
    );
  }

  if (athletes.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="text-5xl mb-4">🔍</p>
        <p className="text-lg font-medium">No players found</p>
        <p className="text-sm mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {athletes.map((athlete) => (
        <PlayerCard key={athlete.id} player={athlete} />
      ))}
    </div>
  );
}
