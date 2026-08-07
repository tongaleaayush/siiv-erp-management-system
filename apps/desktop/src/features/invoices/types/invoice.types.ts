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



  // Address Details

  billingAddress: string;

  shippingAddress: string;



  billingGSTNumber?: string;

  shippingGSTNumber?: string;



  // Supply Details

  transportationMode?: string;

  vehicleNumber?: string;

  dateOfSupply?: string;


  placeOfSupply?: string;


  // State Details

  state?: string;

  stateCode?: string;



  billingState?: string;

  shippingState?: string;



  poNumber?: string;

  poDate?: string;



  // Items

  items: InvoiceItem[];



  // Amount Details

  subtotal: number;


  cgstRate?: number;

  cgstAmount?: number;


  sgstRate?: number;

  sgstAmount?: number;


  igstRate?: number;

  igstAmount?: number;


  roundOff?: number;


  grandTotal: number;



  // Bank Details

  bankName?: string;

  accountNumber?: string;

  ifscCode?: string;



  // Status

  status: InvoiceStatus;



  createdAt: string;

  updatedAt: string;

}