import { countryCodeService } from "@/services/countryCode.service";
import type { CustomerFormData } from "../types/customerForm";
import Input from "@/components/ui/Input";
import { validateEmail } from "@/utils/validation/email.validation";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { Select } from "@/components/ui";
import { locationService } from "@/services/location.service";
import { postalCodeService } from "@/services/postalCode.service";
import {
  validateCustomer,
  type CustomerValidationErrors,
} from "@/utils/validation/customer.validation";
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

  contactPerson: "",
 email: "",

countryCode: "+91",
phone: "",

  gstNumber: "",

  addressLine1: "",
addressLine2: "",

  city: "",
  state: "",
  country: "",
  postalCode: "",

  status: "Active",
});
export interface CustomerFormRef {
  validate: () => boolean;
  getFormData: () => CustomerFormData;
}

const CustomerForm = forwardRef<CustomerFormRef, CustomerFormProps>(
  ({ open, customerCode, initialData }, ref) => {
  const [formData, setFormData] = useState<CustomerFormData>(
    createInitialFormData(customerCode)
  );
const [postalCodeError, setPostalCodeError] = useState("");
const [errors, setErrors] = useState<CustomerValidationErrors>({});
 useEffect(() => {
  if (!open) return;

  if (initialData) {
    setFormData(initialData);
  } else {
    setFormData(createInitialFormData(customerCode));
  }

  setErrors({});
  setPostalCodeError("");
}, [open, initialData, customerCode]);
const countryCodeOptions = useMemo(
  () => countryCodeService.getCountryCodeOptions(),
  []
);
  const countryOptions = useMemo(
  () =>
    locationService.getCountries().map((country) => ({
      value: country.isoCode,
      label: country.name,
    })),
  []
);

const stateOptions = useMemo(
  () =>
    locationService.getStates(formData.country).map((state) => ({
      value: state.isoCode,
      label: state.name,
    })),
  [formData.country]
);

const cityOptions = useMemo(
  () =>
    locationService
      .getCities(formData.country, formData.state)
      .map((city) => ({
        value: city.name,
        label: city.name,
      })),
  [formData.country, formData.state]
);

  const handleInputChange = (
  event: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
) => {
  const { name, value } = event.target;

setErrors((prev) => {
  const updatedErrors = { ...prev };

  switch (name) {
    case "email":
      updatedErrors.email = validateEmail(value);
      break;

    default:
      updatedErrors[name as keyof CustomerValidationErrors] = undefined;
  }

  return updatedErrors;
});

  setFormData((prev) => {
    switch (name) {
      case "country":
        return {
          ...prev,
          country: value,
          state: "",
          city: "",
        };
        

      case "state":
        return {
          ...prev,
          state: value,
          city: "",
        };

      default:
        return {
          ...prev,
          [name]: value,
        };
    }
  });
  
};
const handlePhoneChange = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  let value = event.target.value;

  // Allow only digits
  value = value.replace(/\D/g, "");

  // Maximum 10 digits
  if (value.length > 10) {
    value = value.slice(0, 10);
  }

  setErrors((prev) => ({
    ...prev,
    phone: undefined,
  }));

  setFormData((prev) => ({
    ...prev,
    phone: value,
  }));
};
const handlePostalCodeChange = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
 const postalCode = event.target.value;
 setErrors((prev) => ({
  ...prev,
  postalCode: undefined,
}));

setPostalCodeError("");
// Update only the postal code first
setFormData((prev) => ({
  ...prev,
  postalCode,
}));

if (postalCode.length !== 6) return;

const result = await postalCodeService.lookup(postalCode);

if (!result) {
  console.log("❌ Invalid PIN");
  setPostalCodeError("Invalid Postal Code");

  setFormData((prev) => ({
    ...prev,
    country: "",
    state: "",
    city: "",
  }));

  return;
}

// Now update country, state and city
setFormData((prev) => ({
  ...prev,
  postalCode,
  country: result.countryCode,
  state: result.stateCode,
  city: result.city,
}));
};
const validateForm = () => {
  const validationErrors = validateCustomer(formData);

  if (postalCodeError) {
    validationErrors.postalCode = postalCodeError;
  }

  setErrors(validationErrors);

  return Object.keys(validationErrors).length === 0;
};
useImperativeHandle(ref, () => ({
  validate: validateForm,
  getFormData: () => formData,
}));

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
            placeholder="Enter email address"
            error={errors.email}
            required
          />

         <div className="grid grid-cols-12 gap-4">
  <div className="col-span-5">
    <Select
      label="Country Code"
      name="countryCode"
      value={formData.countryCode}
      onChange={handleInputChange}
      options={countryCodeOptions}
      placeholder="Select Code"
      required
    />
  </div>

  <div className="col-span-7">
    <Input
      type="tel"
      label="Phone Number"
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
      {/* Address Information */}
<section>
  <h3 className="text-lg font-semibold text-slate-800">
    Address Information
  </h3>

  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
   <Input
  label="Postal Code"
  name="postalCode"
  value={formData.postalCode}
  onChange={handlePostalCodeChange}
  placeholder="Enter postal code"
  maxLength={6}
  inputMode="numeric"
  error={errors.postalCode || postalCodeError}
  required
/>



    <Select
      label="Country"
      name="country"
      value={formData.country}
      onChange={handleInputChange}
      options={countryOptions}
      placeholder="Select Country"
      error={errors.country}
      required
    />

    <Select
      label="State"
      name="state"
      value={formData.state}
      onChange={handleInputChange}
      options={stateOptions}
      placeholder="Select State"
      error={errors.state}
      required
      disabled={!formData.country}
    />

    <Select
      label="City"
      name="city"
      value={formData.city}
      onChange={handleInputChange}
      options={cityOptions}
      placeholder="Select City"
      error={errors.city}
      required
      disabled={!formData.state}
    />
  </div>

  <div className="mt-4 grid grid-cols-1 gap-4">
  <Input
    label="Address Line 1"
    name="addressLine1"
    value={formData.addressLine1}
    onChange={handleInputChange}
    placeholder="House No., Building, Street"
    error={errors.addressLine1}
    required
  />

  <Input
    label="Address Line 2"
    name="addressLine2"
    value={formData.addressLine2}
    onChange={handleInputChange}
    placeholder="Area, Landmark (Optional)"
    error={errors.addressLine2}
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
  error={errors.gstNumber}
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
          outline-none
          transition-colors
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
        "
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
  </div>
</section>
    </div>
  );

});

export default CustomerForm;