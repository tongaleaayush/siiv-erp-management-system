import type { ExportColumn } from "@/services/export";

import type {
  InventoryTransaction,
} from "../types/inventory.types";


export const inventoryExportColumns:
  ExportColumn<InventoryTransaction>[] = [


  {
    header: "Date",

    accessor: (
      transaction
    ) =>
      transaction.transactionDate,
  },


  {
    header: "Product Code",

    accessor: (
      transaction
    ) =>
      transaction.productCode,
  },


  {
    header: "Product Name",

    accessor: (
      transaction
    ) =>
      transaction.productName,
  },


  {
    header: "Transaction Type",

    accessor: (
      transaction
    ) =>
      transaction.transactionType,
  },


  {
    header: "Quantity",

    accessor: (
      transaction
    ) =>
      transaction.quantity,
  },


  {
    header: "Batch Numbers",

    accessor: (
      transaction
    ) =>
      transaction.batchNumbers.join(
        ", "
      ),
  },


  {
    header: "Serial Count",

    accessor: (
      transaction
    ) =>
      transaction.serialNumbers.length,
  },


  {
    header: "Remarks",

    accessor: (
      transaction
    ) =>
      transaction.remarks,
  },

];