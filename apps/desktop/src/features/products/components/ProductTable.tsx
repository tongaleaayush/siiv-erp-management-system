import { useMemo } from "react";

import { DataTable } from "@/components/common/table";

import { productColumns } from "./productColumns";

import type { Product } from "../types/product.types";

interface ProductTableProps {
  products: Product[];
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductTable = ({
  products,
  onView,
  onEdit,
  onDelete,
}: ProductTableProps) => {
  const columns = useMemo(
    () =>
      productColumns({
        onView,
        onEdit,
        onDelete,
      }),
    [onView, onEdit, onDelete]
  );

  return (
    <DataTable
      columns={columns}
      data={products}
    />
  );
};

export default ProductTable;