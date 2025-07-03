import { useState } from "react";
import PropTypes from "prop-types";
import loginService from "../services/login";
import { Toast } from "./Toast";

const Login = ({ onUserResponse }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [toastClass, setToastClass] = useState("success");

  function handleToast(toastType, toastMessage) {
    setToastClass(toastType);
    setToastMessage(toastMessage);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  }

  async function onLoginClick(e) {
    e.preventDefault();
    try {
      const userData = await loginService.login({ username, password });
      onUserResponse && onUserResponse(userData);
      handleToast("success", "logged in");
    } catch (err) {
      handleToast("error", err.message);
    }
  }

  function onUsernameChange(e) {
    setUsername(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onLoginClick}>
        <div>
          <span style={{ marginRight: 5 }}>username</span>
          <input type="text" onChange={onUsernameChange} value={username} />
        </div>
        <div>
          <span style={{ marginRight: 5 }}>password</span>
          <input type="password" onChange={onPasswordChange} value={password} />
        </div>
        <button type="submit" style={{ marginTop: 5 }}>Login</button>
      </form>
      <Toast message={toastMessage} toastClass={toastClass} />
    </div>
  );
};

Login.propTypes = {
  onUserResponse: PropTypes.func.isRequired,
};
export default Login;
