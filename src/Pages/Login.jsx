import { useRef } from "react";
import { useAuth } from "../Contexts/Auth.context";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setLoggedIn, setUserDetails } = useAuth();
  const navigation = useNavigate();

  function handleLogin() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if ((email, password)) {
      setUserDetails({
        email,
      });
      setLoggedIn(true);
      navigation("/store");
    }
  }

  return (
    <div className="loginFormContainer">
      <h1>Login</h1>
      <input ref={emailRef} placeholder="Enter Email Address" />
      <input ref={passwordRef} placeholder="Enter Password" />
      <button className="btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
