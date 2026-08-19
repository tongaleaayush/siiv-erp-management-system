import { inventoryService } from "./inventory.service";

import {
  productService,
} from "@/features/products/services/product.service";

import type {
  InventoryTransaction,
  ProductSerial,
} from "../types/inventory.types";

import { generateSerialNumbers } from "../utils/serialGenerator";



interface StockOutPayload {

  productId: string;

  productCode: string;

  productName: string;

  quantity: number;

}




class FIFOService {


  stockOut(
    payload: StockOutPayload
  ) {


    let requiredQuantity =
      payload.quantity;



    const usedBatchNumbers: string[] = [];

    const usedSerials: string[] = [];

    const remarks: string[] = [];




    const batches =
      inventoryService
        .getBatches()
        .filter(
          (batch) =>
            batch.productId ===
              payload.productId &&
            batch.availableQuantity > 0
        )
        .sort(
          (a, b) => {


            const dateDifference =
              new Date(
                a.receivedDate
              ).getTime()
              -
              new Date(
                b.receivedDate
              ).getTime();



            if (
              dateDifference !== 0
            ) {

              return dateDifference;

            }



            return (
              Number(a.batchNumber)
              -
              Number(b.batchNumber)
            );


          }
        );





    for (
      const batch of batches
    ) {



      if (
        requiredQuantity <= 0
      ) {

        break;

      }





      const consume =
        Math.min(
          requiredQuantity,
          batch.availableQuantity
        );





      batch.availableQuantity -=
        consume;




      requiredQuantity -=
        consume;





      usedBatchNumbers.push(
        batch.batchNumber
      );





   const generatedSerialNumbers =
  generateSerialNumbers(
  consume,
  new Date()
    .toISOString()
    .split("T")[0]
);





      generatedSerialNumbers.forEach(
        (serialNumber) => {



          const serial: ProductSerial =
          {

            id:
              crypto.randomUUID(),



            serialNumber,



            productId:
              payload.productId,



            productCode:
              payload.productCode,



            productName:
              payload.productName,



            batchNumber:
              batch.batchNumber,



            status:
              "ISSUED",



            issuedDate:
              new Date()
                .toISOString()
                .split("T")[0],



            createdAt:
              new Date()
                .toISOString()
                .split("T")[0],



            updatedAt:
              new Date()
                .toISOString()
                .split("T")[0],

          };




          inventoryService.addSerial(
            serial
          );



          usedSerials.push(
            serialNumber
          );


        }
      );





      remarks.push(
        `Batch ${batch.batchNumber}: ${consume} units`
      );



    }





    if (
      requiredQuantity > 0
    ) {


      throw new Error(
        "Insufficient stock"
      );


    }





    // Save updated batch quantities

    inventoryService.updateBatches(
      batches
    );





    const currentStock =
      inventoryService
        .getBatches()
        .filter(
          (batch) =>
            batch.productId ===
            payload.productId
        )
        .reduce(
          (
            total,
            batch
          ) =>
            total +
            batch.availableQuantity,
          0
        );





    // Sync product page stock

    productService.setStock(
      payload.productId,
      currentStock
    );





    const today =
      new Date()
        .toISOString()
        .split("T")[0];





    const transaction:
      InventoryTransaction =
    {


      id:
        crypto.randomUUID(),



      transactionDate:
        today,



      productId:
        payload.productId,



      productCode:
        payload.productCode,



      productName:
        payload.productName,



      transactionType:
        "OUT",
      createdBy:
  "System User",


      quantity:
        payload.quantity,



      stockAfterTransaction:
        currentStock,



      batchNumber:
        usedBatchNumbers[0],



      serialNumbers:
        usedSerials,



      referenceType:
        "STOCK_OUT",



      remarks:
        remarks.join("\n"),



      createdAt:
        today,



      updatedAt:
        today,


    };





    inventoryService.addTransaction(
      transaction
    );




    return transaction;


  }


}





export const fifoService =
  new FIFOService();