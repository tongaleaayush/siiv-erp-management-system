import Input from "@/components/ui/Input";
import { Select } from "@/components/ui";
import { unitService } from "../services/unit.service";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

import type { ProductFormData } from "../types/productForm";
import {
  validateProductForm,
  type ProductFormErrors,
} from "../validation/product.validation";
interface ProductFormProps {
  open: boolean;
  productCode?: string;
  initialData?: ProductFormData;
}

const createInitialFormData = (
  productCode = ""
): ProductFormData => ({
  productCode,
  productName: "",

  unit: "",

  hsnCode: "",

  sgst: 0,
  cgst: 0,
  igst: 0,

  rate: 0,

  stock: 0,
});

export interface ProductFormRef {
  validate: () => boolean;
  getFormData: () => ProductFormData;
}

const ProductForm = forwardRef<ProductFormRef, ProductFormProps>(
  ({ open, productCode, initialData }, ref) => {
    const isEditMode = Boolean(initialData);
    const [formData, setFormData] =
      useState<ProductFormData>(
        createInitialFormData(productCode)
      );

    const [errors, setErrors] =
      useState<ProductFormErrors>({});

    useEffect(() => {
      if (!open) return;

      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData(
          createInitialFormData(productCode)
        );
      }

      setErrors({});
    }, [open, initialData, productCode]);

    const unitOptions = useMemo(
      () => unitService.getUnitOptions(),
      []
    );

    const handleInputChange = (
      event: React.ChangeEvent<
        HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
      >
    ) => {
      const { name, value } = event.target;

      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));

      setFormData((prev) => ({
        ...prev,
        [name]:
          name === "sgst" ||
          name === "cgst" ||
          name === "igst" ||
          name === "rate" ||
          name === "stock"
            ? Number(value)
            : value,
      }));
    };

    const validateForm = () => {
      const validationErrors =
        validateProductForm(formData);

      setErrors(validationErrors);

      return (
        Object.keys(validationErrors).length === 0
      );
    };

    useImperativeHandle(ref, () => ({
      validate: validateForm,
      getFormData: () => formData,
    }));

    return ( 
              <div className="space-y-8">
        {/* Product Information */}
        <section>
          <h3 className="text-lg font-semibold text-slate-800">
            Product Information
          </h3>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Product Code"
              name="productCode"
              value={formData.productCode}
              readOnly
              className="cursor-not-allowed bg-slate-100"
              placeholder="Auto Generated"
            />

            <Input
              label="Product Name"
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              placeholder="Enter product name"
              error={errors.productName}
              required
            />
          </div>
        </section>

        {/* Tax & Pricing */}
        <section>
          <h3 className="text-lg font-semibold text-slate-800">
            Tax & Pricing
          </h3>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="HSN Code"
              name="hsnCode"
              value={formData.hsnCode}
              onChange={handleInputChange}
              placeholder="Enter HSN Code"
              error={errors.hsnCode}
              required
            />

            <Select
              label="Unit"
              name="unit"
              value={formData.unit}
              onChange={handleInputChange}
              options={unitOptions}
              placeholder="Select Unit"
              error={errors.unit}
              required
            />

            <Input
              type="number"
              label="SGST (%)"
              name="sgst"
              value={formData.sgst}
              onChange={handleInputChange}
              placeholder="Enter SGST"
              error={errors.sgst}
            />

            <Input
              type="number"
              label="CGST (%)"
              name="cgst"
              value={formData.cgst}
              onChange={handleInputChange}
              placeholder="Enter CGST"
              error={errors.cgst}
            />

            <Input
              type="number"
              label="IGST (%)"
              name="igst"
              value={formData.igst}
              onChange={handleInputChange}
              placeholder="Enter IGST"
              error={errors.igst}
            />

            <Input
              type="number"
              label="Rate (₹)"
              name="rate"
              value={formData.rate}
              onChange={handleInputChange}
              placeholder="Enter Rate"
              error={errors.rate}
            />
          </div>
        </section>

       {/* Inventory */}
<section>
  <h3 className="text-lg font-semibold text-slate-800">
    Inventory
  </h3>

  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">

    <Input
      type="number"
      label="Stock"
      name="stock"
      value={formData.stock}
      onChange={
        isEditMode
          ? undefined
          : handleInputChange
      }
      readOnly={isEditMode}
      className={
        isEditMode
          ? "cursor-not-allowed bg-slate-100"
          : ""
      }
      placeholder="Enter Available Stock"
      error={errors.stock}
    />

  </div>
</section>
      </div>
    );
  }
);

ProductForm.displayName = "ProductForm";

export default ProductForm;