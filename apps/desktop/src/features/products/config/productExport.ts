import type { ExportColumn } from "@/services/export";

import type { Product } from "../types/product.types";


export const productExportColumns:
  ExportColumn<Product>[] = [

  {
    header: "Product Code",

    accessor: (
      product: Product
    ) =>
      product.productCode,
  },


  {
    header: "Product Name",

    accessor: (
      product: Product
    ) =>
      product.productName,
  },


  {
    header: "Unit",

    accessor: (
      product: Product
    ) =>
      product.unit,
  },


  {
    header: "HSN Code",

    accessor: (
      product: Product
    ) =>
      product.hsnCode,
  },


  {
    header: "SGST",

    accessor: (
      product: Product
    ) =>
      `${product.sgst}%`,
  },


  {
    header: "CGST",

    accessor: (
      product: Product
    ) =>
      `${product.cgst}%`,
  },


  {
    header: "IGST",

    accessor: (
      product: Product
    ) =>
      `${product.igst}%`,
  },


  {
    header: "Rate",

    accessor: (
      product: Product
    ) =>
      product.rate,
  },


  {
    header: "Stock",

    accessor: (
      product: Product
    ) =>
      product.stock,
  },

];