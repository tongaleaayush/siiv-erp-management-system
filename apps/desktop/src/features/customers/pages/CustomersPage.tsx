import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

import {
  PageLayout,
} from "@/components/common/page";

import { Button } from "@/components/ui";

import ConfirmationDialog from "@/components/ui/ConfirmationDialog";

import { ExportButton } from "@/components/common/export";

import { getNextCode } from "@/utils/codeGenerator/getNextCode";

import AddCustomerDialog from "../components/AddCustomerDialog";
import CustomerTable from "../components/CustomerTable";
import EditCustomerDialog from "../components/EditCustomerDialog";
import ViewCustomerDialog from "../components/ViewCustomerDialog";

import { customerExportColumns } from "../config/customerExport";

import { customerService } from "../services/customer.service";

import { mapCustomerToFormData } from "../utils/customer.mapper";

import type { Customer } from "../types/customer.types";
import type { CustomerFormData } from "../types/customerForm";


const CustomersPage = () => {


  const [
    isAddCustomerDialogOpen,
    setIsAddCustomerDialogOpen,
  ] = useState(false);



  const [
    isEditCustomerDialogOpen,
    setIsEditCustomerDialogOpen,
  ] = useState(false);



  const [
    isViewCustomerDialogOpen,
    setIsViewCustomerDialogOpen,
  ] = useState(false);



  const [
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
  ] = useState(false);



  const [
    selectedCustomer,
    setSelectedCustomer,
  ] = useState<Customer | null>(null);



  const [
    customers,
    setCustomers,
  ] = useState<Customer[]>(
    customerService.getCustomers()
  );



  const [search] =
    useState("");



  const filteredCustomers =
    useMemo(() => {

      const query =
        search.trim().toLowerCase();


      return customers.filter(
        (customer) =>
          query === "" ||
          customer.customerCode
            .toLowerCase()
            .includes(query) ||
          customer.companyName
            .toLowerCase()
            .includes(query) ||
          customer.contactPerson
            .toLowerCase()
            .includes(query) ||
          customer.email
            .toLowerCase()
            .includes(query) ||
          customer.phone
            .toLowerCase()
            .includes(query) ||
          (customer.gstNumber ?? "")
            .toLowerCase()
            .includes(query)
      );

    }, [
      customers,
      search,
    ]);



  const [
    nextCustomerCode,
    setNextCustomerCode,
  ] = useState(
    getNextCode(
      customers,
      "CUST",
      "customerCode"
    )
  );



  const handleAddCustomer = (
    customerData: CustomerFormData
  ) => {


    const today =
      new Date()
        .toISOString()
        .split("T")[0];


    const newCustomer: Customer = {

      id:
        crypto.randomUUID(),

      customerCode:
        nextCustomerCode,

      companyName:
        customerData.companyName,

      contactPerson:
        customerData.contactPerson,

      email:
        customerData.email,

      phone:
        `${customerData.countryCode} ${customerData.phone}`,

      gstNumber:
        customerData.gstNumber,

      addressLine1:
        customerData.addressLine1,

      addressLine2:
        customerData.addressLine2,

      city:
        customerData.city,

      state:
        customerData.state,

      country:
        customerData.country,

      postalCode:
        customerData.postalCode,

      isActive:
        true,

      createdAt:
        today,

      updatedAt:
        today,

    };


    setCustomers(
      (prev) => [
        newCustomer,
        ...prev,
      ]
    );


    setIsAddCustomerDialogOpen(false);

  };



  const handleUpdateCustomer = (
    customerData: CustomerFormData
  ) => {

    if (!selectedCustomer)
      return;


    const today =
      new Date()
        .toISOString()
        .split("T")[0];


    setCustomers(
      (prev) =>
        prev.map(
          (customer) =>
            customer.id === selectedCustomer.id
              ? {
                  ...customer,

                  companyName:
                    customerData.companyName,

                  contactPerson:
                    customerData.contactPerson,

                  email:
                    customerData.email,

                  phone:
                    `${customerData.countryCode} ${customerData.phone}`,

                  gstNumber:
                    customerData.gstNumber,

                  updatedAt:
                    today,

                }
              : customer
        )
    );


    setIsEditCustomerDialogOpen(false);

    setSelectedCustomer(null);

  };



  const handleEditCustomer = (
    customer: Customer
  ) => {

    setSelectedCustomer(customer);

    setIsEditCustomerDialogOpen(true);

  };



  const handleViewCustomer = (
    customer: Customer
  ) => {

    setSelectedCustomer(customer);

    setIsViewCustomerDialogOpen(true);

  };



  const handleDeleteClick = (
    customer: Customer
  ) => {

    setSelectedCustomer(customer);

    setIsDeleteDialogOpen(true);

  };



  const handleDeleteCustomer = () => {

    if (!selectedCustomer)
      return;


    setCustomers(
      (prev) =>
        prev.filter(
          (customer) =>
            customer.id !== selectedCustomer.id
        )
    );


    setIsDeleteDialogOpen(false);

    setSelectedCustomer(null);

  };



  return (

    <PageLayout

      title="Customers"

      breadcrumb={[
        {
          label: "Dashboard",
        },
        {
          label: "Customers",
        },
      ]}


      actions={

        <div className="flex items-center gap-2">


          <ExportButton

            moduleName="Customers"

            data={
              customers
            }

            columns={
              customerExportColumns
            }

          />



          <Button

            onClick={() => {

              setNextCustomerCode(

                getNextCode(
                  customers,
                  "CUST",
                  "customerCode"
                )

              );


              setIsAddCustomerDialogOpen(true);

            }}

          >

            <Plus className="mr-2 h-4 w-4" />

            Add Customer

          </Button>


        </div>

      }

    >


      <CustomerTable

        customers={
          filteredCustomers
        }

        onView={
          handleViewCustomer
        }

        onEdit={
          handleEditCustomer
        }

        onDelete={
          handleDeleteClick
        }

      />



      <AddCustomerDialog

        open={
          isAddCustomerDialogOpen
        }

        customerCode={
          nextCustomerCode
        }

        onClose={() =>
          setIsAddCustomerDialogOpen(false)
        }

        onSave={
          handleAddCustomer
        }

      />



      {selectedCustomer && (

        <EditCustomerDialog

          open={
            isEditCustomerDialogOpen
          }

          initialData={
            mapCustomerToFormData(
              selectedCustomer
            )
          }

          onClose={() => {

            setIsEditCustomerDialogOpen(false);

            setSelectedCustomer(null);

          }}

          onSave={
            handleUpdateCustomer
          }

        />

      )}



      {selectedCustomer && (

        <ViewCustomerDialog

          open={
            isViewCustomerDialogOpen
          }

          customer={
            selectedCustomer
          }

          onClose={() => {

            setIsViewCustomerDialogOpen(false);

            setSelectedCustomer(null);

          }}

          onEdit={(customer) => {

            setIsViewCustomerDialogOpen(false);

            handleEditCustomer(customer);

          }}

        />

      )}



      {selectedCustomer && (

        <ConfirmationDialog

          open={
            isDeleteDialogOpen
          }

          title="Delete Customer"

          message={
            `Are you sure you want to delete "${selectedCustomer.companyName}"? This action cannot be undone.`
          }

          confirmText="Delete Customer"

          cancelText="Cancel"

          variant="danger"

          onClose={() => {

            setIsDeleteDialogOpen(false);

            setSelectedCustomer(null);

          }}

          onConfirm={
            handleDeleteCustomer
          }

        />

      )}


    </PageLayout>

  );

};


export default CustomersPage;