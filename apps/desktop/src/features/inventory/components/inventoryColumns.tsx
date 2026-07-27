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
    id: "batchNumbers",

    header: "Batches",

    cell: ({
      row,
    }) => {

      return (
        row.original.batchNumbers.join(
          ", "
        )
      );

    },

  },


  {
    id: "serialCount",

    header: "Serial Count",

    cell: ({
      row,
    }) => {

      return (
        row.original.serialNumbers.length
      );

    },

  },


  {
    accessorKey: "remarks",

    header: "Remarks",

  },

];