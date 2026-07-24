import { useRef } from "react";

import Dialog from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";

import InventoryForm, {
  type InventoryFormRef,
} from "./InventoryForm";

import type { InventoryFormData } from "../types/inventoryForm";


interface AddInventoryDialogProps {
  open: boolean;

  inventoryCode: string;

  onClose: () => void;

  onSave: (
    data: InventoryFormData
  ) => void;
}


const AddInventoryDialog = ({
  open,
  inventoryCode,
  onClose,
  onSave,
}: AddInventoryDialogProps) => {


  const inventoryFormRef =
    useRef<InventoryFormRef>(null);


  const handleSave = () => {

    if (!inventoryFormRef.current)
      return;


    const valid =
      inventoryFormRef.current.validate();


    if (!valid)
      return;


    const data =
      inventoryFormRef.current.getFormData();


    onSave(data);

    onClose();
  };


  return (
    <Dialog
      open={open}
      title="Add Inventory Entry"
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-3">

          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>


          <Button
            onClick={handleSave}
          >
            Save Entry
          </Button>

        </div>
      }
    >

      <InventoryForm
        ref={inventoryFormRef}
        inventoryCode={inventoryCode}
      />

    </Dialog>
  );
};


export default AddInventoryDialog;