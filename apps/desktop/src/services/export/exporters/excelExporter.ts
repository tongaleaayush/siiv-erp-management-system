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

    workbook.creator = "SIIV ERP";
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet("Sheet1");

    worksheet.columns = columns.map((column) => ({
      header: column.header,
      key: String(column.key),
      width: 20,
    }));

   data.forEach((row) => {
  console.log("Row:", row);

  const rowData: Record<string, unknown> = {};

  columns.forEach((column) => {
    const value = row[column.key];

    console.log("Column:", column.key);
    console.log("Value:", value);

    rowData[String(column.key)] = column.formatter
      ? column.formatter(value, row)
      : value ?? "";
  });

  console.log("Excel Row Data:", rowData);

  worksheet.addRow(rowData);
});

    // -----------------------------
    // Header Styling
    // -----------------------------

    const headerRow = worksheet.getRow(1);

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
          argb: "FF2563EB", // Tailwind Blue-600
        },
      };

      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
      };

      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // -----------------------------
    // Body Styling
    // -----------------------------

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;

      row.eachCell((cell) => {
        cell.alignment = {
          vertical: "middle",
        };

        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // -----------------------------
    // Freeze Header Row
    // -----------------------------

    worksheet.views = [
      {
        state: "frozen",
        ySplit: 1,
      },
    ];

    // -----------------------------
    // Auto-size Columns
    // -----------------------------

    worksheet.columns.forEach((column) => {
      let maxLength = 10;

      column.eachCell?.({ includeEmpty: true }, (cell) => {
        const length = cell.value
          ? cell.value.toString().length
          : 0;

        if (length > maxLength) {
          maxLength = length;
        }
      });

      column.width = Math.min(maxLength + 4, 40);
    });

    const buffer = await workbook.xlsx.writeBuffer();

    await fileSaveService.saveBinaryFile({
      defaultPath: `${fileName}.xlsx`,
      content: buffer,
      filters: [
        {
          name: "Excel",
          extensions: ["xlsx"],
        },
      ],
    });
  }
}