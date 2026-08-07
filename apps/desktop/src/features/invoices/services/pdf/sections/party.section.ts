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

  const boxHeight = 38;





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

    "Billing Address:",

    leftX + 2,

    y + 2.2

  );



  doc.text(

    "Shipping Address:",

    rightX,

    y + 2.2

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

    leftX+2,

    y + 7.5

  );




  doc.text(

    shippingLines,

    rightX ,

    y + 7.5

  );

 




  return y + boxHeight + 8;

};