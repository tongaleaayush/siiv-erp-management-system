import {
  inventoryService,
} from "./inventory.service";


export const stockSummaryService = {


  getProductStock(
    productId: string
  ): number {


    const batches =
      inventoryService.getBatches();


    return batches
      .filter(
        (batch) =>
          batch.productId === productId
      )
      .reduce(
        (
          total,
          batch
        ) =>
          total + batch.availableQuantity,
        0
      );

  },


};