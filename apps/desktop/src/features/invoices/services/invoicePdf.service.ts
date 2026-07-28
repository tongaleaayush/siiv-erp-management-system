import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";


import {
  fileSaveService,
} from "@/services/file";


import {
  companyConfig,
} from "@/config/company.config";


import type {
  Invoice,
} from "../types/invoice.types";


import {
  amountToWords,
} from "../utils/amountToWords";



const formatCurrency = (
  amount: number
): string => {

  return `Rs. ${amount.toFixed(2)}`;

};





export const invoicePdfService = {


  async generateInvoicePDF(

    invoice: Invoice

  ) {


    const doc =
      new jsPDF(
        "p",
        "mm",
        "a4"
      );



    const pageWidth =
      doc.internal.pageSize.width;



    let y =
      15;




    /*
    =================================
        COMPANY HEADER
    =================================
    */


    doc.setFont(
      "helvetica",
      "bold"
    );


    doc.setFontSize(20);



    doc.text(

      companyConfig.name,

      pageWidth / 2,

      y,

      {
        align:
          "center",
      }

    );



    y += 8;



    doc.setFontSize(9);


    doc.setFont(
      "helvetica",
      "normal"
    );



    doc.text(

      companyConfig.address,

      pageWidth / 2,

      y,

      {
        align:
          "center",
      }

    );



    y += 5;



    doc.text(

      `GSTIN: ${companyConfig.gstNumber}`,

      pageWidth / 2,

      y,

      {
        align:
          "center",
      }

    );



    y += 5;



    doc.text(

      `${companyConfig.phone} | ${companyConfig.email}`,

      pageWidth / 2,

      y,

      {
        align:
          "center",
      }

    );



    y += 8;




    doc.setFontSize(14);


    doc.setFont(
      "helvetica",
      "bold"
    );



    doc.text(

      "TAX INVOICE",

      pageWidth / 2,

      y,

      {
        align:
          "center",
      }

    );



    y += 7;



    doc.line(

      10,

      y,

      pageWidth - 10,

      y

    );



    y += 8;




    /*
    =================================
        INVOICE INFORMATION
    =================================
    */


    doc.setFontSize(9);


    doc.setFont(
      "helvetica",
      "normal"
    );



    const leftX = 12;


    const rightX = 110;



    doc.text(

      `Invoice No: ${invoice.invoiceNumber}`,

      leftX,

      y

    );



    doc.text(

      `Invoice Date: ${invoice.invoiceDate}`,

      rightX,

      y

    );



    y += 6;



    doc.text(

      `GSTIN: ${companyConfig.gstNumber}`,

      leftX,

      y

    );



    doc.text(

      `PO No: ${invoice.poNumber || "-"}`,

      rightX,

      y

    );



    y += 6;



    doc.text(

      `Vehicle No: ${invoice.vehicleNumber || "-"}`,

      leftX,

      y

    );



    doc.text(

      `PO Date: ${invoice.poDate || "-"}`,

      rightX,

      y

    );



    y += 6;



    doc.text(

      `Place of Supply: ${invoice.placeOfSupply || "-"}`,

      leftX,

      y

    );



    doc.text(

      `State Code: ${invoice.stateCode || "-"}`,

      rightX,

      y

    );



    y += 10;

        /*
    =================================
        BILL TO / SHIP TO BOXES
    =================================
    */


    const boxHeight = 35;

    const boxWidth = 88;



    doc.rect(

      12,

      y,

      boxWidth,

      boxHeight

    );


    doc.rect(

      110,

      y,

      boxWidth,

      boxHeight

    );



    doc.setFont(
      "helvetica",
      "bold"
    );


    doc.text(

      "BILL TO",

      16,

      y + 6

    );



    doc.text(

      "SHIP TO",

      114,

      y + 6

    );



    doc.setFont(
      "helvetica",
      "normal"
    );


    doc.setFontSize(8);



    doc.text(

      [

        invoice.customerName,

        `GSTIN: ${
          invoice.customerGSTNumber || "-"
        }`,

        invoice.billingAddress,

      ],

      16,

      y + 12

    );



    doc.text(

      [

        invoice.customerName,

        invoice.shippingAddress,

      ],

      114,

      y + 12

    );



    y += boxHeight + 8;





    /*
    =================================
        PRODUCT TABLE
    =================================
    */



    autoTable(

      doc,

      {


        startY:

          y,



        head:

        [

          [

            "Sr",

            "Product Description",

            "HSN",

            "Qty",

            "Unit",

            "Rate",

            "Amount",

          ]

        ],



        body:

          invoice.items.map(

            (

              item,

              index

            ) =>


            [

              index + 1,


              item.productName,


              item.hsnCode,


              item.quantity,


              item.unit,


              formatCurrency(
                item.rate
              ),


              formatCurrency(
                item.amount
              ),

            ]

          ),




        theme:

          "grid",



        styles:

        {

          fontSize:

            8,


          cellPadding:

            3,


          valign:

            "middle",

        },



        headStyles:

        {

          fillColor:

            [
              41,
              128,
              185
            ],


          textColor:

            255,


          fontStyle:

            "bold",


          halign:

            "center",

        },



        columnStyles:

        {

          0:

          {

            cellWidth:

              10,


            halign:

              "center",

          },



          1:

          {

            cellWidth:

              60,

          },



          2:

          {

            cellWidth:

              20,


            halign:

              "center",

          },



          3:

          {

            cellWidth:

              15,


            halign:

              "center",

          },



          4:

          {

            cellWidth:

              15,


            halign:

              "center",

          },



          5:

          {

            cellWidth:

              25,

          },



          6:

          {

            cellWidth:

              30,

          },

        },


      }

    );




    y =

      (

        doc as any

      )

      .lastAutoTable

      .finalY + 10;







    /*
    =================================
        TAX SUMMARY
    =================================
    */


    const summaryLabelX = 120;

    const summaryValueX = 160;



    doc.setFontSize(9);


    doc.setFont(
      "helvetica",
      "normal"
    );




    doc.text(

      "Taxable Value",

      summaryLabelX,

      y

    );


    doc.text(

      formatCurrency(
        invoice.subtotal
      ),

      summaryValueX,

      y

    );



    y += 6;




    if (

      invoice.cgstAmount &&

      invoice.cgstAmount > 0

    ) {


      doc.text(

        `CGST ${
          invoice.cgstRate
          ? `@ ${invoice.cgstRate}%`
          : ""
        }`,

        summaryLabelX,

        y

      );



      doc.text(

        formatCurrency(
          invoice.cgstAmount
        ),

        summaryValueX,

        y

      );


      y += 6;

    }




    if (

      invoice.sgstAmount &&

      invoice.sgstAmount > 0

    ) {


      doc.text(

        `SGST ${
          invoice.sgstRate
          ? `@ ${invoice.sgstRate}%`
          : ""
        }`,

        summaryLabelX,

        y

      );



      doc.text(

        formatCurrency(
          invoice.sgstAmount
        ),

        summaryValueX,

        y

      );


      y += 6;

    }




    if (

      invoice.igstAmount &&

      invoice.igstAmount > 0

    ) {


      doc.text(

        `IGST ${
          invoice.igstRate
          ? `@ ${invoice.igstRate}%`
          : ""
        }`,

        summaryLabelX,

        y

      );



      doc.text(

        formatCurrency(
          invoice.igstAmount
        ),

        summaryValueX,

        y

      );


      y += 6;

    }





    doc.line(

      summaryLabelX,

      y,

      200,

      y

    );



    y += 6;



    doc.setFont(
      "helvetica",
      "bold"
    );



    doc.text(

      "Grand Total",

      summaryLabelX,

      y

    );



    doc.text(

      formatCurrency(
        invoice.grandTotal
      ),

      summaryValueX,

      y

    );



    y += 12;

        /*
    =================================
        AMOUNT IN WORDS
    =================================
    */


    doc.setFont(
      "helvetica",
      "bold"
    );


    doc.setFontSize(9);



    doc.text(

      "Amount In Words:",

      12,

      y

    );



    y += 6;



    doc.setFont(
      "helvetica",
      "normal"
    );



    const words =

      amountToWords(
        invoice.grandTotal
      );



    const wrappedWords =

      doc.splitTextToSize(

        words,

        180

      );



    doc.text(

      wrappedWords,

      12,

      y

    );



    y += 15;







    /*
    =================================
        BANK DETAILS
    =================================
    */



    doc.setFont(
      "helvetica",
      "bold"
    );



    doc.text(

      "Bank Details",

      12,

      y

    );



    y += 6;



    doc.setFont(
      "helvetica",
      "normal"
    );



    doc.text(

      `Bank Name: ${
        invoice.bankName ||
        companyConfig.bankName ||
        "-"
      }`,

      12,

      y

    );



    y += 5;



    doc.text(

      `Account No: ${
        invoice.accountNumber ||
        companyConfig.accountNumber ||
        "-"
      }`,

      12,

      y

    );



    y += 5;



    doc.text(

      `IFSC Code: ${
        invoice.ifscCode ||
        companyConfig.ifscCode ||
        "-"
      }`,

      12,

      y

    );



    y += 12;







    /*
    =================================
        TERMS & CONDITIONS
    =================================
    */



    doc.setFont(
      "helvetica",
      "bold"
    );



    doc.text(

      "Terms & Conditions",

      12,

      y

    );



    y += 6;



    doc.setFont(
      "helvetica",
      "normal"
    );



    const terms = [

      "1. Payment Against Delivery.",

      "2. Material received in good condition.",

      "3. Rejection shall be conveyed within a week after receiving material.",

    ];



    doc.text(

      terms,

      12,

      y

    );



    y += 25;







    /*
    =================================
        AUTHORIZED SIGNATURE
    =================================
    */



    doc.text(

      `For ${companyConfig.name}`,

      145,

      y

    );



    y += 15;



    doc.text(

      "Authorized Signature",

      145,

      y

    );







    /*
    =================================
        SAVE PDF
    =================================
    */



    const pdfBuffer =

      doc.output(

        "arraybuffer"

      );





    await fileSaveService.saveBinaryFile({

      defaultPath:

        `${invoice.invoiceNumber}.pdf`,



      content:

        pdfBuffer,



      filters:

      [

        {

          name:

            "PDF",


          extensions:

          [

            "pdf"

          ],

        },

      ],


    });



  },


};