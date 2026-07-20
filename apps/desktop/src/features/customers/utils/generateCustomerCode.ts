export function generateCustomerCode(lastCustomerNumber: number): string {
  return `CUST-${String(lastCustomerNumber + 1).padStart(5, "0")}`;
}