import ResultsPage from "./pages/results-page";
import styled from "@emotion/styled";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login-page";
import ChallengePage from "./pages/challenge-page";
import MultipleChoicePage from "./pages/multiple_choice_question-page"
import FirstStagePage from "./pages/first-stage-page";

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
        <Route path="results" element={<ResultsPage />} />
        <Route path="first-stage" element={<FirstStagePage />} />
        <Route path="mul-choice-question" element={<MultipleChoicePage />} />
        {/* <Route path="/routes" element={<ChallengePage />} /> */}
      </Routes>
    </Wrapper>

  );
}

export default App;
