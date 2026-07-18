import { useMemo, useState } from "react";

import { DataTable, DataTableToolbar } from "@/components/common/table";

import { customerColumns } from "./customerColumns";
import { customers } from "../services/customer.mock";

const CustomerTable = () => {
  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return customers;

    return customers.filter((customer) =>
      [
        customer.customerCode,
        customer.companyName,
        customer.contactPerson,
        customer.phone,
        customer.city,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  return (
    <>
      <DataTableToolbar
        searchValue={search}
        searchPlaceholder="Search customers..."
        onSearchChange={setSearch}
      />

      <DataTable
        columns={customerColumns}
        data={filteredCustomers}
      />
    </>
  );
};

export default CustomerTable;