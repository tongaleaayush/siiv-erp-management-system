import type {
  InventoryBatch,
  ProductSerial,
  InventoryTransaction,
} from "../types/inventory.types";

import { storage } from "@/utils/storage/storage";


const BATCH_KEY =
  "inventory_batches";


const SERIAL_KEY =
  "inventory_serials";


const TRANSACTION_KEY =
  "inventory_transactions";



export const inventoryService = {


  getBatches():
    InventoryBatch[] {

    return storage.get(
      BATCH_KEY,
      []
    );

  },



  updateBatches(
    batches: InventoryBatch[]
  ) {

    storage.set(
      BATCH_KEY,
      batches
    );

  },



  addBatch(
    batch: InventoryBatch
  ) {

    const batches =
      this.getBatches();


    const updated =
      [
        batch,
        ...batches,
      ];


    storage.set(
      BATCH_KEY,
      updated
    );


    return batch;

  },



  getSerials():
    ProductSerial[] {

    return storage.get(
      SERIAL_KEY,
      []
    );

  },



  updateSerials(
    serials: ProductSerial[]
  ) {

    storage.set(
      SERIAL_KEY,
      serials
    );

  },



  addSerial(
    serial: ProductSerial
  ) {

    const serials =
      this.getSerials();


    const updated =
      [
        serial,
        ...serials,
      ];


    storage.set(
      SERIAL_KEY,
      updated
    );


    return serial;

  },



  getTransactions():
    InventoryTransaction[] {

    return storage.get(
      TRANSACTION_KEY,
      []
    );

  },



  addTransaction(
    transaction: InventoryTransaction
  ) {

    const transactions =
      this.getTransactions();


    const updated =
      [
        transaction,
        ...transactions,
      ];


    storage.set(
      TRANSACTION_KEY,
      updated
    );


    return transaction;

  },



  resetInventory() {


    storage.remove(
      "products"
    );


    storage.remove(
      BATCH_KEY
    );


    storage.remove(
      SERIAL_KEY
    );


    storage.remove(
      TRANSACTION_KEY
    );


    storage.remove(
      "batch_counter"
    );


  },


};