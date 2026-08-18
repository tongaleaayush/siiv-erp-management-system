import {
  useState,
} from "react";


import {
  DataTable,
} from "@/components/common/table";


import {
  invoiceColumns,
} from "../config/invoiceColumns";


import type {
  Invoice,
} from "../types/invoice.types";


import InvoiceDetailsDialog from "./InvoiceDetailsDialog";



interface InvoiceTableProps {

  invoices: Invoice[];

  onCancelInvoice: (invoice: Invoice) => void;

}




const InvoiceTable = ({

  invoices,

  onCancelInvoice,

}: InvoiceTableProps) => {



  const [
    selectedInvoice,
    setSelectedInvoice,
  ] = useState<Invoice | null>(null);





 const columns =
invoiceColumns.map(
      (column) => {


        if (
          column.id === "invoiceNumber"
        ) {


          return {

            ...column,


            cell: ({
              row,
            }: any) => (


              <button

                className="
                  font-medium
                  text-blue-600
                  hover:underline
                "


                onClick={() =>
                  setSelectedInvoice(
                    row.original
                  )
                }

              >

                {
                  row.original.invoiceNumber
                }


              </button>


            ),

          };


        }


        return column;


      }

    );





  return (


    <>


      <DataTable


        columns={
          columns
        }


        data={
          invoices
        }


      />





      {
        selectedInvoice && (


         <InvoiceDetailsDialog

  open={
    true
  }

  invoice={
    selectedInvoice
  }

  onClose={() =>
    setSelectedInvoice(null)
  }

  onCancelInvoice={
    onCancelInvoice
  }

/>

        )
      }



    </>


  );

};



export default InvoiceTable;