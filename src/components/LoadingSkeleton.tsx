interface LoadingSkeletonProps {
  type?: "card" | "detail" | "table";
}

export default function LoadingSkeleton({
  type = "card",
}: LoadingSkeletonProps) {
  if (type === "detail") {
    return (
      <div className="animate-pulse max-w-3xl mx-auto px-4 py-8">
        <div className="h-6 w-32 bg-gray-200 rounded mb-8" />
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto md:mx-0" />
          <div className="flex-1 space-y-4">
            <div className="h-8 w-64 bg-gray-200 rounded" />
            <div className="h-5 w-40 bg-gray-200 rounded" />
            <div className="h-5 w-52 bg-gray-200 rounded" />
            <div className="h-5 w-36 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="animate-pulse bg-white rounded-xl p-6 shadow-md">
        <div className="h-6 w-40 bg-gray-200 rounded mb-4" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex justify-between py-3">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="animate-pulse bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
      <div className="h-48 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        <div className="h-3 w-2/3 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
