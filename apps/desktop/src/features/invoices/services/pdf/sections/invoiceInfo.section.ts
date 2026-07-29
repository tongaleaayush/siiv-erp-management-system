import type {
  PdfSectionProps,
} from "../pdf.types";



export const drawInvoiceInfo = ({

  doc,

  invoice,

  startY,

}: PdfSectionProps) => {


  let y = startY;



  const leftX = 14;

  const rightX = 108;



  const rowHeight = 6;


  doc.setFontSize(8);



  doc.setFont(

    "helvetica",

    "normal"

  );





  /*
  ===============================
      LEFT COLUMN
  ===============================
  */


  doc.text(

    `Invoice No: ${
      invoice.invoiceNumber
    }`,

    leftX,

    y-14

  );



  doc.text(

    `Invoice Date: ${
      invoice.invoiceDate
    }`,

    leftX,

    y + rowHeight-15

  );



  doc.text(

    `GSTIN: ${
      invoice.customerGSTNumber || "-"
    }`,

    leftX,

    y + rowHeight*2 -16

  );



  doc.text(

    `State: ${
      invoice.state || "-"
    }`,

    leftX,

    y + rowHeight * 3 -17

  );



  doc.text(

    `State Code: ${
      invoice.stateCode || "-"
    }`,

    leftX,

    y + rowHeight * 4 -18

  );






  /*
  ===============================
      RIGHT COLUMN
  ===============================
  */


  doc.text(

    `Transportation Mode: ${
      invoice.transportationMode || "-"
    }`,

    rightX,

    y-14

  );



  doc.text(

    `Vehicle No: ${
      invoice.vehicleNumber || "-"
    }`,

    rightX,

    y + rowHeight-15

  );



  doc.text(

    `Date of Supply: ${
      invoice.dateOfSupply || "-"
    }`,

    rightX,

    y + rowHeight * 2 -16

  );



  doc.text(

    `Place of Supply: ${
      invoice.placeOfSupply || "-"
    }`,

    rightX,

    y + rowHeight * 3 -17

  );



  doc.text(

    `PO/DC No & Date: ${
      invoice.poNumber || "-"
    } ${
      invoice.poDate || ""
    }`,

    rightX,

    y + rowHeight * 4 -18

  );





  /*
  ===============================
      SEPARATOR
  ===============================
  */


  y += 36;



  doc.line(

    10,

    y-27,

    200,

    y-27

  );



  return y-25;

};