import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="hero container">
      <div className="hero-text">
        <h1>Empowering Students for Global Education</h1>
        <p>
          Your trusted partner for university placement, visa guidance, and scholarship
          assistance.
        </p>
        <Link to="/contact" className="btn primary">
          Book Free Consultation
        </Link>
        <Link to="/services" className="btn ghost" style={{ marginLeft: 10 }}>
          Our Services
        </Link>
      </div>
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60"
        alt="Students"
        style={{
          width: 420,
          borderRadius: 20,
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        }}
      />
    </section>
  );
}

export default HomePage;
