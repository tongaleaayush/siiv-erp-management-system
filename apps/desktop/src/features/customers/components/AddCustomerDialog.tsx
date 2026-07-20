import { useRef } from "react";

import Dialog from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";

import CustomerForm, {
  type CustomerFormRef,
} from "./CustomerForm";

import type { CustomerFormData } from "../types/customerForm";

interface AddCustomerDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (customer: CustomerFormData) => void;
}

function AddCustomerDialog({
  open,
  onClose,
  onSave,
}: AddCustomerDialogProps) {
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
      title="Add Customer"
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
            Save Customer
          </Button>
        </div>
      }
    >
      <CustomerForm
        ref={customerFormRef}
        open={open}
      />
    </Dialog>
  );
}

export default AddCustomerDialog;