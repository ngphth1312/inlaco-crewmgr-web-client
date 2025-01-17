import privateRequest from "../utils/privateRequest";
import publicRequest from "../utils/publicRequest";
import PostEndpoints from "../api/postEndpoints";

export const getAllPostAPI = async (page, size) => {
  try {
    const response = await publicRequest.get(
      `${PostEndpoints.GET_ALL}?page=${page}&size=${size}`
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

export const createRecruitmentPostAPI = async (postInfo) => {
  try {
    const response = await privateRequest.post(`${PostEndpoints.GENERAL}`, {
      title: postInfo.title,
      content: postInfo.content,
      recruitmentStartDate: postInfo.recruitmentStartDate,
      recruitmentEndDate: postInfo.recruitmentEndDate,
      position: postInfo.position,
      expectedSalary: postInfo.expectedSalary,
      workLocation: postInfo.workLocation,
      type: "RECRUITMENT",
    });
    return response;
  } catch (err) {
    return err.response;
  }
};
