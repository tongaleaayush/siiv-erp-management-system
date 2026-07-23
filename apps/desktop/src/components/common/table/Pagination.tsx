import type { Table } from "@tanstack/react-table";

interface PaginationProps<TData> {
  table: Table<TData>;
  totalRows: number;
}

function Pagination<TData>({
  table,
  totalRows,
}: PaginationProps<TData>) {
  const {
    pageIndex,
    pageSize,
  } = table.getState().pagination;

  const pageCount = table.getPageCount();

  const start = pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, totalRows);

  const createPagination = () => {
    const pages: (number | "...")[] = [];

    if (pageCount <= 7) {
      for (let i = 0; i < pageCount; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(0);

    if (pageIndex > 3) {
      pages.push("...");
    }

    const startPage = Math.max(1, pageIndex - 2);
    const endPage = Math.min(pageCount - 2, pageIndex + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (pageIndex < pageCount - 4) {
      pages.push("...");
    }

    pages.push(pageCount - 1);

    return pages;
  };

  const pages = createPagination();

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-6 py-3 lg:flex-row lg:items-center lg:justify-between">
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="rounded-md border border-slate-300 px-3 py-1.5 text-sm transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
      >
        Previous
      </button>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          {pages.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-slate-400"
                >
                  ...
                </span>
              );
            }

            const isActive = page === pageIndex;

            return (
              <button
                key={page}
                onClick={() => table.setPageIndex(page)}
                className={`flex h-10 w-10 items-center justify-center rounded-md border text-sm transition-colors ${
                  isActive
                    ? "border-blue-600 bg-blue-50 font-semibold text-blue-700"
                    : "border-slate-300 hover:bg-slate-100"
                }`}
              >
                {page + 1}
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="rounded-md border border-slate-300 px-3 py-1.5 text-sm transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;