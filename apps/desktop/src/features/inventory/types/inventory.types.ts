export interface InventoryEntry {
  id: string;

  inventoryCode: string;

  date: string;

  productId: string;

  productCode: string;

  productName: string;

  transactionType: "IN" | "OUT";

  quantity: number;

  remainingQuantity: number;

  unit: string;

  stockBalance: number;

  remarks: string;

  createdAt: string;

  updatedAt: string;
}