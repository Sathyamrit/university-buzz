import React, { useState, useEffect } from "react";
import "./ClubProfile.css";

export const ClubProfile = () => {
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: "",
    about: "",
    date: "",
    time: "",
    venue: "",
  });
  const [newPost, setNewPost] = useState("");
  const [club, setClub] = useState(null); // State to hold the logged-in club's data

  // Fetch club data from localStorage
  useEffect(() => {
    const loggedInClub = JSON.parse(localStorage.getItem("user"));
    if (!loggedInClub || loggedInClub.type !== "club") {
      console.error("User is not logged in as a club");
      return;
    }
    setClub(loggedInClub); // Set the logged-in club's data
  }, []);

  // Fetch events and posts for the logged-in club
  useEffect(() => {
    if (!club) return;

    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/events/${club._id}`
        );
        const data = await response.json();
        if (data.success) {
          setEvents(data.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/posts/club/${club._id}`
        );
        const data = await response.json();
        if (data.success) {
          setPosts(data.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchEvents();
    fetchPosts();
  }, [club]);

  // Handle adding a new event
  const handleAddEvent = async () => {
    if (
      !newEvent.name.trim() ||
      !newEvent.about.trim() ||
      !newEvent.date.trim() ||
      !newEvent.time.trim() ||
      !newEvent.venue.trim()
    )
      return;

    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newEvent, clubId: club._id }),
      });

      const data = await response.json();
      if (data.success) {
        setEvents([...events, data.data]);
        setNewEvent({ name: "", about: "", date: "", time: "", venue: "" });
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Handle deleting an event
  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${eventId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setEvents(events.filter((event) => event._id !== eventId)); // Remove the deleted event from state
      } else {
        alert("Failed to delete event: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("An error occurred while deleting the event. Please try again.");
    }
  };

  // Handle adding a new post
  const handleAddPost = async () => {
    if (newPost.trim() === "") {
      alert("Post content cannot be empty.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newPost,
          clubId: club._id,
          type: "club", // Specify the type as 'club'
        }),
      });

      const data = await response.json();
      if (data.success) {
        setPosts([...posts, data.data]); // Add the new post to the state
        setNewPost(""); // Clear the input field
      } else {
        alert("Failed to add post: " + data.message);
      }
    } catch (error) {
      console.error("Error adding post:", error);
      alert("An error occurred while adding the post.");
    }
  };

  // Handle deleting a post
  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setPosts(posts.filter((post) => post._id !== postId)); // Remove the deleted post from state
      } else {
        alert("Failed to delete post: " + data.message);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("An error occurred while deleting the post. Please try again.");
    }
  };

  if (!club) {
    return <p>Loading...</p>;
  }

  return (
    <div className="backgroundColoring">
      <div className="club-profile-container">
        {/* Club Profile Section */}
        <div className="club-profile-details">
          <h2 className="club-profile-title">Club Profile</h2>
          <p>
            <strong>Name:</strong> {club.name}
          </p>
          <p>
            <strong>Members:</strong> {club.members || "N/A"}
          </p>
          <p>
            <strong>About:</strong>{" "}
            {club.description || "No description available."}
          </p>
        </div>

        {/* Add Event Section */}
        <div className="add-event-section">
          <h3 className="add-event-title">Create an Event</h3>
          <input
            type="text"
            name="name"
            placeholder="Event Name"
            value={newEvent.name}
            onChange={(e) =>
              setNewEvent({ ...newEvent, [e.target.name]: e.target.value })
            }
            className="event-input"
          />
          <textarea
            name="about"
            placeholder="About the Event"
            value={newEvent.about}
            onChange={(e) =>
              setNewEvent({ ...newEvent, [e.target.name]: e.target.value })
            }
            className="event-textarea"
          />
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={(e) =>
              setNewEvent({ ...newEvent, [e.target.name]: e.target.value })
            }
            className="event-input"
          />
          <input
            type="time"
            name="time"
            value={newEvent.time}
            onChange={(e) =>
              setNewEvent({ ...newEvent, [e.target.name]: e.target.value })
            }
            className="event-input"
          />
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={newEvent.venue}
            onChange={(e) =>
              setNewEvent({ ...newEvent, [e.target.name]: e.target.value })
            }
            className="event-input"
          />
          <button className="add-event-button" onClick={handleAddEvent}>
            Add Event
          </button>
        </div>

        {/* Events Section */}
        <div className="events-section">
          <h3 className="events-title">Upcoming Events</h3>
          {events.length === 0 ? (
            <p className="no-events">No events created yet.</p>
          ) : (
            events.map((event) => (
              <div key={event._id} className="event-item">
                <p>
                  <strong>Event Name:</strong> {event.name}
                </p>
                <p>
                  <strong>About:</strong> {event.about}
                </p>
                <p>
                  <strong>Date:</strong> {event.date}
                </p>
                <p>
                  <strong>Time:</strong> {event.time}
                </p>
                <p>
                  <strong>Venue:</strong> {event.venue}
                </p>
                <button
                  className="delete-event-button"
                  onClick={() => handleDeleteEvent(event._id)}
                >
                  Delete Event
                </button>
              </div>
            ))
          )}
        </div>

        {/* Add Post Section */}
        <div className="add-post-section">
          <h3 className="add-post-title">Add a Post</h3>
          <textarea
            className="post-input"
            placeholder="Write something..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <button className="add-post-button" onClick={handleAddPost}>
            Add Post
          </button>
        </div>

        {/* Posts Section */}
        <div className="posts-section">
          <h3 className="posts-title">Your Posts</h3>
          {posts.length === 0 ? (
            <p className="no-posts">No posts added yet.</p>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="post-item">
                <p>
                  <strong>Post:</strong> {post.content}
                </p>
                <button
                  className="delete-post-button"
                  onClick={() => handleDeletePost(post._id)}
                >
                  Delete Post
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ClubProfile;
