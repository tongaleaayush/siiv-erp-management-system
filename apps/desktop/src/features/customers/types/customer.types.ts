export interface Customer {
  id: string;

  customerCode: string;

  companyName: string;

  contactPerson: string;

  email: string;

  phone: string;

  gstNumber?: string;

  addressLine1: string;

  addressLine2: string;

  city: string;

  state: string;

  country: string;

  postalCode: string;

  isActive: boolean;

  createdAt: string;

  updatedAt: string;
}