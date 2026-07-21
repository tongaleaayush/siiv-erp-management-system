import type { ExportColumn } from "@/services/export";

export interface ExportMenuProps<
    T extends Record<string, unknown>
> {
    moduleName: string;

    data: T[];

    columns: ExportColumn<T>[];
}