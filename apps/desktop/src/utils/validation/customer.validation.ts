import type { CustomerFormData } from "@/features/customers/types/customerForm";
import { validateEmail } from "./email.validation";
import { validateGST } from "./gst.validation";
export interface CustomerValidationErrors {
  companyName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  postalCode?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  gstNumber?: string;
}

export const validateCustomer = (
  data: CustomerFormData
): CustomerValidationErrors => {
  const errors: CustomerValidationErrors = {};

  if (!data.companyName.trim()) {
    errors.companyName = "Company name is required.";
  }

  if (!data.contactPerson.trim()) {
    errors.contactPerson = "Contact person is required.";
  }

 const emailError = validateEmail(data.email);

if (emailError) {
  errors.email = emailError;
}

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\d{10}$/.test(data.phone)) {
    errors.phone = "Phone number must contain exactly 10 digits.";
  }

  if (!data.postalCode.trim()) {
    errors.postalCode = "Postal code is required.";
  }

  if (!data.country.trim()) {
    errors.country = "Country is required.";
  }

  if (!data.state.trim()) {
    errors.state = "State is required.";
  }

  if (!data.city.trim()) {
    errors.city = "City is required.";
  }

  if (!data.address.trim()) {
    errors.address = "Address is required.";
  }
const gstError = validateGST(data.gstNumber);

if (gstError) {
  errors.gstNumber = gstError;
}
  return errors;
};