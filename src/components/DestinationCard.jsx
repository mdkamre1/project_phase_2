import React from "react";

function DestinationCard({ image, name, description }) {
  return (
    <div className="dest-card">
      <img src={image} alt={name} />
      <div>
        <strong>{name}</strong>
        <br />
        {description}
      </div>
    </div>
  );
}

export default DestinationCard;
