import { Outlet } from "react-router";
import TopBar from "./TopBar";
import SideBar from "./SideBar";

const MainLayout = () => {
  return (
    <div className="app">
      <SideBar />
      <main className="content">
        <TopBar />
        {/* Renders the matched child route */}
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
