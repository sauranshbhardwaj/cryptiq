import { createContext, useState, useEffect, useContext } from "react";
import Session from "supertokens-web-js/recipe/session";
import { backendURL } from "../../config.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userID, setUserID] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [name, setName] = useState("");

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        setLoggedIn(await Session.doesSessionExist());

        if (await Session.doesSessionExist()) {
          setUserID(await Session.getUserId());

          let name_ = await fetch(`${backendURL}/name`);
          setName(await name_.text());
        }
        setLoading(false);
      } catch (e) {}
    }

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userID,
        name,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
