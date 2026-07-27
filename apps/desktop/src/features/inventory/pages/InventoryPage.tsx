import { Plus } from "lucide-react";
import { useState } from "react";

import {
  PageLayout,
} from "@/components/common/page";

import { Button } from "@/components/ui";

import { ExportButton } from "@/components/common/export";

import InventoryTable from "../components/InventoryTable";

import AddInventoryDialog from "../components/AddInventoryDialog";

import { inventoryService } from "../services/inventory.service";

import { stockService } from "../services/stock.service";

import type {
  InventoryTransaction,
} from "../types/inventory.types";



const InventoryPage = () => {


  const [
    isAddOpen,
    setIsAddOpen,
  ] = useState(false);



  const [
    transactions,
    setTransactions,
  ] = useState<InventoryTransaction[]>(
    inventoryService.getTransactions()
  );



  const handleStockIn = (
    data: any
  ) => {


    const transaction =
      stockService.stockIn({
        productId:
          data.productId,

        productCode:
          data.productCode,

        productName:
          data.productName,

        quantity:
          data.quantity,
      });



    setTransactions(
      (previous) => [
        transaction,
        ...previous,
      ]
    );



    setIsAddOpen(false);

  };



  return (

    <PageLayout

      title="Inventory"

      breadcrumb={[
        {
          label:
            "Dashboard",
        },
        {
          label:
            "Inventory",
        },
      ]}



      actions={

        <div className="flex gap-2">


          <ExportButton

            moduleName="Inventory"

            data={
              transactions
            }

            columns={[]}

          />



          <Button

            onClick={() =>
              setIsAddOpen(true)
            }

          >

            <Plus
              className="mr-2 h-4 w-4"
            />

            Add Stock

          </Button>


        </div>

      }


    >


      <InventoryTable

        transactions={
          transactions
        }

      />



      <AddInventoryDialog

        open={
          isAddOpen
        }

        onClose={() =>
          setIsAddOpen(false)
        }

        onSave={
          handleStockIn
        }

      />


    </PageLayout>

  );

};


export default InventoryPage;