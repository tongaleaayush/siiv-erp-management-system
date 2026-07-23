import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

import {
  PageLayout,
  PageToolbar,
} from "@/components/common/page";
import { ExportButton } from "@/components/common/export";
import { Button } from "@/components/ui";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";

import { getNextCode } from "@/utils/codeGenerator/getNextCode";

import AddProductDialog from "../components/AddProductDialog";
import EditProductDialog from "../components/EditProductDialog";
import ViewProductDialog from "../components/ViewProductDialog";
import ProductTable from "../components/ProductTable";

import { productExportColumns } from "../config/productExport";

import { productService } from "../services/product.service";

import {
  mapFormToProduct,
  mapProductToForm,
} from "../mappers/product.mapper";

import type { Product } from "../types/product.types";
import type { ProductFormData } from "../types/productForm";

const ProductsPage = () => {
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] =
    useState(false);

  const [isEditProductDialogOpen, setIsEditProductDialogOpen] =
    useState(false);

  const [isViewProductDialogOpen, setIsViewProductDialogOpen] =
    useState(false);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [products, setProducts] = useState<Product[]>(
    productService.getProducts()
  );

  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
  const query = search.trim().toLowerCase();

  return products.filter((product) => {
    return (
      query === "" ||
      product.productCode.toLowerCase().includes(query) ||
      product.productName.toLowerCase().includes(query) ||
      product.hsnCode.toLowerCase().includes(query) ||
      product.unit.toLowerCase().includes(query)
    );
  });
}, [products, search]);

  const [nextProductCode, setNextProductCode] =
    useState(getNextCode(
  products,
  "PROD",
  "productCode"
));

  const handleAddProduct = (
    productData: ProductFormData
  ) => {
    const newProduct = mapFormToProduct(
      crypto.randomUUID(),
      {
        ...productData,
        productCode: nextProductCode,
      }
    );

    setProducts((prev) => [
      newProduct,
      ...prev,
    ]);

    setIsAddProductDialogOpen(false);
  };

  const handleUpdateProduct = (
    productData: ProductFormData
  ) => {
    if (!selectedProduct) return;

    const updatedProduct = mapFormToProduct(
      selectedProduct.id,
      productData
    );

    setProducts((prev) =>
      prev.map((product) =>
        product.id === selectedProduct.id
          ? updatedProduct
          : product
      )
    );

    setIsEditProductDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleViewProduct = (
    product: Product
  ) => {
    setSelectedProduct(product);
    setIsViewProductDialogOpen(true);
  };

  const handleEditProduct = (
    product: Product
  ) => {
    setSelectedProduct(product);
    setIsEditProductDialogOpen(true);
  };

  const handleDeleteClick = (
    product: Product
  ) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteProduct = () => {
    if (!selectedProduct) return;

    setProducts((prev) =>
      prev.filter(
        (product) =>
          product.id !== selectedProduct.id
      )
    );

    setIsDeleteDialogOpen(false);
    setSelectedProduct(null);
  };

  return (
    <PageLayout
      title="Products"
      
      breadcrumb={[
        { label: "Dashboard" },
        { label: "Products" },
      ]}
      actions={
        <div className="flex items-center gap-2">
          <ExportButton
            moduleName="Products"
            data={products}
            columns={productExportColumns}
          />

          <Button
            onClick={() => {
              setNextProductCode(
                getNextCode(
                    products,
  "PROD",
  "productCode"
)
              );

              setIsAddProductDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      }
    >
        <PageToolbar
  searchValue={search}
  searchPlaceholder="Search products..."
  onSearchChange={setSearch}
/>
              <ProductTable
        products={filteredProducts}
        onView={handleViewProduct}
        onEdit={handleEditProduct}
        onDelete={handleDeleteClick}
      />

      <AddProductDialog
        open={isAddProductDialogOpen}
        productCode={nextProductCode}
        onClose={() =>
          setIsAddProductDialogOpen(false)
        }
        onSave={handleAddProduct}
      />

      {selectedProduct && (
        <EditProductDialog
          open={isEditProductDialogOpen}
          initialData={mapProductToForm(
            selectedProduct
          )}
          onClose={() => {
            setIsEditProductDialogOpen(false);
            setSelectedProduct(null);
          }}
          onSave={handleUpdateProduct}
        />
      )}

      {selectedProduct && (
        <ViewProductDialog
          open={isViewProductDialogOpen}
          product={selectedProduct}
          onClose={() => {
            setIsViewProductDialogOpen(false);
            setSelectedProduct(null);
          }}
          onEdit={(product) => {
            setIsViewProductDialogOpen(false);
            handleEditProduct(product);
          }}
        />
      )}

      {selectedProduct && (
        <ConfirmationDialog
          open={isDeleteDialogOpen}
          title="Delete Product"
          message={`Are you sure you want to delete "${selectedProduct.productName}"? This action cannot be undone.`}
          confirmText="Delete Product"
          cancelText="Cancel"
          variant="danger"
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setSelectedProduct(null);
          }}
          onConfirm={handleDeleteProduct}
        />
      )}
    </PageLayout>
  );
};

export default ProductsPage;