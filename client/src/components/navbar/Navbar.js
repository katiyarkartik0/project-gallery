import React from "react";
import "./Navbar.css"; // Create this CSS file in the same directory
import { NavLink, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="logo">Project Gallery</div>
        <ul className="nav-links">
          <NavLink to={"/"} className="nav-link">Home</NavLink>
          <li className="nav-link">About</li>
          <li className="nav-link">Services</li>
          <li className="nav-link">Contact</li>
        </ul>
        <NavLink to={"/smartSearch"} className="smart-search-button">Try Smart Search</NavLink>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
