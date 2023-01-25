import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../services/session-service";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  // const navigate = useNavigate();


  function handleLogin(credentials) {
    return login(credentials).then((user) => {
    }).catch(error => {
    });
  }


  function handleLogout() {
    return logout().finally(() => {
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: handleLogin,
        logout: handleLogout

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
