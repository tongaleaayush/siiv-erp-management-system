export interface InventoryFormData {
  inventoryCode: string;

  date: string;

  productId: string;

  productCode: string;

  productName: string;

  transactionType: "IN" | "OUT";

  quantity: number;

  unit: string;

  remarks: string;
}