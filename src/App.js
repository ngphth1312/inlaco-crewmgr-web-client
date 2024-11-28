import { CssBaseline } from "@mui/material";
import { TopBar } from "./components/global";

function App() {
  return (
    <>
      {/* Reset CSS to default */}
      <CssBaseline />
      <div className="app">
        <main className="content">
          <TopBar />
        </main>
      </div>
    </>
  );
}

export default App;
