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
import SupplyContract from "./pages/supplyContract";
import CreateSupplyContract from "./pages/createSupplyContract";
import SupplyContractDetail from "./pages/supplyContractDetail";
import TemplateContract from "./pages/templateContract";

import SupplyRequest from "./pages/supplyRequest";
import CrewRecruitment from "./pages/crewRecruitment";
import CreateRecruitment from "./pages/createRecruitment";
import RecruitmentDetail from "./pages/recruitmentDetail";
import CrewCourse from "./pages/crewCourse";
import CreateCourse from "./pages/createCourse";


import { MainLayout } from "./components/global";
import { useAppContext } from "./contexts/AppContext";
import { useEffect } from "react";
import { localStorage, sessionStorage, StorageKey } from "./utils/storageUtils";

function App() {

  let navigate = useNavigate();
  const { accessToken, setAccessToken } = useAppContext();

  useEffect(() => {
    const fetchUserInfos = async () => {
      try {
        const rememberMe = await localStorage.getItem(StorageKey.REMEMBER_ME);

        if (rememberMe) {
          const tempAccessToken = await localStorage.getItem(
            StorageKey.ACCESS_TOKEN
          );
          // const tempRefreshToken = await localStorage.getItem(
          //   StorageKey.REFRESH_TOKEN
          // );
          // const tempUserInfos = await localStorage.getItem(
          //   StorageKey.USER_INFOS
          // );

          // console.log(tempAccessToken, tempRefreshToken, tempUserInfos);
          if(tempAccessToken){
            setAccessToken(tempAccessToken);
            navigate("/");
          } else{
            navigate("/login");
          }
          // setRefreshToken(tempRefreshToken);
          // setUserInfos(tempUserInfos);
        } else {
          const tempAccessToken = await sessionStorage.getItem(
            StorageKey.ACCESS_TOKEN
          );
          // const tempRefreshToken = await sessionStorage.getItem(
          //   StorageKey.REFRESH_TOKEN
          // );
          // const tempUserInfos = await sessionStorage.getItem(
          //   StorageKey.USER_INFOS
          // );

          // console.log(tempAccessToken, tempRefreshToken, tempUserInfos);

          if (tempAccessToken) {
            setAccessToken(tempAccessToken);
            navigate("/");
          } else {
            navigate("/login");
          }
          // setRefreshToken(tempRefreshToken);
          // setUserInfos(tempUserInfos);
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
            <Route path="/crewInfos" element={<CrewInfos />} />
            <Route path="/crewMobilization" element={<CrewMobilization />} />
            <Route path="/crewContract" element={<CrewContract />} />
            <Route path="/supplyContract" element={<SupplyContract />} />
            <Route path="/templateContract" element={<TemplateContract />} />
            <Route path="/supplyRequest" element={<SupplyRequest />} />
            <Route path="/crewRecruitment" element={<CrewRecruitment />} />
            <Route path="/crewCourse" element={<CrewCourse />} />
            <Route path="/addCrewMember" element={<AddCrewMember />} />
            <Route path="/createCrewContract" element={<CreateCrewContract />} />
            <Route path="/createSupplyContract" element={<CreateSupplyContract />} />
            <Route path="/createCourse" element={<CreateCourse />} />
            <Route path="/createMobilization" element={<CreateMobilization />} />
            <Route path="/crewMemberDetail/:id" element={<CrewMemberDetail />} />
            <Route path="/mobilizationDetail/:id" element={<MobilizationDetail />} />
            <Route path="/crewContractDetail/:id" element={<CrewContractDetail />} />
            <Route path="/supplyContractDetail/:id" element={<SupplyContractDetail />} />
            <Route path="/createRecruitment" element={<CreateRecruitment />} />
            <Route path="/recruitmentDetail/:id" element={<RecruitmentDetail />} />
          </Route>
        ) : (
          /* Login Route without Sidebar + TopBar */
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/verifyEmailConfirmation" element={<VerifyEmailConfirmation />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
