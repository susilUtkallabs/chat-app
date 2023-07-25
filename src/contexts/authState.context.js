import { createContext, useEffect, useState } from "react";
import {
  getLocalStorageLoginToken,
  removeLocalStorageLoginToken,
} from "../utils/localStorage.utils";
import { LOCAL_STORAGE_LOGIN_TOKEN } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const AuthState = createContext();

export const AuthStateProvider = ({ children }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [myProfile, setMyProfile] = useState(null);
  const [profile, setProfile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const token = getLocalStorageLoginToken(LOCAL_STORAGE_LOGIN_TOKEN);
      if (!token) {
        navigate("/login");
        return;
      }

      if (LOCAL_STORAGE_LOGIN_TOKEN in localStorage) {
        const res = await AuthService.validateToken(token);
        setMyProfile(res);
        setProfile(res);
      }
    })();
  }, []);

  const logout = () => {
    removeLocalStorageLoginToken(LOCAL_STORAGE_LOGIN_TOKEN);
    setLoggedUser("");
    navigate("/login");
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setErrorMessage("");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [errorMessage]);

  return (
    <AuthState.Provider
      value={{
        passwordVisible,
        setPasswordVisible,
        loggedUser,
        setLoggedUser,
        errorMessage,
        setErrorMessage,
        myProfile,
        setMyProfile,
        profile,
        setProfile,
        logout,
      }}
    >
      {children}
    </AuthState.Provider>
  );
};

export default AuthState;
