export interface CustomerFormData {
  customerCode: string;
  companyName: string;

  contactPerson: string;
  email: string;
  countryCode: string;
phone: string;
  gstNumber: string;

  address: string;

  city: string;
  state: string;
  country: string;
  postalCode: string;

  status: "Active" | "Inactive";
}