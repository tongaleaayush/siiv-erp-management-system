import { customers } from "./customer.mock";
import type { Customer } from "../types/customer.types";


class CustomerService {

  private customers: Customer[] = [
    ...customers,
  ];



  getCustomers(): Customer[] {

    return this.customers;

  }





  createCustomer(

    customer: Customer

  ): Customer {

    this.customers = [

      customer,

      ...this.customers,

    ];


    return customer;

  }





  updateCustomer(

    customer: Customer

  ): Customer | null {


    const index =

      this.customers.findIndex(

        (item) =>
          item.id === customer.id

      );



    if (index === -1) {

      return null;

    }



    this.customers[index] = customer;


    return customer;

  }





  deleteCustomer(

    id: string

  ): boolean {


    const previousLength =

      this.customers.length;



    this.customers =

      this.customers.filter(

        (customer) =>
          customer.id !== id

      );



    return (

      previousLength !== this.customers.length

    );

  }





  getCustomerById(

    id: string

  ): Customer | undefined {


    return this.customers.find(

      (customer) =>
        customer.id === id

    );

  }

}



export const customerService =
  new CustomerService();