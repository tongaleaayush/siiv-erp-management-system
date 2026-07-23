import { mockProducts } from "../data/product.mock";
import type { Product } from "../types/product.types";

class ProductService {
  getProducts(): Product[] {
    return mockProducts;
  }

  createProduct() {}

  updateProduct() {}

  deleteProduct() {}

  getProductById() {}
}

export const productService = new ProductService();