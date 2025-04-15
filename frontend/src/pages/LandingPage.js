import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/landingpage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const goToTracking = () => {
    navigate('/track'); // adjust based on your route
  };

  return (
    <div className="landing-page">
      <header className="header">
        <h1 className="logo">TrackEasy</h1>
        <nav className="nav-links">
          <a href="#about">About Us</a>
          <a href="#gallery">Gallery</a>
          <button onClick={goToTracking}>Track Your Package</button>
        </nav>
      </header>

      <main className="main-full">
        <section className="intro">
          <h2>Welcome to TrackEasy</h2>
          <p>Track your packages in real-time with speed and simplicity.</p>
          <a href="/track" className="track-button">Start Tracking</a>
        </section>

        <section id="about" className="about">
          <h2>About Us</h2>
          <p>TrackEasy is a modern solution for package tracking, providing accurate and instant updates. Whether you’re a sender or a recipient, our system ensures transparency and peace of mind.</p>
        </section>

        <section id="gallery" className="gallery">
          <h2>Gallery</h2>
          <div className="gallery-images">
            <img src="https://via.placeholder.com/300x200" alt="Gallery item 1" />
            <img src="https://via.placeholder.com/300x200" alt="Gallery item 2" />
            <img src="https://via.placeholder.com/300x200" alt="Gallery item 3" />
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2025 TrackEasy. All rights reserved.</p>
      </footer>
    </div>
  );
}


export default LandingPage;
