import { DataTable } from "@/components/common/table";

import { inventoryColumns } from "./inventoryColumns";
import type { InventoryEntry } from "../types/inventory.types";

interface InventoryTableProps {
  inventory: InventoryEntry[];
}

const InventoryTable = ({
  inventory,
}: InventoryTableProps) => {
  return (
    <DataTable
      columns={inventoryColumns}
      data={inventory}
      
    />
  );
};

export default InventoryTable;