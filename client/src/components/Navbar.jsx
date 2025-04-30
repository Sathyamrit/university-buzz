import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import './Navbar.css'; // Optional: Add custom styles for the navbar

export const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve user data from localStorage
  const profileLink = user?.type === 'club' ? '/clubprofile' : '/profile'; // Redirect based on type

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/logo.png" alt="University Buzz Logo" className="logo" />
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/clubs" className="nav-link">Clubs</Link>
        <Link to="/events" className="nav-link">Events</Link>
      </div>

      <div className="navbar-actions">
        <button className="notification-btn" aria-label="Notifications">
          🔔
        </button>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to={profileLink}>
          <button className="profile-btn" aria-label="Profile">
            👤
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;