import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import Pagination from "./Pagination";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

function DataTable<TData>({
  columns,
  data,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
    },

    initialState: {
      pagination: {
        pageSize: 10,
      },
    },

    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    enableSortingRemoval: false,
  });

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      {/* Scrollable Table */}
      <div className="max-h-[600px] overflow-auto">
        <table className="min-w-max w-full">
          <thead className="sticky top-0 z-10 bg-slate-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="flex items-center gap-2 transition-colors hover:text-slate-900"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {header.column.getIsSorted() === "asc" ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <ArrowDown className="h-4 w-4" />
                        ) : (
                          <ArrowUpDown className="h-4 w-4 text-slate-400" />
                        )}
                      </button>
                    ) : (
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

         <tbody>
  {table.getRowModel().rows.length > 0 ? (
    table.getRowModel().rows.map((row) => (
      <tr
        key={row.id}
        className="border-t border-slate-200 transition-colors hover:bg-slate-50"
      >
        {row.getVisibleCells().map((cell) => (
          <td
            key={cell.id}
            className="px-6 py-4 text-sm text-slate-700"
          >
            {flexRender(
              cell.column.columnDef.cell,
              cell.getContext()
            )}
          </td>
        ))}
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan={table.getAllColumns().length}
        className="px-6 py-10 text-center text-sm text-slate-500"
      >
        No records found.
      </td>
    </tr>
  )}
</tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        table={table}
        totalRows={data.length}
      />
    </div>
  );
}

export default DataTable;