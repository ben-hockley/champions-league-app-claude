"use client";

interface Stat {
  label: string;
  value: string | number;
}

interface StatsTableProps {
  stats: Stat[];
  title?: string;
}

export default function StatsTable({ stats, title }: StatsTableProps) {
  if (stats.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 text-sm">
        No statistics available
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      {title && (
        <h3 className="text-lg font-bold px-6 py-4 border-b border-gray-100 text-gray-900">
          {title}
        </h3>
      )}
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-left text-gray-500 text-xs uppercase tracking-wider">
            <th className="px-6 py-3">Stat</th>
            <th className="px-6 py-3 text-right">Value</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat, i) => (
            <tr
              key={stat.label}
              className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
            >
              <td className="px-6 py-3 text-gray-700">{stat.label}</td>
              <td className="px-6 py-3 text-right font-semibold text-gray-900">
                {stat.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
