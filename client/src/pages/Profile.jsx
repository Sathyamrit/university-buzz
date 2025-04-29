import React, { useEffect, useState } from 'react';
import './Profile.css';

export const Profile = () => {
  const [user, setUser] = useState(null); // State to hold user data
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  // Retrieve user data from localStorage
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedInUser) {
      window.location.href = '/login'; // Redirect to login if no user is found
    } else {
      setUser(loggedInUser); // Set user data
    }
  }, []);

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
        <p><strong>Branch:</strong> Computer Science</p>
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

export default Profile;