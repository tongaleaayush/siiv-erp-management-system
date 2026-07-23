import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { fileSaveService } from "@/services/file";

import type {
  Exporter,
  ExportOptions,
} from "../types";

export class PdfExporter implements Exporter {
  async export<T>(options: ExportOptions<T>): Promise<void> {
    const { columns, data, fileName } = options;

    const doc = new jsPDF();

    autoTable(doc, {
      head: [
        columns.map((column) => column.header),
      ],
      body: data.map((row) =>
        columns.map((column) =>
          String(column.accessor(row) ?? "")
        ),
      ),
      styles: {
        fontSize: 9,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
      },
    });

    const buffer = doc.output("arraybuffer");

    await fileSaveService.saveBinaryFile({
      defaultPath: `${fileName}.pdf`,
      content: buffer,
      filters: [
        {
          name: "PDF",
          extensions: ["pdf"],
        },
      ],
    });
  }
}