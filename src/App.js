import ResultsPage from "./pages/results-page";
import styled from "@emotion/styled";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login-page";
import ChallengePage from "./pages/challenge-page";
import MultipleChoicePage from "./pages/multiple_choice_question-page"
import FirstStagePage from "./pages/first-stage-page";
// import TestQuestionPage from "./pages/test-question-page";
import { useAuth } from "./context/auth-context";

const Wrapper = styled.div`
height: 100%;
margin: auto;
display: flex;
justify-content: space-between;
flex-direction: column;
`

function App() {
  const { user } = useAuth();

  return (
    <Wrapper>
      <Routes>
        <Route index element={user ? <Navigate to="challenge" /> : <Navigate to="login" />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="challenge" element={<ChallengePage />} />
        <Route path="first-stage" element={<FirstStagePage />} />
        <Route path="stage1" element={<MultipleChoicePage />} />
        {/* <Route path="test-question" element={<TestQuestionPage />} /> */}
        <Route path="results" element={<ResultsPage />} />
      </Routes>
    </Wrapper>

  );
}

export default App;
