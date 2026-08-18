import { useState } from "react";

import { productService } from "@/features/products/services/product.service";

import { invoiceService } from "../services/invoice.service";

import {
  inventoryService,
} from "@/features/inventory/services/inventory.service";

import {
  stockSummaryService,
} from "@/features/inventory/services/stockSummary.service";

import { Plus } from "lucide-react";

import { PageLayout } from "@/components/common/page";

import { Button } from "@/components/ui";

import InvoiceTable from "../components/InvoiceTable";

import CreateInvoiceDialog from "../components/CreateInvoiceDialog";

import type { Invoice } from "../types/invoice.types";

const InvoicePage = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(
    invoiceService.getInvoices(),
  );

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleInvoiceCreated = () => {
    setInvoices(invoiceService.getInvoices());
  };

  const handleCancelInvoice = (invoice: Invoice) => {
    if (invoice.status === "CANCELLED") {
      return;
    }

    const confirmCancel = window.confirm(
      `Are you sure you want to cancel invoice ${invoice.invoiceNumber}?`,
    );

    if (!confirmCancel) {
      return;
    }

    const invoiceTransactions =
  inventoryService.getInvoiceTransactions(
    invoice.invoiceNumber
  );

console.log(
  "INVOICE TRANSACTIONS:",
  invoiceTransactions
);

  invoice.items.forEach((item) => {


  const invoiceTransactions =
    inventoryService.getInvoiceTransactions(
      invoice.invoiceNumber
    );


  const outTransaction =
    invoiceTransactions.find(
      (transaction) =>
        transaction.productId === item.productId
    );


  if (!outTransaction) {
    return;
  }


  const consumedBatches =
    outTransaction.batchNumber
      .split(",")
      .map((batch) => {

        const [
          batchNumber,
          quantity
        ] = batch.trim().split(":");


        return {
          batchNumber,

          quantity:
            Number(quantity),
        };

      });



  inventoryService.restoreStockByBatch(
    item.productId,
    consumedBatches
  );

  const updatedStock =
  stockSummaryService.getProductStock(
    item.productId
  );


productService.setStock(
  item.productId,
  updatedStock
);

  inventoryService.addTransaction({

    id:
      crypto.randomUUID(),


    transactionDate:
      new Date()
        .toISOString()
        .split("T")[0],


    productId:
      item.productId,


    productCode:
      item.productCode,


    productName:
      item.productName,


    transactionType:
      "IN",

      createdBy:
  "System User",


    quantity:
      item.quantity,


    stockAfterTransaction:
      updatedStock,


   batchNumber:
  consumedBatches
    .map(
      (batch) =>
        `${batch.batchNumber}:${batch.quantity}`
    )
    .join(", "),


    serialNumbers:
      [],


    referenceType:
      "INVOICE_CANCEL",


    remarks:
      `Invoice cancelled.\nInvoice No: ${invoice.invoiceNumber}`,


    createdAt:
      new Date()
        .toISOString()
        .split("T")[0],


    updatedAt:
      new Date()
        .toISOString()
        .split("T")[0],

  });


});

    const updatedInvoice = {
      ...invoice,

      status: "CANCELLED" as const,
    };

    invoiceService.updateInvoice(updatedInvoice);

    setInvoices((previousInvoices) =>
      previousInvoices.map((item) =>
        item.id === invoice.id ? updatedInvoice : item,
      ),
    );
  };

  return (
    <PageLayout
      title="Invoices"
      breadcrumb={[
        {
          label: "Dashboard",
        },

        {
          label: "Invoices",
        },
      ]}
      actions={
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus
            className="
              mr-2
              h-4
              w-4
            "
          />
          Create Invoice
        </Button>
      }
    >
      <InvoiceTable invoices={invoices} onCancelInvoice={handleCancelInvoice} />

      <CreateInvoiceDialog
        open={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false);

          handleInvoiceCreated();
        }}
      />
    </PageLayout>
  );
};

export default InvoicePage;
