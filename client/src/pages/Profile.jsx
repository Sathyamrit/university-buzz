import React, { useState } from 'react';
import './Profile.css';

export const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

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
    <div className="profile-container">
      {/* Profile Section */}
      <div className="profile-details">
        <h2 className="profile-title">Your Profile</h2>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john.doe@example.com</p>
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