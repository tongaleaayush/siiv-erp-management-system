import type {
  jsPDF,
} from "jspdf";


import type {
  Invoice,
} from "../../types/invoice.types";



export interface PdfSectionProps {

  doc: jsPDF;


  invoice: Invoice;


  startY: number;


  pageWidth: number;

}