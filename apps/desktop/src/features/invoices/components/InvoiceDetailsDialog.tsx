import {
  Dialog,
  Button,
} from "@/components/ui";

import {
  invoicePdfService,
} from "../services/invoicePdf.service";

import {
  invoicePrintService,
} from "../services/invoicePrint.service";

import type {
  Invoice,
} from "../types/invoice.types";


import {
  companyConfig,
} from "@/config/company.config";


import {
  amountToWords,
} from "../utils/amountToWords";




interface InvoiceDetailsDialogProps {

  open: boolean;

  onClose: () => void;

  invoice: Invoice;

}





const InvoiceDetailsDialog = ({

  open,

  onClose,

  invoice,

}: InvoiceDetailsDialogProps) => {



  if (!open) {

    return null;

  }





  return (


    <Dialog

  open={open}

  title="Invoice Details"

  size="xl"

  onClose={onClose}


  footer={

    <div

      className="
        flex
        justify-end
        gap-3
      "

    >


      <Button

        onClick={onClose}

      >

        Close

      </Button>



      <Button

        onClick={() => {

        invoicePrintService.printInvoice(
  "invoice-print-area"
);

        }}

      >

        Print Invoice

      </Button>



      <Button

onClick={() => {

 invoicePdfService.generateInvoicePDF(
   invoice
 );

}}

>

Download PDF

</Button>



    </div>

  }

>
<div id="invoice-print-area">




        {/* Company Header */}



        <div

          className="
            border-b
            pb-5
            text-center
          "

        >



          <h1

            className="
              text-2xl
              font-bold
            "

          >

            {
              companyConfig.name
            }

          </h1>




          <p className="mt-2 text-sm text-slate-600">

            {
              companyConfig.address
            }

          </p>




          <p className="text-sm text-slate-600">

            GST:

            {" "}

            {
              companyConfig.gstNumber ||
              "Not Available"
            }

          </p>




          <p className="text-sm text-slate-600">


            {
              companyConfig.phone
            }



            {
              companyConfig.email &&
              ` | ${companyConfig.email}`
            }


          </p>





          <p

            className="
              mt-3
              font-semibold
            "

          >

            TAX INVOICE

          </p>




        </div>









        {/* Invoice Information */}



        <div

          className="
            mt-6
            grid
            grid-cols-2
            gap-6
          "

        >



          <div>


            <p className="text-sm text-slate-500">

              Invoice Number

            </p>



            <p className="font-semibold">

              {
                invoice.invoiceNumber
              }

            </p>


          </div>





          <div>


            <p className="text-sm text-slate-500">

              Invoice Date

            </p>



            <p className="font-semibold">

              {
                invoice.invoiceDate
              }

            </p>


          </div>



        </div>









        {/* Bill To / Ship To */}




        <div

          className="
            mt-8
            grid
            grid-cols-2
            gap-6
          "

        >





          {/* Bill To */}



          <div

            className="
              rounded-lg
              border
              p-4
            "

          >



            <h3

              className="
                mb-3
                font-semibold
              "

            >

              Bill To

            </h3>





            <p>

              <b>
                Company:
              </b>


              {" "}


              {
                invoice.customerName
              }


            </p>





            <p>

              <b>
                GST No:
              </b>


              {" "}


              {
                invoice.customerGSTNumber ||
                "N/A"
              }


            </p>





            <p className="mt-2">


              <b>
                Address:
              </b>


              <br />


              {
                invoice.billingAddress
              }



            </p>




          </div>









          {/* Ship To */}




          <div

            className="
              rounded-lg
              border
              p-4
            "

          >



            <h3

              className="
                mb-3
                font-semibold
              "

            >

              Ship To

            </h3>





            <p>


              <b>
                Company:
              </b>


              {" "}


              {
                invoice.customerName
              }


            </p>





            <p className="mt-2">


              <b>
                Address:
              </b>


              <br />


              {
                invoice.shippingAddress
              }



            </p>




          </div>





        </div>









        {/* Invoice Items */}



        <div className="mt-8">



          <h2

            className="
              mb-3
              font-semibold
            "

          >

            Invoice Items

          </h2>





          <table

            className="
              w-full
              border
              text-sm
            "

          >



            <thead

              className="
                bg-slate-100
              "

            >



              <tr>



                <th className="border p-3">

                  Sr No

                </th>




                <th className="border p-3 text-left">

                  Description

                </th>




                <th className="border p-3">

                  HSN

                </th>




                <th className="border p-3">

                  Qty

                </th>




                <th className="border p-3">

                  Unit

                </th>




                <th className="border p-3">

                  Rate

                </th>




                <th className="border p-3">

                  Amount

                </th>



              </tr>



            </thead>





            <tbody>
                              {
                invoice.items.map(
                  (
                    item,
                    index
                  ) => (

                    <tr

                      key={
                        item.id
                      }

                      className="
                        border-t
                      "

                    >



                      <td

                        className="
                          border
                          p-3
                          text-center
                        "

                      >

                        {
                          index + 1
                        }


                      </td>





                      <td

                        className="
                          border
                          p-3
                        "

                      >

                        {
                          item.productName
                        }


                      </td>





                      <td

                        className="
                          border
                          p-3
                          text-center
                        "

                      >

                        {
                          item.hsnCode
                        }


                      </td>





                      <td

                        className="
                          border
                          p-3
                          text-center
                        "

                      >

                        {
                          item.quantity
                        }


                      </td>





                      <td

                        className="
                          border
                          p-3
                          text-center
                        "

                      >

                        {
                          item.unit
                        }


                      </td>





                      <td

                        className="
                          border
                          p-3
                          text-center
                        "

                      >

                        ₹
                        {
                          item.rate.toLocaleString(
                            "en-IN"
                          )
                        }


                      </td>





                      <td

                        className="
                          border
                          p-3
                          text-center
                        "

                      >

                        ₹
                        {
                          item.amount.toLocaleString(
                            "en-IN"
                          )
                        }


                      </td>



                    </tr>


                  )

                )
              }



            </tbody>


          </table>



        </div>








        {/* Tax Summary */}



        <div

          className="
            mt-8
            ml-auto
            max-w-sm
            space-y-3
          "

        >



          <div

            className="
              flex
              justify-between
            "

          >

            <span>
              Taxable Amount
            </span>


            <span>

              ₹
              {
                invoice.subtotal.toLocaleString(
                  "en-IN"
                )
              }

            </span>


          </div>






          {
            invoice.cgstAmount !== undefined &&
            invoice.cgstAmount > 0 && (


              <div

                className="
                  flex
                  justify-between
                "

              >

                <span>

                  CGST
                  {
                    invoice.cgstRate &&
                    ` @ ${invoice.cgstRate}%`
                  }

                </span>



                <span>

                  ₹
                  {
                    invoice.cgstAmount.toLocaleString(
                      "en-IN"
                    )
                  }

                </span>


              </div>


            )
          }







          {
            invoice.sgstAmount !== undefined &&
            invoice.sgstAmount > 0 && (


              <div

                className="
                  flex
                  justify-between
                "

              >

                <span>

                  SGST
                  {
                    invoice.sgstRate &&
                    ` @ ${invoice.sgstRate}%`
                  }

                </span>



                <span>

                  ₹
                  {
                    invoice.sgstAmount.toLocaleString(
                      "en-IN"
                    )
                  }

                </span>


              </div>


            )
          }








          {
            invoice.igstAmount !== undefined &&
            invoice.igstAmount > 0 && (


              <div

                className="
                  flex
                  justify-between
                "

              >

                <span>

                  IGST
                  {
                    invoice.igstRate &&
                    ` @ ${invoice.igstRate}%`
                  }

                </span>



                <span>

                  ₹
                  {
                    invoice.igstAmount.toLocaleString(
                      "en-IN"
                    )
                  }

                </span>


              </div>


            )
          }







          <div

            className="
              flex
              justify-between
              border-t
              pt-3
              font-bold
            "

          >

            <span>
              Grand Total
            </span>



            <span>

              ₹
              {
                invoice.grandTotal.toLocaleString(
                  "en-IN"
                )
              }

            </span>


          </div>




        </div>









        {/* Amount In Words */}



        <div

          className="
            mt-8
            border-t
            pt-4
          "

        >



          <p

            className="
              font-semibold
            "

          >

            Amount In Words:

          </p>





          <p

            className="
              mt-1
              text-slate-700
            "

          >

            {
              amountToWords(
                invoice.grandTotal
              )
            }


          </p>



        </div>









        {/* Terms & Conditions */}



        <div

          className="
            mt-6
            border-t
            pt-4
          "

        >



          <h3

            className="
              font-semibold
            "

          >

            Terms & Conditions

          </h3>





          <ul

  className="
    mt-2
    list-disc
    pl-5
    text-sm
    text-slate-600
  "

>


  <li>
    {
      invoice.paymentTerm || 
      "Payment Against Delivery."
    }

  </li>


  <li>

    Material received in good condition.

  </li>


  <li>

    Rejection shall be conveyed within a week of time after receiving material.

  </li>


</ul>



        </div>









        {/* Signature */}



        <div

          className="
            mt-10
            flex
            justify-end
          "

        >



          <div

            className="
              text-center
            "

          >


            <p>

              For
              {" "}
              {
                companyConfig.name
              }

            </p>



            <br />



            <p>

              Authorized Signature

            </p>



          </div>



        </div>









        {/* Footer */}



        <div

          className="
            mt-8
            flex
            justify-end
          "

        >



          <button

            onClick={
              onClose
            }

            className="
              rounded-lg
              bg-blue-600
              px-6
              py-2
              text-white
            "

          >

            Close

          </button>



        </div>



</div>

     </Dialog>


  );


};




export default InvoiceDetailsDialog;