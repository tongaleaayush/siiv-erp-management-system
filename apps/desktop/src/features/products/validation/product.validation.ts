import type { ProductFormData } from "../types/productForm";

export interface ProductFormErrors {
  productCode?: string;
  productName?: string;
  unit?: string;
  hsnCode?: string;
  sgst?: string;
  cgst?: string;
  igst?: string;
  rate?: string;
  stock?: string;
}

export function validateProductForm(
  data: ProductFormData
): ProductFormErrors {
  const errors: ProductFormErrors = {};

  if (!data.productCode.trim()) {
    errors.productCode = "Product Code is required.";
  }

  if (!data.productName.trim()) {
    errors.productName = "Product Name is required.";
  }

  if (!data.unit.trim()) {
    errors.unit = "Unit is required.";
  }

  if (!data.hsnCode.trim()) {
    errors.hsnCode = "HSN Code is required.";
  }

  if (data.sgst < 0) {
    errors.sgst = "SGST cannot be negative.";
  }

  if (data.cgst < 0) {
    errors.cgst = "CGST cannot be negative.";
  }

  if (data.igst < 0) {
    errors.igst = "IGST cannot be negative.";
  }

  if (data.rate < 0) {
    errors.rate = "Rate cannot be negative.";
  }

  if (data.stock < 0) {
    errors.stock = "Stock cannot be negative.";
  }

  return errors; 
}