import type { Product } from "../types/product.types";
import type { ProductFormData } from "../types/productForm";

export function mapProductToForm(
  product: Product
): ProductFormData {
  return {
    productCode: product.productCode,
    productName: product.productName,

    unit: product.unit,

    hsnCode: product.hsnCode,

    sgst: product.sgst,
    cgst: product.cgst,
    igst: product.igst,

    rate: product.rate,

    stock: product.stock,
  };
}

export function mapFormToProduct(
  id: string,
  data: ProductFormData
): Product {
  return {
    id,

    productCode: data.productCode,
    productName: data.productName,

    unit: data.unit,

    hsnCode: data.hsnCode,

    sgst: data.sgst,
    cgst: data.cgst,
    igst: data.igst,

    rate: data.rate,

    stock: data.stock,
  };
}