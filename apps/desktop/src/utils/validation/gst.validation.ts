export const validateGST = (
  gstNumber: string
): string | undefined => {
  const value = gstNumber.trim().toUpperCase();

  if (!value) {
    // GST is optional
    return undefined;
  }

  const gstRegex =
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

  if (!gstRegex.test(value)) {
    return "Please enter a valid GST number.";
  }

  return undefined;
};