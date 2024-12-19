import { CssBaseline } from "@mui/material";
import { TopBar, SideBar } from "./components/global";
import { Routes, Route } from "react-router";

import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import CrewInfos from "./pages/crewInfos";
import CrewMobilization from "./pages/crewMobilization";
import CrewContract from "./pages/crewContract";
import SupplyContract from "./pages/supplyContract";
import TemplateContract from "./pages/templateContract";
import SupplyRequest from "./pages/supplyRequest";
import CrewRecruitment from "./pages/crewRecruitment";
import CrewCourse from "./pages/crewCourse";

import { useAppContext } from "./contexts/AppContext";

function App() {

  const { accessToken, setAccessToken } = useAppContext();

  return (
    <>
      {/* Reset CSS to default */}
      <CssBaseline />
      {accessToken !== "" ? (
        <div className="app">
          <SideBar />
          <main className="content">
            <TopBar />
            <Routes>
              <Route path="/homePage" element={<HomePage />} />
              <Route path="/crewInfos" element={<CrewInfos />} />
              <Route path="/crewMobilization" element={<CrewMobilization />} />
              <Route path="/crewContract" element={<CrewContract />} />
              <Route path="/supplyContract" element={<SupplyContract />} />
              <Route path="/templateContract" element={<TemplateContract />} />
              <Route path="/supplyRequest" element={<SupplyRequest />} />
              <Route path="/crewRecruitment" element={<CrewRecruitment />} />
              <Route path="/crewCourse" element={<CrewCourse />} />
            </Routes>
          </main>
        </div>
      ) : (
        <div className="login">
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
