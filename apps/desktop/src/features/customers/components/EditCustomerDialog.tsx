import { useRef } from "react";

import Dialog from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";

import CustomerForm, {
  type CustomerFormRef,
} from "./CustomerForm";

import type { CustomerFormData } from "../types/customerForm";

interface EditCustomerDialogProps {
  open: boolean;
  initialData: CustomerFormData;
  onClose: () => void;
  onSave: (customer: CustomerFormData) => void;
}

function EditCustomerDialog({
  open,
  initialData,
  onClose,
  onSave,
}: EditCustomerDialogProps) {
  const customerFormRef =
    useRef<CustomerFormRef>(null);

  const handleSave = () => {
    if (!customerFormRef.current) return;

    const isValid =
      customerFormRef.current.validate();

    if (!isValid) return;

    const customerData =
      customerFormRef.current.getFormData();

    onSave(customerData);

    onClose();
  };

  return (
    <Dialog
      open={open}
      title="Edit Customer"
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button onClick={handleSave}>
            Update Customer
          </Button>
        </div>
      }
    >
      <CustomerForm
        ref={customerFormRef}
        open={open}
        initialData={initialData}
      />
    </Dialog>
  );
}

export default EditCustomerDialog;