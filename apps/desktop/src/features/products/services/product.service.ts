import { mockProducts } from "../data/product.mock";
import type { Product } from "../types/product.types";


class ProductService {


  getProducts(): Product[] {
    return mockProducts;
  }



  getProductById(
    id: string
  ): Product | undefined {

    return mockProducts.find(
      (product) =>
        product.id === id
    );

  }



  updateStock(
    productId: string,
    quantity: number,
    type: "IN" | "OUT"
  ): void {

    const product =
      this.getProductById(productId);


    if (!product) {
      return;
    }



    if (type === "IN") {

      product.stock += quantity;

    } else {

      product.stock -= quantity;

    }


  }



  createProduct() {}



  updateProduct() {}



  deleteProduct() {}

}


export const productService =
  new ProductService();