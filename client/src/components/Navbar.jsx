import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import './Navbar.css'; // Optional: Add custom styles for the navbar

export const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Retrieve user data from localStorage
  const profileLink = user?.type === 'club' ? '/clubprofile' : '/profile'; // Redirect based on type
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/logo.png" alt="University Buzz Logo" className="logo" />
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/" className="nav-link">Home</Link>
        {user?.type === 'user' ? (
          <Link to="/clubs" className="nav-link">Clubs</Link>
        ) : (
          <Link to="/about" className="nav-link">About</Link>
        )}
        <Link to="/events" className="nav-link">Events</Link>
      </div>

      <div className="navbar-actions">
        {!user ? (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to={profileLink}>
              <button className="profile-btn" aria-label="Profile">
                👤
              </button>
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