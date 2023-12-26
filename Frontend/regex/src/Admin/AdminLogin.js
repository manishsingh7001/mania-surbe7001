import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Admin/AdminLogin.css";
import profile from "../images/profile.png";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Make a POST request to your backend API for authentication
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("adminToken", token);
        navigate("/admin/dashboard");
      } else {
        // Handle authentication error
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const forgotpassword = () => {
    navigate("/forgot-password");
  };

  return (
    // <div className="main">
    // <div className="sub-main">
    //   <h1 className="login">Login</h1>
    //   <h3 className="loginlabel">Email Id:</h3>
    //   <input
    //     className="inputbox"
    //     type="text"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //     placeholder="Enter Email"
    //   />
    //   <h3 className="loginlabel">Password:</h3>

    //   <input
    //     className="inputbox"
    //     type="password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     placeholder="Enter Password"
    //   />
    //   <h1 className="forgot">Forgot Passowrd</h1>
    //   <button className="button" type="button" onClick={handleLogin}>
    //     Login
    //   </button>
    //   </div>
    // </div>

    <div className="login-main">
      <div className="login-sub-main">
        <div>
          <div className="login-imgs">
            <div className="login-container-image">
              <img src={profile} alt="profile" className="login-profile" />
            </div>
          </div>
          <div>
            <h1>Login</h1>
            <div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="login-name"
                id="login-input"
              />
            </div>
            <div className="login-second-input">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="login-name"
                id="login-input"
              />
            </div>
            <div className="login-login-button">
              <button className="loogin-button" onClick={handleLogin}>Login</button>
            </div>

            <p className="link">
              <a onClick={forgotpassword}>Forgot password ?</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
