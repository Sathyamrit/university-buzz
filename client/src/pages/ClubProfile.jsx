import React, { useState } from 'react';
import './ClubProfile.css';

export const ClubProfile = () => {
  const [events, setEvents] = useState([]);
  const [posts, setPosts] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    about: '',
    date: '',
    time: '',
    venue: '',
  });
  const [newPost, setNewPost] = useState('');

  // Handle input change for event form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  // Handle adding a new event
  const handleAddEvent = () => {
    if (
      !newEvent.name.trim() ||
      !newEvent.about.trim() ||
      !newEvent.date.trim() ||
      !newEvent.time.trim() ||
      !newEvent.venue.trim()
    )
      return;

    setEvents([...events, { id: events.length + 1, ...newEvent }]);
    setNewEvent({ name: '', about: '', date: '', time: '', venue: '' });
  };

  // Handle deleting an event
  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  // Handle adding a new post
  const handleAddPost = () => {
    if (newPost.trim() === '') return;
    setPosts([...posts, { id: posts.length + 1, content: newPost, likes: 0 }]);
    setNewPost('');
  };

  // Handle liking a post
  const handleLikePost = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  // Handle deleting a post
  const handleDeletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="club-profile-container">
      {/* Club Profile Section */}
      <div className="club-profile-details">
        <h2 className="club-profile-title">Club Profile</h2>
        <p><strong>Name:</strong> Programming Club</p>
        <p><strong>Members:</strong> 126</p>
        <p><strong>About:</strong> A community of coding enthusiasts working on exciting projects and hosting hackathons.</p>
      </div>

      {/* Add Event Section */}
      <div className="add-event-section">
        <h3 className="add-event-title">Create an Event</h3>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={newEvent.name}
          onChange={handleChange}
          className="event-input"
        />
        <textarea
          name="about"
          placeholder="About the Event"
          value={newEvent.about}
          onChange={handleChange}
          className="event-textarea"
        />
        <input
          type="date"
          name="date"
          value={newEvent.date}
          onChange={handleChange}
          className="event-input"
        />
        <input
          type="time"
          name="time"
          value={newEvent.time}
          onChange={handleChange}
          className="event-input"
        />
        <input
          type="text"
          name="venue"
          placeholder="Venue"
          value={newEvent.venue}
          onChange={handleChange}
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
            <div key={event.id} className="event-item">
              <p><strong>Event Name:</strong> {event.name}</p>
              <p><strong>About:</strong> {event.about}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
              <button
                className="delete-event-button"
                onClick={() => handleDeleteEvent(event.id)}
              >
                🗑️ Delete Event
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
            <div key={post.id} className="post-item">
              <p><strong>Post {post.id}:</strong> {post.content}</p>
              <div className="post-actions">
                <button
                  className="like-button"
                  onClick={() => handleLikePost(post.id)}
                >
                  👍 {post.likes} Likes
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeletePost(post.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClubProfile;