import type {
  ColumnDef,
} from "@tanstack/react-table";


import type {
  Invoice,
} from "../types/invoice.types";



export const invoiceColumns:
  ColumnDef<Invoice>[] = [


 {
  id:
    "invoiceNumber",

  accessorKey:
    "invoiceNumber",

  header:
    "Invoice No",

},



  {
    accessorKey:
      "invoiceDate",

    header:
      "Date",

  },



  {
    accessorKey:
      "customerName",

    header:
      "Customer",

  },



  {
    accessorKey:
      "customerGSTNumber",

    header:
      "GST No",

  },



  {
    accessorKey:
      "grandTotal",

    header:
      "Amount",

    cell: ({
      row,
    }) => {


      return (
        `₹ ${row.original.grandTotal.toFixed(2)}`
      );


    },

  },



  {
    accessorKey:
      "status",

    header:
      "Status",

  },


];