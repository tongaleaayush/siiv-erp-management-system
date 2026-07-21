// src/services/export/export.service.ts

import { CsvExporter } from "./exporters/csvExporter";
import type {
  Exporter,
  ExportFormat,
  ExportOptions,
} from "./types";

class ExportService {
  private readonly exporters: Record<ExportFormat, Exporter>;

  constructor() {
    this.exporters = {
      csv: new CsvExporter(),

      // Will be implemented later
      excel: {
        export: async () => {
          throw new Error("Excel export is not implemented yet.");
        },
      },

      pdf: {
        export: async () => {
          throw new Error("PDF export is not implemented yet.");
        },
      },
    };
  }

  async export<T>(options: ExportOptions<T>): Promise<void> {
    const exporter = this.exporters[options.format];

    if (!exporter) {
      throw new Error(
        `Unsupported export format: ${options.format}`,
      );
    }

    await exporter.export(options);
  }
}

export const exportService = new ExportService();