import { Plus } from "lucide-react";
import { useState } from "react";

import { PageLayout } from "@/components/common/page";
import { Button } from "@/components/ui";

import AddCustomerDialog from "../components/AddCustomerDialog";
import CustomerTable from "../components/CustomerTable";
import { customerService } from "../services/customer.service";

import type { Customer } from "../types/customer.types";
import type { CustomerFormData } from "../types/customerForm";

const CustomersPage = () => {
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] =
    useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [customers, setCustomers] = useState<Customer[]>(
    customerService.getCustomers()
  );

  const handleAddCustomer = (
    customerData: CustomerFormData
  ) => {
    const today = new Date().toISOString().split("T")[0];

    const newCustomer: Customer = {
      id: crypto.randomUUID(),

      customerCode: `CUST-${String(
        customers.length + 1
      ).padStart(4, "0")}`,

      companyName: customerData.companyName,
      contactPerson: customerData.contactPerson,
      email: customerData.email,

      phone: `${customerData.countryCode} ${customerData.phone}`,

      gstNumber: customerData.gstNumber,

      address: customerData.address,
      city: customerData.city,
      state: customerData.state,
      country: customerData.country,
      postalCode: customerData.postalCode,

      isActive: true,

      createdAt: today,
      updatedAt: today,
    };

    setCustomers((prev) => [newCustomer, ...prev]);

    setIsAddCustomerDialogOpen(false);
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);

    console.log("Selected Customer:", customer);

    alert(`Edit Customer: ${customer.companyName}`);
  };

  return (
    <PageLayout
      title="Customers"
      description="Manage your customer database."
      breadcrumb={[
        { label: "Dashboard" },
        { label: "Customers" },
      ]}
      actions={
        <Button
          onClick={() => setIsAddCustomerDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      }
    >
      <CustomerTable
        customers={customers}
        onEdit={handleEditCustomer}
      />

      <AddCustomerDialog
        open={isAddCustomerDialogOpen}
        onClose={() =>
          setIsAddCustomerDialogOpen(false)
        }
        onSave={handleAddCustomer}
      />
    </PageLayout>
  );
};

export default CustomersPage;