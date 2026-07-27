import type {
  InventoryBatch,
  ProductSerial,
  InventoryTransaction,
} from "../types/inventory.types";


let batches: InventoryBatch[] = [];


let serials: ProductSerial[] = [];


let transactions: InventoryTransaction[] = [];



export const inventoryService = {


  getBatches():
    InventoryBatch[] {

    return batches;

  },


  addBatch(
    batch: InventoryBatch
  ) {

    batches = [
      batch,
      ...batches,
    ];

    return batch;

  },



  getSerials():
    ProductSerial[] {

    return serials;

  },


  addSerial(
    serial: ProductSerial
  ) {

    serials = [
      serial,
      ...serials,
    ];

    return serial;

  },



  getTransactions():
    InventoryTransaction[] {

    return transactions;

  },


  addTransaction(
    transaction: InventoryTransaction
  ) {

    transactions = [
      transaction,
      ...transactions,
    ];

    return transaction;

  },


};