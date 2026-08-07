import type { Customer } from "../types/customer.types";
import type { CustomerFormData } from "../types/customerForm";



export function mapCustomerToFormData(

  customer: Customer

): CustomerFormData {



  const [

    countryCode = "+91",

    phone = "",

  ] = customer.phone.split(" ");





  return {



    customerCode:

      customer.customerCode,





    companyName:

      customer.companyName,





    customerType:
  customer.customerType ?? "BUSINESS",




    contactPerson:

      customer.contactPerson ?? "",





    email:

      customer.email ?? "",





    countryCode,





    phone,







    gstNumber:

      customer.gstNumber ?? "",







    // Billing Address


    billingAddressLine1:

      customer.billingAddressLine1 ?? "",





    billingAddressLine2:

      customer.billingAddressLine2 ?? "",





    billingCity:

      customer.billingCity ?? "",





    billingState:

      customer.billingState ?? "",





    billingCountry:

      customer.billingCountry ?? "IN",





    billingPostalCode:

      customer.billingPostalCode ?? "",







    // Shipping Address


    shippingAddressLine1:

      customer.shippingAddressLine1 ?? "",





    shippingAddressLine2:

      customer.shippingAddressLine2 ?? "",





    shippingCity:

      customer.shippingCity ?? "",





    shippingState:

      customer.shippingState ?? "",





    shippingCountry:

      customer.shippingCountry ?? "IN",





    shippingPostalCode:

      customer.shippingPostalCode ?? "",





    notes:

      customer.notes ?? "",





    status:

      customer.isActive

        ? "Active"

        : "Inactive",


  };


}