import type { ExportColumn } from "@/services/export";

import type { InventoryEntry } from "../types/inventory.types";

export const inventoryExportColumns: ExportColumn<InventoryEntry>[] = [
  {
    header: "Inventory Code",
    accessor: (entry: InventoryEntry) => entry.inventoryCode,
  },
  {
    header: "Date",
    accessor: (entry: InventoryEntry) => entry.date,
  },
  {
    header: "Product Code",
    accessor: (entry: InventoryEntry) => entry.productCode,
  },
  {
    header: "Product Name",
    accessor: (entry: InventoryEntry) => entry.productName,
  },
  {
    header: "Transaction Type",
    accessor: (entry: InventoryEntry) => entry.transactionType,
  },
  {
    header: "Quantity",
    accessor: (entry: InventoryEntry) => entry.quantity,
  },
  {
    header: "Unit",
    accessor: (entry: InventoryEntry) => entry.unit,
  },
  {
    header: "Remarks",
    accessor: (entry: InventoryEntry) => entry.remarks,
  },
];