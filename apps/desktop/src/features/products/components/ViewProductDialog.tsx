import Dialog from "@/components/ui/Dialog";
import type { Product } from "../types/product.types";

interface ViewProductDialogProps {
  open: boolean;
  product: Product;
  onClose: () => void;
  onEdit: (product: Product) => void;
}

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="grid grid-cols-3 gap-4 py-2">
    <span className="font-medium text-muted-foreground">
      {label}
    </span>

    <span className="col-span-2 break-words">
      {value}
    </span>
  </div>
);

const ViewProductDialog = ({
  open,
  product,
  onClose,
  onEdit,
}: ViewProductDialogProps) => {
  return (
    <Dialog
      open={open}
      title="Product Details"
      onClose={onClose}
      size="lg"
      footer={
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onEdit(product);
            }}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Edit Product Details
          </button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Product Information */}
        <section>
          <h3 className="mb-3 text-lg font-semibold">
            Product Information
          </h3>

          <InfoRow
            label="Product Code"
            value={product.productCode}
          />

          <InfoRow
            label="Product Name"
            value={product.productName}
          />

          <InfoRow
            label="Unit"
            value={product.unit}
          />

          <InfoRow
            label="HSN Code"
            value={product.hsnCode}
          />
        </section>

        {/* Tax & Pricing */}
        <section>
          <h3 className="mb-3 text-lg font-semibold">
            Tax & Pricing
          </h3>

          <InfoRow
            label="SGST"
            value={`${product.sgst}%`}
          />

          <InfoRow
            label="CGST"
            value={`${product.cgst}%`}
          />

          <InfoRow
            label="IGST"
            value={`${product.igst}%`}
          />

          <InfoRow
            label="Rate"
            value={`₹${product.rate.toLocaleString("en-IN")}`}
          />
        </section>

        {/* Inventory */}
        <section>
          <h3 className="mb-3 text-lg font-semibold">
            Inventory
          </h3>

          <InfoRow
            label="Available Stock"
            value={product.stock}
          />
        </section>
      </div>
    </Dialog>
  );
};

export default ViewProductDialog;