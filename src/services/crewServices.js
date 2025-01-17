import privateRequest from "../utils/privateRequest";
import publicRequest from "../utils/publicRequest";
import CrewEndpoints from "../api/crewEndpoints";

export const getAllCrewMembersAPI = async (page, size) => {
  try {
    const response = await privateRequest.get(`${CrewEndpoints.GENERAL}`);
    return response;
  } catch (err) {
    return err.response;
  }
};
