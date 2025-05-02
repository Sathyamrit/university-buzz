import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation to get query parameters
import "./About.css";
import Footer from "../components/Footer";

export const About = () => {
  const [club, setClub] = useState(null); // State to hold club details
  const [events, setEvents] = useState([]); // State to hold events hosted by the club
  const location = useLocation(); // Get the current location to extract query parameters

  useEffect(() => {
    // Extract the clubId from the query parameters
    const queryParams = new URLSearchParams(location.search);
    let clubId = queryParams.get("clubId");

    // If no clubId is provided in the query parameters, check if the logged-in user is a club
    if (!clubId) {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      if (loggedInUser && loggedInUser.type === "club") {
        clubId = loggedInUser._id; // Use the logged-in club's ID
      } else {
        console.error("No clubId provided and user is not logged in as a club");
        return;
      }
    }

    // Fetch club details
    const fetchClubDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/clubs/${clubId}`);
        const data = await response.json();
        if (data.success) {
          setClub(data.data);
        } else {
          console.error("Failed to fetch club details:", data.message);
        }
      } catch (error) {
        console.error("Error fetching club details:", error);
      }
    };

    // Fetch events hosted by the club
    const fetchClubEvents = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${clubId}`);
        const data = await response.json();
        if (data.success) {
          setEvents(data.data);
        } else {
          console.error("Failed to fetch events:", data.message);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchClubDetails();
    fetchClubEvents();
  }, [location.search]); // Re-run the effect if the query parameters change

  if (!club) {
    return <p>Loading club details...</p>;
  }

  return (
    <div className="about-page">
      {/* Header Section */}
      <div className="header-section">
        <div className="header-content">
          <div className="header-left">
            <h1 className="about-club-name">{club.name}</h1>
            <p className="club-tagline">{club.tagline || "No tagline available"}</p>
            <div className="club-meta">
              <div className="club-tags">
                {club.tags && club.tags.length > 0
                  ? club.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))
                  : "No tags available"}
              </div>
              <span className="club-members">{club.members || 0} members</span>
            </div>
          </div>
          <div className="header-right">
            <img
              src={`/images/clubs/${club.name.toLowerCase().replace(/\s+/g, "-")}.jpg`}
              alt={club.name}
              className="club-image"
              onError={(e) => (e.target.src = "https://placehold.co/800x400?text=Image+Not+Found")}
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <h2>About Our Club</h2>
        <p>{club.about || "No description available for this club."}</p>
      </div>

      {/* What We Do Section */}
      <div className="what-we-do-section">
        <h2>What We Do</h2>
        <div className="activities">
          {club.whatWeDo ? (
            club.whatWeDo.split(",").map((activity, index) => (
              <div key={index} className="activity-card">
                <p>{activity.trim()}</p>
              </div>
            ))
          ) : (
            <p>No activities listed for this club.</p>
          )}
        </div>
      </div>

      {/* Club Leadership Section */}
      <div className="club-leadership-section">
        <h2>Club Leadership</h2>
        <div className="club-leader">
          <img
            src={`/images/profile/${club.clubFounderName
              ?.toLowerCase()
              .replace(/\s+/g, "-")}.jpg`}
            alt={club.clubFounderName || "Club Founder"}
            className="leader-avatar"
            onError={(e) => (e.target.src = "https://i.pravatar.cc/100")}
          />
          <div className="leader-info">
            <h3>{club.clubFounderName || "Unknown Founder"}</h3>
            <p>{club.clubFounderTitle || "No title available"}</p>
            <p>{club.clubFounderBranch || "No branch information available"}</p>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="events-section">
        <h2>Upcoming Events</h2>
        {events.length === 0 ? (
          <p>No upcoming events for this club.</p>
        ) : (
          events.map((event) => (
            <div key={event._id} className="event-card">
              <h3>{event.name}</h3>
              <p>
                <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {event.time}
              </p>
              <p>
                <strong>Venue:</strong> {event.venue}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Footer Section */}
      <div className="about-footer">
        <Footer />
      </div>
    </div>
  );
};

export default About;
