import type { ExportColumn } from "@/components/common/export";
import type { Product } from "../types/product.types";

export const productExportColumns: ExportColumn<Product>[] = [
  {
    header: "Product Code",
    accessor: (product) => product.productCode,
  },
  {
    header: "Product Name",
    accessor: (product) => product.productName,
  },
  {
    header: "Unit",
    accessor: (product) => product.unit,
  },
  {
    header: "HSN Code",
    accessor: (product) => product.hsnCode,
  },
  {
    header: "SGST",
    accessor: (product) => `${product.sgst}%`,
  },
  {
    header: "CGST",
    accessor: (product) => `${product.cgst}%`,
  },
  {
    header: "IGST",
    accessor: (product) => `${product.igst}%`,
  },
  {
    header: "Rate",
    accessor: (product) => product.rate,
  },
  {
    header: "Stock",
    accessor: (product) => product.stock,
  },
];