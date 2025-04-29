import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', formData);

    // Add logic to authenticate the user
    const isAuthenticated = true; // Replace with actual authentication logic
    if (isAuthenticated) {
      navigate('/'); // Redirect to homepage
    } else {
      alert('Invalid username or password'); // Handle authentication failure
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        {/* Username Field */}
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="form-button">
          Login
        </button>
      </form>

      {/* Redirect to Signup */}
      <p className="redirect-text">
        Don't have an account?{' '}
        <span className="signup-link" onClick={() => navigate('/signup')}>
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Login;
