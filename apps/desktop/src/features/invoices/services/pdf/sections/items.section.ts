import autoTable from "jspdf-autotable";


import type {
  PdfSectionProps,
} from "../pdf.types";



const formatCurrency = (

  amount: number

): string => {

  return `Rs. ${amount.toFixed(2)}`;

};





export const drawItemsTable = ({

  doc,

  invoice,

  startY,

}: PdfSectionProps) => {



  autoTable(

    doc,

    {


      startY,



      head:

      [

        [

          "S.N.",

          "Product Description",

          "HSN/SAC",

          "Qty",

          "Unit",

          "Rate",

          "Amount",

          "CGST",

          "SGST",

          "IGST",

        ],

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



            item.hsnCode || "-",



            item.quantity,



            item.unit || "-",



            formatCurrency(

              item.rate

            ),



            formatCurrency(

              item.amount

            ),



            invoice.cgstAmount

              ?

              formatCurrency(

                (

                  item.amount *

                  (

                    invoice.cgstRate || 0

                  )

                )

                /

                100

              )

              :

              "-",



            invoice.sgstAmount

              ?

              formatCurrency(

                (

                  item.amount *

                  (

                    invoice.sgstRate || 0

                  )

                )

                /

                100

              )

              :

              "-",



            invoice.igstAmount

              ?

              formatCurrency(

                (

                  item.amount *

                  (

                    invoice.igstRate || 0

                  )

                )

                /

                100

              )

              :

              "-",


          ]

        ),





      theme:

        "grid",





      styles:

      {

        fontSize:

          7,


        cellPadding:

          3,


        valign:

          "middle",


        overflow:

          "linebreak",

      },





      headStyles:

      {

        fillColor:

        [

          240,

          240,

          240,

        ],


        textColor:

          0,


        fontStyle:

          "bold",


        halign:

          "center",

      },





      columnStyles:

      {


        // S.N.

        0:

        {

          cellWidth:

            10,


          halign:

            "center",

        },





        // Product

        1:

        {

          cellWidth:

            42,

        },





        // HSN

        2:

        {

          cellWidth:

            18,


          halign:

            "center",

        },





        // Qty

        3:

        {

          cellWidth:

            12,


          halign:

            "center",

        },





        // Unit

        4:

        {

          cellWidth:

            12,


          halign:

            "center",

        },





        // Rate

        5:

        {

          cellWidth:

            20,


          halign:

            "right",

        },





        // Amount

        6:

        {

          cellWidth:

            22,


          halign:

            "right",

        },





        // CGST

        7:

        {

          cellWidth:

            15,


          halign:

            "right",

        },





        // SGST

        8:

        {

          cellWidth:

            15,


          halign:

            "right",

        },





        // IGST

        9:

        {

          cellWidth:

            15,


          halign:

            "right",

        },


      },



      margin:

      {

        left:

          10,


        right:

          10,

      },


    }

  );





  return (

    doc as any

  )

  .lastAutoTable

  .finalY + 8;


};