import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate("/register");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setError("Both fields are required.");
      return;
    }

    axios
      .get(`http://localhost:8080/api/email/${userName}`)
      .then((response) => {
        if (response.data) {
          if (
            userName === response.data.email &&
            password === response.data.password
          ) {
            setError("");
            localStorage.setItem("userId", response.data.id);
            localStorage.setItem("email", response.data.email);
            navigate("/dashboard");
            window.location.reload();
          } else {
            setError("Invalid username or password.");
          }
        } else {
          setError("Invalid User Name");
        }
      })
      .catch((err) => {
        setError("An error occurred. Please try again.");
      });
  };

  return (
    <div id="LoginContainer">
      <div className="backgroundImage">
        {/* <img src="/images/background.jpg" alt="Christmas Background" /> */}
      </div>
      <div className="loginBox">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="userNameBox">
            <label htmlFor="UserName">User Email</label>
            <input
              type="email"
              id="UserName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="PasswordBox">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              id="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="errorMessage">{error}</p>}
          <div>
            <button type="submit" id="LoginButton">
              Login
            </button>
            <button type="button" onClick={handleRegister}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
