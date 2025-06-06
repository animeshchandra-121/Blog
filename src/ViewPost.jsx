import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem('access');
      try {
        const res = await axios.get(`http://127.0.0.1:8000/people/views/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPost(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div>
      <h2>Post Details</h2>
      {post ? (
        <div>
          <h3>{post.title}</h3>
          <p>{post.desc}</p>
          <p>Posted on: {post.created_on}</p>
          <p>Views: {post.views_count}</p>
          <p>By: {post.user.username}</p>
        </div>
      ) : (
        <p>Loading post...</p>
      )}
    </div>
  );
};

export default ViewPost;
