"use client";

import Image from "next/image";
import Link from "next/link";
import type { NormalizedAthlete } from "@/types/athlete";

interface PlayerCardProps {
  player: NormalizedAthlete;
}

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <Link
      href={`/players/${player.id}`}
      className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-100"
    >
      <div className="relative h-48 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center">
        {player.headshot ? (
          <Image
            src={player.headshot}
            alt={player.displayName}
            width={120}
            height={120}
            className="rounded-full border-4 border-white/20 object-cover"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-white/10 flex items-center justify-center text-4xl text-white/60">
            ⚽
          </div>
        )}
        {player.jersey && (
          <span className="absolute top-3 right-3 bg-white/20 text-white text-sm font-bold px-2 py-1 rounded">
            #{player.jersey}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 truncate">
          {player.displayName}
        </h3>
        {player.position && (
          <p className="text-sm text-blue-600 font-medium">{player.position}</p>
        )}
        {player.teamName && (
          <p className="text-sm text-gray-500 mt-1">{player.teamName}</p>
        )}
        <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
          {player.age && <span>Age: {player.age}</span>}
          {player.citizenship && <span>{player.citizenship}</span>}
        </div>
      </div>
    </Link>
  );
}
