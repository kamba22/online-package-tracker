// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import MovinG from '../assets/MovinG.svg'
import '../styles/navbar.css'; // Import the CSS for Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src = {MovinG} alt="Logo" className="logo"/>
      <ul className="nav-links">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/track">Track Package</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
