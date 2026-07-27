const STORAGE_PREFIX = "siiv_erp_";


export const storage = {

  set<T>(
    key: string,
    data: T
  ) {

    localStorage.setItem(
      STORAGE_PREFIX + key,
      JSON.stringify(data)
    );

  },


  get<T>(
    key: string,
    defaultValue: T
  ): T {

    const value =
      localStorage.getItem(
        STORAGE_PREFIX + key
      );


    if (!value) {
      return defaultValue;
    }


    try {

      return JSON.parse(value);

    } catch {

      return defaultValue;

    }

  },


  remove(
    key: string
  ) {

    localStorage.removeItem(
      STORAGE_PREFIX + key
    );

  },


  clear() {

    Object.keys(localStorage)
      .filter((key) =>
        key.startsWith(STORAGE_PREFIX)
      )
      .forEach((key) =>
        localStorage.removeItem(key)
      );

  },

};