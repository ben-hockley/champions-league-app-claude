import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[80vh]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            ⚽ UEFA Champions League
          </h1>
          <p className="text-xl text-blue-200 mb-2">
            Players &amp; Statistics
          </p>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10">
            Explore comprehensive player profiles and statistics from the
            world&apos;s most prestigious club football competition. Data
            powered by ESPN.
          </p>
          <Link
            href="/players"
            className="inline-block bg-white text-[#1a1a2e] font-bold px-8 py-4 rounded-full text-lg hover:bg-blue-100 transition-colors shadow-lg"
          >
            Browse All Players →
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-100">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Player Profiles
            </h3>
            <p className="text-sm text-gray-500">
              View detailed profiles for hundreds of Champions League athletes
              including personal info, teams, and positions.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-100">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Search &amp; Filter
            </h3>
            <p className="text-sm text-gray-500">
              Find players by name, position, nationality, or team with
              real-time search and filtering capabilities.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-100">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Statistics
            </h3>
            <p className="text-sm text-gray-500">
              Access player statistics including physical attributes, career
              details, and performance data.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
