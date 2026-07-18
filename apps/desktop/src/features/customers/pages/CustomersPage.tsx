import { Plus } from "lucide-react";

import { PageLayout } from "@/components/common/page";
import { Button } from "@/components/ui";

import CustomerTable from "../components/CustomerTable";

const CustomersPage = () => {
  return (
    <PageLayout
      title="Customers"
      description="Manage your customer database."
      breadcrumb={[
        { label: "Dashboard" },
        { label: "Customers" },
      ]}
      actions={
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      }
    >
      <CustomerTable />
    </PageLayout>
  );
};

export default CustomersPage;