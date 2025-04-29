import React from 'react';
import './Clubs.css';

const clubsData = [
  {
    id: 1,
    name: 'Programming Club',
    description: 'A community of coding enthusiasts working on exciting projects and hosting hackathons.',
    tags: ['Tech', 'Coding', 'Hackathons'],
    members: 126,
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
  },
  {
    id: 2,
    name: 'Photography Society',
    description: 'Capture moments, tell stories. Join us to explore the art of photography and visual storytelling.',
    tags: ['Arts', 'Photography', 'Creative'],
    members: 84,
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
  },
  {
    id: 3,
    name: 'Debate Club',
    description: 'Sharpen your arguments and public speaking skills. Regular debates on current topics and competitions.',
    tags: ['Debate', 'Public Speaking', 'Competitions'],
    members: 52,
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
  },
  {
    id: 4,
    name: 'Music Band',
    description: 'Express yourself through music. We perform at campus events and host regular jam sessions.',
    tags: ['Music', 'Performances', 'Arts'],
    members: 38,
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
  },
  {
    id: 5,
    name: 'Sports Club',
    description: 'Stay fit and compete in various sports. Regular training sessions and inter-college tournaments.',
    tags: ['Sports', 'Fitness', 'Competitions'],
    members: 93,
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
  },
  {
    id: 6,
    name: 'Drama Society',
    description: 'Explore the world of theater and performing arts. Regular workshops and plays throughout the year.',
    tags: ['Drama', 'Theater', 'Arts'],
    members: 67,
    image: 'https://via.placeholder.com/150', // Replace with actual image URL
  },
];

export const Clubs = () => {
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
        {clubsData.map((club) => (
          <div key={club.id} className="club-card">
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
        ))}
      </div>
    </div>
  );
};

export default Clubs;