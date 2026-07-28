import type {
  Invoice,
} from "../types/invoice.types";


import {
  storage,
} from "@/utils/storage/storage";



const INVOICE_KEY =
  "invoices";



export const invoiceService = {


  getInvoices():

  Invoice[] {

    return storage.get(
      INVOICE_KEY,
      []
    );

  },



  addInvoice(
    invoice: Invoice
  ) {


    const invoices =
      this.getInvoices();



    const updated =
      [
        invoice,
        ...invoices,
      ];



    storage.set(
      INVOICE_KEY,
      updated
    );


    return invoice;

  },



  updateInvoice(
    invoice: Invoice
  ) {


    const invoices =
      this.getInvoices();



    const updated =
      invoices.map(
        (item) =>
          item.id === invoice.id
            ? invoice
            : item
      );



    storage.set(
      INVOICE_KEY,
      updated
    );


    return invoice;

  },



  deleteInvoice(
    id: string
  ) {


    const invoices =
      this.getInvoices();



    const updated =
      invoices.filter(
        (item) =>
          item.id !== id
      );



    storage.set(
      INVOICE_KEY,
      updated
    );


  },



  resetInvoices() {

    storage.remove(
      INVOICE_KEY
    );

  },


};