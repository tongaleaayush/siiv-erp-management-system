export interface CustomerFormData {

  customerCode: string;

  companyName: string;

  customerType: "BUSINESS" | "INDIVIDUAL";

  contactPerson: string;

  email: string;

  countryCode: string;

  phone: string;


  gstNumber: string;



  // Billing Address

  billingAddressLine1: string;

  billingAddressLine2: string;

  billingCity: string;

  billingState: string;

  billingCountry: string;

  billingPostalCode: string;




  // Shipping Address

  shippingAddressLine1: string;

  shippingAddressLine2: string;

  shippingCity: string;

  shippingState: string;

  shippingCountry: string;

  shippingPostalCode: string;




  notes: string;



  status: "Active" | "Inactive";

}