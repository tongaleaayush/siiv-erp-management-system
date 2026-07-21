// src/services/export/types.ts

export type ExportFormat = "csv" | "excel" | "pdf";

export interface ExportColumn<T = Record<string, unknown>> {
  /**
   * Column title shown in the exported file.
   */
  header: string;

  /**
   * Object key to export.
   */
  key: keyof T;

  /**
   * Optional custom formatter.
   */
  formatter?: (value: T[keyof T], row: T) => string | number;
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