import React, { useEffect, useState } from 'react';
import './Clubs.css';

export const Clubs = () => {
  const [clubs, setClubs] = useState([]); // State to hold clubs data
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch clubs from the backend
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/clubs'); // Replace with your backend API URL
        const data = await response.json();
        if (data.success) {
          setClubs(data.data); // Set the fetched clubs data
        } else {
          console.error('Failed to fetch clubs:', data.message);
        }
      } catch (error) {
        console.error('Error fetching clubs:', error);
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };

    fetchClubs();
  }, []);

  if (loading) {
    return <p>Loading clubs...</p>; // Show loading message while fetching data
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Discover University Clubs & Societies</h1>
        <p className="hero-subtitle">
          Find your community on campus. Join clubs that match your interests, make new friends, and enhance your university experience.
        </p>
      </div>

      {/* Clubs Section */}
      <div className="clubs-container">
        {clubs.length === 0 ? (
          <p>No clubs available.</p>
        ) : (
          clubs.map((club) => (
            <div key={club._id} className="club-card">
              <img src={club.image} alt={club.name} className="club-image" />
              <div className="club-content">
                <h3 className="club-name">{club.name}</h3>
                <p className="club-description">{club.description}</p>
                <div className="club-tags">
                  {club.tags.map((tag, index) => (
                    <span key={index} className="club-tag">{tag}</span>
                  ))}
                </div>
                <div className="club-footer">
                  <span className="club-members">👥 {club.members}</span>
                  <button className="join-club-button">Join Club</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Clubs;