import {
  inventoryService,
} from "./inventory.service";


export interface SerialStockRow {

  productCode: string;

  productName: string;

  batchNumber: string;

  dispatchedQuantity: number;

  serialRange: string;

}



export const serialStockService = {


  getSerialStock():

  SerialStockRow[] {


    const serials =
      inventoryService
        .getSerials()
        .filter(
          (serial) =>
            serial.status === "ISSUED"
        );



    const grouped:
    Record<string, typeof serials> = {};



    serials.forEach(
      (serial) => {


        const key =
          `${serial.productId}-${serial.batchNumber}`;



        if (!grouped[key]) {

          grouped[key] = [];

        }



        grouped[key].push(serial);

      }
    );



    return Object.values(grouped)
      .map(
        (items) => {


          const sorted =
            items.sort(
              (a, b) =>
                a.serialNumber.localeCompare(
                  b.serialNumber
                )
            );



          return {


            productCode:
              sorted[0].productCode,


            productName:
              sorted[0].productName,


            batchNumber:
              sorted[0].batchNumber,


            dispatchedQuantity:
              sorted.length,


            serialRange:

              `${sorted[0].serialNumber} - ${sorted[sorted.length - 1].serialNumber}`


          };


        }
      );


  },


};