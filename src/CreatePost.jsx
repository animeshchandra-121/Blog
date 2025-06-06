import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Initialize useNavigate hook
  const userId = 5;

  const handleCreate = async () => {
    const token = localStorage.getItem('access');
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/people/posts/',
        {
          user_id: userId,
          title,
          desc
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log(res.data);
      alert('Post created!');

      // Redirect to the posts page after creation
      navigate('/posts');
    } catch (error) {
      console.error('Error creating post:', error);
      setError('Error creating post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={desc}
        onChange={e => setDesc(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleCreate} disabled={loading}>
        {loading ? 'Creating...' : 'Submit'}
      </button>
    </div>
  );
};

export default CreatePost;
