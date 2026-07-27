import { inventoryService } from "./inventory.service";

import type {
  InventoryTransaction,
} from "../types/inventory.types";


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


    const usedBatches: string[] = [];

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
          (a, b) =>
            new Date(
              a.receivedDate
            ).getTime()
            -
            new Date(
              b.receivedDate
            ).getTime()
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



      usedBatches.push(
        batch.batchNumber
      );



      const availableSerials =
        inventoryService
          .getSerials()
          .filter(
            (serial) =>
              serial.productId ===
                payload.productId &&
              serial.batchNumber ===
                batch.batchNumber &&
              serial.status ===
                "AVAILABLE"
          )
          .slice(
            0,
            consume
          );



      availableSerials.forEach(
        (serial) => {

          serial.status =
            "ISSUED";

          serial.issuedDate =
            new Date()
              .toISOString()
              .split("T")[0];


          usedSerials.push(
            serial.serialNumber
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

      quantity:
        payload.quantity,

      batchNumbers:
        usedBatches,

      serialNumbers:
        usedSerials,

      remarks:
        remarks.join("\n"),

      createdAt:
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