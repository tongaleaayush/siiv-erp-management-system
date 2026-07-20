import { City, Country, State } from "country-state-city";

class LocationService {
  getCountries() {
    return Country.getAllCountries();
  }

  getStates(countryCode: string) {
    if (!countryCode) return [];

    return State.getStatesOfCountry(countryCode);
  }

  getCities(countryCode: string, stateCode: string) {
    if (!countryCode || !stateCode) return [];

    return City.getCitiesOfState(countryCode, stateCode);
  }

  getCountryByName(name: string) {
    return Country.getAllCountries().find(
      (country) => country.name.toLowerCase() === name.toLowerCase()
    );
  }

  getStateByName(countryCode: string, stateName: string) {
    return State.getStatesOfCountry(countryCode).find(
      (state) => state.name.toLowerCase() === stateName.toLowerCase()
    );
  }

  getCityByName(
    countryCode: string,
    stateCode: string,
    cityName: string
  ) {
    return City.getCitiesOfState(countryCode, stateCode).find(
      (city) => city.name.toLowerCase() === cityName.toLowerCase()
    );
  }
}

export const locationService = new LocationService();