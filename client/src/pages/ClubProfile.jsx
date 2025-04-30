import React, { useState, useEffect } from 'react';
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

  // Fetch events and posts for the logged-in club
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve user data from localStorage
    if (!user || user.type !== 'club') {
      console.error('User is not logged in as a club');
      return;
    }

    const clubId = user._id; // Extract clubId from the logged-in user's data

    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${clubId}`);
        const data = await response.json();
        if (data.success) {
          setEvents(data.data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/club/${clubId}`);
        const data = await response.json();
        if (data.success) {
          setPosts(data.data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchEvents();
    fetchPosts();
  }, []);

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

    const user = JSON.parse(localStorage.getItem('user'));
    const clubId = user._id;

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newEvent, clubId }),
      });

      const data = await response.json();
      if (data.success) {
        setEvents([...events, data.data]);
        setNewEvent({ name: '', about: '', date: '', time: '', venue: '' });
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  // Handle adding a new post
  const handleAddPost = async () => {
    if (newPost.trim() === '') {
      alert('Post content cannot be empty.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const clubId = user._id;

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newPost,
          clubId,
          type: 'club', // Specify the type as 'club'
        }),
      });

      const data = await response.json();
      if (data.success) {
        setPosts([...posts, data.data]); // Add the new post to the state
        setNewPost(''); // Clear the input field
      } else {
        alert('Failed to add post: ' + data.message);
      }
    } catch (error) {
      console.error('Error adding post:', error);
      alert('An error occurred while adding the post.');
    }
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
            <div key={event._id} className="event-item">
              <p><strong>Event Name:</strong> {event.name}</p>
              <p><strong>About:</strong> {event.about}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Venue:</strong> {event.venue}</p>
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
              <p><strong>Post:</strong> {post.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ClubProfile;