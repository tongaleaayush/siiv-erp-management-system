// src/services/export/export.service.ts
import { ExcelExporter } from "./exporters/excelExporter";
import { CsvExporter } from "./exporters/csvExporter";
import { PdfExporter } from "./exporters/pdfExporter";
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


      excel: new ExcelExporter(),

      pdf: new PdfExporter(),
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