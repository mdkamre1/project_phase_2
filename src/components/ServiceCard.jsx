import React from "react";

function ServiceCard({ title, description, onLearnMore }) {
  return (
    <div className="service-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="btn primary" onClick={onLearnMore}>
        Learn More
      </button>
    </div>
  );
}

export default ServiceCard;
