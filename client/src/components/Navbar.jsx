import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve user data from localStorage
  const profileLink = user?.type === 'club' ? '/clubprofile' : '/profile'; // Redirect based on type
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar-component">
      <div className="navbar-component-logo">
        <Link to="/" className="navbar-component-logo-link">
          <span className="navbar-component-logo-text">UniversityBuzz</span>
        </Link>
      </div>

      <div className="navbar-component-links">
        <Link to="/" className="navbar-component-link">Home</Link>
        {user?.type === 'user' ? (
          <Link to="/clubs" className="navbar-component-link">Clubs</Link>
        ) : (
          <Link to="/about" className="navbar-component-link">About</Link>
        )}
        <Link to="/events" className="navbar-component-link">Events</Link>
      </div>

      <div className="navbar-actions">
        {!user ? (
          <>
            <Link to="/signup" className="auth-link">Signup</Link>
            <Link to="/login" className="auth-link">Login</Link>
          </>
        ) : (
          <>
            <Link to={profileLink} className="profile-link">
              <span>Account</span>
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;