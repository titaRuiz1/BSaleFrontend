import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../services/session-service";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [sumCorrectAnswer, setSumCorrectAnswer] = useState(0);
  const [position, setPosition] = useState(null);
  const [allPositions, setAllPositions] = useState([])
  const [challengeEvaluations, setChallengeEvaluations] = useState(null);
  const [mulChoiceQuestions, setMulChoiceQuestions] = useState([]);
  const [testQuestions, setTestQuestions] = useState([]);
  const [solutions, setSolutions] = useState([]);

  const [view, setView] = useState('position');
  const [arrMultiChoiceQuestion, setArrMultiChoiceQuestion] = useState([]);
  const [arrTestQuestion, setArrTestQuestion] = useState([]);
  const [arrChallengeEvaluation, setArrChallengeEvaluation] = useState([]);
  const [positionApplicants, setPositionApplicants] = useState([]);

  const [average, setAverage] = useState(0);
  const [results, setResults] = useState({
    stage1: 0,
    stage2: 0,
    stage3: 0

  });
  const [newPosition, setNewPosition] = useState({
    title: '',
    description: '',
    multiple_choice_questions_attributes: null,
    test_questions_attributes: null,
    challenge_evaluations_attributes: null
  });
  // const navigate = useNavigate();


  function handleLogin(credentials) {
    return login(credentials).then((response) => {
      setUser(response)
      response.user_type === "admin" ? navigate("/admin") : navigate("/challenge")
      sessionStorage.setItem("user", JSON.stringify(response))
    }).catch(error => {
    });
  }

  function handleLogout() {
    return logout().then((response) => {
      sessionStorage.removeItem("user")
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        position,
        sumCorrectAnswer,
        mulChoiceQuestions,
        solutions,
        average,
        allPositions,
        results,
        view,
        arrMultiChoiceQuestion,
        arrTestQuestion,
        arrChallengeEvaluation,
        newPosition,
        setNewPosition,
        setArrChallengeEvaluation,
        setArrTestQuestion,
        setArrMultiChoiceQuestion,
        setView,
        setResults,
        setAllPositions,
        setAverage,
        setUser,
        setSumCorrectAnswer,
        login: handleLogin,
        logout: handleLogout,
        setPosition,
        setMulChoiceQuestions,
        setSolutions,
        testQuestions,
        setTestQuestions,
        challengeEvaluations,
        setChallengeEvaluations,
        positionApplicants,
        setPositionApplicants
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
