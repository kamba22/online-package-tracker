// src/pages/LandingPage.jsx
// src/components/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import heroimage from '../assets/heroimage.png'
import '../styles/landingpage.css'; // Import the CSS for LandingPage

const LandingPage = () => {
  const navigate = useNavigate();

  const goToTracking = () => {
    navigate('/track');
  };

  return (
    <div className="landing-container">
      <Navbar />
      <section className="hero-section">
        <div className="hero-content">
          <h1>Track Your Package Seamlessly</h1>
          <p>Enter your tracking ID to know where your package is at any time.</p>
          <button onClick={goToTracking}>Track Package</button>
        </div>
        <div className="hero-image">
            <img src = {heroimage} alt="img" className="hero-image"/>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
