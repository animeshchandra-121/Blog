import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const navigate = useNavigate();  // Initialize navigate

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/people/register/', {
        id,
        username,
        password
      });

      const { access, refresh } = res.data;
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      alert('Registered successfully!');
      
      // Redirect to the posts page
      navigate('/posts');  // Redirect after successful registration
    } catch (error) {
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input 
        type="text" 
        placeholder="ID" 
        value={id} 
        onChange={e => setId(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={e => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
