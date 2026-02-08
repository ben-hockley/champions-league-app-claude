"use client";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalResults: number;
  startIndex: number;
  endIndex: number;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  totalResults,
  startIndex,
  endIndex,
}: PaginationControlsProps) {
  if (totalResults === 0) return null;

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const delta = 2;

    pages.push(1);

    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    if (rangeStart > 2) {
      pages.push("ellipsis");
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < totalPages - 1) {
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const btnBase =
    "px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors";
  const btnActive = "bg-blue-600 text-white border-blue-600";
  const btnDefault =
    "bg-white border-gray-200 hover:bg-gray-50 text-gray-700";
  const btnDisabled = "opacity-40 cursor-not-allowed";

  return (
    <div className="flex flex-col items-center gap-3 mt-8">
      <p className="text-sm text-gray-500">
        Showing {startIndex}–{endIndex} of {totalResults} players
      </p>
      <div className="flex flex-wrap items-center justify-center gap-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage <= 1}
          className={`${btnBase} ${currentPage <= 1 ? btnDisabled : btnDefault}`}
          aria-label="First page"
        >
          «
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`${btnBase} ${currentPage <= 1 ? btnDisabled : btnDefault}`}
          aria-label="Previous page"
        >
          ‹ Prev
        </button>

        {getPageNumbers().map((item, idx) =>
          item === "ellipsis" ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
              …
            </span>
          ) : (
            <button
              key={item}
              onClick={() => onPageChange(item)}
              className={`${btnBase} ${item === currentPage ? btnActive : btnDefault}`}
              aria-label={`Page ${item}`}
              aria-current={item === currentPage ? "page" : undefined}
            >
              {item}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`${btnBase} ${currentPage >= totalPages ? btnDisabled : btnDefault}`}
          aria-label="Next page"
        >
          Next ›
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          className={`${btnBase} ${currentPage >= totalPages ? btnDisabled : btnDefault}`}
          aria-label="Last page"
        >
          »
        </button>
      </div>
    </div>
  );
}
