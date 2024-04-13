import { useState, createContext, useContext, useEffect } from "react";
import { useJwt } from "react-jwt";
import PropTypes from "prop-types";

export const AuthContext = createContext({
  isLoggedIn: false,
  userDetails: {},
  setLoggedIn: () => {},
  setUserDetails: () => {},
  decodedToken: {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const token = sessionStorage.getItem("_tk");
  const { decodedToken, isExpired } = useJwt(token || "");

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    }
  }, [token]);

  const values = {
    setLoggedIn,
    isLoggedIn,
    userDetails,
    setUserDetails,
    decodedToken,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
