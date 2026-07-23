export interface Product {
  id: string;

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