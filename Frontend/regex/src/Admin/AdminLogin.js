import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Make a POST request to your backend API for authentication
      const response = await fetch("http://localhost:5000/adminlogin", {
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

  const signup = () => {
    navigate("/admin/signup");
  };

  
 

  return (
    <div className="register">
      <h1>Login</h1>
      <input
        className="inputbox"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <input
        className="inputbox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <button className="button" type="button" onClick={handleLogin}>
        Login
      </button>
      <button className="button" type="button" onClick={signup}>
        Signup
      </button>
    </div>
  );
};

export default AdminLogin;
