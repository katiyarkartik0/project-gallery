import React from "react";
import "./Navbar.css"; // Create this CSS file in the same directory
import { NavLink, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="logo">Project Gallery</div>
        <ul className="nav-links">
          <li className="nav-link">Home</li>
          <li className="nav-link">About</li>
          <li className="nav-link">Services</li>
          <li className="nav-link">Contact</li>
        </ul>
        <NavLink className="smart-search-button">Try Smart Search</NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
