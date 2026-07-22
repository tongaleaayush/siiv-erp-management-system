import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { fileSaveService } from "@/services/file";

import type {
  Exporter,
  ExportOptions,
} from "../types";

export class PdfExporter implements Exporter {
  async export<T>(
    options: ExportOptions<T>,
  ): Promise<void> {
    const {
      columns,
      data,
      fileName,
    } = options;

    const doc = new jsPDF({
      orientation:
        columns.length > 6
          ? "landscape"
          : "portrait",
      unit: "mm",
      format: "a4",
    });

    // ----------------------------------
    // Title
    // ----------------------------------

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(fileName, 14, 18);

    // ----------------------------------
    // Generated Date
    // ----------------------------------

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      14,
      26,
    );

    // ----------------------------------
    // Table
    // ----------------------------------

    autoTable(doc, {
      startY: 34,

      head: [
        columns.map((column) => column.header),
      ],

      body: data.map((row) =>
        columns.map((column) => {
          const value = row[column.key];

          return column.formatter
            ? column.formatter(value, row)
            : value ?? "";
        }),
      ),

      theme: "grid",

      headStyles: {
        fillColor: [37, 99, 235],
        textColor: 255,
        fontStyle: "bold",
      },

      styles: {
        fontSize: 10,
        cellPadding: 3,
      },

      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    // ----------------------------------
    // Page Numbers
    // ----------------------------------

    const pages = doc.getNumberOfPages();

    for (let i = 1; i <= pages; i++) {
      doc.setPage(i);

      doc.setFontSize(10);

      doc.text(
        `Page ${i} of ${pages}`,
        doc.internal.pageSize.getWidth() - 35,
        doc.internal.pageSize.getHeight() - 10,
      );
    }

    const pdfBytes = doc.output("arraybuffer");

    await fileSaveService.saveBinaryFile({
      defaultPath: `${fileName}.pdf`,
      content: pdfBytes,
      filters: [
        {
          name: "PDF",
          extensions: ["pdf"],
        },
      ],
    });
  }
}