import { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext({
  isLoggedIn: false,
  userDetails: {},
  setLoggedIn: () => {},
  setUserDetails: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setLoggedIn] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  const values = {
    setLoggedIn,
    isLoggedIn,
    userDetails,
    setUserDetails,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.node,
};
