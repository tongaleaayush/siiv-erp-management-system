import { useMemo, useState } from "react";

import {
  DataTable,
  DataTableToolbar,
} from "@/components/common/table";

import { customerColumns } from "./customerColumns";
import { customers } from "../services/customer.mock";

const CustomerTable = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return customers.filter((customer) => {
      const matchesSearch =
        query === "" ||
        customer.customerCode
          .toLowerCase()
          .includes(query) ||
        customer.companyName
          .toLowerCase()
          .includes(query) ||
        customer.contactPerson
          .toLowerCase()
          .includes(query) ||
        customer.phone
          .toLowerCase()
          .includes(query) ||
        customer.city
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" &&
          customer.isActive) ||
        (statusFilter === "inactive" &&
          !customer.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <>
      <DataTableToolbar
        searchValue={search}
        searchPlaceholder="Search customers..."
        onSearchChange={setSearch}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <DataTable
        columns={customerColumns}
        data={filteredCustomers}
      />
    </>
  );
};

export default CustomerTable;