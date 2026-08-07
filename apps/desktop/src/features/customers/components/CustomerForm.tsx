import { countryCodeService } from "@/services/countryCode.service";
import type { CustomerFormData } from "../types/customerForm";

import Input from "@/components/ui/Input";
import {
  Select,
} from "@/components/ui";

import {
  locationService,
} from "@/services/location.service";

import {
  postalCodeService,
} from "@/services/postalCode.service";



import {
  validateCustomer,
  type CustomerValidationErrors,
} from "@/utils/validation/customer.validation";


import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";





interface CustomerFormProps {

  open: boolean;

  customerCode?: string;

  initialData?: CustomerFormData;

}





const createInitialFormData = (

  customerCode = ""

): CustomerFormData => ({


  customerCode,


  companyName: "",


  customerType: "BUSINESS",


  contactPerson: "",


  email: "",


  countryCode: "+91",


  phone: "",



  gstNumber: "",




  // Billing Address

  billingAddressLine1: "",

  billingAddressLine2: "",

  billingCity: "",

  billingState: "",

  billingCountry: "IN",

  billingPostalCode: "",




  // Shipping Address

  shippingAddressLine1: "",

  shippingAddressLine2: "",

  shippingCity: "",

  shippingState: "",

  shippingCountry: "IN",

  shippingPostalCode: "",




  notes: "",


  status: "Active",


});






export interface CustomerFormRef {

  validate: () => boolean;

  getFormData: () => CustomerFormData;

}






const CustomerForm = forwardRef<

  CustomerFormRef,

  CustomerFormProps

>(

({

  open,

  customerCode,

  initialData,

}, ref) => {


  const [

    formData,

    setFormData,

  ] = useState<CustomerFormData>(

    createInitialFormData(customerCode)

  );




  const [

    errors,

    setErrors,

  ] = useState<CustomerValidationErrors>({});




  const [

    postalCodeError,

    setPostalCodeError,

  ] = useState("");




  const [

    sameAsBilling,

    setSameAsBilling,

  ] = useState(false);
    const countryCodeOptions = useMemo(

    () =>

      countryCodeService.getCountryCodeOptions(),

    []

  );





  const billingCountryOptions = useMemo(

    () =>

      locationService.getCountries().map(

        (country) => ({

          value: country.isoCode,

          label: country.name,

        })

      ),

    []

  );





  const shippingCountryOptions = billingCountryOptions;







  const billingStateOptions = useMemo(

    () =>

      locationService

        .getStates(formData.billingCountry)

        .map(

          (state) => ({

            value: state.isoCode,

            label: state.name,

          })

        ),

    [

      formData.billingCountry,

    ]

  );







  const shippingStateOptions = useMemo(

    () =>

      locationService

        .getStates(formData.shippingCountry)

        .map(

          (state) => ({

            value: state.isoCode,

            label: state.name,

          })

        ),

    [

      formData.shippingCountry,

    ]

  );







  const billingCityOptions = useMemo(

    () =>

      locationService

        .getCities(

          formData.billingCountry,

          formData.billingState

        )

        .map(

          (city) => ({

            value: city.name,

            label: city.name,

          })

        ),

    [

      formData.billingCountry,

      formData.billingState,

    ]

  );







  const shippingCityOptions = useMemo(

    () =>

      locationService

        .getCities(

          formData.shippingCountry,

          formData.shippingState

        )

        .map(

          (city) => ({

            value: city.name,

            label: city.name,

          })

        ),

    [

      formData.shippingCountry,

      formData.shippingState,

    ]

  );









  useEffect(() => {



    if (!open) return;





    if (initialData) {


      setFormData(initialData);


    }

    else {


      setFormData(

        createInitialFormData(

          customerCode

        )

      );


    }





    setErrors({});


    setPostalCodeError("");


    setSameAsBilling(false);



  }, [

    open,

    initialData,

    customerCode,

  ]);









  const handleInputChange = (

    event:

      React.ChangeEvent<

        HTMLInputElement |

        HTMLTextAreaElement |

        HTMLSelectElement

      >

  ) => {



    const {

      name,

      value,

    } = event.target;





    setErrors((prev) => ({


      ...prev,


      [name]:

        undefined,


    }));





    setFormData((prev) => {



      const updated = {


        ...prev,


        [name]: value,


      };





      if (

        sameAsBilling &&

        name.startsWith("billing")

      ) {



        const shippingField =

          name.replace(

            "billing",

            "shipping"

          );



        return {


          ...updated,


          [

            shippingField as keyof CustomerFormData

          ]: value,



        };


      }





      return updated;



    });



  };









  const handlePhoneChange = (

    event:

      React.ChangeEvent<HTMLInputElement>

  ) => {



    let value =

      event.target.value;





    value = value.replace(

      /\D/g,

      ""

    );





    if (value.length > 10) {


      value = value.slice(

        0,

        10

      );


    }





    setFormData((prev) => ({


      ...prev,


      phone: value,


    }));





    setErrors((prev) => ({


      ...prev,


      phone: undefined,


    }));



  };


    const handleBillingPostalCodeChange = async (

    event:

      React.ChangeEvent<HTMLInputElement>

  ) => {



    const postalCode =

      event.target.value;





    setFormData((prev) => ({


      ...prev,


      billingPostalCode: postalCode,


    }));





    setPostalCodeError("");





    if (postalCode.length !== 6) {

      return;

    }





    const result =

      await postalCodeService.lookup(

        postalCode

      );





    if (!result) {



      setPostalCodeError(

        "Invalid Postal Code"

      );



      setFormData((prev) => ({


        ...prev,


        billingCountry: "",


        billingState: "",


        billingCity: "",


      }));



      return;

    }







    setFormData((prev) => ({


      ...prev,


      billingPostalCode: postalCode,


      billingCountry:

        result.countryCode,


      billingState:

        result.stateCode,


      billingCity:

        result.city,



    }));




  };









  const handleShippingPostalCodeChange = async (

    event:

      React.ChangeEvent<HTMLInputElement>

  ) => {



    const postalCode =

      event.target.value;





    setFormData((prev) => ({


      ...prev,


      shippingPostalCode: postalCode,


    }));







    if (postalCode.length !== 6) {

      return;

    }







    const result =

      await postalCodeService.lookup(

        postalCode

      );







    if (!result) {



      setPostalCodeError(

        "Invalid Postal Code"

      );



      return;


    }







    setFormData((prev) => ({


      ...prev,


      shippingPostalCode: postalCode,


      shippingCountry:

        result.countryCode,


      shippingState:

        result.stateCode,


      shippingCity:

        result.city,



    }));



  };









  const handleSameAsBilling = (

    checked: boolean

  ) => {



    setSameAsBilling(checked);





    if (checked) {



      setFormData((prev) => ({


        ...prev,


        shippingAddressLine1:

          prev.billingAddressLine1,


        shippingAddressLine2:

          prev.billingAddressLine2,


        shippingCity:

          prev.billingCity,


        shippingState:

          prev.billingState,


        shippingCountry:

          prev.billingCountry,


        shippingPostalCode:

          prev.billingPostalCode,



      }));



    }



  };









  const validateForm = () => {



    const validationErrors =

      validateCustomer(

        formData

      );





    if (postalCodeError) {



      validationErrors.billingPostalCode =

        postalCodeError;



    }





    setErrors(

      validationErrors

    );





    return (

      Object.keys(

        validationErrors

      ).length === 0

    );



  };









  useImperativeHandle(

    ref,

    () => ({



      validate:

        validateForm,



      getFormData:

        () => formData,



    })

  );









  return (

    <div className="space-y-8">

      {/* Customer Information */}

      <section>

        <h3 className="text-lg font-semibold text-slate-800">

          Customer Information

        </h3>


        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">


          <Input

            label="Customer Code"

            name="customerCode"

            value={formData.customerCode}

            readOnly

            className="cursor-not-allowed bg-slate-100"

            placeholder="Auto Generated"

          />



          <Input

            label="Company Name"

            name="companyName"

            value={formData.companyName}

            onChange={handleInputChange}

            placeholder="Enter company name"

            error={errors.companyName}

            required

          />



        </div>

      </section>







      {/* Contact Information */}


      <section>


        <h3 className="text-lg font-semibold text-slate-800">

          Contact Information

        </h3>



        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">



          <Input

            label="Contact Person"

            name="contactPerson"

            value={formData.contactPerson}

            onChange={handleInputChange}

            placeholder="Enter contact person"

            error={errors.contactPerson}

            required

          />




          <Input

            type="email"

            label="Email"

            name="email"

            value={formData.email}

            onChange={handleInputChange}

            placeholder="Enter email"

            error={errors.email}

          />





          <div className="grid grid-cols-12 gap-4">


            <div className="col-span-5">


              <Select

                label="Country Code"

                name="countryCode"

                value={formData.countryCode}

                onChange={handleInputChange}

                options={countryCodeOptions}

                required

              />


            </div>



            <div className="col-span-7">


              <Input

                type="tel"

                label="Phone"

                name="phone"

                value={formData.phone}

                onChange={handlePhoneChange}

                placeholder="Enter phone number"

                error={errors.phone}

                required

              />


            </div>


          </div>


        </div>


      </section>








      {/* Billing Address */}



      <section>


        <h3 className="text-lg font-semibold text-slate-800">

          Billing Address

        </h3>





        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">



          <Input

            label="Postal Code"

            name="billingPostalCode"

            value={formData.billingPostalCode}

            onChange={handleBillingPostalCodeChange}

            placeholder="Enter postal code"

            maxLength={6}

          />





          <Select

            label="Country"

            name="billingCountry"

            value={formData.billingCountry}

            onChange={handleInputChange}

            options={billingCountryOptions}

          />





          <Select

            label="State"

            name="billingState"

            value={formData.billingState}

            onChange={handleInputChange}

            options={billingStateOptions}

            disabled={!formData.billingCountry}

          />





          <Select

            label="City"

            name="billingCity"

            value={formData.billingCity}

            onChange={handleInputChange}

            options={billingCityOptions}

            disabled={!formData.billingState}

          />


        </div>





        <div className="mt-4 space-y-4">


          <Input

            label="Address Line 1"

            name="billingAddressLine1"

            value={formData.billingAddressLine1}

            onChange={handleInputChange}

            placeholder="House No., Building, Street"

          />



          <Input

            label="Address Line 2"

            name="billingAddressLine2"

            value={formData.billingAddressLine2}

            onChange={handleInputChange}

            placeholder="Area, Landmark"

          />



        </div>



      </section>









      {/* Shipping Address */}



      <section>



        <div className="flex items-center justify-between">


          <h3 className="text-lg font-semibold text-slate-800">

            Shipping Address

          </h3>




          <label className="flex items-center gap-2 text-sm text-slate-600">


            <input

              type="checkbox"

              checked={sameAsBilling}

              onChange={(e) =>

                handleSameAsBilling(

                  e.target.checked

                )

              }

            />


            Same as Billing


          </label>



        </div>







        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">



          <Input

            label="Postal Code"

            name="shippingPostalCode"

            value={formData.shippingPostalCode}

            onChange={handleShippingPostalCodeChange}

            placeholder="Enter postal code"

            maxLength={6}

            disabled={sameAsBilling}

          />





          <Select

            label="Country"

            name="shippingCountry"

            value={formData.shippingCountry}

            onChange={handleInputChange}

            options={shippingCountryOptions}

            disabled={sameAsBilling}

          />





          <Select

            label="State"

            name="shippingState"

            value={formData.shippingState}

            onChange={handleInputChange}

            options={shippingStateOptions}

            disabled={

              sameAsBilling ||

              !formData.shippingCountry

            }

          />





          <Select

            label="City"

            name="shippingCity"

            value={formData.shippingCity}

            onChange={handleInputChange}

            options={shippingCityOptions}

            disabled={

              sameAsBilling ||

              !formData.shippingState

            }

          />



        </div>






        <div className="mt-4 space-y-4">


          <Input

            label="Address Line 1"

            name="shippingAddressLine1"

            value={formData.shippingAddressLine1}

            onChange={handleInputChange}

            placeholder="House No., Building, Street"

            disabled={sameAsBilling}

          />





          <Input

            label="Address Line 2"

            name="shippingAddressLine2"

            value={formData.shippingAddressLine2}

            onChange={handleInputChange}

            placeholder="Area, Landmark"

            disabled={sameAsBilling}

          />


        </div>



      </section>









      {/* Business Information */}



      <section>


        <h3 className="text-lg font-semibold text-slate-800">

          Business Information

        </h3>





        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">



          <Input

            label="GST Number"

            name="gstNumber"

            value={formData.gstNumber}

            onChange={handleInputChange}

            placeholder="Enter GST number"

          />





          <div className="flex flex-col gap-1">


            <label className="text-sm font-medium text-slate-700">

              Status

            </label>



            <select

              name="status"

              value={formData.status}

              onChange={handleInputChange}

              className="

                rounded-lg

                border

                border-slate-300

                px-3

                py-2

              "

            >

              <option value="Active">

                Active

              </option>



              <option value="Inactive">

                Inactive

              </option>


            </select>


          </div>


        </div>


      </section>



    </div>

  );


});



export default CustomerForm;