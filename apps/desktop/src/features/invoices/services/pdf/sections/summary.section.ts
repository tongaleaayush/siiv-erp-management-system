import type { PdfSectionProps } from "../pdf.types";
import { companyConfig } from "@/config/company.config";
import { amountToWords } from "../../../utils/amountToWords";

const formatCurrency = (amount: number): string => {
  if (!amount || amount === 0) return "-";
  return amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const drawSummary = ({
  doc,
  invoice,
  startY,
}: PdfSectionProps) => {
  let y = startY;

  const leftX = 10;
  const totalWidth = 190; // Standard table width matching margins
  const rightX = 135;
  const rightWidth = leftX + totalWidth - rightX; // 65mm summary column width

  /*
  ===============================
      AMOUNT IN WORDS & TAX BREAKDOWN
  ===============================
  */

  const words = amountToWords(invoice.grandTotal);
  const totalGST =
    (invoice.cgstAmount || 0) +
    (invoice.sgstAmount || 0) +
    (invoice.igstAmount || 0);

  const summaryRows = [
    ["Total Taxable Value", formatCurrency(invoice.subtotal)],
    ["CGST", formatCurrency(invoice.cgstAmount || 0)],
    ["SGST", formatCurrency(invoice.sgstAmount || 0)],
    ["IGST", formatCurrency(invoice.igstAmount || 0)],
    ["Total GST", formatCurrency(totalGST)],
    ["Round off", formatCurrency(invoice.roundOff || 0)],
    ["Total Amount", formatCurrency(invoice.grandTotal)],
  ];

  const rowHeight = 6;
  // Draw Amount in Words Box
  doc.rect(leftX, y-8, rightX - leftX, rowHeight);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("Amount in Words: ", leftX + 2, y - 4);

  const titleWidth = doc.getTextWidth("Amount in Words: ");
  doc.setFont("helvetica", "bolditalic");
  doc.text(words, leftX + 2 + titleWidth, y - 4);

  // Draw Tax Summary Box Grid
  let currentSummaryY = y-8;
  summaryRows.forEach(([label, value], idx) => {
    // Outer Border Box for each row
    doc.rect(rightX, currentSummaryY, rightWidth, rowHeight);
    // Divider line between label and value
    doc.line(
      rightX + 35,
      currentSummaryY,
      rightX + 35,
      currentSummaryY + rowHeight
    );

    const isBoldRow = idx === summaryRows.length - 1; // Highlight Total Amount
    doc.setFont("helvetica", isBoldRow ? "bold" : "normal");
    doc.setFontSize(8);

    doc.text(label, rightX + 2, currentSummaryY + 4);
    doc.text(value, rightX + rightWidth - 2, currentSummaryY + 4, {
      align: "right",
    });

    currentSummaryY += rowHeight;
  });

  y += rowHeight + 2;

  /*
  ===============================
      INVOICE TERMS
  ===============================
  */
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.text("Invoice Terms:", leftX+2, y-6.5);

  y += 4;
  doc.setFont("helvetica", "normal");
  const terms = [

  `1. Payment Terms: ${invoice.paymentTerm || "Payment Against Delivery"}.`,

  "2. Material received in good condition.",

  "3. Rejection shall be convey within a week of time after receiving material",

];

  terms.forEach((term) => {
    doc.text(term, leftX+2, y-6.5);
    y += 3.5;
  });

  y = Math.max(y + 2, currentSummaryY);

  /*
  ===============================
      BANK DETAILS & SIGNATURE BOX
  ===============================
  */
  const footerBoxY = y;
  const footerBoxHeight = 25;
  const middleX = 90;

  // Outer Box Frame
  doc.rect(leftX, footerBoxY, totalWidth, footerBoxHeight);
  // Column Dividers
  doc.line(middleX, footerBoxY, middleX, footerBoxY + footerBoxHeight);
  doc.line(rightX, footerBoxY, rightX, footerBoxY + footerBoxHeight);

  // 1. Left Section: Bank Details
  let bankY = footerBoxY + 4.7;
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("Bank Details :", leftX + 2, bankY);

  bankY += 4;
  doc.setFont("helvetica", "normal");
  doc.text(
    `Bank Name : ${invoice.bankName || companyConfig.bankName || "-"}`,
    leftX + 2,
    bankY
  );
  bankY += 4;
  doc.text(
    `Account No : ${
      invoice.accountNumber || companyConfig.accountNumber || "-"
    }`,
    leftX + 2,
    bankY
  );
  bankY += 4;
  doc.text(
    `IFSC Code : ${invoice.ifscCode || companyConfig.ifscCode || "-"}`,
    leftX + 2,
    bankY
  );

  // 2. Center Section: Receiver's Signature
  doc.setFont("helvetica", "bold");
  doc.text(
    "Receiver's Signature",
    99,
    footerBoxY + footerBoxHeight - 3,
  );

  // 3. Right Section: Authorised Signatory
  doc.setFont("helvetica", "bold");
  doc.text(
    `For, ${companyConfig.name || "SIIV Innovations"}`,
    (rightX + leftX + totalWidth) / 2,
    footerBoxY + 5,
    { align: "center" }
  );

  doc.text(
    "Authorised signatory",
    (rightX + leftX + totalWidth) / 2,
    footerBoxY + footerBoxHeight - 3,
    { align: "center" }
  );

  return footerBoxY + footerBoxHeight + 8;
};