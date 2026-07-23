import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";

import type { Product } from "../types/product.types";

interface ProductColumnsProps {
  onView?: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export const productColumns = ({
  onView,
  onEdit,
  onDelete,
}: ProductColumnsProps): ColumnDef<Product>[] => [
  {
    accessorKey: "productCode",
    header: "Product Code",
  },
  {
  accessorKey: "productName",
  header: "Product Name",
  cell: ({ row }) => (
    <div
      className="
        max-w-[350px]
        whitespace-normal
        break-words
        leading-5
      "
    >
      {row.original.productName}
    </div>
  ),
},
  {
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "hsnCode",
    header: "HSN Code",
  },
  {
    accessorKey: "sgst",
    header: "SGST",
    enableSorting: false,
    cell: ({ row }) => `${row.original.sgst}%`,
  },
  {
    accessorKey: "cgst",
    header: "CGST",
    enableSorting: false,
    cell: ({ row }) => `${row.original.cgst}%`,
  },
  {
    accessorKey: "igst",
    header: "IGST",
    enableSorting: false,
    cell: ({ row }) => `${row.original.igst}%`,
  },
  {
    accessorKey: "rate",
    header: "Rate",
    cell: ({ row }) =>
      `₹${row.original.rate.toLocaleString("en-IN")}`,
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    id: "actions",
    enableSorting: false,
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex items-center justify-center gap-3">
          <Eye
            className="h-4 w-4 cursor-pointer text-slate-500 transition-colors hover:text-blue-600"
            onClick={() => onView?.(product)}
          />

          <Pencil
            className="h-4 w-4 cursor-pointer text-slate-500 transition-colors hover:text-amber-600"
            onClick={() => onEdit?.(product)}
          />

          <Trash2
            className="h-4 w-4 cursor-pointer text-slate-500 transition-colors hover:text-red-600"
            onClick={() => onDelete?.(product)}
          />
        </div>
      );
    },
  },
];