import { DataTable } from "@/components/common/table";

import { inventoryColumns } from "./inventoryColumns";

import type { InventoryTransaction } from "../types/inventory.types";


interface InventoryTableProps {

  transactions: InventoryTransaction[];

}



const InventoryTable = ({
  transactions,
}: InventoryTableProps) => {


  return (

    <DataTable

      columns={
        inventoryColumns
      }

      data={
        transactions
      }

    />

  );

};


export default InventoryTable;