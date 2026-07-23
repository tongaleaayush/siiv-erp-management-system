import { useRef } from "react";

import Dialog from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";

import ProductForm, {
  type ProductFormRef,
} from "./ProductForm";

import type { ProductFormData } from "../types/productForm";

interface EditProductDialogProps {
  open: boolean;
  initialData: ProductFormData;
  onClose: () => void;
  onSave: (product: ProductFormData) => void;
}

function EditProductDialog({
  open,
  initialData,
  onClose,
  onSave,
}: EditProductDialogProps) {
  const productFormRef =
    useRef<ProductFormRef>(null);

  const handleSave = () => {
    if (!productFormRef.current) return;

    const isValid =
      productFormRef.current.validate();

    if (!isValid) return;

    const productData =
      productFormRef.current.getFormData();

    onSave(productData);

    onClose();
  };

  return (
    <Dialog
      open={open}
      title="Edit Product"
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
            Update Product
          </Button>
        </div>
      }
    >
      <ProductForm
        ref={productFormRef}
        open={open}
        initialData={initialData}
        productCode={initialData.productCode}
      />
    </Dialog>
  );
}

export default EditProductDialog;