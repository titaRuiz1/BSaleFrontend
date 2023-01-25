import ChallengePage from "./challenge-page";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./login";
import styled from "@emotion/styled";

const Wrapper = styled.div`
height: 100%;
margin: auto;
display: flex;
justify-content: space-between;
flex-direction: column;

`


function App() {
  return (

    <Wrapper>
      <Routes>
        <Route index element={<Navigate to="login" />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="challenge" element={<ChallengePage />} />
        {/* <Route path="/routes" element={<ChallengePage />} /> */}
      </Routes>
    </Wrapper>

  );
}

export default App;
