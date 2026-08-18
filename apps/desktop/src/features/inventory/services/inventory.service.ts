import type {
  InventoryBatch,
  ProductSerial,
  InventoryTransaction,
} from "../types/inventory.types";

import { storage } from "@/utils/storage/storage";

const BATCH_KEY = "inventory_batches";

const SERIAL_KEY = "inventory_serials";

const TRANSACTION_KEY = "inventory_transactions";

export const inventoryService = {
  getBatches(): InventoryBatch[] {
    return storage.get(BATCH_KEY, []);
  },

  updateBatches(batches: InventoryBatch[]) {
    storage.set(BATCH_KEY, batches);
  },

  addBatch(batch: InventoryBatch) {
    const batches = this.getBatches();

    const updated = [batch, ...batches];

    storage.set(BATCH_KEY, updated);

    return batch;
  },

  getSerials(): ProductSerial[] {
    return storage.get(SERIAL_KEY, []);
  },

  updateSerials(serials: ProductSerial[]) {
    storage.set(SERIAL_KEY, serials);
  },

  addSerial(serial: ProductSerial) {
    const serials = this.getSerials();

    const updated = [serial, ...serials];

    storage.set(SERIAL_KEY, updated);

    return serial;
  },

  getTransactions(): InventoryTransaction[] {
    return storage.get(TRANSACTION_KEY, []);
  },
getInvoiceTransactions(invoiceNumber: string) {
  const transactions = this.getTransactions();

  return transactions.filter(
    (transaction) =>
      transaction.referenceType === "INVOICE" &&
      transaction.transactionType === "OUT" &&
      transaction.remarks.includes(invoiceNumber)
  );
},

  addTransaction(transaction: InventoryTransaction) {
    const transactions = this.getTransactions();

    const updated = [transaction, ...transactions];

    storage.set(TRANSACTION_KEY, updated);

    return transaction;
  },

  reduceStock(productId: string, quantity: number) {
    const batches = this.getBatches().sort(
      (a, b) => a.createdTimestamp - b.createdTimestamp,
    );

    let remaining = quantity;

    const consumedBatches: {
      batchNumber: string;
      quantity: number;
    }[] = [];

    const updatedBatches = batches.map((batch) => {
      if (batch.productId !== productId || remaining <= 0) {
        return batch;
      }

      const available = batch.availableQuantity;

      const deduction = Math.min(available, remaining);

      if (deduction > 0) {
        consumedBatches.push({
          batchNumber: batch.batchNumber,

          quantity: deduction,
        });
      }

      remaining -= deduction;

      return {
        ...batch,

        availableQuantity: available - deduction,

        updatedAt: new Date().toISOString().split("T")[0],
      };
    });

    if (remaining > 0) {
      throw new Error("Insufficient inventory stock");
    }

    this.updateBatches(updatedBatches);

    return consumedBatches;
  },

 restoreStockByBatch(
  productId: string,
  consumedBatches: {
    batchNumber: string;
    quantity: number;
  }[],
) {
  const batches = this.getBatches();

  const updatedBatches = batches.map((batch) => {

    if (batch.productId !== productId) {
      return batch;
    }


    const consumedBatch =
      consumedBatches.find(
        (item) =>
          item.batchNumber === batch.batchNumber
      );


    if (!consumedBatch) {
      return batch;
    }


    return {
      ...batch,

      availableQuantity:
        batch.availableQuantity +
        consumedBatch.quantity,

      updatedAt:
        new Date()
          .toISOString()
          .split("T")[0],
    };

  });


  this.updateBatches(
    updatedBatches
  );


  return true;
},

  resetInventory() {
    storage.remove("products");

    storage.remove(BATCH_KEY);

    storage.remove(SERIAL_KEY);

    storage.remove(TRANSACTION_KEY);

    storage.remove("batch_counter");
  },
};
