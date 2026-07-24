import { Search } from "lucide-react";

import { Input } from "@/components/ui";

interface DataTableToolbarProps {
  searchValue: string;
  searchPlaceholder?: string;
  onSearchChange: (value: string) => void;

  statusFilter?: string;
  onStatusFilterChange?: (value: string) => void;
}

const DataTableToolbar = ({
  searchValue,
  searchPlaceholder = "Search...",
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: DataTableToolbarProps) => {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <div className="flex items-end gap-4">
        <div className="flex flex-col gap-1">
          

          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <Input
              type="text"
              value={searchValue}
              placeholder={searchPlaceholder}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {statusFilter !== undefined &&
          onStatusFilterChange !== undefined && (
            <div className="flex flex-col gap-1">
              
              <select
                value={statusFilter}
                onChange={(e) =>
                  onStatusFilterChange(e.target.value)
                }
                className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm outline-none transition-colors focus:border-blue-500"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          )}
      </div>
    </div>
  );
};

export default DataTableToolbar;