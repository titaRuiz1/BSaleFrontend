import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
    <Routes>
      <Route index element={<Navigate to="login" />} />
      {/* <Route path="/login" element={<LoginPage />} />
      <Route path="/routes" element={<ChallengePage />} /> */}
    </Routes>
    </>
  );
}

export default App;
