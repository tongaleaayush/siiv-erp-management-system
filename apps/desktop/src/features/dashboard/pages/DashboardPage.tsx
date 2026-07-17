import { Card } from "@/components/ui";

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="mt-1 text-slate-500">
          Welcome to the SIIV ERP Management System
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <h2 className="text-sm font-medium text-slate-500">
            Total Customers
          </h2>
          <p className="mt-2 text-3xl font-bold">0</p>
        </Card>

        <Card>
          <h2 className="text-sm font-medium text-slate-500">
            Total Products
          </h2>
          <p className="mt-2 text-3xl font-bold">0</p>
        </Card>

        <Card>
          <h2 className="text-sm font-medium text-slate-500">
            Total Invoices
          </h2>
          <p className="mt-2 text-3xl font-bold">0</p>
        </Card>

        <Card>
          <h2 className="text-sm font-medium text-slate-500">
            Revenue
          </h2>
          <p className="mt-2 text-3xl font-bold">₹0</p>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;