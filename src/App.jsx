import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import LoginPage from './LoginPage';
import CreatePost from './CreatePost';
import ViewPost from './ViewPost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element= {<LoginPage />} />
        <Route path="/posts" element={<CreatePost />} />
        <Route path="/views/:id" element={<ViewPost />} />
      </Routes>
    </Router>
  );
}

export default App;