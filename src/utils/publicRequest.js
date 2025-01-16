import axios from "axios";
import AppProperty from "../assets/constants/appProperty";

const publicRequest = axios.create({
  baseURL: AppProperty.INLACO_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default publicRequest;
