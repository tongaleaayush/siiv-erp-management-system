import { Plus } from "lucide-react";

import { PageLayout } from "@/components/common/page";
import { DataTable } from "@/components/common/table";
import { Button } from "@/components/ui";

import { customerColumns } from "../components/customerColumns";
import { customers } from "../services/customer.mock";

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
      <DataTable
        columns={customerColumns}
        data={customers}
      />
    </PageLayout>
  );
};

export default CustomersPage;