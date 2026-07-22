export interface CustomerFormData {
  customerCode: string;
  companyName: string;

  contactPerson: string;
  email: string;
  countryCode: string;
  phone: string;

  gstNumber: string;

  addressLine1: string;
  addressLine2: string;

  city: string;
  state: string;
  country: string;
  postalCode: string;

  status: "Active" | "Inactive";
}