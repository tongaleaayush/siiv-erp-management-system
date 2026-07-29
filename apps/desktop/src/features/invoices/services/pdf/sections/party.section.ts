import type {
  PdfSectionProps,
} from "../pdf.types";




export const drawPartyDetails = ({

  doc,

  invoice,

  startY,

}: PdfSectionProps) => {



  const y = startY;



  const leftX = 12;

  const rightX = 108;

  const boxWidth = 88;

  const boxHeight = 38;



  /*
  ===============================
      DRAW BOXES
  ===============================
  */


  doc.rect(

    leftX,

    y,

    boxWidth,

    boxHeight

  );



  doc.rect(

    rightX,

    y,

    boxWidth,

    boxHeight

  );





  /*
  ===============================
      HEADINGS
  ===============================
  */


  doc.setFont(

    "helvetica",

    "bold"

  );


  doc.setFontSize(9);



  doc.text(

    "BILL TO",

    leftX + 4,

    y + 7

  );



  doc.text(

    "SHIP TO",

    rightX + 4,

    y + 7

  );






  /*
  ===============================
      DETAILS
  ===============================
  */


  doc.setFont(

    "helvetica",

    "normal"

  );


  doc.setFontSize(8);





  const billingLines = [

    invoice.customerName || "-",


    invoice.billingAddress || "-",


    `State: ${
      invoice.state || "-"
    }`,


    `State Code: ${
      invoice.stateCode || "-"
    }`,


    `GSTIN: ${
      invoice.billingGSTNumber ||

      invoice.customerGSTNumber ||

      "-"
    }`,

  ];





  const shippingLines = [

    invoice.customerName || "-",


    invoice.shippingAddress || "-",


    `State: ${
      invoice.state || "-"
    }`,


    `State Code: ${
      invoice.stateCode || "-"
    }`,


    `GSTIN: ${
      invoice.shippingGSTNumber ||

      invoice.customerGSTNumber ||

      "-"
    }`,

  ];





  doc.text(

    billingLines,

    leftX + 4,

    y + 14

  );




  doc.text(

    shippingLines,

    rightX + 4,

    y + 14

  );





  return y + boxHeight + 8;

};