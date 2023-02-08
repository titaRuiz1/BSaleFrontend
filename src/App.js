import ResultsPage from "./pages/results-page";
import styled from "@emotion/styled";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login-page";
import ChallengePage from "./pages/challenge-page";
import MultipleChoicePage from "./pages/multiple_choice_question-page"
import FirstStagePage from "./pages/first-stage-page";
import FeedbackPage from "./pages/feedback-page"
import SecondStagePage from "./pages/second-stage-page";
import PositionsListPage from "./pages/admin-pages/list-positions-page"
import AdminPage from "./pages/admin-page";
import NewUserForm from "./components/new-user-form";



// import TestQuestionPage from "./pages/test-question-page";
import { useAuth } from "./context/auth-context";
import Table1 from "./components/table1/table1";

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
        <Route path="stage2" element={<SecondStagePage />} />
        <Route index element={!user ? <Navigate to="login" /> : user.user_type === "admin" ? <Navigate to="admin/index" /> : <Navigate to="challenge" />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="challenge" element={<ChallengePage />} />
        <Route path="first-stage" element={<FirstStagePage />} />
        <Route path="stage1" element={<MultipleChoicePage />} />
        {/* <Route path="test-question" element={<TestQuestionPage />} /> */}
        <Route path="feedback" element={<FeedbackPage />} />
        <Route path="results" element={<ResultsPage />} />

        {/* <Route path="positions-list" element={user?.email.includes('admi') ? <PositionsListPage /> : <ChallengePage />} /> */}
        <Route path="admin/index" element={<PositionsListPage />} />

        <Route path="admin-page" element={<AdminPage />} />
        <Route path="new-user" element={<NewUserForm />} />

      </Routes>
    </Wrapper>

  );
}

export default App;
