import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '', type: 'user' }); // Add type to differentiate between user and club
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const endpoint =
        formData.type === 'user'
          ? 'http://localhost:5000/api/profiles/login' // User login endpoint
          : 'http://localhost:5000/api/clubs/login'; // Club login endpoint
  
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.username,
          password: formData.password,
        }),
      });
  
      const data = await response.json();
      console.log('Response data:', data);
  
      if (data.success) {
        // Store user or club data in localStorage
        localStorage.setItem('user', JSON.stringify(data.data));
        if (data.data.type === 'user') {
          navigate('/profile'); // Redirect to user profile
        } else {
          navigate('/clubprofile'); // Redirect to club profile
        }
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        {/* Login Type Selector */}
        <div className="form-group">
          <label htmlFor="type" className="form-label">Login as:</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="form-input"
          >
            <option value="user">User</option>
            <option value="club">Club</option>
          </select>
        </div>

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
