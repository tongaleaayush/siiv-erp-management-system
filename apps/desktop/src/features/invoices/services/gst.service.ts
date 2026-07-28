export interface GSTCalculationResult {

  cgstRate?: number;

  cgstAmount?: number;


  sgstRate?: number;

  sgstAmount?: number;


  igstRate?: number;

  igstAmount?: number;

}




export const gstService = {


  calculateGST(

    amount: number,

    customerGSTNumber: string

  ): GSTCalculationResult {



    const gstPrefix =
      customerGSTNumber
        ?.substring(0, 2);



    const taxRate = 18;



    const halfTax =
      taxRate / 2;



    // Maharashtra GSTIN starts with 27

    if (
      gstPrefix === "27"
    ) {


      return {


        cgstRate:
          halfTax,


        cgstAmount:
          (amount * halfTax) / 100,



        sgstRate:
          halfTax,


        sgstAmount:
          (amount * halfTax) / 100,



        igstRate:
          0,


        igstAmount:
          0,


      };


    }



    // Other states

    return {


      cgstRate:
        0,


      cgstAmount:
        0,



      sgstRate:
        0,


      sgstAmount:
        0,



      igstRate:
        taxRate,


      igstAmount:
        (amount * taxRate) / 100,


    };


  },


};