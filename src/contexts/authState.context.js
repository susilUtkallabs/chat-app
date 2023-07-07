import { createContext, useEffect, useState } from "react";
import { getLocalStorageLoginToken, removeLocalStorageLoginToken } from "../utils/localStorage.utils";
import { LOCAL_STORAGE_LOGIN_TOKEN } from "../constants/constants";
import { useNavigate } from "react-router-dom";

const AuthState = createContext();

export const AuthStateProvider = ({children}) => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loggedUser, setLoggedUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    
    useEffect(()=> {
        const token = getLocalStorageLoginToken(LOCAL_STORAGE_LOGIN_TOKEN);
        if(!token){
            navigate('/login');
        }else{
            navigate('/');
        }
    }, []);

    const logout = () => {
        removeLocalStorageLoginToken(LOCAL_STORAGE_LOGIN_TOKEN);
        setLoggedUser("");
        navigate("/login");
    }

    return <AuthState.Provider value={{ passwordVisible, setPasswordVisible, loggedUser, setLoggedUser, errorMessage, setErrorMessage, logout}}>{children}</AuthState.Provider>
}

export default AuthState;