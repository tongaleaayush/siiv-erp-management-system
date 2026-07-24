import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

import {
  PageLayout,
  PageToolbar,
} from "@/components/common/page";

import { ExportButton } from "@/components/common/export";
import { Button } from "@/components/ui";

import { getNextCode } from "@/utils/codeGenerator/getNextCode";

import InventoryTable from "../components/InventoryTable";
import AddInventoryDialog from "../components/AddInventoryDialog";

import { inventoryExportColumns } from "../config/inventoryExport";

import { inventoryService } from "../services/inventory.service";

import { productService } from "@/features/products/services/product.service";

import type { InventoryEntry } from "../types/inventory.types";
import type { InventoryFormData } from "../types/inventoryForm";


const InventoryPage = () => {


  const [
    isAddInventoryDialogOpen,
    setIsAddInventoryDialogOpen,
  ] = useState(false);



  const [
    inventoryEntries,
    setInventoryEntries,
  ] = useState<InventoryEntry[]>(
    inventoryService.getInventory()
  );



  const [search, setSearch] =
    useState("");



  const filteredInventory =
    useMemo(() => {

      const query =
        search.trim().toLowerCase();


      return inventoryEntries.filter(
        (entry) =>
          query === "" ||
          entry.inventoryCode
            .toLowerCase()
            .includes(query) ||
          entry.productName
            .toLowerCase()
            .includes(query) ||
          entry.transactionType
            .toLowerCase()
            .includes(query)
      );

    }, [
      inventoryEntries,
      search,
    ]);




  const [
    nextInventoryCode,
    setNextInventoryCode,
  ] = useState(
    getNextCode(
      inventoryEntries,
      "INV",
      "inventoryCode"
    )
  );




  const handleAddInventory = (
    data: InventoryFormData
  ) => {
    const selectedProduct =
  productService.getProductById(
    data.productId
  );


if (
  data.transactionType === "OUT" &&
  selectedProduct &&
  selectedProduct.stock < data.quantity
) {
  alert(
    "Insufficient stock available"
  );

  return;
}


    const today =
      new Date()
        .toISOString()
        .split("T")[0];


const currentStock =
  selectedProduct?.stock ?? 0;


const updatedStock =
  data.transactionType === "IN"
    ? currentStock + data.quantity
    : currentStock - data.quantity;



const newEntry: InventoryEntry = {

  id: crypto.randomUUID(),

  inventoryCode:
    nextInventoryCode,

  date:
    data.date,

  productId:
    data.productId,

  productCode:
    data.productCode,

  productName:
    data.productName,

  transactionType:
    data.transactionType,

  quantity:
    data.quantity,

    remainingQuantity:
  data.quantity,

  unit:
    data.unit,

  stockBalance:
    updatedStock,

  remarks:
    data.remarks,

  createdAt:
    today,

  updatedAt:
    today,

};



    // Update product stock
    productService.updateStock(
      data.productId,
      data.quantity,
      data.transactionType
    );



    inventoryService.addInventory(
      newEntry
    );



    setInventoryEntries(
      (prev) => [
        newEntry,
        ...prev,
      ]
    );



    setIsAddInventoryDialogOpen(false);

  };




  return (

    <PageLayout

      title="Inventory"

      breadcrumb={[
        {
          label: "Dashboard",
        },
        {
          label: "Inventory",
        },
      ]}



      actions={

        <div className="flex items-center gap-2">


          <ExportButton

            moduleName="Inventory"

            data={
              filteredInventory
            }

            columns={
              inventoryExportColumns
            }

          />



          <Button

            onClick={() => {


              setNextInventoryCode(

                getNextCode(
                  inventoryEntries,
                  "INV",
                  "inventoryCode"
                )

              );


              setIsAddInventoryDialogOpen(true);


            }}

          >

            <Plus className="mr-2 h-4 w-4" />

            Add Entry


          </Button>


        </div>

      }



    >



      <PageToolbar

        searchValue={
          search
        }

        searchPlaceholder="Search inventory..."

        onSearchChange={
          setSearch
        }

      />



      <InventoryTable

        inventory={
          filteredInventory
        }

      />



      <AddInventoryDialog

        open={
          isAddInventoryDialogOpen
        }

        inventoryCode={
          nextInventoryCode
        }

        onClose={() =>
          setIsAddInventoryDialogOpen(false)
        }

        onSave={
          handleAddInventory
        }

      />



    </PageLayout>

  );

};


export default InventoryPage;