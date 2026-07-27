export interface InventoryBatch {
  id: string;

  batchNumber: string;

  productId: string;

  productCode: string;

  productName: string;

  receivedDate: string;

  quantity: number;

  availableQuantity: number;

  createdAt: string;

  updatedAt: string;
}



export interface ProductSerial {
  id: string;

  serialNumber: string;

  productId: string;

  productCode: string;

  productName: string;

  batchNumber: string;

  status: "AVAILABLE" | "ISSUED";

  issuedDate?: string;

  createdAt: string;
}



export interface InventoryTransaction {
  id: string;

  transactionDate: string;

  productId: string;

  productCode: string;

  productName: string;

  transactionType: "IN" | "OUT";

  quantity: number;

  batchNumbers: string[];

  serialNumbers: string[];

  remarks: string;

  createdAt: string;
}