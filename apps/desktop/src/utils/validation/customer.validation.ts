import type { CustomerFormData } from "@/features/customers/types/customerForm";

import { validateEmail } from "./email.validation";
import { validateGST } from "./gst.validation";



export interface CustomerValidationErrors {

  companyName?: string;

  contactPerson?: string;

  email?: string;

  phone?: string;



  // Billing Address Errors

  billingPostalCode?: string;

  billingCountry?: string;

  billingState?: string;

  billingCity?: string;

  billingAddressLine1?: string;



  gstNumber?: string;

}






export const validateCustomer = (

  data: CustomerFormData

): CustomerValidationErrors => {


  const errors: CustomerValidationErrors = {};





  if (!data.companyName.trim()) {

    errors.companyName =
      "Company name is required.";

  }





  if (!data.contactPerson.trim()) {

    errors.contactPerson =
      "Contact person is required.";

  }





  const emailError =

    validateEmail(

      data.email

    );



  if (emailError) {

    errors.email = emailError;

  }





  if (!data.phone.trim()) {

    errors.phone =
      "Phone number is required.";

  }

  else if (!/^\d{10}$/.test(data.phone)) {

    errors.phone =
      "Phone number must contain exactly 10 digits.";

  }







  // Billing Address Validation


  if (!data.billingPostalCode.trim()) {

    errors.billingPostalCode =
      "Postal code is required.";

  }





  if (!data.billingCountry.trim()) {

    errors.billingCountry =
      "Country is required.";

  }





  if (!data.billingState.trim()) {

    errors.billingState =
      "State is required.";

  }





  if (!data.billingCity.trim()) {

    errors.billingCity =
      "City is required.";

  }





  if (!data.billingAddressLine1.trim()) {

    errors.billingAddressLine1 =
      "Address Line 1 is required.";

  }







  const gstError =

    validateGST(

      data.gstNumber

    );



  if (gstError) {

    errors.gstNumber = gstError;

  }





  return errors;

};