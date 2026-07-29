import type {
  PdfSectionProps,
} from "../pdf.types";


import {
  companyConfig,
} from "@/config/company.config";


import {
  amountToWords,
} from "../../../utils/amountToWords";



const formatCurrency = (

  amount: number

): string => {

  return `Rs. ${amount.toFixed(2)}`;

};





export const drawSummary = ({

  doc,

  invoice,

  startY,

}: PdfSectionProps) => {



  let y = startY;



  const leftX = 12;

  const rightX = 135;



  /*
  ===============================
      AMOUNT IN WORDS
  ===============================
  */


  doc.setFontSize(8);


  doc.setFont(

    "helvetica",

    "bold"

  );


  doc.text(

    "Amount In Words:",

    leftX,

    y

  );



  y += 5;



  doc.setFont(

    "helvetica",

    "normal"

  );



  const words =

    amountToWords(

      invoice.grandTotal

    );



  doc.text(

    words,

    leftX,

    y

  );



  y += 12;





  /*
  ===============================
      BANK DETAILS + SUMMARY BOX
  ===============================
  */


  const startSummaryY = y;



  /*
  LEFT SIDE BANK
  */


  doc.setFont(

    "helvetica",

    "bold"

  );



  doc.text(

    "Bank Details",

    leftX,

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

    leftX,

    y

  );



  y += 5;



  doc.text(

    `Account No: ${
      invoice.accountNumber ||
      companyConfig.accountNumber ||
      "-"
    }`,

    leftX,

    y

  );



  y += 5;



  doc.text(

    `IFSC Code: ${
      invoice.ifscCode ||
      companyConfig.ifscCode ||
      "-"
    }`,

    leftX,

    y

  );





  /*
  RIGHT SIDE TAX SUMMARY
  */


  let summaryY = startSummaryY;



  doc.setFont(

    "helvetica",

    "bold"

  );


  doc.text(

    "Tax Summary",

    rightX,

    summaryY

  );



  summaryY += 6;



  doc.setFont(

    "helvetica",

    "normal"

  );



  const totalGST =

    (

      invoice.cgstAmount || 0

    )

    +

    (

      invoice.sgstAmount || 0

    )

    +

    (

      invoice.igstAmount || 0

    );





  const summaryRows = [

    [

      "Taxable Value",

      formatCurrency(

        invoice.subtotal

      ),

    ],


    [

      "CGST",

      formatCurrency(

        invoice.cgstAmount || 0

      ),

    ],


    [

      "SGST",

      formatCurrency(

        invoice.sgstAmount || 0

      ),

    ],


    [

      "IGST",

      formatCurrency(

        invoice.igstAmount || 0

      ),

    ],


    [

      "Total GST",

      formatCurrency(

        totalGST

      ),

    ],


    [

      "Round Off",

      formatCurrency(

        invoice.roundOff || 0

      ),

    ],


    [

      "Total Amount",

      formatCurrency(

        invoice.grandTotal

      ),

    ],

  ];





  summaryRows.forEach(

    ([label, value]) => {


      doc.text(

        label,

        rightX,

        summaryY

      );


      doc.text(

        value,

        rightX + 35,

        summaryY

      );


      summaryY += 5;


    }

  );



  y = Math.max(

    y,

    summaryY

  );



  y += 10;





  /*
  ===============================
      TERMS
  ===============================
  */


  doc.setFont(

    "helvetica",

    "bold"

  );



  doc.text(

    "Terms & Conditions",

    leftX,

    y

  );



  y += 5;



  doc.setFont(

    "helvetica",

    "normal"

  );



  doc.text(

    [

      "1. Payment Against Delivery.",

      "2. Material received in good condition.",

      "3. Rejection shall be conveyed within a week after receiving material.",

    ],

    leftX,

    y

  );



  y += 18;





  /*
  ===============================
      SIGNATURE
  ===============================
  */


  doc.setFont(

    "helvetica",

    "normal"

  );



  doc.text(

    `For ${companyConfig.name}`,

    145,

    y

  );



  y += 15;



  doc.text(

    "Authorized Signatory",

    145,

    y

  );



  return y + 10;

};