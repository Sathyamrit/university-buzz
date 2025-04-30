import React, { useEffect, useState } from "react";
import "./Home.css";

export const Home = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]); // State to hold events

  useEffect(() => {
    // Retrieve user data from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
      fetchUserPosts(); // Fetch posts for the logged-in user
      fetchEvents(); // Fetch upcoming events
    } else {
      // Redirect to login if no user is found
      window.location.href = "/login";
    }
  }, []);

  // Fetch posts for the logged-in user
  const fetchUserPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts"); // Fetch all posts
      const data = await response.json();
      if (data.success) {
        setPosts(data.data); // Set all posts from the database
      } else {
        console.error("Failed to fetch posts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Fetch upcoming events
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/events"); // Fetch all events
      const data = await response.json();
      if (data.success) {
        setEvents(data.data); // Set all events from the database
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

  return (
    <div className="home-container">
      {/* Left: Profile Box */}
      <div className="profile-box">
        <h3>Profile</h3>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Address:</strong> {user.address}
        </p>
        <button
          className="view-profile-btn"
          onClick={() => (window.location.href = "/profile")}
        >
          View Profile
        </button>
      </div>

      {/* Middle: Post Feed */}
      <div className="post-feed">
        <h3>Posts</h3>
        <div>
          {posts.length === 0 ? (
            <p>No posts to display.</p>
          ) : (
            posts.map((post) => (
              <p key={post._id}>
                <strong>{post.title}:</strong> {post.content}
              </p>
            ))
          )}
        </div>
      </div>

      {/* Right: Upcoming Events */}
      <div className="events-box">
        <h3>Upcoming Events</h3>
        <ul>
          {events.length === 0 ? (
            <p>No upcoming events.</p>
          ) : (
            events.map((event) => (
              <li key={event._id}>
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
