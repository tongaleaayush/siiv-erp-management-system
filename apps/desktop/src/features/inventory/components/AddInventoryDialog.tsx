import { useRef } from "react";

import Dialog from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";

import StockInForm, {
  type StockInFormRef,
} from "./StockInForm";


interface AddInventoryDialogProps {

  open: boolean;

  onClose: () => void;

  onSave: (
    data: any
  ) => void;

}



const AddInventoryDialog = ({
  open,
  onClose,
  onSave,
}: AddInventoryDialogProps) => {


  const formRef =
    useRef<StockInFormRef>(null);



  const handleSave = () => {


    if (!formRef.current)
      return;



    const valid =
      formRef.current.validate();



    if (!valid)
      return;



    const data =
      formRef.current.getFormData();



    onSave(data);


    onClose();

  };



  return (

    <Dialog

      open={
        open
      }

      title="Add Stock"

      onClose={
        onClose
      }


      footer={

        <div className="flex justify-end gap-3">


          <Button

            variant="outline"

            onClick={
              onClose
            }

          >

            Cancel

          </Button>



          <Button

            onClick={
              handleSave
            }

          >

            Add Stock

          </Button>


        </div>

      }

    >


      <StockInForm

        ref={
          formRef
        }

      />


    </Dialog>

  );

};


export default AddInventoryDialog;