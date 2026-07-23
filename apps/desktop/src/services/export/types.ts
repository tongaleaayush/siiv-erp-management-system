// src/services/export/types.ts

export type ExportFormat = "csv" | "excel" | "pdf";

export interface ExportColumn<T = Record<string, unknown>> {
  /**
   * Column title shown in the exported file.
   */
  header: string;

  /**
   * Returns the value to export for a row.
   */
  accessor: (row: T) => unknown;
}

export interface ExportOptions<T = Record<string, unknown>> {
  /**
   * File name without extension.
   */
  fileName: string;

  /**
   * Export format.
   */
  format: ExportFormat;

  /**
   * Data to export.
   */
  data: T[];

  /**
   * Columns to include.
   */
  columns: ExportColumn<T>[];
}

export interface Exporter {
  export<T>(options: ExportOptions<T>): Promise<void>;
}