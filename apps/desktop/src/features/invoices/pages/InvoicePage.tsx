import {
  useState,
} from "react";


import {
  Plus,
} from "lucide-react";


import {
  PageLayout,
} from "@/components/common/page";


import {
  Button,
} from "@/components/ui";


import InvoiceTable from "../components/InvoiceTable";


import CreateInvoiceDialog from "../components/CreateInvoiceDialog";


import {
  invoiceService,
} from "../services/invoice.service";


import type {
  Invoice,
} from "../types/invoice.types";




const InvoicePage = () => {



  const [
    invoices,
    setInvoices,
  ] = useState<Invoice[]>(

    invoiceService.getInvoices()

  );





  const [
    isCreateOpen,
    setIsCreateOpen,
  ] = useState(false);





  const handleInvoiceCreated = () => {


    setInvoices(
      invoiceService.getInvoices()
    );


  };





  return (


    <PageLayout


      title="Invoices"



      breadcrumb={[

        {
          label:
            "Dashboard",
        },


        {
          label:
            "Invoices",
        },


      ]}




      actions={


        <Button

          onClick={() =>
            setIsCreateOpen(true)
          }

        >

          <Plus

            className="
              mr-2
              h-4
              w-4
            "

          />


          Create Invoice


        </Button>


      }



    >





      <InvoiceTable

        invoices={
          invoices
        }

      />





      <CreateInvoiceDialog


        open={
          isCreateOpen
        }


        onClose={() => {

          setIsCreateOpen(false);

          handleInvoiceCreated();

        }}


      />




    </PageLayout>


  );

};



export default InvoicePage;