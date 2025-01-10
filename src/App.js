import { CssBaseline } from "@mui/material";
import { Routes, Route, useNavigate } from "react-router";

import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import HomePage from "./pages/homePage";
import CrewInfos from "./pages/crewInfos";
import CrewMobilization from "./pages/crewMobilization";
import CrewContract from "./pages/crewContract";
import SupplyContract from "./pages/supplyContract";
import TemplateContract from "./pages/templateContract";
import SupplyRequest from "./pages/supplyRequest";
import CrewRecruitment from "./pages/crewRecruitment";
import CrewCourse from "./pages/crewCourse";
import AddCrewMember from "./pages/addCrewMember";
import CreateCrewContract from "./pages/createCrewContract";
import CreateSupplyContract from "./pages/createSupplyContract";
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
          </Route>
        ) : (
          /* Login Route without Sidebar + TopBar */
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
