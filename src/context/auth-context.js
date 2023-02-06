import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../services/session-service";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [sumCorrectAnswer, setSumCorrectAnswer] = useState(0);
  const [position, setPosition] = useState(null);
  const [challengeEvaluations, setChallengeEvaluations] = useState(null);
  const [mulChoiceQuestions, setMulChoiceQuestions] = useState([]);
  const [testQuestions, setTestQuestions] = useState([]);
  const [solutions, setSolutions] = useState([]);
  // const navigate = useNavigate();

  function handleLogin(credentials) {
    return login(credentials).then((response) => {
      setUser(response)
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
        setChallengeEvaluations
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
