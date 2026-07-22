import {
  exportService,
  generateExportFileName,
} from "@/services/export";
import { ChevronDown } from "lucide-react";
import type { ExportFormat } from "@/services/export";
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
  const handleExport = async (
  format: ExportFormat,
) => {
  await exportService.export({
    format,
    fileName: generateExportFileName(moduleName),
    data,
    columns,
  });
};

  return (
  <Dropdown
    trigger={(isOpen) => (
  <Button
    variant="outline"
    className="inline-flex items-center gap-2 px-4"
  >
    <span>Export</span>

    <ChevronDown
      size={16}
      className={`transition-transform duration-200 ${
        isOpen ? "rotate-180" : ""
      }`}
    />
  </Button>
)}
    items={[
      {
  label: "Export as CSV",
  onClick: () => handleExport("csv"),
},
{
  label: "Export as Excel",
  onClick: () => handleExport("excel"),
},
      {
        label: "Export as PDF",
        onClick: () => handleExport("pdf"),
      },
    ]}
  />
);
}