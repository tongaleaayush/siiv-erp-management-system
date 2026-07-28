export const invoicePrintService = {


  printInvoice(
    elementId: string
  ) {


    console.log(
      "Print service called"
    );


    const content =
      document.getElementById(
        elementId
      );


    console.log(
      "Print content:",
      content
    );



    if (!content) {

      alert(
        "Invoice print area not found"
      );

      return;

    }




    const printWindow =
      window.open(
        "",
        "_blank"
      );



    console.log(
      "Print window:",
      printWindow
    );



    if (!printWindow) {

      alert(
        "Popup blocked"
      );

      return;

    }




    printWindow.document.write(`

      <html>

      <head>

        <title>
          Invoice
        </title>


        <style>

          body {

            font-family:
            Arial;

            padding:
            20px;

          }


          table {

            width:
            100%;

            border-collapse:
            collapse;

          }


          th, td {

            border:
            1px solid black;

            padding:
            8px;

          }


        </style>


      </head>


      <body>


        ${content.innerHTML}


      </body>


      </html>

    `);



    printWindow.document.close();



    console.log(
      "Printing..."
    );


    printWindow.print();


  },


};