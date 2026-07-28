export type InvoiceStatus =
  | "DRAFT"
  | "CONFIRMED"
  | "CANCELLED";



export interface InvoiceItem {

  id: string;

  invoiceId: string;


  productId: string;

  productCode: string;

  productName: string;

  hsnCode: string;


  quantity: number;

  unit: string;


  rate: number;

  amount: number;

}



export interface Invoice {


  id: string;


  invoiceNumber: string;


  invoiceDate: string;



  customerId: string;


  customerName: string;


  customerGSTNumber: string;


  billingAddress: string;


  shippingAddress: string;



  items: InvoiceItem[];



  subtotal: number;



  cgstRate?: number;

  cgstAmount?: number;



  sgstRate?: number;

  sgstAmount?: number;



  igstRate?: number;

  igstAmount?: number;



  grandTotal: number;



  status: InvoiceStatus;



  vehicleNumber?: string;


  poNumber?: string;


  poDate?: string;

    placeOfSupply?: string;

  stateCode?: string;


  bankName?: string;

  accountNumber?: string;

  ifscCode?: string;



  createdAt: string;


  updatedAt: string;

}