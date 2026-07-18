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

  const start = pageIndex * pageSize + 1;

  const end = Math.min(
    (pageIndex + 1) * pageSize,
    totalRows
  );

  return (
    <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="rounded-md border border-slate-300 px-4 py-2 text-sm transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      <div className="flex items-center gap-6">
        <span className="text-sm text-slate-600">
          Showing {start} to {end} of {totalRows} entries
        </span>

        <div className="flex items-center gap-2">
          {Array.from(
            { length: table.getPageCount() },
            (_, index) => (
              <button
                key={index}
                onClick={() => table.setPageIndex(index)}
                className={`h-9 w-9 rounded-md border text-sm transition-colors ${
                  table.getState().pagination.pageIndex === index
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300 hover:bg-slate-100"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>

      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="rounded-md border border-slate-300 px-4 py-2 text-sm transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;