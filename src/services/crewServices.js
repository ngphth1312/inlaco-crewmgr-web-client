import privateRequest from "../utils/privateRequest";
import publicRequest from "../utils/publicRequest";
import CrewEndpoints from "../api/crewEndpoints";

export const getAllCrewMemberAPI = async (page, size, official) => {
  try {
    const response = await privateRequest.get(
      `${CrewEndpoints.GENERAL}?page=${page}&size=${size}&official=${official}`
    );
    return response;
  } catch (err) {
    return err.response;
  }
};