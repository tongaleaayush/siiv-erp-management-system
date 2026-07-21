import {
  exportService,
  generateExportFileName,
} from "../";

import type {
  ExportColumn,
  ExportFormat,
} from "../types";

interface UseExportOptions<T> {
  moduleName: string;
  data: T[];
  columns: ExportColumn<T>[];
}

export function useExport<T>({
  moduleName,
  data,
  columns,
}: UseExportOptions<T>) {
  const exportData = async (
    format: ExportFormat,
  ) => {
    await exportService.export({
      format,
      fileName:
        generateExportFileName(moduleName),
      data,
      columns,
    });
  };

  return {
    exportData,
  };
}