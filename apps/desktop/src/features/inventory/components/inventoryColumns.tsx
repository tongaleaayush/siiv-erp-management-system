import type { ColumnDef } from "@tanstack/react-table";

import type { InventoryEntry } from "../types/inventory.types";


export const inventoryColumns: ColumnDef<InventoryEntry>[] = [

  {
    accessorKey: "inventoryCode",
    header: "Inventory Code",
  },

  {
    accessorKey: "date",
    header: "Date",
  },

  {
    accessorKey: "productCode",
    header: "Product Code",
  },

  {
    accessorKey: "productName",
    header: "Product",
  },

  {
    accessorKey: "transactionType",
    header: "Type",
  },

  {
    accessorKey: "quantity",
    header: "Quantity",
  },

  {
    accessorKey: "remainingQuantity",
    header: "Remaining",
  },

  {
    accessorKey: "stockBalance",
    header: "Stock Balance",
  },

  {
    accessorKey: "unit",
    header: "Unit",
  },

];