import autoTable from "jspdf-autotable";
import type { PdfSectionProps } from "../pdf.types";

const formatCurrency = (amount: number): string => {
  return amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const drawItemsTable = ({
  doc,
  invoice,
  startY,
}: PdfSectionProps) => {
  // Compute totals
  const totalTaxable = invoice.items.reduce((sum, item) => sum + item.amount, 0);
  const totalCgst = invoice.cgstAmount
    ? invoice.items.reduce((sum, item) => sum + (item.amount * (invoice.cgstRate || 0)) / 100, 0)
    : 0;
  const totalSgst = invoice.sgstAmount
    ? invoice.items.reduce((sum, item) => sum + (item.amount * (invoice.sgstRate || 0)) / 100, 0)
    : 0;
  const totalIgst = invoice.igstAmount
    ? invoice.items.reduce((sum, item) => sum + (item.amount * (invoice.igstRate || 0)) / 100, 0)
    : 0;

  autoTable(doc, {
    startY: startY - 22,
    // Multi-row header matching the exact layout
    head: [
      [
        { content: "S.\nN.", rowSpan: 2 },
        { content: "PRODUCT", rowSpan: 2 },
        { content: "HSN/\nSAC", rowSpan: 2 },
        { content: "QTY", rowSpan: 2 },
        { content: "Unit", rowSpan: 2 },
        { content: "RATE", rowSpan: 2 },
        { content: "TOTAL", rowSpan: 2 },
        { content: "CGST", colSpan: 2 },
        { content: "SGST", colSpan: 2 },
        { content: "IGST", colSpan: 2 },
      ],
      [
        "Rate", "Amt",
        "Rate", "Amt",
        "Rate", "Amt",
      ],
    ],

    body: [
      ...invoice.items.map((item, index) => {
        const cgstAmt = invoice.cgstAmount ? (item.amount * (invoice.cgstRate || 0)) / 100 : 0;
        const sgstAmt = invoice.sgstAmount ? (item.amount * (invoice.sgstRate || 0)) / 100 : 0;
        const igstAmt = invoice.igstAmount ? (item.amount * (invoice.igstRate || 0)) / 100 : 0;

        return [
          index + 1,
          item.productName,
          item.hsnCode || "-",
          item.quantity,
          item.unit || "-",
          formatCurrency(item.rate),
          formatCurrency(item.amount),
          invoice.cgstAmount ? `${invoice.cgstRate || 0}%` : "-",
          invoice.cgstAmount ? formatCurrency(cgstAmt) : "-",
          invoice.sgstAmount ? `${invoice.sgstRate || 0}%` : "-",
          invoice.sgstAmount ? formatCurrency(sgstAmt) : "-",
          invoice.igstAmount ? `${invoice.igstRate || 0}%` : "-",
          invoice.igstAmount ? formatCurrency(igstAmt) : "-",
        ];
      }),
      // Bottom Totals Row
      [
        { content: "Totals", colSpan: 6, styles: { halign: "center", fontStyle: "bold" } },
        { content: formatCurrency(totalTaxable), styles: { fontStyle: "bold", halign: "right" } },
        {
          content: totalCgst ? formatCurrency(totalCgst) : "-",
          colSpan: 2,
          styles: { fontStyle: "bold", halign: "right" },
        },
        {
          content: totalSgst ? formatCurrency(totalSgst) : "-",
          colSpan: 2,
          styles: { fontStyle: "bold", halign: "right" },
        },
        {
          content: totalIgst ? formatCurrency(totalIgst) : "-",
          colSpan: 2,
          styles: { fontStyle: "bold", halign: "right" },
        },
      ],
    ],

    theme: "grid",

    styles: {
      fontSize: 7,
      cellPadding: 2,
      valign: "middle",
      overflow: "linebreak",
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
    },

    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      fontStyle: "bold",
      halign: "center",
      valign: "middle",
    },

    columnStyles: {
      0: { cellWidth: 8, halign: "center" },   // S.N.
      1: { cellWidth: 42.9 },                  // Product
      2: { cellWidth: 16, halign: "center" },  // HSN/SAC
      3: { cellWidth: 9, halign: "center" },   // Qty
      4: { cellWidth: 9, halign: "center" },   // Unit
      5: { cellWidth: 15, halign: "right" },   // Rate
      6: { cellWidth: 18, halign: "right" },   // Total
      7: { cellWidth: 9, halign: "center" },   // CGST Rate
      8: { cellWidth: 15, halign: "right" },   // CGST Amt
      9: { cellWidth: 9, halign: "center" },   // SGST Rate
      10: { cellWidth: 15, halign: "right" },  // SGST Amt
      11: { cellWidth: 9, halign: "center" },  // IGST Rate
      12: { cellWidth: 15, halign: "right" },  // IGST Amt
    },

    margin: {
      left: 10,
      right: 10,
    },
    tableWidth: "wrap",

    // --- DRAW PAGE BORDER ON EVERY PAGE ---
    didDrawPage: () => {
      const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
      
      const margin = 10; // Adjust to match your outer margin
      
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.3);
      doc.rect(margin, margin, pageWidth - margin * 2, pageHeight - margin * 2);
    },
  });

  return (doc as any).lastAutoTable.finalY + 8;
};