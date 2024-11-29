import { CssBaseline } from "@mui/material";
import { TopBar, SideBar } from "./components/global";

function App() {
  return (
    <>
      {/* Reset CSS to default */}
      <CssBaseline />
      <div className="app">
        <SideBar />
        <main className="content">
          <TopBar />
        </main>
      </div>
    </>
  );
}

export default App;
