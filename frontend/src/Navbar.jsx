import React from "react";
import "./Navbar.css";

function Navbar({ onRegisterClick }) {
  return (
    <nav className="navbar">
      <div className="nav-options">
        <a href="#" className="nav-link">More Games</a>
        <a href="#" className="nav-link">About Us</a>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search" className="search-input" />
        <button className="search-btn">
          <i className="fas fa-search"></i> {/* Search Icon */}
        </button>
      </div>
      <div className="register">
        <button className="register-btn" onClick={onRegisterClick}>
          Register
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
