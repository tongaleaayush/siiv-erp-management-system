import type { ExportColumn } from "@/services/export";

export interface ExportButtonProps<
T extends object
> {
  moduleName: string;

  data: T[];

  columns: ExportColumn<T>[];
}