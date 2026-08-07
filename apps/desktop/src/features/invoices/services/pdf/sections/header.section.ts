import type {
  PdfSectionProps,
} from "../pdf.types";

import {
  companyConfig,
} from "@/config/company.config";

import logo from "@/assets/images/logo.png";

export const drawHeader = ({
  doc,
  startY,
  pageWidth,
}: PdfSectionProps) => {
 
  let y = startY;

  /*
  ===============================
      TITLE
  ===============================
  */
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);

  doc.text(
    "TAX INVOICE",
    pageWidth / 2,
    y+4,
    {
      align: "center",
    }
  );

  y+=0;

  /*
  ===============================
      LOGO
  ===============================
  */
  // Logo placed on the left, vertically aligned with company name
  doc.addImage(
    logo,
    "PNG",
    10,
    y-7,
    35,
    35
  );

  /*
  ===============================
      COMPANY DETAILS
  ===============================
  */
  // Primary Company Title
  doc.setFontSize(28);
  doc.setTextColor(58, 36, 207); // Deep blue / indigo shade matching invoice
  doc.setFont("serif", "normal");

  doc.text(
    companyConfig.name,
    pageWidth / 2,
    y + 14,
    { align: "center" }
  );

  y += 11;

  // Company Address Line
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(30, 30, 30);

  doc.text(
    companyConfig.address,
    pageWidth / 2,
    y + 8,
    { align: "center" }
  );

  // Contact Details Line
  doc.text(
    `Contact : ${companyConfig.phone}. E-mail : ${companyConfig.email}`,
    pageWidth / 2,
    y + 13  ,
    { align: "center" }
  );

  y += 26;

  /*
  ===============================
      HEADER LINE
  ===============================
  */
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.3);

  doc.line(
    10,
    y-10,
    pageWidth - 10,
    y-10
  );

  return y + 8;
};