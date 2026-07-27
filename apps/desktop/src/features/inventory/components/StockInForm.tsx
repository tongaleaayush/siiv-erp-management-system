import {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";

import Input from "@/components/ui/Input";

import type { Product } from "@/features/products/types/product.types";

import { productService } from "@/features/products/services/product.service";


export interface StockInFormRef {

  validate: () => boolean;

  getFormData: () => {
    productId: string;

    productCode: string;

    productName: string;

    quantity: number;
  };

}



interface StockInFormProps {}



const StockInForm = forwardRef<
  StockInFormRef,
  StockInFormProps
>((

  _props,

  ref

) => {


  const [
    productId,
    setProductId,
  ] = useState("");



  const [
    quantity,
    setQuantity,
  ] = useState(0);



  const products:
    Product[] =
    productService.getProducts();



  const selectedProduct =
    products.find(
      (product) =>
        product.id === productId
    );



  const validate = () => {


    if (!productId) {

      alert(
        "Please select product"
      );

      return false;

    }



    if (quantity <= 0) {

      alert(
        "Quantity must be greater than zero"
      );

      return false;

    }



    return true;

  };



  const getFormData = () => {


    return {

      productId,

      productCode:
        selectedProduct?.productCode
        ?? "",


      productName:
        selectedProduct?.productName
        ?? "",


      quantity,

    };

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

          Product

        </label>


        <select

          className="h-10 w-full rounded-md border px-3"

          value={
            productId
          }

          onChange={
            (e) =>
              setProductId(
                e.target.value
              )
          }

        >

          <option value="">

            Select Product

          </option>


          {
            products.map(
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
            )
          }


        </select>


      </div>




      <div className="space-y-2">


        <label className="text-sm font-medium">

          Quantity

        </label>



        <Input

          type="number"

          value={
            quantity
          }

          onChange={
            (e) =>
              setQuantity(
                Number(
                  e.target.value
                )
              )
          }

        />


      </div>


    </div>

  );

});


StockInForm.displayName =
  "StockInForm";


export default StockInForm;