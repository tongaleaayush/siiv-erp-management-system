import { Plus } from "lucide-react";
import { useState } from "react";

import {
  PageLayout,
} from "@/components/common/page";

import { Button } from "@/components/ui";

import { ExportButton } from "@/components/common/export";

import InventoryTable from "../components/InventoryTable";

import SerialStockTable from "../components/SerialStockTable";

import AddInventoryDialog from "../components/AddInventoryDialog";

import { inventoryService } from "../services/inventory.service";

import {
  serialStockService,
} from "../services/serialStock.service";

import { stockService } from "../services/stock.service";

import { fifoService } from "../services/fifo.service";

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



  const [
    serialStock,
    setSerialStock,
  ] = useState(
    serialStockService.getSerialStock()
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



    setSerialStock(
      serialStockService.getSerialStock()
    );



    setIsAddOpen(false);

  };




  const testStockOut = () => {

  try {


    const transaction =
      fifoService.stockOut({

        productId:
          "1",

        productCode:
          "PROD-0001",

        productName:
          "Con-Evator PCB 24VAC, with Bluetooth Device & Android Application Part No - 611095",

        quantity:
          10,

      });



    setTransactions(
      (previous) => [
        transaction,
        ...previous,
      ]
    );



    setSerialStock(
      serialStockService.getSerialStock()
    );



    console.log(
      transaction
    );


  }
  catch(error) {


    alert(
      error instanceof Error
        ? error.message
        : "Insufficient stock"
    );


  }

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



          <Button

            variant="outline"

            onClick={
              testStockOut
            }

          >

            Test OUT

          </Button>


        </div>

      }


    >


      <InventoryTable

        transactions={
          transactions
        }

      />



      <SerialStockTable

        data={
          serialStock
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
