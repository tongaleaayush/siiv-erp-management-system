import { customers } from "./customer.mock";
import type { Customer } from "../types/customer.types";

class CustomerService {
  getCustomers(): Customer[] {
    return customers;
  }

  createCustomer() {}

  updateCustomer() {}

  deleteCustomer() {}

  getCustomerById() {}
}

export const customerService = new CustomerService();