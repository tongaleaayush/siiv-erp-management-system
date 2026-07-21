import {
  exportService,
  generateExportFileName,
} from "@/services/export";

import { Button } from "@/components/ui";
import { Dropdown } from "@/components/ui/dropdown";

import type { ExportButtonProps } from "./types";

export default function ExportButton<
  T extends Record<string, unknown>
>({
  moduleName,
  data,
  columns,
}: ExportButtonProps<T>) {
  const handleExport = async () => {
    await exportService.export({
      format: "csv",
      fileName: generateExportFileName(moduleName),
      data,
      columns,
    });
  };

  return (
  <Dropdown
    trigger={
      <Button variant="outline">
        Export
      </Button>
    }
    items={[
      {
        label: "Export as CSV",
        onClick: handleExport,
      },
      {
        label: "Export as Excel",
        disabled: true,
      },
      {
        label: "Export as PDF",
        disabled: true,
      },
    ]}
  />
);
}