import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/index.css";
import "../styles/main.css";
import "../styles/App.css";
import logo from "../assets/logo.jpg"


function Header() {
  return (
    <header>
      <div
        className="container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <Link to="/" className="brand">
          <img src={logo} alt="Logo" className="logo-img" />

          <div>MKD Consulting</div>
        </Link>
        <nav className="nav">
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/destinations">Destinations</NavLink>
          <NavLink to="/success">Success</NavLink>
          <NavLink to="/contact" className="cta">
            Book Consultation
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
