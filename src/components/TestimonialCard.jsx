import React from "react";

function TestimonialCard({ name, text }) {
  return (
    <div className="testi">
      <strong>{name}</strong>
      <br />
      {text}
    </div>
  );
}

export default TestimonialCard;
