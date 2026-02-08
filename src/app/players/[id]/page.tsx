"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAthleteDetails } from "@/hooks/useAthleteDetails";
import StatsTable from "@/components/StatsTable";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function PlayerDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : null;
  const { athlete, isLoading, isError } = useAthleteDetails(id);

  if (isLoading) {
    return <LoadingSkeleton type="detail" />;
  }

  if (isError || !athlete) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-5xl mb-4">😞</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Player Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          We couldn&apos;t load this player&apos;s details. The data may be
          temporarily unavailable.
        </p>
        <Link
          href="/players"
          className="inline-block bg-[#1a1a2e] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#16213e] transition-colors"
        >
          ← Back to Players
        </Link>
      </div>
    );
  }

  const personalStats = [
    ...(athlete.age ? [{ label: "Age", value: athlete.age }] : []),
    ...(athlete.dateOfBirth
      ? [
          {
            label: "Date of Birth",
            value: new Date(athlete.dateOfBirth).toLocaleDateString(),
          },
        ]
      : []),
    ...(athlete.citizenship
      ? [{ label: "Nationality", value: athlete.citizenship }]
      : []),
    ...(athlete.height ? [{ label: "Height", value: athlete.height }] : []),
    ...(athlete.weight ? [{ label: "Weight", value: athlete.weight }] : []),
    ...(athlete.jersey
      ? [{ label: "Jersey Number", value: `#${athlete.jersey}` }]
      : []),
    ...(athlete.position
      ? [{ label: "Position", value: athlete.position }]
      : []),
    ...(athlete.teamName
      ? [{ label: "Team", value: athlete.teamName }]
      : []),
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/players"
        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-8"
      >
        ← Back to Players
      </Link>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              {athlete.headshot ? (
                <Image
                  src={athlete.headshot}
                  alt={athlete.displayName}
                  width={160}
                  height={160}
                  className="rounded-full border-4 border-white/20 object-cover"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-white/10 flex items-center justify-center text-6xl">
                  ⚽
                </div>
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-extrabold tracking-tight">
                {athlete.displayName}
              </h1>
              {athlete.position && (
                <p className="text-blue-200 text-lg mt-1">
                  {athlete.position}
                </p>
              )}
              {athlete.teamName && (
                <div className="flex items-center gap-3 mt-3 justify-center md:justify-start">
                  {athlete.teamLogo && (
                    <Image
                      src={athlete.teamLogo}
                      alt={athlete.teamName}
                      width={32}
                      height={32}
                    />
                  )}
                  <span className="text-gray-300">{athlete.teamName}</span>
                </div>
              )}
              {athlete.jersey && (
                <span className="inline-block mt-3 bg-white/20 text-white px-4 py-1 rounded-full text-sm font-bold">
                  #{athlete.jersey}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="p-8">
          <StatsTable stats={personalStats} title="Player Information" />
        </div>
      </div>
    </div>
  );
}
