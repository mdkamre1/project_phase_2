import React from "react";

function ServiceCard({ title, description }) {
  return (
    <div className="service">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default ServiceCard;
