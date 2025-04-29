import React, { useState } from 'react';

export const Home = () => {
  // State to hold posts
  const [posts, setPosts] = useState([
    { id: 1, content: 'This is the first post.' },
    { id: 2, content: 'This is the second post.' },
    { id: 3, content: 'This is the third post.' },
  ]);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      {/* Left: Profile Box */}
      <div style={{ flex: '1', marginRight: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
        <h3>Profile</h3>
        <p><strong>Name:</strong> John Doety</p>
        <p><strong>Branch:</strong> Computer Science</p>
        <p><strong>Posts:</strong> 42</p>
        <p><strong>Friends:</strong> 120</p>
        <p><strong>Clubs:</strong> 5</p>
        <button style={{ marginTop: '10px', padding: '5px 10px', cursor: 'pointer' }}>View Profile</button>
      </div>

      {/* Middle: Post Feed */}
      <div style={{ flex: '2', marginRight: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
        <h3>Posts</h3>
        <div>
          {posts.map((post) => (
            <p key={post.id}><strong>Post {post.id}:</strong> {post.content}</p>
          ))}
        </div>
      </div>

      {/* Right: Upcoming Events */}
      <div style={{ flex: '1', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
        <h3>Upcoming Events</h3>
        <ul>
          <li>Event 1: Hackathon - May 5</li>
          <li>Event 2: Workshop - May 10</li>
          <li>Event 3: Seminar - May 15</li>
          {/* Add more events dynamically */}
        </ul>
      </div>
    </div>
  );
};
