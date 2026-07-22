import Dialog from "@/components/ui/Dialog";
import type { Customer } from "../types/customer.types";

interface ViewCustomerDialogProps {
  open: boolean;
  customer: Customer;
  onClose: () => void;
  onEdit: (customer: Customer) => void;
}

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="grid grid-cols-3 gap-4 py-2">
    <span className="font-medium text-muted-foreground">
      {label}
    </span>
    <span className="col-span-2 break-words">
      {value}
    </span>
  </div>
);

const ViewCustomerDialog = ({
  open,
  customer,
  onClose,
  onEdit,
}: ViewCustomerDialogProps) => {
  return (
    <Dialog
  open={open}
  title="Customer Details"
  onClose={onClose}
  size="lg"
  footer={
  <div className="flex justify-end gap-3">
    <button
      onClick={onClose}
      className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
    >
      Close
    </button>

    <button
      onClick={() => {
        onClose();
        onEdit(customer);
      }}
      className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
    >
      Edit Customer Details
    </button>
  </div>
}
>
      <div className="space-y-8">
        {/* Customer Information */}
        <section>
          <h3 className="mb-3 text-lg font-semibold">
            Customer Information
          </h3>

          <InfoRow
            label="Customer Code"
            value={customer.customerCode}
          />

          <InfoRow
            label="Company Name"
            value={customer.companyName}
          />
        </section>

        {/* Contact Information */}
        <section>
          <h3 className="mb-3 text-lg font-semibold">
            Contact Information
          </h3>

          <InfoRow
            label="Contact Person"
            value={customer.contactPerson}
          />

          <InfoRow
            label="Email"
            value={customer.email}
          />

          <InfoRow
            label="Phone"
            value={customer.phone}
          />
        </section>

       {/* Address */}
<section>
  <h3 className="mb-3 text-lg font-semibold">
    Address Information
  </h3>

  <InfoRow
    label="Country"
    value={customer.country}
  />

  <InfoRow
    label="State"
    value={customer.state}
  />

  <InfoRow
    label="City"
    value={customer.city}
  />

  <InfoRow
    label="Postal Code"
    value={customer.postalCode}
  />

  <InfoRow
    label="Address Line 1"
    value={customer.addressLine1}
  />

  <InfoRow
    label="Address Line 2"
    value={
      customer.addressLine2 || (
        <span className="text-muted-foreground">
          -
        </span>
      )
    }
  />
</section>

        {/* Business */}
        <section>
          <h3 className="mb-3 text-lg font-semibold">
            Business Information
          </h3>

          <InfoRow
            label="GST Number"
            value={customer.gstNumber}
          />

          <InfoRow
            label="Status"
            value={
              customer.isActive ? (
                <span className="rounded bg-green-100 px-2 py-1 text-green-700">
                  Active
                </span>
              ) : (
                <span className="rounded bg-red-100 px-2 py-1 text-red-700">
                  Inactive
                </span>
              )
            }
          />
        </section>
      </div>
    </Dialog>
  );
};

export default ViewCustomerDialog;