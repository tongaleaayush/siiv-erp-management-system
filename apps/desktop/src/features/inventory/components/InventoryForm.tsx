import {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

import Input from "@/components/ui/Input";

import { productService } from "@/features/products/services/product.service";

import type { InventoryFormData } from "../types/inventoryForm";
import type { Product } from "@/features/products/types/product.types";


export interface InventoryFormRef {
  validate: () => boolean;
  getFormData: () => InventoryFormData;
}


interface InventoryFormProps {
  inventoryCode: string;
}


const InventoryForm = forwardRef<
  InventoryFormRef,
  InventoryFormProps
>(
  (
    {
      inventoryCode,
    },
    ref
  ) => {


    const products =
      productService.getProducts();



    const [formData, setFormData] =
      useState<InventoryFormData>({
        inventoryCode,

        date:
          new Date()
            .toISOString()
            .split("T")[0],

        productId: "",
        productCode: "",
        productName: "",

        transactionType: "IN",

        quantity: 0,

        unit: "",

        remarks: "",
      });



    const updateField = (
      field: keyof InventoryFormData,
      value: string | number
    ) => {

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

    };



    const handleProductChange = (
      productId: string
    ) => {


      const selectedProduct =
        products.find(
          (product: Product) =>
            product.id === productId
        );


      if (!selectedProduct)
        return;



      setFormData((prev) => ({
        ...prev,

        productId:
          selectedProduct.id,

        productCode:
          selectedProduct.productCode,

        productName:
          selectedProduct.productName,

        unit:
          selectedProduct.unit,
      }));

    };



    const validate = () => {


      if (!formData.productId) {

        alert(
          "Please select product"
        );

        return false;
      }


      if (
        formData.quantity <= 0
      ) {

        alert(
          "Quantity must be greater than 0"
        );

        return false;
      }


      if (!formData.unit) {

        alert(
          "Unit missing"
        );

        return false;
      }


      return true;

    };



    const getFormData = () => {

      return formData;

    };



    useImperativeHandle(
      ref,
      () => ({
        validate,
        getFormData,
      })
    );



    return (

      <div className="space-y-5">


        <div className="space-y-2">

          <label className="text-sm font-medium">
            Inventory Code
          </label>


          <Input
            value={
              formData.inventoryCode
            }
            disabled
          />

        </div>



        <div className="space-y-2">

          <label className="text-sm font-medium">
            Date
          </label>


          <Input
            type="date"
            value={
              formData.date
            }
            onChange={(e) =>
              updateField(
                "date",
                e.target.value
              )
            }
          />

        </div>




        <div className="space-y-2">

          <label className="text-sm font-medium">
            Product
          </label>


          <select

            className="h-10 w-full rounded-md border px-3"

            value={
              formData.productId
            }

            onChange={(e) =>
              handleProductChange(
                e.target.value
              )
            }

          >

            <option value="">
              Select Product
            </option>


            {products.map(
              (product) => (

                <option
                  key={
                    product.id
                  }
                  value={
                    product.id
                  }
                >

                  {
                    product.productName
                  }

                </option>

              )
            )}


          </select>

        </div>




        <div className="space-y-2">

          <label className="text-sm font-medium">
            Transaction Type
          </label>


          <select

            className="h-10 w-full rounded-md border px-3"

            value={
              formData.transactionType
            }

            onChange={(e) =>
              updateField(
                "transactionType",
                e.target.value as "IN" | "OUT"
              )
            }

          >

            <option value="IN">
              IN
            </option>


            <option value="OUT">
              OUT
            </option>


          </select>


        </div>




        <div className="grid grid-cols-2 gap-4">


          <div className="space-y-2">

            <label className="text-sm font-medium">
              Quantity
            </label>


            <Input

              type="number"

              value={
                formData.quantity
              }

              onChange={(e) =>
                updateField(
                  "quantity",
                  Number(
                    e.target.value
                  )
                )
              }

            />

          </div>




          <div className="space-y-2">

            <label className="text-sm font-medium">
              Unit
            </label>


            <Input

              value={
                formData.unit
              }

              disabled

            />

          </div>


        </div>





        <div className="space-y-2">

          <label className="text-sm font-medium">
            Remarks
          </label>


          <textarea

            className="min-h-24 w-full rounded-md border p-3"

            value={
              formData.remarks
            }

            onChange={(e) =>
              updateField(
                "remarks",
                e.target.value
              )
            }

          />


        </div>



      </div>

    );
  }
);



InventoryForm.displayName =
  "InventoryForm";


export default InventoryForm;