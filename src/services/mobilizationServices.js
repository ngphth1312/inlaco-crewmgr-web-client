import privateRequest from "../utils/privateRequest";
import MobilizationEndpoints from "../api/mobilizationEndpoints";

export const getMyMobilizationAPI = async (cardID) => {
  try {
    const response = await privateRequest.get(
      `${MobilizationEndpoints.CURRENT_MOBILIZATION}/cardID`
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

export const getAllMobilizationsAPI = async (page, size, status) => {
  try {
    const response = await privateRequest.get(
      `${MobilizationEndpoints.GENERAL}/pagination?page=${page}&size=${size}&status=${status}`
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

export const createMobilizationAPI = async (mobilizationInfo) => {
  try {
    const response = await privateRequest.post(
      `${MobilizationEndpoints.GENERAL}`,
      mobilizationInfo
    );
    return response;
  } catch (err) {
    return err.response;
  }
};
