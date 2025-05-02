import React, { useEffect, useState } from "react";
import "./Home.css";

export const Home = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
      fetchUserPosts();
      fetchEvents();
    } else {
      window.location.href = "/login";
    }
  }, []);

  const fetchUserPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts");
      const data = await response.json();
      if (data.success) {
        setPosts(data.data);
      } else {
        console.error("Failed to fetch posts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/events");
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

  if (!user) {
    return <p>Loading...</p>;
  }

  // Construct the profile picture path dynamically
  const profilePicturePath = `/images/profile/${user.name.replace(/\s+/g, " ")}.jpg`;

  return (
    <div className="home-container">
      {/* Left: Profile Box */}
      <div className="profile-box">
        <div className="profile-header">
          <img
            src={profilePicturePath}
            alt="Profile"
            className="profile-avatar"
            onError={(e) => (e.target.src = "https://picsum.photos/100/100")} // Fallback if image is not found
          />
          <h3 className="profile-name">{user.name}</h3>
          <p className="profile-email">{user.email}</p>
        </div>
        <button
          className="view-profile-btn"
          onClick={() => (window.location.href = "/profile")}
        >
          View Profile
        </button>
      </div>

      {/* Middle: Post Feed */}
      <div className="post-feed">
        <h3 className="section-title">Posts</h3>
        <div className="post-list">
          {posts.length === 0 ? (
            <p>No posts to display.</p>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="post-card">
                <div className="post-header">
                  <div className="post-avatar">
                    <span>{post.title[0]}</span>
                  </div>
                  <div>
                    <h4 className="post-title">{post.title}</h4>
                    {/* <p className="post-time">Just now</p> */}
                  </div>
                </div>
                <p className="post-content">{post.content}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right: Upcoming Events */}
      <div className="events-box">
        <h3 className="section-title">Upcoming Events</h3>
        <ul className="event-list">
          {events.length === 0 ? (
            <p>No upcoming events.</p>
          ) : (
            events.map((event) => (
              <li key={event._id} className="event-item">
                <strong>{event.name}</strong> - {event.time} <br />
                <span className="event-club">
                  Hosted by: {event.clubId?.name || "Unknown Club"}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
