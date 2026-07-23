export interface ProductFormData {
  productCode: string;
  productName: string;

  unit: string;

  hsnCode: string;

  sgst: number;
  cgst: number;
  igst: number;

  rate: number;

  stock: number;
}

export const initialProductFormData: ProductFormData = {
  productCode: "",
  productName: "",

  unit: "",

  hsnCode: "",
  sgst: 0,
  cgst: 0,
  igst: 0,

  rate: 0,

  stock: 0,
};