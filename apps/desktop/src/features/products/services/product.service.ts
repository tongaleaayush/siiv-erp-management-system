import { mockProducts } from "../data/product.mock";

import type { Product } from "../types/product.types";

import { storage } from "@/utils/storage/storage";


const PRODUCT_KEY =
  "products";



class ProductService {



  getProducts(): Product[] {


    const products =
      storage.get<Product[]>(
        PRODUCT_KEY,
        []
      );



    if (products.length === 0) {


      storage.set(
        PRODUCT_KEY,
        mockProducts
      );


      return mockProducts;

    }



    return products;

  }





  getProductById(
    id: string
  ): Product | undefined {


    return this
      .getProducts()
      .find(
        (product) =>
          product.id === id
      );

  }





  updateStock(
    productId: string,
    quantity: number,
    type: "IN" | "OUT"
  ): number {


    const products =
      this.getProducts();



    const product =
      products.find(
        (item) =>
          item.id === productId
      );



    if (!product) {

      return 0;

    }



    if (type === "IN") {

      product.stock += quantity;


    } else {

      product.stock -= quantity;

    }



    storage.set(
      PRODUCT_KEY,
      products
    );



    return product.stock;

  }





  setStock(
    productId: string,
    stock: number
  ) {


    const products =
      this.getProducts();



    const product =
      products.find(
        (item) =>
          item.id === productId
      );



    if (!product) {

      return;

    }



    product.stock =
      stock;



    storage.set(
      PRODUCT_KEY,
      products
    );

  }





  resetProducts() {


    const products =
      this.getProducts();



    products.forEach(
      (product) => {

        product.stock = 0;

      }
    );



    storage.set(
      PRODUCT_KEY,
      products
    );


  }





  createProduct() {}



  updateProduct() {}



  deleteProduct() {}



}



export const productService =
  new ProductService();