export interface Company {
  id: string;

  companyName: string;
  logo?: string;

  gstNumber: string;
  panNumber: string;

  phone: string;
  email: string;
  website?: string;

  addressLine1: string;
  addressLine2?: string;

  city: string;
  state: string;
  country: string;
  pinCode: string;

  createdAt: string;
  updatedAt: string;
}

export interface CompanySetupFormData {
  companyName: string;
  logo?: string;

  gstNumber: string;
  panNumber: string;

  phone: string;
  email: string;
  website?: string;

  addressLine1: string;
  addressLine2?: string;

  city: string;
  state: string;
  country: string;
  pinCode: string;

  superAdminUsername: string;
  superAdminPassword: string;
  confirmPassword: string;
}