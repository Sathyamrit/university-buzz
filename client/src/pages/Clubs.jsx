import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Clubs.css";

export const Clubs = () => {
  const [clubs, setClubs] = useState([]); // State to hold clubs data
  const [joinedClubs, setJoinedClubs] = useState([]); // State to hold joined clubs
  const [loading, setLoading] = useState(true); // State to handle loading
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Fetch clubs and joined clubs from the backend
  useEffect(() => {
    const fetchClubsAndJoinedClubs = async () => {
      const user = JSON.parse(localStorage.getItem("user")); // Retrieve logged-in user data

      try {
        // Fetch all clubs
        const clubsResponse = await fetch("http://localhost:5000/api/clubs");
        const clubsData = await clubsResponse.json();

        // Fetch joined clubs for the user
        const joinedClubsResponse = await fetch(
          `http://localhost:5000/api/profiles/${user._id}/joined-clubs`
        );
        const joinedClubsData = await joinedClubsResponse.json();

        if (clubsData.success && joinedClubsData.success) {
          // Mark clubs as joined if they are in the user's joinedClubs list
          const joinedClubIds = joinedClubsData.data.map((club) => club._id);
          const updatedClubs = clubsData.data.map((club) => ({
            ...club,
            joined: joinedClubIds.includes(club._id),
          }));

          setClubs(updatedClubs); // Update clubs with joined status
          setJoinedClubs(joinedClubIds); // Store joined club IDs
        } else {
          console.error("Failed to fetch clubs or joined clubs");
        }
      } catch (error) {
        console.error("Error fetching clubs or joined clubs:", error);
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };

    fetchClubsAndJoinedClubs();
  }, []);

  const handleJoinClub = async (clubId) => {
    const user = JSON.parse(localStorage.getItem("user")); // Retrieve logged-in user data

    try {
      const response = await fetch(
        "http://localhost:5000/api/profiles/join-club",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id,
            clubId,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Preserve the user's type when updating localStorage
        const updatedUser = { ...user, ...data.data, type: user.type };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        setClubs((prevClubs) =>
          prevClubs.map((club) =>
            club._id === clubId ? { ...club, joined: true } : club
          )
        );
        setJoinedClubs((prevJoinedClubs) => [...prevJoinedClubs, clubId]); // Add the club to joinedClubs
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error joining club:", error);
      alert("An error occurred while joining the club.");
    }
  };

  const handleViewClub = (clubId) => {
    navigate(`/about?clubId=${clubId}`); // Redirect to the About page with the clubId as a query parameter
  };

  if (loading) {
    return <p>Loading clubs...</p>; // Show loading message while fetching data
  }

  return (
    <div className="backgroundColoring">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Discover University Clubs & Societies</h1>
        <p className="hero-subtitle">
          Find your community on campus. Join clubs that match your interests,
          make new friends, and enhance your university experience.
        </p>
      </div>

      {/* Clubs Section */}
      <div className="clubs-container">
        {clubs.length === 0 ? (
          <p>No clubs available.</p>
        ) : (
          clubs.map((club) => (
            <div key={club._id} className="club-card">
              <img
                src={`/images/clubs/${club.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}.jpg`}
                alt={club.name}
                className="club-image"
              />
              <div className="club-content">
                <h3 className="club-name">{club.name}</h3>
                <p className="club-description">{club.description}</p>
                <div className="club-tags">
                  {club.tags.map((tag, index) => (
                    <span key={index} className="club-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="club-footer">
                  <button
                    className="view-club-button"
                    onClick={() => handleViewClub(club._id)}
                  >
                    Dive in
                  </button>
                  <button
                    className="join-club-button"
                    onClick={() => handleJoinClub(club._id)}
                    disabled={club.joined} // Disable the button if already joined
                  >
                    {club.joined ? "Joined" : "Join Club"}
                  </button>
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
