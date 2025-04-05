// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Homepage from './pages/HomePage';
import UpdatesPage from './pages/UpdatePage';
import UserPage from './pages/users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/updates" element={<UpdatesPage />} />
        <Route path="/track" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;


