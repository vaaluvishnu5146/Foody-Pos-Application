import { useRef } from "react";
import { useAuth } from "../Contexts/Auth.context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const phoneRef = useRef();
  const passwordRef = useRef();
  const { setLoggedIn } = useAuth();
  const navigation = useNavigate();

  function showNotification(type = "", message = "") {
    return toast(message, {
      type: type,
      theme: "colored",
      position: "top-right",
    });
  }

  function handleLogin() {
    const mobileNumber = phoneRef.current.value;
    const password = passwordRef.current.value;
    if (mobileNumber && password) {
      fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobileNumber,
          password,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result && result.success) {
            showNotification("success", "Login successful");
            try {
              window.sessionStorage.setItem("_tk", result.token);
            } catch (err) {
              showNotification;
              "error", "Setting token failed";
            }
            setLoggedIn(true);
            setTimeout(() => {
              navigation("/store");
            }, 2000);
          }
          if (result && !result.success) {
            showNotification("error", result.message);
          }
        })
        .catch((error) => {
          showNotification("warning", error.message);
        });
    } else {
      showNotification("warning", "Form is empty");
    }
  }

  return (
    <div className="auth_page_container">
      <div className="auth_form_card">
        <img src="https://cdn.iconscout.com/icon/free/png-512/free-food-drink-healthy-hot-soup-bowl-spoon-4-10478.png?f=webp&w=256" />
        <div style={{ height: 50 }}></div>
        <div className="inputField">
          <label>Phone Number</label>
          <input
            className="b-r-10"
            ref={phoneRef}
            placeholder="Enter Phone Number"
          />
        </div>
        <div className="inputField">
          <label>Password</label>
          <input
            className="b-r-10"
            ref={passwordRef}
            placeholder="Enter Password"
          />
        </div>
        <div className="m-b-10"></div>
        <button className="btn b-r-10" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
