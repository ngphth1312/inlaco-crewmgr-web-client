import AppProperty from "../assets/constants/appProperty";

export const localStorage = {
  setItem: (key, value) => {
    try {
      return window.localStorage.setItem(
        `${AppProperty.APP_NAME}_${key}`,
        JSON.stringify(value)
      );
    } catch (error) {
      console.log("LocalStorage setItem error", error);
    }
  },
  getItem: (key) => {
    try {
      return JSON.parse(
        window.localStorage.getItem(`${AppProperty.APP_NAME}_${key}`)
      );
    } catch (error) {
      console.log("LocalStorage getItem error", error);
    }
  },

  removeItem: (key) => {
    try {
      return window.localStorage.removeItem(`${AppProperty.APP_NAME}_${key}`);
    } catch (error) {
      console.log("LocalStorage removeItem error", error);
    }
  },
};

export const sessionStorage = {
  setItem: (key, value) => {
    try {
      return window.sessionStorage.setItem(
        `${AppProperty.APP_NAME}_${key}`,
        JSON.stringify(value)
      );
    } catch (error) {
      console.log("SessionStorage setItem error", error);
    }
  },
  getItem: (key) => {
    try {
      return JSON.parse(
        window.sessionStorage.getItem(`${AppProperty.APP_NAME}_${key}`)
      );
    } catch (error) {
      console.log("SessionStorage getItem error", error);
    }
  },

  removeItem: (key) => {
    try {
      return window.sessionStorage.removeItem(`${AppProperty.APP_NAME}_${key}`);
    } catch (error) {
      console.log("SessionStorage removeItem error", error);
    }
  },
};

export const StorageKey = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  ROLES: "roles",
  ACCOUNT_NAME: "accountName",
  REMEMBER_ME: "rememberMe",
  //   RESEND_VERI_LINK_TOKEN: "resendVeriLinkToken",
};

// export default StorageKey;


