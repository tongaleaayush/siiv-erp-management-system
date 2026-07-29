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


  billingGSTNumber?: string;


  shippingGSTNumber?: string;




  transportationMode?: string;


  vehicleNumber?: string;


  dateOfSupply?: string;


  placeOfSupply?: string;


  state?: string;


  stateCode?: string;


  poNumber?: string;


  poDate?: string;




  items: InvoiceItem[];



  subtotal: number;


  cgstRate?: number;


  cgstAmount?: number;


  sgstRate?: number;


  sgstAmount?: number;


  igstRate?: number;


  igstAmount?: number;


  roundOff?: number;


  grandTotal: number;



  bankName?: string;


  accountNumber?: string;


  ifscCode?: string;



  status: InvoiceStatus;


  createdAt: string;


  updatedAt: string;

}