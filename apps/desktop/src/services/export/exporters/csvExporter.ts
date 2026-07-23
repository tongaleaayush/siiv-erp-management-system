import { fileSaveService } from "@/services/file";
import type {
  Exporter,
  ExportOptions,
} from "../types";

export class CsvExporter implements Exporter {
  async export<T>(options: ExportOptions<T>): Promise<void> {
    const { columns, data, fileName } = options;

    const headers = columns.map((column) => column.header);

    const rows = data.map((row) =>
      columns.map((column) => {
        const value = column.accessor(row);

        return this.escapeValue(value);
      }),
    );

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    await fileSaveService.saveTextFile({
      defaultPath: `${fileName}.csv`,
      content: csvContent,
      filters: [
        {
          name: "CSV",
          extensions: ["csv"],
        },
      ],
    });
  }

  private escapeValue(value: unknown): string {
    if (value === null || value === undefined) {
      return "";
    }

    const stringValue = String(value);

    return `"${stringValue.replace(/"/g, '""')}"`;
  }
}