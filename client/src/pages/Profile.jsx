import React, { useEffect, useState } from 'react';
import './Profile.css';

export const Profile = () => {
  const [user, setUser] = useState(null); // State to hold user data
  const [posts, setPosts] = useState([]); // State to hold posts
  const [newPost, setNewPost] = useState(''); // State to hold new post content

  // Retrieve user data from localStorage
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedInUser) {
      window.location.href = '/login'; // Redirect to login if no user is found
    } else {
      setUser(loggedInUser); // Set user data
    }
  }, []);

  // Fetch posts from the database
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts?email=${user.email}`);
        const data = await response.json();
        if (data.success) {
          setPosts(data.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Handle adding a new post
  const handleAddPost = async () => {
    if (newPost.trim() === '') return;

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Post by ${user.name}`, // Example title
          content: newPost,
          email: user.email, // Associate the post with the user's email
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

  // Handle deleting a post
  const handleDeletePost = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        setPosts(posts.filter((post) => post._id !== id)); // Remove the deleted post from the state
      } else {
        alert('Failed to delete post: ' + data.message);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('An error occurred while deleting the post.');
    }
  };

  if (!user) {
    return <p>Loading...</p>; // Show loading while user data is being retrieved
  }

  return (
    <div className="profile-container">
      {/* Profile Section */}
      <div className="profile-details">
        <h3>Profile</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Posts:</strong> {posts.length}</p>
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
          <p className="no-posts">You haven't added any posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-item">
              <p><strong>{post.title}:</strong> {post.content}</p>
              <div className="post-actions">
                <button
                  className="delete-button"
                  onClick={() => handleDeletePost(post._id)}
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

export default Profile;