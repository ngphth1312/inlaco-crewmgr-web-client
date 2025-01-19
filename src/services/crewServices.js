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

export const createCrMemberFrCandidateAPI = async (candidateID, candidateInfo) => {
  try {
    const response = await privateRequest.post(
      `${CrewEndpoints.GENERAL}/${candidateID}`,
      {
        birthDate: candidateInfo?.birthDate,
        fullName: candidateInfo?.fullName,
        email: candidateInfo?.email,
        phoneNumber: candidateInfo?.phoneNumber,
        address: candidateInfo?.address,
        gender: candidateInfo?.gender,
        professionalPosition: "",
        expertiseLevels: [],
        languageSkills: [],
        experiences: [],
        socialInsuranceCode: candidateInfo?.socialInsuranceCode,
        //healthInsuranceCode: candidateInfo?.healthInsuranceCode,
        //healthInsHospital: candidateInfo?.healthInsHospital,
        accidentInsuranceCode: candidateInfo?.accidentInsuranceCode,

        //adjust here later when file upload feature is done
        socialInsuranceImages: [
          {
            url: "",
            name: "",
            type: "",
          },
        ],
        // healthInsuranceImages: [
        //   {
        //     url: "",
        //     name: "",
        //     type: "",
        //   },
        // ],
        accidentInsuranceImages: [
          {
            url: "",
            name: "",
            type: "",
          },
        ],
      }
    );
    return response;
  } catch (err) {
    return err.response;
  }
};
