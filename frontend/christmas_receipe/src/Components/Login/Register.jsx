import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Register = () => {
  const [userName, setUserName] = useState("ash");
  const [UserEmail, setUserEmail] = useState("ash@gmail.com");
  const [password, setPassword] = useState("111");
  const [C_password, setCPassword] = useState("111");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !UserEmail || !password || !C_password) {
      setError("All fields are required.");
      return;
    }
    if (password !== C_password) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const countResponse = await axios.get("http://localhost:8080/api/users/count");      
      const userId = "FAF_" + (countResponse.data+1 || 0);
      const userData = {
        user_id: userId,
        name: userName,
        email: UserEmail,
        password: password,
      };
      const userResponse = await axios.get(`http://localhost:8080/api/email/${UserEmail}`);
      console.log(userResponse);
      
      if (userResponse.data!== null) {
        alert("Email already exists . Try Log In");
        return;
      }

      const registerResponse = await axios.post("http://localhost:8080/api/addUser", userData);
      
      if (registerResponse.status === 201) {
        setError("");
        localStorage.setItem("userId", userId);
        localStorage.setItem("email", UserEmail);
        navigate("/dashboard");
      } else {
        setError("Registration failed.");
      }
    } catch (err) {
      console.error("An error occurred. Please try again.", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div id="LoginContainer">
      <div className="backgroundImage">
        {/* <img src="/images/background.jpg" alt="Background" /> */}
      </div>
      <div className="loginBox">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="userNameBox">
            <label htmlFor="UserName">User Name</label>
            <input
              type="text"
              id="UserName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="UserEmailBox">
            <label htmlFor="UserEmail">User Email</label>
            <input
              type="email"
              id="UserEmail"
              value={UserEmail}
              onChange={(e) => setUserEmail(e.target.value)}
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
          <div className="PasswordBox">
            <label htmlFor="C_Password">Confirm Password</label>
            <input
              type="password"
              id="C_Password"
              value={C_password}
              onChange={(e) => setCPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="errorMessage">{error}</p>}
          <div>
            <button type="submit" id="LoginButton">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
