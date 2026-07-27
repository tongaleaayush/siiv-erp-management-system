import type {
  InventoryBatch,
  InventoryTransaction,
} from "../types/inventory.types";
import {
  productService,
} from "@/features/products/services/product.service";

import { inventoryService } from "./inventory.service";

import { generateBatchNumber } from "../utils/batchGenerator";

import {
  stockSummaryService,
} from "./stockSummary.service";

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


      originalQuantity:
        payload.quantity,

        


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
stockAfterTransaction:
  0,

      batchNumber:
        batchNumber,


      serialNumbers:
        [],


      referenceType:
        "STOCK_ENTRY",


      remarks:
        `Stock received.\nBatch: ${batchNumber}\nQuantity: ${payload.quantity}`,


      createdAt:
        today,


      updatedAt:
        today,

    };



   const updatedStock =
  stockSummaryService.getProductStock(
    payload.productId
  );

    productService.setStock(
  payload.productId,
  updatedStock
);

transaction.stockAfterTransaction =
  updatedStock;

inventoryService.addTransaction(
  transaction
);




    return transaction;

  }


}



export const stockService =
  new StockService();