// src/components/Footer.jsx
import React from 'react';
import '../styles/footer.css'; // Import the CSS for Footer

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} TrackFlow. All rights reserved.</p>
      <div className="social-links">
        <a href="https://chatgpt.com/c/67ff59c6-8000-800f-8a78-dfc591555fc6">Twitter</a>
        <a href="https://chatgpt.com/c/67ff59c6-8000-800f-8a78-dfc591555fc6">Instagram</a>
        <a href="https://chatgpt.com/c/67ff59c6-8000-800f-8a78-dfc591555fc6">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;
