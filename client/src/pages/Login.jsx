import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Footer from "../components/Footer";

export const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    type: "user",
  }); // Add type to differentiate between user and club
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // console.log(`${import.meta.env.VITE.API_URI}`);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint =
        formData.type === "user"
          ? `${import.meta.env.VITE_API_URI}/api/profiles/login` // User login endpoint
          : `${import.meta.env.VITE_API_URI}/api/clubs/login`; // Club login endpoint

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.username,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.success) {
        // Store user or club data in localStorage
        localStorage.setItem("user", JSON.stringify(data.data));
        if (data.data.type === "user") {
          navigate("/profile"); // Redirect to user profile
        } else {
          navigate("/clubprofile"); // Redirect to club profile
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-header-box">
        <h1 className="login-page-header-title">University Buzz</h1>
        <p className="login-page-header-subtitle">
          Connect with your campus community and access all your university resources in one place
        </p>
      </div>

      <div className="login-page-card">
        <div className="login-page-header">
          <div className="login-page-icon">🔑</div>
          <h2 className="login-page-title">Welcome Back!</h2>
          <p className="login-page-subtitle">Sign in to your account to continue</p>
        </div>
        <form className="login-page-form" onSubmit={handleSubmit}>
          <div className="login-page-form-group">
            <label htmlFor="type" className="login-page-form-label">Login as:</label>
            <select id="type" name="type" value={formData.type} onChange={handleChange} className="login-page-form-input">
              <option value="user">User</option>
              <option value="club">Club</option>
            </select>
          </div>

          {/* Username Field */}
          <div className="login-page-form-label, login-page-form-group">
            <label htmlFor="username" className="login-page-form-label">
              Email:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your email"
              value={formData.username}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Password Field */}
          <div className="login-page-form-label, login-page-form-group">
            <label htmlFor="password" className="login-page-form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="form-button">
            Sign In
          </button>
        </form>

        {/* Redirect to Signup */}
        <p className="redirect-text">
          Don't have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </p>
        <p className="forgot-password">
          <span onClick={() => alert("Forgot password functionality coming soon!")}>
            Forgot password?
          </span>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
