export const generateCode = (
  prefix: string,
  number: number,
  digits = 4
): string => {
  return `${prefix}-${String(number).padStart(digits, "0")}`;
};