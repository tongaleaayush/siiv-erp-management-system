interface InvoiceCounter {

  [year: string]: number;

}



const invoiceCounter:
  InvoiceCounter = {};



export const generateInvoiceNumber = ():
string => {


  const year =
    new Date()
      .getFullYear()
      .toString();



  if (
    !invoiceCounter[year]
  ) {

    invoiceCounter[year] = 1;

  }



  const number =
    String(
      invoiceCounter[year]
    )
    .padStart(
      4,
      "0"
    );



  invoiceCounter[year]++;



  return (
    `SIIV/${year}/${number}`
  );

};