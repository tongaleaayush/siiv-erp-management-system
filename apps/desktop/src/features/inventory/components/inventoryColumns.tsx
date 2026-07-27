import type { ColumnDef } from "@tanstack/react-table";

import type {
  InventoryTransaction,
} from "../types/inventory.types";







export const inventoryColumns:
  ColumnDef<InventoryTransaction>[] = [



  {
    accessorKey: "transactionDate",

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
  accessorKey:
    "stockAfterTransaction",

  header:
    "Stock",

},



  {
    id: "batchNumber",

    header: "Batch",


    cell: ({
      row,
    }) => {


      return (
        row.original.batchNumber
      );


    },

  },



  {
    accessorKey: "remarks",

    header: "Remarks",

    enableSorting: false,

  },


];