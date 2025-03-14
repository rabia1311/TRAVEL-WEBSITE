import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ scrolled }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <div className="navbar-logo">
          <a href="#home">
            <span className="logo-text">Wanderlust</span>
          </a>
        </div>
        
        <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
            <li><a href="#destinations" onClick={() => setMenuOpen(false)}>Destinations</a></li>
            <li><a href="#travel-tips" onClick={() => setMenuOpen(false)}>Travel Tips</a></li>
            <li><a href="#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a></li>
            <li><a href="#booking" onClick={() => setMenuOpen(false)}>Book Now</a></li>
          </ul>
        </div>
        
        <div className="navbar-buttons">
          <button className="btn-login">Login</button>
          <button className="btn-signup">Sign Up</button>
          <div className={`menu-toggle ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;