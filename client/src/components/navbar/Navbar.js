import React from 'react';
import './Navbar.css'; // Create this CSS file in the same directory

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Project Gallery</div>
      <ul className="nav-links">
        <li className="nav-link">Home</li>
        <li className="nav-link">About</li>
        <li className="nav-link">Services</li>
        <li className="nav-link">Contact</li>
      </ul>
      <button className="smart-search-button">Try Smart Search</button>
    </nav>
  );
}

export default Navbar;
