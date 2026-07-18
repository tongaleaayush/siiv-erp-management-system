import { Plus } from "lucide-react";
import { useState } from "react";

import { PageLayout } from "@/components/common/page";
import { Button } from "@/components/ui";

import AddCustomerDialog from "../components/AddCustomerDialog";
import CustomerTable from "../components/CustomerTable";

const CustomersPage = () => {
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] =
    useState(false);

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
      <CustomerTable />

      <AddCustomerDialog
        open={isAddCustomerDialogOpen}
        onClose={() => setIsAddCustomerDialogOpen(false)}
      />
    </PageLayout>
  );
};

export default CustomersPage;