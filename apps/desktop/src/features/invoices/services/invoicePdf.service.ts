import jsPDF from "jspdf";


import {
  fileSaveService,
} from "@/services/file";


import type {
  Invoice,
} from "../types/invoice.types";



import {
  drawHeader,
} from "./pdf/sections/header.section";


import {
  drawInvoiceInfo,
} from "./pdf/sections/invoiceInfo.section";


import {
  drawPartyDetails,
} from "./pdf/sections/party.section";


import {
  drawItemsTable,
} from "./pdf/sections/items.section";


import {
  drawSummary,
} from "./pdf/sections/summary.section";





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



    let y = 10;





    /*
    ===============================
        PDF SECTIONS
    ===============================
    */



    y = drawHeader({

      doc,

      invoice,

      startY: y,

      pageWidth,

    });





    y = drawInvoiceInfo({

      doc,

      invoice,

      startY: y,

      pageWidth,

    });





    y = drawPartyDetails({

      doc,

      invoice,

      startY: y,

      pageWidth,

    });





    y = drawItemsTable({

      doc,

      invoice,

      startY: y,

      pageWidth,

    });





    drawSummary({

      doc,

      invoice,

      startY: y,

      pageWidth,

    });







    /*
    ===============================
        SAVE PDF
    ===============================
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