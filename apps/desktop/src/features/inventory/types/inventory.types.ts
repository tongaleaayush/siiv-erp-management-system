export type InventoryTransactionType =
  | "IN"
  | "OUT";



export interface InventoryTransaction {

  id: string;

  transactionDate: string;


  productId: string;

  productCode: string;

  productName: string;


  transactionType:
    "IN" | "OUT";


  quantity: number;

  stockAfterTransaction: number;


  batchNumber: string;


  serialNumbers: string[];


  referenceType:
    string;


  remarks: string;

  createdBy: string;

  createdAt: string;

  updatedAt: string;

}




export interface InventoryBatch {

  id: string;


  batchNumber: string;


  productId: string;


  productCode: string;

  productName: string;


  quantity?: number;


  originalQuantity?: number;


  availableQuantity: number;


  receivedDate: string;


  createdAt: string;

   createdTimestamp: number;

  updatedAt?: string;

}





export type SerialStatus =
  | "AVAILABLE"
  | "ISSUED";



export interface ProductSerial {

  id: string;


  serialNumber: string;


  productId: string;


  productCode: string;


  productName: string;


  batchNumber: string;


  status: SerialStatus;


  issuedReferenceId?: string;


  issuedDate?: string;


  createdAt: string;


  updatedAt?: string;

}