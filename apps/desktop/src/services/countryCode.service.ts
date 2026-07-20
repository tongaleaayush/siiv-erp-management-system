import {
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";

import type { SelectOption } from "@/components/ui/Select";

class CountryCodeService {
  getCountryCodeOptions(): SelectOption[] {
    return getCountries()
      .map((country) => ({
        value: `+${getCountryCallingCode(country)}`,
        label: `${country} (+${getCountryCallingCode(country)})`,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }
}

export const countryCodeService = new CountryCodeService();