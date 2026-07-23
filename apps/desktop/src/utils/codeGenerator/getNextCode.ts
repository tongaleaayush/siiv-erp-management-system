export const getNextCode = <
  T extends Record<string, unknown>
>(
  items: T[],
  prefix: string,
  codeKey: keyof T,
  digits = 4
): string => {
  let highest = 0;

  for (const item of items) {
    const code = item[codeKey];

    if (typeof code !== "string") continue;

    const number = parseInt(
      code.replace(`${prefix}-`, ""),
      10
    );

    if (!isNaN(number) && number > highest) {
      highest = number;
    }
  }

  return `${prefix}-${String(highest + 1).padStart(digits, "0")}`;
};