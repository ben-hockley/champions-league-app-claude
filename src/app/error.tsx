"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl mb-6">⚠️</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Something went wrong
        </h2>
        <p className="text-gray-500 mb-6">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-[#1a1a2e] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#16213e] transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
