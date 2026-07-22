import type { ExportColumn } from "@/services/export";
import type { Customer } from "../types/customer";

export const customerExportColumns: ExportColumn<Customer>[] = [
  {
    header: "Customer Code",
    key: "customerCode",
  },
  {
  header: "Company Name",
  key: "companyName",
},
{
  header: "Contact Person",
  key: "contactPerson",
},
  {
    header: "Email",
    key: "email",
  },
  {
    header: "Phone",
    key: "phone",
  },
  {
    header: "GST Number",
    key: "gstNumber",
  },
  {
    header: "Country",
    key: "country",
  },
  {
    header: "State",
    key: "state",
  },
  {
    header: "City",
    key: "city",
  },
  {
    header: "Status",
    key: "status",
    formatter: (value) => (value ? "Active" : "Inactive"),
  },
];