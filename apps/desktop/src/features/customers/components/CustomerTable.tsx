import { useMemo, useState } from "react";

import {
  DataTable,
  DataTableToolbar,
} from "@/components/common/table";

import { customerColumns } from "./customerColumns";
import type { Customer } from "../types/customer.types";

interface CustomerTableProps {
  customers: Customer[];
  onView: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

const CustomerTable = ({
  customers,
  onView,
  onEdit,
  onDelete,
}: CustomerTableProps) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");

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
  }, [customers, search, statusFilter]);

  const columns = useMemo(
    () =>
      customerColumns({
        onView,
        onEdit,
        onDelete,
      }),
    [onView, onEdit, onDelete]
  );

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
        columns={columns}
        data={filteredCustomers}
      />
    </>
  );
};

export default CustomerTable;