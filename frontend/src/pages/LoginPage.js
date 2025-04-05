
// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import './styles/global.css';// Adjust the path as needed based on your file structure
import '../styles/login.css';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Mock credentials (for testing)
  const mockCredentials = {
    email: 'admin@example.com', // Replace with your test email
    password: 'password123',     // Replace with your test password
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the credentials match
    if (email === mockCredentials.email && password === mockCredentials.password) {
      localStorage.setItem('token', 'mocked-token'); // Mock a JWT token for now
      navigate('/home'); // Redirect to the homepage after successful login
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
