import Dialog from "@/components/ui/Dialog";
import CustomerForm from "./CustomerForm";

interface AddCustomerDialogProps {
  open: boolean;
  onClose: () => void;
}

function AddCustomerDialog({
  open,
  onClose,
}: AddCustomerDialogProps) {
  return (
    <Dialog
      open={open}
      title="Add Customer"
      onClose={onClose}
    >
      <CustomerForm />
    </Dialog>
  );
}

export default AddCustomerDialog;