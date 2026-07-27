import type { ExportColumn } from "@/services/export";

import type { Customer } from "../types/customer.types";


export const customerExportColumns:
  ExportColumn<Customer>[] = [

  {
    header: "Customer Code",

    accessor: (
      customer
    ) =>
      customer.customerCode,
  },


  {
    header: "Company Name",

    accessor: (
      customer
    ) =>
      customer.companyName,
  },


  {
    header: "Contact Person",

    accessor: (
      customer
    ) =>
      customer.contactPerson,
  },


  {
    header: "Email",

    accessor: (
      customer
    ) =>
      customer.email,
  },


  {
    header: "Phone",

    accessor: (
      customer
    ) =>
      customer.phone,
  },


  {
    header: "GST Number",

    accessor: (
      customer
    ) =>
      customer.gstNumber ?? "",
  },


  {
    header: "Country",

    accessor: (
      customer
    ) =>
      customer.country,
  },


  {
    header: "State",

    accessor: (
      customer
    ) =>
      customer.state,
  },


  {
    header: "City",

    accessor: (
      customer
    ) =>
      customer.city,
  },

];