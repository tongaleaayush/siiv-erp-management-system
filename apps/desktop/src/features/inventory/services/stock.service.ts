import type {
  InventoryBatch,
  ProductSerial,
  InventoryTransaction,
} from "../types/inventory.types";

import { productService } from "@/features/products/services/product.service";

import { inventoryService } from "./inventory.service";

import { generateBatchNumber } from "../utils/batchGenerator";

import { generateSerialNumbers } from "../utils/serialGenerator";


interface StockInPayload {
  productId: string;

  productCode: string;

  productName: string;

  quantity: number;
}


class StockService {


  stockIn(
    payload: StockInPayload
  ) {


    const batchNumber =
      generateBatchNumber();



    const serialNumbers =
      generateSerialNumbers(
        payload.productId,
        payload.quantity
      );



    const today =
      new Date()
        .toISOString()
        .split("T")[0];



    const batch: InventoryBatch = {

      id:
        crypto.randomUUID(),

      batchNumber,

      productId:
        payload.productId,

      productCode:
        payload.productCode,

      productName:
        payload.productName,

      receivedDate:
        today,

      quantity:
        payload.quantity,

      availableQuantity:
        payload.quantity,

      createdAt:
        today,

      updatedAt:
        today,

    };



    inventoryService.addBatch(
      batch
    );



    const createdSerials:
      ProductSerial[] =
      serialNumbers.map(
        (serialNumber) => ({

          id:
            crypto.randomUUID(),

          serialNumber,

          productId:
            payload.productId,

          productCode:
            payload.productCode,

          productName:
            payload.productName,

          batchNumber,

          status:
            "AVAILABLE",

          createdAt:
            today,

        })
      );



    createdSerials.forEach(
      (serial) =>
        inventoryService.addSerial(
          serial
        )
    );



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
        "IN",

      quantity:
        payload.quantity,

      batchNumbers:
        [
          batchNumber
        ],

      serialNumbers,

      remarks:
        `Stock received.\nBatch: ${batchNumber}\nQuantity: ${payload.quantity}`,

      createdAt:
        today,

    };



    inventoryService.addTransaction(
      transaction
    );

    productService.updateStock(
  payload.productId,
  payload.quantity,
  "IN"
);



    return transaction;

  }

}


export const stockService =
  new StockService();