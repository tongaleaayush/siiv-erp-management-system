import type { Customer } from "../types/customer.types";
import type { CustomerFormData } from "../types/customerForm";

export function mapCustomerToFormData(
  customer: Customer
): CustomerFormData {
  const [countryCode = "+91", phone = ""] =
    customer.phone.split(" ");

  return {
    customerCode: customer.customerCode,

    companyName: customer.companyName,
    contactPerson: customer.contactPerson,
    email: customer.email,

    countryCode,
    phone,

    gstNumber: customer.gstNumber,

    addressLine1: customer.addressLine1,
addressLine2: customer.addressLine2,
    city: customer.city,
    state: customer.state,
    country: customer.country,
    postalCode: customer.postalCode,

    status: customer.isActive
      ? "Active"
      : "Inactive",
  };
}