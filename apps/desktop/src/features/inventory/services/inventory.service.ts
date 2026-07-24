import type { InventoryEntry } from "../types/inventory.types";


let inventoryData: InventoryEntry[] = [
  {
    id: "1",

    inventoryCode: "INV-0001",

    date: "2026-07-24",

    productId: "1",

    productCode: "PROD-0001",

    productName: "Laptop",

    transactionType: "IN",

    quantity: 10,

    remainingQuantity: 10,

    unit: "Nos",

    stockBalance: 10,

    remarks: "Initial Stock",

    createdAt: "2026-07-24",

    updatedAt: "2026-07-24",
  },


  {
    id: "2",

    inventoryCode: "INV-0002",

    date: "2026-07-24",

    productId: "2",

    productCode: "PROD-0002",

    productName: "Keyboard",

    transactionType: "IN",

    quantity: 20,

    remainingQuantity: 20,

    unit: "Nos",

    stockBalance: 20,

    remarks: "Purchase Entry",

    createdAt: "2026-07-24",

    updatedAt: "2026-07-24",
  },
];



export const inventoryService = {


  getInventory():
    InventoryEntry[] {

    return inventoryData;

  },


  addInventory(
    entry: InventoryEntry
  ): InventoryEntry {


    inventoryData = [
      entry,
      ...inventoryData,
    ];


    return entry;

  },


};