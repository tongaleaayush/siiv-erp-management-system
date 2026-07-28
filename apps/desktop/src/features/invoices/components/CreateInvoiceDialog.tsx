import {
  useState,
} from "react";

import {
  companyConfig,
} from "@/config/company.config";

import {
  customerService,
} from "@/features/customers/services/customer.service";


import {
  productService,
} from "@/features/products/services/product.service";


import {
  gstService,
} from "../services/gst.service";


import {
  invoiceService,
} from "../services/invoice.service";


import {
  generateInvoiceNumber,
} from "../utils/invoiceNumberGenerator";


import type {
  InvoiceItem,
} from "../types/invoice.types";



interface CreateInvoiceDialogProps {

  open: boolean;

  onClose: () => void;

}




const CreateInvoiceDialog = ({

  open,

  onClose,

}: CreateInvoiceDialogProps) => {



  const customers =
    customerService.getCustomers();



  const products =
    productService.getProducts();





  const [
    selectedCustomerId,
    setSelectedCustomerId,
  ] = useState("");



  const [
    selectedProductId,
    setSelectedProductId,
  ] = useState("");



  const [
    quantity,
    setQuantity,
  ] = useState(1);
  
  const [
  invoiceDate,
  setInvoiceDate,
] = useState(
  new Date()
    .toISOString()
    .split("T")[0]
);


  const [
    invoiceItems,
    setInvoiceItems,
  ] = useState<InvoiceItem[]>([]);





  const selectedCustomer =
    customers.find(
      (customer) =>
        customer.id === selectedCustomerId
    );





  const selectedProduct =
    products.find(
      (product) =>
        product.id === selectedProductId
    );





  const subtotal =
    invoiceItems.reduce(
      (
        total,
        item
      ) =>
        total + item.amount,
      0
    );





  const gst =
    selectedCustomer

      ? gstService.calculateGST(
          subtotal,
          selectedCustomer.gstNumber || ""
        )

      : {};





  const grandTotal =
    subtotal +
    (gst.cgstAmount || 0) +
    (gst.sgstAmount || 0) +
    (gst.igstAmount || 0);

        const resetInvoiceForm = () => {

  setSelectedCustomerId("");

  setSelectedProductId("");

  setQuantity(1);

  setInvoiceItems([]);

  setInvoiceDate(
    new Date()
      .toISOString()
      .split("T")[0]
  );

};



  const handleAddProduct = () => {


    if (!selectedProduct) {

      return;

    }



    const item: InvoiceItem =
    {


      id:
        crypto.randomUUID(),



      invoiceId:
        "",



      productId:
        selectedProduct.id,



      productCode:
        selectedProduct.productCode,



      productName:
        selectedProduct.productName,



      hsnCode:
        selectedProduct.hsnCode,



      quantity,



      unit:
        selectedProduct.unit,



      rate:
        selectedProduct.rate,



      amount:
        selectedProduct.rate *
        quantity,


    };



    setInvoiceItems(

      (previous) => [

        ...previous,

        item,

      ]

    );



    setSelectedProductId("");

    setQuantity(1);


  };







  const handleSaveInvoice = () => {

    const resetInvoiceForm = () => {

  setSelectedCustomerId("");

  setSelectedProductId("");

  setQuantity(1);

  setInvoiceItems([]);

};


    if (!selectedCustomer) {

      return;

    }



    if (
      invoiceItems.length === 0
    ) {

      return;

    }



    




    const invoice = {


      id:
        crypto.randomUUID(),



      invoiceNumber:
        generateInvoiceNumber(),



      invoiceDate:
  invoiceDate,



      customerId:
        selectedCustomer.id,



      customerName:
        selectedCustomer.companyName,



      customerGSTNumber:
        selectedCustomer.gstNumber || "",



      billingAddress:

        `${selectedCustomer.addressLine1}, ${selectedCustomer.city}, ${selectedCustomer.state} - ${selectedCustomer.postalCode}`,



      shippingAddress:

        `${selectedCustomer.addressLine1}, ${selectedCustomer.city}, ${selectedCustomer.state} - ${selectedCustomer.postalCode}`,



      items:
        invoiceItems,



      subtotal,



      cgstRate:
        gst.cgstRate,



      cgstAmount:
        gst.cgstAmount,



      sgstRate:
        gst.sgstRate,



      sgstAmount:
        gst.sgstAmount,



      igstRate:
        gst.igstRate,



      igstAmount:
        gst.igstAmount,



      grandTotal,



      status:
        "DRAFT" as const,

        placeOfSupply:
  selectedCustomer.state,


stateCode:
  selectedCustomer.gstNumber
    ?.substring(0,2),


bankName:
  companyConfig.bankName,


accountNumber:
  companyConfig.accountNumber,


ifscCode:
  companyConfig.ifscCode,



      createdAt:
  new Date()
    .toISOString()
    .split("T")[0],


updatedAt:
  new Date()
    .toISOString()
    .split("T")[0],


    };



    invoiceService.addInvoice(
  invoice
);


resetInvoiceForm();


onClose();


  };






  if (!open) {

    return null;

  }





  return (


    <div

      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
      "

      onClick={() => {

  resetInvoiceForm();

  onClose();

}}

    >



      <div

        className="
          w-full
          max-w-5xl
          rounded-xl
          bg-white
          p-6
          shadow-xl
          max-h-[90vh]
          overflow-y-auto
        "

        onClick={(e) =>
          e.stopPropagation()
        }

      >
                {/* Header */}


        <div

          className="
            flex
            justify-between
            border-b
            pb-4
          "

        >


          <h2
            className="
              text-lg
              font-semibold
            "
          >

            Create Invoice

          </h2>



          <button

           onClick={() => {

    resetInvoiceForm();

    onClose();

  }}

            className="
              text-xl
              text-slate-500
            "

          >

            ×

          </button>


        </div>





        {/* Customer Section */}


        <div className="mt-6">


          <h3
            className="
              mb-3
              font-semibold
            "
          >

            Customer Details

          </h3>



          <select

            value={
              selectedCustomerId
            }

            onChange={(e) =>
              setSelectedCustomerId(
                e.target.value
              )
            }

            className="
              w-full
              rounded-lg
              border
              px-3
              py-2
            "

          >


            <option value="">

              Select Customer

            </option>



            {
              customers.map(
                (customer) => (

                  <option

                    key={
                      customer.id
                    }

                    value={
                      customer.id
                    }

                  >

                    {
                      customer.companyName
                    }

                  </option>

                )
              )
            }


          </select>




          {
            selectedCustomer && (


              <div

                className="
                  mt-5
                  rounded-lg
                  bg-slate-50
                  p-4
                "

              >

                <p>
                  <b>Company:</b>{" "}
                  {
                    selectedCustomer.companyName
                  }
                </p>


                <p>
                  <b>GST:</b>{" "}
                  {
                    selectedCustomer.gstNumber ||
                    "Not Available"
                  }
                </p>


                <p>
                  <b>Address:</b>{" "}
                  {
                    selectedCustomer.addressLine1
                  }
                  ,
                  {
                    selectedCustomer.city
                  }
                  ,
                  {
                    selectedCustomer.state
                  }
                </p>


              </div>


            )
          }


        </div>

          <div className="mt-4">

  <label
    className="
      text-sm
      text-slate-500
    "
  >

    Invoice Date

  </label>


  <input

    type="date"

    value={
      invoiceDate
    }

    onChange={(e) =>
      setInvoiceDate(
        e.target.value
      )
    }


    className="
      mt-1
      w-full
      rounded-lg
      border
      px-3
      py-2
    "

  />

</div>



        {/* Product Section */}


        <div className="mt-8">


          <h3
            className="
              mb-3
              font-semibold
            "
          >

            Product Details

          </h3>




          <select

            value={
              selectedProductId
            }

            onChange={(e) =>
              setSelectedProductId(
                e.target.value
              )
            }

            className="
              w-full
              rounded-lg
              border
              px-3
              py-2
            "

          >


            <option value="">

              Select Product

            </option>



            {
              products.map(
                (product) => (

                  <option

                    key={
                      product.id
                    }

                    value={
                      product.id
                    }

                  >

                    {
                      product.productName
                    }

                  </option>

                )
              )
            }


          </select>





          <input

            type="number"

            min="1"

            value={
              quantity
            }

            onChange={(e) =>
              setQuantity(
                Number(e.target.value)
              )
            }

            className="
              mt-4
              w-full
              rounded-lg
              border
              px-3
              py-2
            "

          />





          <button

            onClick={
              handleAddProduct
            }

            className="
              mt-4
              rounded-lg
              bg-blue-600
              px-5
              py-2
              text-white
            "

          >

            Add Product

          </button>


        </div>





        {/* Items Table */}


        {
          invoiceItems.length > 0 && (


            <div className="mt-8">


              <h3
                className="
                  mb-3
                  font-semibold
                "
              >

                Invoice Items

              </h3>



              <table
                className="
                  w-full
                  border
                "
              >

                <thead>

                  <tr className="bg-slate-50">


                    <th className="p-3">
                      Product
                    </th>


                    <th className="p-3">
                      Qty
                    </th>


                    <th className="p-3">
                      Rate
                    </th>


                    <th className="p-3">
                      Amount
                    </th>


                  </tr>

                </thead>



                <tbody>


                  {
                    invoiceItems.map(
                      (item) => (

                        <tr

                          key={
                            item.id
                          }

                          className="
                            border-t
                          "

                        >

                          <td className="p-3">

                            {
                              item.productName
                            }

                          </td>



                          <td className="p-3 text-center">

                            {
                              item.quantity
                            }

                          </td>



                          <td className="p-3 text-center">

                            ₹
                            {
                              item.rate
                            }

                          </td>



                          <td className="p-3 text-center">

                            ₹
                            {
                              item.amount
                            }

                          </td>



                        </tr>

                      )
                    )
                  }


                </tbody>


              </table>


            </div>


          )
        }





        {/* Invoice Summary */}


        <div

          className="
            mt-6
            rounded-lg
            bg-slate-50
            p-5
          "

        >


          <h3
            className="
              mb-4
              font-semibold
            "
          >

            Invoice Summary

          </h3>



          <div className="space-y-2">


            <div className="flex justify-between">

              <span>
                Subtotal
              </span>

              <span>
                ₹ {subtotal.toFixed(2)}
              </span>

            </div>




            {
              gst.cgstAmount &&
              gst.cgstAmount > 0 && (

                <div className="flex justify-between">

                  <span>
                    CGST ({gst.cgstRate}%)
                  </span>

                  <span>
                    ₹ {gst.cgstAmount.toFixed(2)}
                  </span>

                </div>

              )
            }





            {
              gst.sgstAmount &&
              gst.sgstAmount > 0 && (

                <div className="flex justify-between">

                  <span>
                    SGST ({gst.sgstRate}%)
                  </span>

                  <span>
                    ₹ {gst.sgstAmount.toFixed(2)}
                  </span>

                </div>

              )
            }





            {
              gst.igstAmount &&
              gst.igstAmount > 0 && (

                <div className="flex justify-between">

                  <span>
                    IGST ({gst.igstRate}%)
                  </span>

                  <span>
                    ₹ {gst.igstAmount.toFixed(2)}
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
                font-semibold
              "

            >

              <span>
                Grand Total
              </span>


              <span>
                ₹ {grandTotal.toFixed(2)}
              </span>


            </div>


          </div>


        </div>





        {/* Save Invoice Button */}


        <div

          className="
            mt-6
            flex
            justify-end
          "

        >


          <button

            onClick={
              handleSaveInvoice
            }

            className="
              rounded-lg
              bg-green-600
              px-6
              py-2
              font-medium
              text-white
              hover:bg-green-700
            "

          >

            Save Invoice

          </button>


        </div>



      </div>


    </div>


  );

};



export default CreateInvoiceDialog;