import privateRequest from "../utils/privateRequest";
import publicRequest from "../utils/publicRequest";
import ContractEndpoints from "../api/contractEndpoints";

export const getCrewContractsAPI = async (page, size, signed) => {
  try {
    const response = await privateRequest.get(
      `${ContractEndpoints.GENERAL}?page=${page}&size=${size}&type=LABOR_CONTRACT&signed=${signed}`
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

export const getSupplyContractsAPI = async (page, size, signed) => {
  try {
    const response = await privateRequest.get(
      `${ContractEndpoints.GENERAL}?page=${page}&size=${size}&type=SUPPLY_CONTRACT&signed=${signed}`
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

export const createCrewContractAPI = async (
  crewMemberID,
  crewContractInfo,
) => {
  try {
    const response = await privateRequest.post(
      `${ContractEndpoints.LABOR_GENERAL}/${crewMemberID}`,
      {
        title: crewContractInfo.title,
        initiator: crewContractInfo.initiator,
        signedPartners: crewContractInfo.signedPartners,
        terms: "",
        activationDate: crewContractInfo.activationDate,
        expiredDate: crewContractInfo.expiredDate,
        type: "LABOR_CONTRACT",
        customAttributes: crewContractInfo.customAttributes,
      }
    );
    return response;
  } catch (err) {
    return err.response;
  }
};
