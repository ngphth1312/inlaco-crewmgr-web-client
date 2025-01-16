import { CssBaseline } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router";

import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import VerifyEmailConfirmation from "./pages/verifyEmailConfirmation";

import HomePage from "./pages/homePage";

import CrewInfos from "./pages/crewInfos";
import AddCrewMember from "./pages/addCrewMember";
import CrewMemberDetail from "./pages/crewMemberDetail";

import CrewMobilization from "./pages/crewMobilization";
import CreateMobilization from "./pages/createMobilization";
import MobilizationDetail from "./pages/mobilizationDetail";

import CrewContract from "./pages/crewContract";
import CreateCrewContract from "./pages/createCrewContract";
import CrewContractDetail from "./pages/crewContractDetail";
import CrewContractAddendum from "./pages/crewContractAddendum";

import SupplyContract from "./pages/supplyContract";
import CreateSupplyContract from "./pages/createSupplyContract";
import SupplyContractDetail from "./pages/supplyContractDetail";
import SupplyContractAddendum from "./pages/supplyContractAddendum";

import TemplateContract from "./pages/templateContract";

import SupplyRequest from "./pages/supplyRequest";
import AdminSupplyRequestDetail from "./pages/adminSupplyRequestDetail";
import UserSupplyRequestDetail from "./pages/userSupplyRequestDetail";
import CreateSupplyRequest from "./pages/createSupplyRequest";

import CrewRecruitment from "./pages/crewRecruitment";
import CreateRecruitment from "./pages/createRecruitment";
import RecruitmentDetail from "./pages/recruitmentDetail";
import AdminCandidateDetail from "./pages/adminCandidateDetail";
import UserCandidateDetail from "./pages/userCandidateDetail";
import ApplyRecruitment from "./pages/applyRecruitment";

import CrewCourse from "./pages/crewCourse";
import CreateCourse from "./pages/createCourse";
import CourseDetail from "./pages/courseDetail";


import { MainLayout } from "./components/global";
import { useAppContext } from "./contexts/AppContext";
import { useEffect } from "react";
import { localStorage, sessionStorage, StorageKey } from "./utils/storageUtils";

function App() {

  let navigate = useNavigate();
  const { accessToken, setAccessToken, setRefreshToken, setAccountName, setRoles } = useAppContext();

  useEffect(() => {
    const fetchUserInfos = async () => {
      try {
        const rememberMe = await localStorage.getItem(StorageKey.REMEMBER_ME);

        if (rememberMe) {
          const accessToken = await localStorage.getItem(
            StorageKey.ACCESS_TOKEN
          );
          const refreshToken = await localStorage.getItem(
            StorageKey.REFRESH_TOKEN
          );
          const accountName = await localStorage.getItem(
            StorageKey.ACCOUNT_NAME
          );
          const roles = await localStorage.getItem(
            StorageKey.ROLES
          );

          if (accessToken && refreshToken && accountName && roles) {
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            setAccountName(accountName);
            setRoles(roles);
            navigate("/");
          } else {
            navigate("/login");
          }
        } else {
          const accessToken = await sessionStorage.getItem(
            StorageKey.ACCESS_TOKEN
          );
          const refreshToken = await sessionStorage.getItem(
            StorageKey.REFRESH_TOKEN
          );
          const accountName = await sessionStorage.getItem(
            StorageKey.ACCOUNT_NAME
          );
          const roles = await sessionStorage.getItem(StorageKey.ROLES);

          // console.log(tempAccessToken, tempRefreshToken, tempUserInfos);

          if (accessToken) {
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            setAccountName(accountName);
            setRoles(roles);
            navigate("/");
          } else {
            navigate("/login");
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserInfos();
  }, [])

  return (
    <>
      {/* Reset CSS to default */}
      <CssBaseline />
      <Routes>
        {/* Routes that require authentication and display Sidebar + TopBar */}
        {accessToken ? (
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/crews">
                <Route index element={<CrewInfos />} />
                <Route path="add" element={<AddCrewMember />} />
                <Route path=":id" element={<CrewMemberDetail />} />
            </Route>
            <Route path="/mobilizations">
                <Route index element={<CrewMobilization />} />
                <Route path="create" element={<CreateMobilization />} />
                <Route path=":id" element={<MobilizationDetail />} />
            </Route>
            <Route path="/crew-contracts">
                <Route index element={<CrewContract />} />
                <Route path="create" element={<CreateCrewContract />} />
                <Route path=":id" element={<CrewContractDetail />} />
                <Route path=":id/create-addendum" element={<CrewContractAddendum />} />
            </Route>
            <Route path="/supply-contracts">
                <Route index element={<SupplyContract />} />
                <Route path="create" element={<CreateSupplyContract />} />
                <Route path=":id" element={<SupplyContractDetail />} />
                <Route path=":id/create-addendum" element={<SupplyContractAddendum />} />
            </Route>

            <Route path="/template-contracts" element={<TemplateContract />} />
            
            <Route path="/supply-requests">
                <Route index element={<SupplyRequest />} />
                <Route path=":id/admin" element={<AdminSupplyRequestDetail />} />
                <Route path=":id/user" element={<UserSupplyRequestDetail />} /> 
                <Route path="user/create" element={<CreateSupplyRequest />} />   
            </Route>
            
            <Route path="/recruitment">
                <Route index element={<CrewRecruitment />} />
                <Route path="create" element={<CreateRecruitment />} />
                <Route path=":id" element={<RecruitmentDetail />} />
                <Route path=":id/candidates/:candidateID/admin" element={<AdminCandidateDetail />} />

                {/* User */}
                <Route path=":id/application" element={<UserCandidateDetail />} />
                <Route path=":id/apply" element={<ApplyRecruitment />} />
            </Route>

            <Route path="/courses">
                <Route index element={<CrewCourse />} />
                <Route path=":id" element={<CourseDetail />} />
                <Route path="create" element={<CreateCourse />} />
            </Route>
            {/* These routes will be moved to user Routes later */}
          </Route>
        ) : (
          /* Login Route without Sidebar + TopBar */
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-Up" element={<SignUpPage />} />
            <Route path="/verify-email-confirmation" element={<VerifyEmailConfirmation />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
