import privateRequest from "../utils/privateRequest";
import publicRequest from "../utils/publicRequest";
import {
  sessionStorage,
  localStorage,
  StorageKey,
} from "../utils/storageUtils";
import AuthEndpoints from "../api/authEndpoints";
import axios from "axios";
import AppProperty from "../assets/constants/appProperty";

export const loginAPI = async (email, password) => {
  try {
    const response = await publicRequest.post(AuthEndpoints.LOGIN, {username: email, password: password});
    return response;

  } catch (err) {
    return err.response;
  }
};

export const signUpAPI = async (fullName, email, password, confirmPassword) => {
  try {
    const response = await publicRequest.post(AuthEndpoints.REGISTER, {
      name: fullName,
      username: email,
      password: password,
      confirmPassowrd: confirmPassword, //Tung typo here, fix later
    });
    return response;
  } catch (err) {
    return err.response;
  }
};
