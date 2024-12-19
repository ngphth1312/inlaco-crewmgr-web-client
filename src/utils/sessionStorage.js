import AppProperty from "../assets/constants/appProperty";

const sessionStorage = {
  setItem: (key, value) => {
    try {
      console.log("setItem", key, value);
      return window.sessionStorage.setItem(
        `${AppProperty.APP_NAME}_${key}`,
        JSON.stringify(value)
      );
    } catch (error) {
      console.log("setItem error", error);
    }
  },
  getItem: (key) => {
    try {
      return JSON.parse(
        window.sessionStorage.getItem(`${AppProperty.APP_NAME}_${key}`)
      );
    } catch (error) {
      console.log("getItem error", error);
    }
  },

  removeItem: (key) => {
    try {
      return window.sessionStorage.removeItem(`${AppProperty.APP_NAME}_${key}`);
    } catch (error) {
      console.log("removeItem error", error);
    }
  },
};

export default sessionStorage;
