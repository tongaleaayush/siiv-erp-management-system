import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui";

import type { Customer } from "../types/customer.types";

export const customerColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: "customerCode",
    header: "Customer Code",
  },
  {
    accessorKey: "companyName",
    header: "Company",
  },
  {
    accessorKey: "contactPerson",
    header: () => (
      <span className="whitespace-nowrap">
        Contact Person
      </span>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    enableSorting: false,
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "isActive",
    header: "Status",
    enableSorting: false,
    cell: ({ row }) => {
      const isActive = row.original.isActive;

      return (
        <Badge variant={isActive ? "success" : "danger"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableSorting: false,
    header: "Actions",
    cell: () => (
      <div className="flex items-center justify-center gap-3">
        <Eye className="h-4 w-4 cursor-pointer text-slate-500 transition-colors hover:text-blue-600" />

        <Pencil className="h-4 w-4 cursor-pointer text-slate-500 transition-colors hover:text-amber-600" />

        <Trash2 className="h-4 w-4 cursor-pointer text-slate-500 transition-colors hover:text-red-600" />
      </div>
    ),
  },
];