export const validateEmail = (
  email: string
): string | undefined => {
  if (!email.trim()) {
    return "Email address is required.";
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }

  return undefined;
};