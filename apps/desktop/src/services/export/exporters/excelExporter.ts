import ExcelJS from "exceljs";

import { fileSaveService } from "@/services/file";

import type {
  Exporter,
  ExportOptions,
} from "../types";

export class ExcelExporter implements Exporter {
  async export<T>(options: ExportOptions<T>): Promise<void> {
    const { columns, data, fileName } = options;

    const workbook = new ExcelJS.Workbook();

    workbook.creator = "SIIV ERP Management System";
    workbook.company = "SIIV Innovations";
    workbook.created = new Date();
    workbook.modified = new Date();

    const worksheet = workbook.addWorksheet("Products", {
      properties: {
        defaultRowHeight: 22,
      },
      views: [
        {
          state: "frozen",
          ySplit: 1,
        },
      ],
    });

    // Header Row
    const headerRow = worksheet.addRow(
      columns.map((column) => column.header),
    );

    headerRow.height = 24;

    headerRow.eachCell((cell) => {
      cell.font = {
        bold: true,
        color: {
          argb: "FFFFFFFF",
        },
      };

      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "FF1F4E78",
        },
      };

      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
      };

      cell.border = {
        top: {
          style: "thin",
        },
        left: {
          style: "thin",
        },
        bottom: {
          style: "thin",
        },
        right: {
          style: "thin",
        },
      };
    });

    // Data Rows
    data.forEach((row) => {
      const values = columns.map((column) =>
        column.accessor(row),
      );

      const excelRow = worksheet.addRow(values);

      excelRow.eachCell((cell) => {
        cell.alignment = {
          vertical: "middle",
          horizontal:
            typeof cell.value === "number"
              ? "right"
              : "left",
        };

        cell.border = {
          top: {
            style: "thin",
          },
          left: {
            style: "thin",
          },
          bottom: {
            style: "thin",
          },
          right: {
            style: "thin",
          },
        };
      });
    });

    // Auto Filter
    worksheet.autoFilter = {
      from: {
        row: 1,
        column: 1,
      },
      to: {
        row: 1,
        column: columns.length,
      },
    };

    // Auto-fit Columns
    worksheet.columns.forEach((column) => {
      let maxLength = 12;

      column.eachCell?.(
        {
          includeEmpty: true,
        },
        (cell) => {
          const value =
            cell.value?.toString() ?? "";

          maxLength = Math.max(
            maxLength,
            value.length + 2,
          );
        },
      );

      column.width = Math.min(maxLength, 40);
    });

    // Print Settings
    worksheet.pageSetup = {
      orientation: "landscape",
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
      paperSize: 9,
      margins: {
        left: 0.3,
        right: 0.3,
        top: 0.5,
        bottom: 0.5,
        header: 0.3,
        footer: 0.3,
      },
    };

    const buffer = await workbook.xlsx.writeBuffer();

    await fileSaveService.saveBinaryFile({
      defaultPath: `${fileName}.xlsx`,
      content: buffer,
      filters: [
        {
          name: "Excel Workbook",
          extensions: ["xlsx"],
        },
      ],
    });
  }
}