import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import './Navbar.css'; // Optional: Add custom styles for the navbar

export const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-logo">
        <Link to="/">
          <img src="/logo.png" alt="University Buzz Logo" className="logo" />
        </Link>
      </div>

      {/* Middle: Navigation Links */}
      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/clubs" className="nav-link">Clubs</Link>
        <Link to="/events" className="nav-link">Events</Link>
      </div>

      {/* Right: Notification and Profile */}
      <div className="navbar-actions">
        <button className="notification-btn" aria-label="Notifications">
          🔔 {/* Unicode bell icon */}
        </button>
        <button className="profile-btn" aria-label="Profile">
          👤 {/* Unicode user icon */}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;