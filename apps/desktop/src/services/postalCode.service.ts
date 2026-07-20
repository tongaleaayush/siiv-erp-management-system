import { locationService } from "./location.service";

export interface PostalCodeLookupResult {
  countryCode: string;
  stateCode: string;
  city: string;
}

class PostalCodeService {
  async lookup(
    postalCode: string
  ): Promise<PostalCodeLookupResult | null> {
    if (postalCode.length !== 6) {
      return null;
    }

    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${postalCode}`
      );

      const data = await response.json();

      if (
        !Array.isArray(data) ||
        data.length === 0 ||
        data[0].Status !== "Success"
      ) {
        return null;
      }

      const postOffice = data[0].PostOffice?.[0];

      if (!postOffice) {
        return null;
      }

      const country = locationService.getCountryByName(
        postOffice.Country
      );

      if (!country) {
        return null;
      }

      const state = locationService.getStateByName(
        country.isoCode,
        postOffice.State
      );

      if (!state) {
        return null;
      }

      const city =
        locationService.getCityByName(
          country.isoCode,
          state.isoCode,
          postOffice.District
        ) ??
        locationService.getCityByName(
          country.isoCode,
          state.isoCode,
          postOffice.Name
        );

      if (!city) {
        return null;
      }

      return {
        countryCode: country.isoCode,
        stateCode: state.isoCode,
        city: city.name,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export const postalCodeService = new PostalCodeService();