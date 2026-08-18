import { useState, useEffect, useRef } from "react";

import Select from "react-select";

import { CalendarDays } from "lucide-react";

import { DayPicker } from "react-day-picker";

import "react-day-picker/style.css";
import { Check, X } from "lucide-react";

import { companyConfig } from "@/config/company.config";

import { customerService } from "@/features/customers/services/customer.service";

import { productService } from "@/features/products/services/product.service";

import { inventoryService } from "@/features/inventory/services/inventory.service";

import { stockSummaryService } from "@/features/inventory/services/stockSummary.service";

import { gstService } from "../services/gst.service";

import { invoiceService } from "../services/invoice.service";

import { generateInvoiceNumber } from "../utils/invoiceNumberGenerator";

import type { InvoiceItem } from "../types/invoice.types";

import Dialog from "@/components/ui/Dialog";

interface CreateInvoiceDialogProps {
  open: boolean;

  onClose: () => void;
}

const CreateInvoiceDialog = ({
  open,

  onClose,
}: CreateInvoiceDialogProps) => {
  const customers = customerService.getCustomers();

  const products = productService.getProducts();

  const [selectedCustomerId, setSelectedCustomerId] = useState("");

  const [selectedProductId, setSelectedProductId] = useState("");

  const [quantity, setQuantity] = useState(0);
  const [invoiceError, setInvoiceError] = useState("");

  const customerSectionRef = useRef<HTMLDivElement | null>(null);

  const productSectionRef = useRef<HTMLDivElement | null>(null);

  const transportationSectionRef = useRef<HTMLDivElement>(null);

  const vehicleNumberRef = useRef<HTMLInputElement>(null);

  const poNumberRef = useRef<HTMLInputElement>(null);

  const [quantityError, setQuantityError] = useState("");

  const [invoiceValidationError, setInvoiceValidationError] = useState("");

  const [productError, setProductError] = useState("");

  const [invoiceDate, setInvoiceDate] = useState(
    new Date()

      .toISOString()

      .split("T")[0],
  );

  const paymentTerms = [
    "Against Delivery",

    "60% Advance, 40% Against Delivery",

    "Within 5 Days",

    "Within 15 Days",

    "Advance",

    "Within 7 Days",

    "100% Against Invoice",

    "Within 30 Days",

    "1 month from date of invoice",

    "50% Advance, 50% Against Delivery",
  ];

  const [selectedPaymentTerm, setSelectedPaymentTerm] =
    useState("Against Delivery");

  const transportationModes = [
    "By Road",

    "By Hand",

    "By Courier",

    "By Porter",

    "Other",
  ];

  const [selectedTransportationMode, setSelectedTransportationMode] =
    useState("By Road");

  const [customTransportationMode, setCustomTransportationMode] = useState("");

  const [showTransportationDialog, setShowTransportationDialog] =
    useState(false);

  const [vehicleNumber, setVehicleNumber] = useState("");

  const [poNumber, setPoNumber] = useState("");

  const [poDate] = useState("");

  const [dateOfSupply, setDateOfSupply] = useState(
    new Date().toISOString().split("T")[0],
  );

  const [showSupplyCalendar, setShowSupplyCalendar] = useState(false);

  const [supplyCalendarPosition, setSupplyCalendarPosition] = useState<
    "top" | "bottom"
  >("bottom");

  const [supplyCalendarMonth, setSupplyCalendarMonth] = useState(new Date());

  const [showCalendar, setShowCalendar] = useState(false);

  const [calendarMonth, setCalendarMonth] = useState(new Date(invoiceDate));

  const [calendarPosition, setCalendarPosition] = useState<"top" | "bottom">(
    "bottom",
  );

  const supplyCalendarRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);

  const selectedCustomer = customers.find(
    (customer) => customer.id === selectedCustomerId,
  );

  const selectedProduct = products.find(
    (product) => product.id === selectedProductId,
  );

  const subtotal = invoiceItems.reduce(
    (
      total,

      item,
    ) => total + item.amount,

    0,
  );

  const gst = selectedCustomer
    ? gstService.calculateGST(
        subtotal,

        selectedCustomer.gstNumber || "",
      )
    : {};

  const grandTotal =
    subtotal +
    (gst.cgstAmount || 0) +
    (gst.sgstAmount || 0) +
    (gst.igstAmount || 0);
  const resetInvoiceForm = () => {
    setSelectedCustomerId("");

    setSelectedProductId("");

    setQuantity(0);

    setInvoiceItems([]);

    setQuantityError("");

    setInvoiceError("");

    setInvoiceValidationError("");

    setInvoiceDate(
      new Date()

        .toISOString()

        .split("T")[0],
    );

    // Reset Transportation Details

    setSelectedTransportationMode("By Road");

    setVehicleNumber("");

    setDateOfSupply(
      new Date()

        .toISOString()

        .split("T")[0],
    );

    setPoNumber("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleSupplyCalendarOutside = (event: MouseEvent) => {
      if (
        supplyCalendarRef.current &&
        !supplyCalendarRef.current.contains(event.target as Node)
      ) {
        setShowSupplyCalendar(false);
      }
    };

    document.addEventListener(
      "mousedown",

      handleSupplyCalendarOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",

        handleSupplyCalendarOutside,
      );
    };
  }, []);

  const handleAddProduct = () => {
    console.log("Add Product Clicked");
    console.log("Product Stock Debug:", {
      productName: selectedProduct?.productName,
      stock: selectedProduct?.stock,
      quantityEntered: quantity,
    });
    setQuantityError("");
    setProductError("");

    if (!selectedProduct) {
      setProductError("Please select product");

      return;
    }

    if (quantity <= 0) {
      setQuantityError("Please add at least 1 qty for product");

      return;
    }

    if (quantity > selectedProduct.stock) {
      if (selectedProduct.stock <= 0) {
        setQuantityError("There are no stock left for this product.");
      } else {
        setQuantityError(`Only ${selectedProduct.stock} units are left.`);
      }

      return;
    }

    const item: InvoiceItem = {
      id: crypto.randomUUID(),

      invoiceId: "",

      productId: selectedProduct.id,

      productCode: selectedProduct.productCode,

      productName: selectedProduct.productName,

      hsnCode: selectedProduct.hsnCode,

      quantity,

      unit: selectedProduct.unit,

      rate: selectedProduct.rate,

      amount: selectedProduct.rate * quantity,
    };

    setInvoiceItems((previous) => {
      const existingQuantity = previous
        .filter((item) => item.productId === selectedProduct.id)
        .reduce((total, item) => total + item.quantity, 0);

      const availableStock = selectedProduct.stock - existingQuantity;
      console.log("Available Stock Debug:", {
        stock: selectedProduct.stock,
        existingQuantity,
        availableStock,
      });

      if (quantity > availableStock) {
        if (availableStock <= 0) {
          setQuantityError("There are no stock left for this product.");
        } else {
          setQuantityError(`Only ${availableStock} units are left.`);
        }

        return previous;
      }

      const existingProductIndex = previous.findIndex(
        (existingItem) => existingItem.productId === selectedProduct.id,
      );

      if (existingProductIndex !== -1) {
        return previous.map((existingItem, index) => {
          if (index === existingProductIndex) {
            const updatedQuantity = existingItem.quantity + quantity;

            return {
              ...existingItem,

              quantity: updatedQuantity,

              amount: existingItem.rate * updatedQuantity,
            };
          }

          return existingItem;
        });
      }

      return [...previous, item];
    });

    if (quantity <= selectedProduct.stock) {
      setSelectedProductId("");

      setQuantity(0);
    }
  };
  const handleRemoveProduct = (itemId: string) => {
    setInvoiceItems((previous) =>
      previous.filter((item) => item.id !== itemId),
    );
  };

  const handleSaveInvoice = () => {
    setInvoiceValidationError("");

    setInvoiceError("");

    if (!selectedCustomer) {
      setInvoiceError("Please select a customer before creating invoice.");

      setTimeout(() => {
        customerSectionRef.current?.scrollIntoView({
          behavior: "smooth",

          block: "start",
        });
      }, 100);

      return;
    }

    if (invoiceItems.length === 0) {
      setInvoiceError("Please add at least one product to the invoice.");

      setTimeout(() => {
        productSectionRef.current?.scrollIntoView({
          behavior: "smooth",

          block: "start",
        });
      }, 100);

      return;
    }



    if (!poNumber.trim()) {
      setInvoiceValidationError("Please enter PO/DC No & Date");

      setTimeout(() => {
        poNumberRef.current?.scrollIntoView({
          behavior: "smooth",

          block: "center",
        });

        poNumberRef.current?.focus();
      }, 100);

      return;
    }

    const invoice = {
      id: crypto.randomUUID(),

      invoiceNumber: generateInvoiceNumber(),

      invoiceDate,

      customerId: selectedCustomer.id,

      customerName: selectedCustomer.companyName,

      customerGSTNumber: selectedCustomer.gstNumber || "",

      billingAddress: `${selectedCustomer.billingAddressLine1}, ${selectedCustomer.billingCity}, ${selectedCustomer.billingState} - ${selectedCustomer.billingPostalCode}`,

      shippingAddress: `${selectedCustomer.shippingAddressLine1}, ${selectedCustomer.shippingCity}, ${selectedCustomer.shippingState} - ${selectedCustomer.shippingPostalCode}`,

      transportationMode: selectedTransportationMode,

      vehicleNumber: vehicleNumber,

      dateOfSupply: dateOfSupply,

      poNumber: poNumber,

      poDate: poDate,

      items: invoiceItems,

      subtotal,

      cgstRate: gst.cgstRate,

      cgstAmount: gst.cgstAmount,

      sgstRate: gst.sgstRate,

      sgstAmount: gst.sgstAmount,

      igstRate: gst.igstRate,

      igstAmount: gst.igstAmount,

      grandTotal,

      paymentTerm: selectedPaymentTerm,

      status: "CONFIRMED" as const,

      placeOfSupply: `${selectedCustomer.billingCity}, ${selectedCustomer.billingState} (${
        selectedCustomer.gstNumber?.substring(0, 2) || "-"
      })`,

      state: selectedCustomer.billingState,

      stateCode: selectedCustomer.gstNumber?.substring(0, 2),

      bankName: companyConfig.bankName,

      accountNumber: companyConfig.accountNumber,

      ifscCode: companyConfig.ifscCode,

      createdAt: new Date()

        .toISOString()

        .split("T")[0],

      updatedAt: new Date()

        .toISOString()

        .split("T")[0],
    };

  invoiceItems.forEach((item) => {


  const consumedBatches =
    inventoryService.reduceStock(
      item.productId,
      item.quantity
    );



  const updatedStock =
    stockSummaryService.getProductStock(
      item.productId
    );



  productService.setStock(
    item.productId,
    updatedStock
  );



  const batchDetails =
    consumedBatches
      .map(
        (batch) =>
          `${batch.batchNumber}: ${batch.quantity}`
      )
      .join(", ");



  inventoryService.addTransaction({

    id:
      crypto.randomUUID(),


    transactionDate:
      new Date()
        .toISOString()
        .split("T")[0],


    productId:
      item.productId,


    productCode:
      item.productCode,


    productName:
      item.productName,


    transactionType:
      "OUT",

      createdBy:
  "System User",

    quantity:
      item.quantity,


    stockAfterTransaction:
      updatedStock,


   batchNumber:
  consumedBatches
    .map(
      (batch) =>
        `${batch.batchNumber}:${batch.quantity}`
    )
    .join(", "),


    serialNumbers:
      [],


    referenceType:
      "INVOICE",


    remarks:
      `Invoice created.\nInvoice No: ${invoice.invoiceNumber}\nBatch: ${batchDetails}`,



    createdAt:
      new Date()
        .toISOString()
        .split("T")[0],


    updatedAt:
      new Date()
        .toISOString()
        .split("T")[0],

  });


});

    invoiceService.addInvoice(invoice);

    resetInvoiceForm();

    onClose();
  };
  return (
    <Dialog
      open={open}
      title="Create Invoice"
      size="xl"
      onClose={() => {
        resetInvoiceForm();

        onClose();
      }}
      footer={
        <div
          className="
      flex
      w-full
      items-center
      justify-end
      gap-3
    "
        >
          <button
            onClick={() => {
              resetInvoiceForm();

              onClose();
            }}
            className="
        flex
        items-center
        justify-center
        rounded-lg
        border
        border-slate-300
        bg-white
        px-6
        py-2
        font-medium
        text-slate-700
        transition
        hover:bg-slate-100
        active:scale-95
      "
          >
            <X
              className="
          mr-2
          h-4
          w-4
        "
            />
            Cancel
          </button>

          {invoiceValidationError && (
            <div
              className="
        mb-3
        flex
        items-center
        gap-2
        rounded-lg
        border
        border-red-500
        bg-red-50
        px-3
        py-2
        text-sm
        text-red-600
      "
            >
              <div
                className="
          flex
          h-5
          w-5
          items-center
          justify-center
          rounded-full
          bg-red-600
          text-xs
          font-bold
          text-white
        "
              >
                !
              </div>

              <span>{invoiceValidationError}</span>
            </div>
          )}
          <button
            onClick={handleSaveInvoice}
            className={`

        flex
        items-center
        justify-center

        rounded-lg

        px-7

        py-2

        font-medium

        text-white

        transition

        active:scale-95


        disabled:cursor-not-allowed

        disabled:bg-slate-300


        ${
          selectedCustomer &&
          invoiceItems.length > 0 &&
          poNumber.trim()
            ? `
              bg-green-600
              hover:bg-green-700
            `
            : `
              bg-slate-300
            `
        }

      `}
          >
            <Check
              className="
          mr-2
          h-4
          w-4
        "
            />
            Save Invoice
          </button>
        </div>
      }
    >
      {/* Customer Section */}

      <div
        className="
    flex
    flex-col
    gap-2
    p-4
  "
      >
        <section
          className="
    rounded-xl
    border
    border-slate-200
    bg-white
    p-5
    shadow-sm
    mb-6
  "
        >
          <div
            className="
      flex
      items-center
      justify-between
    "
          >
            <div>
              <h2
                className="
          text-lg
          font-semibold
          text-slate-800
        "
              >
                🧾 Create Invoice
              </h2>

              <p
                className="
          text-sm
          text-slate-500
        "
              >
                Prepare invoice details before saving
              </p>
            </div>

            <div
              className="
        text-right
        text-sm
      "
            >
              <p>
                <span className="text-slate-500">Date:</span> {invoiceDate}
              </p>

              <p>
                <span className="text-slate-500">Status:</span> Confirmed
              </p>
            </div>
          </div>
        </section>

        <section
          ref={customerSectionRef}
          className="
  rounded-xl
  border
  border-slate-200
  bg-white
  p-6
  shadow-sm
  mb-6
"
        >
          <div
            className="
      mb-4
      flex
      items-center
      gap-2
    "
          >
            <div
              className="
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-lg
        bg-blue-100
        text-blue-600
      "
            >
              👤
            </div>

            <div>
              <h3
                className="
          font-semibold
          text-slate-800
        "
              >
                Customer Information
              </h3>

              <p
                className="
          text-sm
          text-slate-500
        "
              >
                Select customer for invoice generation
              </p>
            </div>
          </div>

          <Select
            value={customers

              .map((customer) => ({
                value: customer.id,

                label: customer.companyName,
              }))

              .find((option) => option.value === selectedCustomerId)}
            onChange={(option) => {
              setSelectedCustomerId(option?.value || "");

              setInvoiceError("");
            }}
            options={customers.map((customer) => ({
              value: customer.id,

              label: customer.companyName,
            }))}
            placeholder="Select Customer"
            isSearchable={true}
            className="text-sm"
            styles={{
              control: (base, state) => ({
                ...base,

                minHeight: "44px",

                borderRadius: "10px",

                borderColor: state.isFocused ? "#2563eb" : "#cbd5e1",

                boxShadow: state.isFocused
                  ? "0 0 0 3px rgba(37,99,235,0.15)"
                  : "none",

                backgroundColor: "white",

                paddingLeft: "4px",

                cursor: "pointer",

                "&:hover": {
                  borderColor: "#2563eb",
                },
              }),

              placeholder: (base) => ({
                ...base,

                color: "#64748b",

                fontSize: "14px",
              }),

              singleValue: (base) => ({
                ...base,

                color: "#334155",

                fontSize: "14px",

                fontWeight: 500,
              }),

              menu: (base) => ({
                ...base,

                marginTop: "8px",

                borderRadius: "12px",

                overflow: "hidden",

                boxShadow: "0 10px 25px rgba(0,0,0,0.12)",

                border: "1px solid #e2e8f0",

                zIndex: 100,
              }),

              menuList: (base) => ({
                ...base,

                padding: "6px",

                maxHeight: "260px",
              }),

              option: (base, state) => ({
                ...base,

                borderRadius: "8px",

                padding: "10px 12px",

                marginBottom: "2px",

                cursor: "pointer",

                fontSize: "14px",

                backgroundColor: state.isSelected
                  ? "#2563eb"
                  : state.isFocused
                    ? "#eff6ff"
                    : "white",

                color: state.isSelected ? "white" : "#334155",
              }),

              dropdownIndicator: (base) => ({
                ...base,

                color: "#64748b",

                paddingRight: "12px",
              }),

              indicatorSeparator: () => ({
                display: "none",
              }),
            }}
          />

          {invoiceError.includes("customer") && (
            <p
              className="
        mt-2
        text-sm
        text-red-600
      "
            >
              {invoiceError}
            </p>
          )}

          {selectedCustomer && (
            <div
              className="
        mt-5
        rounded-xl
        border
        bg-slate-50
        p-4
        text-sm
        mb-6
      "
            >
              <div
                className="
          grid
          grid-cols-1
          gap-4
          md:grid-cols-2
        "
              >
                <div>
                  <p
                    className="
              text-xs
              text-slate-500
            "
                  >
                    Company
                  </p>

                  <p
                    className="
              font-medium
              text-slate-800
            "
                  >
                    {selectedCustomer.companyName}
                  </p>
                </div>

                <div>
                  <p
                    className="
              text-xs
              text-slate-500
            "
                  >
                    GST Number
                  </p>

                  <p
                    className="
              font-medium
              text-slate-800
            "
                  >
                    {selectedCustomer.gstNumber || "Not Available"}
                  </p>
                </div>
              </div>

              <div
                className="
          mt-4
          grid
          grid-cols-1
          gap-4
          md:grid-cols-2
        "
              >
                <div>
                  <p
                    className="
              mb-1
              text-xs
              text-slate-500
            "
                  >
                    Billing Address
                  </p>

                  <p
                    className="
              text-slate-700
            "
                  >
                    {selectedCustomer.billingAddressLine1}
                    <br />
                    {selectedCustomer.billingCity},{" "}
                    {selectedCustomer.billingState} -{" "}
                    {selectedCustomer.billingPostalCode}
                  </p>
                </div>

                <div>
                  <p
                    className="
              mb-1
              text-xs
              text-slate-500
            "
                  >
                    Shipping Address
                  </p>

                  <p
                    className="
              text-slate-700
            "
                  >
                    {selectedCustomer.shippingAddressLine1}
                    <br />
                    {selectedCustomer.shippingCity},{" "}
                    {selectedCustomer.shippingState} -{" "}
                    {selectedCustomer.shippingPostalCode}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Invoice Date */}

        <section
          className="
    rounded-xl
    border
    border-slate-200
    bg-white
    p-6
    shadow-sm
    mb-6
  "
        >
          <div
            className="
      mb-5
      flex
      items-center
      gap-2
    "
          >
            <div
              className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        bg-blue-100
      "
            >
              📅
            </div>

            <div>
              <h3
                className="
          font-semibold
          text-slate-800
        "
              >
                Invoice Date
              </h3>

              <p
                className="
          text-sm
          text-slate-500
        "
              >
                Set invoice date for this invoice
              </p>
            </div>
          </div>

          <div
            className="
      max-w-md
    "
          >
            <label
              className="
        mb-2
        block
        text-sm
        font-medium
        text-slate-600
      "
            >
              Invoice Date
            </label>

            <div
              className="
        relative
      "
            >
              <button
                type="button"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();

                  const spaceBelow = window.innerHeight - rect.bottom;

                  const spaceAbove = rect.top;

                  setCalendarPosition(
                    spaceBelow < 350 && spaceAbove > spaceBelow
                      ? "top"
                      : "bottom",
                  );

                  setCalendarMonth(new Date(invoiceDate));

                  setShowCalendar(!showCalendar);
                }}
                className="
          flex
          h-11
          w-full
          items-center
          justify-between
          rounded-lg
          border
          border-slate-300
          bg-white
          px-3
          text-sm
          font-medium
          text-slate-700
          transition
          hover:border-blue-500
          focus:outline-none
        "
              >
                <span>{invoiceDate}</span>

                <CalendarDays
                  className="
            h-4
            w-4
            text-slate-500
          "
                />
              </button>

              {showCalendar && (
                <div
                  ref={supplyCalendarRef}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                  }}
                  className={`
              absolute
              z-50
              w-fit
              rounded-xl
              border
              border-slate-200
              bg-white
              p-2
              shadow-lg

              ${calendarPosition === "top" ? "bottom-full mb-2" : "mt-2"}
            `}
                >
                  <DayPicker
                    mode="single"
                    selected={new Date(invoiceDate)}
                    month={calendarMonth}
                    onMonthChange={setCalendarMonth}
                    onSelect={(date) => {
                      if (!date) {
                        return;
                      }

                      const formattedDate = `${date.getFullYear()}-${String(
                        date.getMonth() + 1,
                      ).padStart(2, "0")}-${String(date.getDate()).padStart(
                        2,
                        "0",
                      )}`;

                      setInvoiceDate(formattedDate);

                      setCalendarMonth(date);

                      setShowCalendar(false);
                    }}
                  />

                  <div
                    className="
                mt-2
                grid
                grid-cols-3
                gap-1.5
              "
                  >
                    <button
                      type="button"
                      onClick={() => {
                        const date = new Date();

                        date.setDate(date.getDate() - 1);

                        setInvoiceDate(date.toISOString().split("T")[0]);

                        setCalendarMonth(date);

                        setShowCalendar(false);
                      }}
                      className="
                  rounded-md
                  border
                  border-slate-300
                  bg-white
                  px-2
                  py-1.5
                  text-xs
                  font-medium
                  text-slate-700
                  hover:bg-slate-100
                "
                    >
                      Yesterday
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const date = new Date();

                        setInvoiceDate(date.toISOString().split("T")[0]);

                        setCalendarMonth(date);

                        setShowCalendar(false);
                      }}
                      className="
                  rounded-md
                  bg-blue-600
                  px-2
                  py-1.5
                  text-xs
                  font-medium
                  text-white
                  hover:bg-blue-700
                "
                    >
                      Today
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const date = new Date();

                        date.setDate(date.getDate() + 1);

                        setInvoiceDate(date.toISOString().split("T")[0]);

                        setCalendarMonth(date);

                        setShowCalendar(false);
                      }}
                      className="
                  rounded-md
                  border
                  border-slate-300
                  bg-white
                  px-2
                  py-1.5
                  text-xs
                  font-medium
                  text-slate-700
                  hover:bg-slate-100
                "
                    >
                      Tomorrow
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Transportation Details */}

        <section
          ref={transportationSectionRef}
          className="
    rounded-xl
    border
    border-slate-200
    bg-white
    p-5
    shadow-sm
    mb-8
  "
        >
          <div
            className="
      mb-4
    "
          >
            <h3
              className="
        font-semibold
        text-slate-800
      "
            >
              Transportation Details
            </h3>

            <p
              className="
        text-sm
        text-slate-500
      "
            >
              Select transportation mode for this invoice
            </p>
          </div>

          {/* Transportation Mode */}

          <Select
            value={{
              value: selectedTransportationMode,

              label: selectedTransportationMode,
            }}
            onChange={(option) => {
              const value = option?.value || "";

              setSelectedTransportationMode(value);

              if (value === "Other") {
                setShowTransportationDialog(true);
              }
            }}
            options={transportationModes.map((mode) => ({
              value: mode,

              label: mode,
            }))}
            isSearchable={false}
            className="text-sm"
          />

          {/* Vehicle Number */}

          <div
            className="
      mt-4
    "
          >
            <label
              className="
        mb-2
        block
        text-sm
        font-medium
        text-slate-700
      "
            >
              Vehicle Number
            </label>

            <input
  ref={vehicleNumberRef}
  type="text"
  value={vehicleNumber}
  onChange={(e) => setVehicleNumber(e.target.value)}
  onBlur={() => {
    if (!vehicleNumber.trim()) {
      setVehicleNumber("N/A");
    }
  }}
  placeholder="Enter vehicle number"
  className="
    h-11
    w-full
    rounded-xl
    border
    border-slate-300
    bg-white
    px-4
    text-sm
    text-slate-700
    outline-none
    transition

    hover:border-blue-400

    focus:border-blue-500

    focus:ring-2

    focus:ring-blue-100
  "
/>
          </div>

          {/* Date of Supply */}

          <div
            className="
      mt-4
    "
          >
            <label
              className="
        mb-2
        block
        text-sm
        font-medium
        text-slate-700
      "
            >
              Date of Supply
            </label>

            <div
              className="
        relative
      "
            >
              <input
                type="text"
                readOnly
                value={dateOfSupply}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();

                  const spaceBelow = window.innerHeight - rect.bottom;

                  const spaceAbove = rect.top;

                  setSupplyCalendarPosition(
                    spaceBelow < 350 && spaceAbove > spaceBelow
                      ? "top"
                      : "bottom",
                  );

                  setSupplyCalendarMonth(new Date(dateOfSupply));

                  setShowSupplyCalendar(!showSupplyCalendar);
                }}
                className="
          h-11
          w-full
          cursor-pointer
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          text-sm
          text-slate-700
          outline-none
          transition

          hover:border-blue-400

          focus:border-blue-500
        "
              />

              {showSupplyCalendar && (
                <div
                  ref={supplyCalendarRef}
                  className={`
  absolute
  left-0
  z-50
  rounded-xl
  border
  border-slate-200
  bg-white
  p-3
  shadow-lg

  ${supplyCalendarPosition === "top" ? "bottom-full mb-2" : "mt-2"}
`}
                >
                  <DayPicker
                    mode="single"
                    selected={new Date(dateOfSupply)}
                    month={supplyCalendarMonth}
                    onMonthChange={setSupplyCalendarMonth}
                    onSelect={(date) => {
                      if (!date) {
                        return;
                      }

                      const formattedDate = `${date.getFullYear()}-${String(
                        date.getMonth() + 1,
                      ).padStart(2, "0")}-${String(date.getDate()).padStart(
                        2,
                        "0",
                      )}`;

                      setDateOfSupply(formattedDate);

                      setShowSupplyCalendar(false);
                    }}
                  />
                  <div
                    className="
    mt-2
    grid
    grid-cols-3
    gap-1.5
  "
                  >
                    <button
                      type="button"
                      onClick={() => {
                        const date = new Date();

                        date.setDate(date.getDate() - 1);

                        const formattedDate = `${date.getFullYear()}-${String(
                          date.getMonth() + 1,
                        ).padStart(2, "0")}-${String(date.getDate()).padStart(
                          2,
                          "0",
                        )}`;

                        setDateOfSupply(formattedDate);

                        setSupplyCalendarMonth(date);

                        setShowSupplyCalendar(false);
                      }}
                      className="
      rounded-md
      border
      border-slate-300
      bg-white
      px-2
      py-1.5
      text-xs
      font-medium
      text-slate-700
      transition
      hover:bg-slate-100
    "
                    >
                      Yesterday
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const date = new Date();

                        const formattedDate = `${date.getFullYear()}-${String(
                          date.getMonth() + 1,
                        ).padStart(2, "0")}-${String(date.getDate()).padStart(
                          2,
                          "0",
                        )}`;

                        setDateOfSupply(formattedDate);

                        setSupplyCalendarMonth(date);

                        setShowSupplyCalendar(false);
                      }}
                      className="
      rounded-md
      bg-blue-600
      px-2
      py-1.5
      text-xs
      font-medium
      text-white
      transition
      hover:bg-blue-700
    "
                    >
                      Today
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const date = new Date();

                        date.setDate(date.getDate() + 1);

                        const formattedDate = `${date.getFullYear()}-${String(
                          date.getMonth() + 1,
                        ).padStart(2, "0")}-${String(date.getDate()).padStart(
                          2,
                          "0",
                        )}`;

                        setDateOfSupply(formattedDate);

                        setSupplyCalendarMonth(date);

                        setShowSupplyCalendar(false);
                      }}
                      className="
      rounded-md
      border
      border-slate-300
      bg-white
      px-2
      py-1.5
      text-xs
      font-medium
      text-slate-700
      transition
      hover:bg-slate-100
    "
                    >
                      Tomorrow
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className="
    mt-4
  "
          >
            <label
              className="
      mb-2
      block
      text-sm
      font-medium
      text-slate-700
    "
            >
              Place of Supply
            </label>

            <input
              type="text"
              readOnly
              value={
                selectedCustomer
                  ? `${selectedCustomer.billingCity}, ${selectedCustomer.billingState} (${
                      selectedCustomer.gstNumber?.substring(0, 2) || "-"
                    })`
                  : ""
              }
              className="
    h-11
    w-full
    rounded-xl
    border
    border-slate-300
    bg-slate-50
    px-4
    text-sm
    text-slate-700
    outline-none
  "
            />
          </div>

          <div
            className="
    mt-4
  "
          >
            <label
              className="
      mb-2
      block
      text-sm
      font-medium
      text-slate-700
    "
            >
              PO/DC No & Date
            </label>

            <input
              ref={poNumberRef}
              type="text"
              value={poNumber}
              onChange={(e) => setPoNumber(e.target.value)}
              placeholder="Enter PO/DC number"
              className="
      h-11
      w-full
      rounded-xl
      border
      border-slate-300
      bg-white
      px-4
      text-sm
      text-slate-700
      outline-none
      transition

      hover:border-blue-400

      focus:border-blue-500

      focus:ring-2

      focus:ring-blue-100
    "
            />
          </div>
        </section>

        {/* Product Section */}
        <section
          ref={productSectionRef}
          className="
    rounded-xl
    border
    border-slate-200
    bg-white
    p-5
    shadow-sm
    mb-4
  "
        >
          <div
            className="
      mb-4
      flex
      items-center
      gap-2
    "
          >
            <div
              className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        bg-green-100
        text-lg
      "
            >
              📦
            </div>

            <div>
              <h3
                className="
          font-semibold
          text-slate-800
        "
              >
                Add Products
              </h3>

              <p
                className="
          text-sm
          text-slate-500
        "
              >
                Add products and quantities to invoice
              </p>
            </div>
          </div>

          <div
            className="
      grid
      grid-cols-1
      gap-4
      md:grid-cols-[1fr_180px]
    "
          >
            <div>
              <label
                className="
          mb-2
          block
          text-sm
          font-medium
          text-slate-600
        "
              >
                Product
              </label>

              <Select
                value={products

                  .map((product) => ({
                    value: product.id,

                    label: product.productName,
                  }))

                  .find((option) => option.value === selectedProductId)}
                onChange={(option) => {
                  setSelectedProductId(option?.value || "");

                  setInvoiceError("");
                }}
                options={products.map((product) => ({
                  value: product.id,

                  label: product.productName,
                }))}
                placeholder="Select Product"
                isSearchable={true}
                className="text-sm"
                styles={{
                  control: (base, state) => ({
                    ...base,

                    minHeight: "44px",

                    borderRadius: "10px",

                    borderColor: state.isFocused ? "#2563eb" : "#cbd5e1",

                    boxShadow: state.isFocused
                      ? "0 0 0 3px rgba(37,99,235,0.15)"
                      : "none",

                    backgroundColor: "white",

                    cursor: "pointer",

                    "&:hover": {
                      borderColor: "#2563eb",
                    },
                  }),

                  placeholder: (base) => ({
                    ...base,

                    color: "#64748b",

                    fontSize: "14px",
                  }),

                  singleValue: (base) => ({
                    ...base,

                    color: "#334155",

                    fontSize: "14px",

                    fontWeight: 500,
                  }),

                  menu: (base) => ({
                    ...base,

                    marginTop: "8px",

                    borderRadius: "12px",

                    overflow: "hidden",

                    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",

                    border: "1px solid #e2e8f0",

                    zIndex: 100,
                  }),

                  menuList: (base) => ({
                    ...base,

                    padding: "6px",

                    maxHeight: "260px",
                  }),

                  option: (base, state) => ({
                    ...base,

                    borderRadius: "8px",

                    padding: "10px 12px",

                    cursor: "pointer",

                    fontSize: "14px",

                    backgroundColor: state.isSelected
                      ? "#2563eb"
                      : state.isFocused
                        ? "#eff6ff"
                        : "white",

                    color: state.isSelected ? "white" : "#334155",
                  }),

                  dropdownIndicator: (base) => ({
                    ...base,

                    color: "#64748b",
                  }),

                  indicatorSeparator: () => ({
                    display: "none",
                  }),
                }}
              />

              {invoiceError.includes("product") && (
                <p
                  className="
              mt-2
              text-sm
              text-red-600
            "
                >
                  {invoiceError}
                </p>
              )}
            </div>

            <div>
              <label
                className="
          mb-2
          block
          text-sm
          font-medium
          text-slate-600
        "
              >
                Quantity
              </label>

              <input
                type="number"
                min="1"
                step="1"
                value={quantity === 0 ? "" : quantity}
                onChange={(e) => {
                  const value = e.target.value;

                  if (value === "") {
                    setQuantity(0);

                    return;
                  }

                  setQuantity(Math.floor(Number(value)));
                }}
                onWheel={(e) => {
                  e.currentTarget.blur();
                }}
                className="
    h-11
    w-full
    rounded-lg
    border
    border-slate-300
    bg-white
    px-3
    text-sm
    font-medium
    text-slate-700
    outline-none
    transition
    focus:border-blue-500
    focus:ring-2
    focus:ring-blue-100
  "
              />

              {(quantityError || productError) && (
                <div
                  className="
        mt-2
        flex
        items-center
        gap-2
        rounded-lg
        border
        border-red-500
        bg-red-50
        px-3
        py-2
        text-sm
        text-red-600
      "
                >
                  <div
                    className="
          flex
          h-5
          w-5
          items-center
          justify-center
          rounded-full
          bg-red-600
          text-xs
          font-bold
          text-white
        "
                  >
                    !
                  </div>

                  <span>{productError || quantityError}</span>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleAddProduct}
            className="
      mt-4
      flex
      items-center
      justify-center
      rounded-lg
      bg-blue-600
      px-6
      py-2
      font-medium
      text-white
      transition
      hover:bg-blue-700
      active:scale-95
    "
          >
            + Add Product
          </button>
        </section>
      </div>

      {/* Invoice Items */}

      {true && (
        <section
          className="
       rounded-xl
border
border-slate-200
bg-white
p-6
shadow-sm
mb-8
      "
        >
          <div
            className="
          mb-4
          flex
          items-center
          gap-2
        "
          >
            <div
              className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            bg-purple-100
            text-lg
          "
            >
              🧾
            </div>

            <div>
              <h3
                className="
              font-semibold
              text-slate-800
            "
              >
                Invoice Items
              </h3>

              <p
                className="
              text-sm
              text-slate-500
            "
              >
                Products added to this invoice
              </p>
            </div>
          </div>

          <div
            className="
          overflow-hidden
          rounded-lg
          border
        "
          >
            <table
              className="
            w-full
            text-sm
          "
            >
              <thead>
                <tr
                  className="
                border-b
                bg-slate-50
                text-slate-600
              "
                >
                  <th
                    className="
                  p-3
                  text-left
                  font-medium
                "
                  >
                    Product
                  </th>

                  <th
                    className="
                  p-3
                  text-center
                  font-medium
                "
                  >
                    Qty
                  </th>

                  <th
                    className="
                  p-3
                  text-center
                  font-medium
                "
                  >
                    Rate
                  </th>

                  <th
                    className="
                  p-3
                  text-center
                  font-medium
                "
                  >
                    Amount
                  </th>

                  <th
                    className="
    p-3
    text-center
    font-medium
  "
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {invoiceItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="
            p-8
            text-center
          "
                    >
                      <div
                        className="
              flex
              flex-col
              items-center
              justify-center
              gap-2
              text-slate-500
            "
                      >
                        <div
                          className="
                text-3xl
              "
                        >
                          🛒
                        </div>

                        <p
                          className="
                font-medium
                text-slate-700
              "
                        >
                          No products added yet
                        </p>

                        <p
                          className="
                text-sm
              "
                        >
                          Add products from the section above
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  invoiceItems.map((item) => (
                    <tr
                      key={item.id}
                      className="
              border-b
              last:border-none
              hover:bg-slate-50
            "
                    >
                      <td className="p-3">{item.productName}</td>

                      <td
                        className="
                p-3
                text-center
              "
                      >
                        {item.quantity}
                      </td>

                      <td
                        className="
                p-3
                text-center
              "
                      >
                        ₹ {item.rate}
                      </td>

                      <td
                        className="
                p-3
                text-center
                font-medium
              "
                      >
                        ₹ {item.amount}
                      </td>

                      <td
                        className="
                p-3
                text-center
              "
                      >
                        <button
                          onClick={() => handleRemoveProduct(item.id)}
                          className="
                  rounded-md
                  bg-red-100
                  px-3
                  py-1
                  text-sm
                  text-red-600
                  transition
                  hover:bg-red-200
                "
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section
        className="
    rounded-xl
    border
    border-slate-200
    bg-white
    p-5
    shadow-sm
    mb-8
  "
      >
        <div
          className="
      mb-4
    "
        >
          <h3
            className="
        font-semibold
        text-slate-800
      "
          >
            Payment Terms
          </h3>

          <p
            className="
        text-sm
        text-slate-500
      "
          >
            Select payment condition for this invoice
          </p>
        </div>

        <Select
          value={{
            value: selectedPaymentTerm,

            label: selectedPaymentTerm,
          }}
          onChange={(option) => {
            setSelectedPaymentTerm(option?.value || "");
          }}
          options={paymentTerms.map((term) => ({
            value: term,

            label: term,
          }))}
          placeholder="Select Payment Term"
          isSearchable={true}
          className="text-sm"
          styles={{
            control: (base, state) => ({
              ...base,

              minHeight: "44px",

              borderRadius: "10px",

              borderColor: state.isFocused ? "#2563eb" : "#cbd5e1",

              boxShadow: state.isFocused
                ? "0 0 0 3px rgba(37,99,235,0.15)"
                : "none",

              backgroundColor: "white",

              cursor: "pointer",

              "&:hover": {
                borderColor: "#2563eb",
              },
            }),

            placeholder: (base) => ({
              ...base,

              color: "#64748b",

              fontSize: "14px",
            }),

            singleValue: (base) => ({
              ...base,

              color: "#334155",

              fontSize: "14px",

              fontWeight: 500,
            }),

            menu: (base) => ({
              ...base,

              marginTop: "8px",

              borderRadius: "12px",

              overflow: "hidden",

              boxShadow: "0 10px 25px rgba(0,0,0,0.12)",

              border: "1px solid #e2e8f0",

              zIndex: 100,
            }),

            menuList: (base) => ({
              ...base,

              padding: "6px",

              maxHeight: "260px",
            }),

            option: (base, state) => ({
              ...base,

              borderRadius: "8px",

              padding: "10px 12px",

              cursor: "pointer",

              fontSize: "14px",

              backgroundColor: state.isSelected
                ? "#2563eb"
                : state.isFocused
                  ? "#eff6ff"
                  : "white",

              color: state.isSelected ? "white" : "#334155",
            }),

            dropdownIndicator: (base) => ({
              ...base,

              color: "#64748b",
            }),

            indicatorSeparator: () => ({
              display: "none",
            }),
          }}
        />
      </section>

      {/* Invoice Summary */}

      <section
        className="
   rounded-xl
border
border-slate-200
bg-white
p-5
shadow-sm
mb-6
  "
      >
        <div
          className="
      mb-4
      flex
      items-center
      gap-2
    "
        >
          <div
            className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        bg-yellow-100
        text-lg
      "
          >
            💰
          </div>

          <div>
            <h3
              className="
          font-semibold
          text-slate-800
        "
            >
              Invoice Summary
            </h3>

            <p
              className="
          text-sm
          text-slate-500
        "
            >
              Review invoice totals before saving
            </p>
          </div>
        </div>

        <div
          className="
      space-y-3
      text-sm
    "
        >
          <div
            className="
        flex
        justify-between
        text-slate-600
      "
          >
            <span>Subtotal</span>

            <span className="font-medium">₹ {subtotal.toFixed(2)}</span>
          </div>

          {gst.cgstRate !== undefined && (
            <div
              className="
        flex
        justify-between
        text-slate-600
      "
            >
              <span>CGST ({gst.cgstRate}%)</span>

              <span>₹ {gst.cgstAmount?.toFixed(2) || "0.00"}</span>
            </div>
          )}

          {gst.sgstRate !== undefined && (
            <div
              className="
        flex
        justify-between
        text-slate-600
      "
            >
              <span>SGST ({gst.sgstRate}%)</span>

              <span>₹ {gst.sgstAmount?.toFixed(2) || "0.00"}</span>
            </div>
          )}

          {gst.igstRate !== undefined && (
            <div
              className="
        flex
        justify-between
        text-slate-600
      "
            >
              <span>IGST ({gst.igstRate}%)</span>

              <span>₹ {gst.igstAmount?.toFixed(2) || "0.00"}</span>
            </div>
          )}

          <div
            className="
        mt-4
        flex
        justify-between
        border-t
        pt-4
        text-lg
        font-bold
        text-green-700
      "
          >
            <span>Total Payable</span>

            <span>₹ {grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </section>
      <div className="h-4" />

      {/* Other Transportation Mode Dialog */}

      <Dialog
        open={showTransportationDialog}
        title="Enter Transportation Mode"
        size="sm"
        onClose={() => {
          setShowTransportationDialog(false);
        }}
        footer={
          <div
            className="
                flex
                justify-end
                gap-3
              "
          >
            <button
              onClick={() => {
                setShowTransportationDialog(false);
              }}
              className="
                  rounded-lg
                  border
                  border-slate-300
                  px-5
                  py-2
                  text-sm
                "
            >
              Cancel
            </button>

            <button
              onClick={() => {
                if (customTransportationMode.trim()) {
                  setSelectedTransportationMode(customTransportationMode);
                }

                setShowTransportationDialog(false);
              }}
              className="
                  rounded-lg
                  bg-blue-600
                  px-5
                  py-2
                  text-sm
                  text-white
                "
            >
              Save
            </button>
          </div>
        }
      >
        <input
          value={customTransportationMode}
          onChange={(e) => setCustomTransportationMode(e.target.value)}
          placeholder="Enter transportation mode"
          className="
              h-11
              w-full
              rounded-lg
              border
              border-slate-300
              px-3
              text-sm
              outline-none
              focus:border-blue-500
            "
        />
      </Dialog>
    </Dialog>
  );
};

export default CreateInvoiceDialog;
