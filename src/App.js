import { Navbar } from "./components/navbar"
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route index element={<Navigate to="login" />} />
        {/* <Route path="/login" element={<LoginPage />} />
      <Route path="/routes" element={<ChallengePage />} /> */}
      </Routes>
    </>
  );
}

export default App;
