import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/landingpage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const goToTracking = () => {
    navigate('/track'); // adjust based on your route
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <h1>CargoTrack</h1>
        <nav>
          <a href="#about">About</a>
          <a href="#gallery">Gallery</a>
          <button onClick={goToTracking}>Track Your Package</button>
        </nav>
      </header>

      <section className="hero">
        <h2>Reliable & Fast Cargo Services</h2>
        <p>We deliver packages with speed, care, and transparency.</p>
        <button onClick={goToTracking}>Start Tracking</button>
      </section>

      <section id="about" className="about-section">
        <h3>About Us</h3>
        <p>
          At CargoTrack, we're committed to providing the best shipping experience.
          With years of experience and real-time tracking, we ensure your packages
          reach you safely and on time.
        </p>
      </section>

      <section id="gallery" className="gallery-section">
        <h3>Our Fleet & Services</h3>
        <div className="image-grid">
          <img src="/images/truck1.jpg" alt="Cargo Truck" />
          <img src="/images/plane.jpg" alt="Air Freight" />
          <img src="/images/warehouse.jpg" alt="Warehouse" />
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2025 CargoTrack. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
