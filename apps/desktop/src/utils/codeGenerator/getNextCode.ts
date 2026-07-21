export const getNextCode = (
  items: { customerCode: string }[],
  prefix: string,
  digits = 4
): string => {
  let highest = 0;

  for (const item of items) {
    const number = parseInt(
      item.customerCode.replace(`${prefix}-`, ""),
      10
    );

    if (!isNaN(number) && number > highest) {
      highest = number;
    }
  }

  return `${prefix}-${String(highest + 1).padStart(digits, "0")}`;
};