"use client";

import { useRouter } from "next/navigation";

interface PaginationProps {
  next: string | null;
  previous: string | null;
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  next,
  previous,
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();

  const goToPage = (page: number) => {
    router.push(`/?page=${page}`);
  };

  const generatePages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      // If few pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 4) {
        pages.push("...");
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = generatePages();

  return (
    <div className="content flex justify-center mt-6 space-x-2 flex-wrap">
      {previous && (
        <button
          onClick={() => goToPage(currentPage - 1)}
          className="px-4 py-2 rounded-md bg-[#ffc831] text-black font-medium hover:opacity-90 transition"
        >
          Previous
        </button>
      )}

      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="px-3 py-2 text-gray-500 font-medium"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`w-10 h-10 rounded-md font-medium transition ${
              page === currentPage
                ? "bg-[#ffc831] text-black"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        )
      )}

      {next && (
        <button
          onClick={() => goToPage(currentPage + 1)}
          className="px-4 py-2 rounded-md bg-[#ffc831] text-black font-medium hover:opacity-90 transition"
        >
          Next
        </button>
      )}
    </div>
  );
}
