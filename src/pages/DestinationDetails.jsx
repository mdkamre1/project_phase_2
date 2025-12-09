import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DestinationDetails() {
  const { id } = useParams(); // Get ID from URL
  const [destination, setDestination] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:4000/api/destinations/${id}`);
      const data = await res.json();
      setDestination(data);

      const rev = await fetch(`http://localhost:4000/api/reviews/${id}`);
      setReviews(await rev.json());
    }
    fetchData();
  }, [id]);

  async function submitReview(e) {
    e.preventDefault();
    if (!rating || !comment) return alert("Rating and comment required!");

    await fetch("http://localhost:4000/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destination_id: id, rating, comment }),
    });

    alert("Review submitted!");
    window.location.reload();
  }

  if (!destination) return <p>Loading...</p>;

  return (
    <section className="container">
      <h2>{destination.name}</h2>
      <img src={destination.image_url} alt={destination.name} style={{ width: "100%", borderRadius: "10px" }} />
      <p>{destination.description}</p>

      <h3>⭐ Add Your Review</h3>
      <form onSubmit={submitReview} style={{ marginTop: "10px" }}>
        <label>Rating: </label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">Select</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        <textarea
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ display: "block", width: "100%", marginTop: "10px" }}
        ></textarea>

        <button className="btn primary" style={{ marginTop: "10px" }}>Submit Review</button>
      </form>

      <h3 style={{ marginTop: "30px" }}>💬 Reviews</h3>
      {reviews.length === 0 ? <p>No reviews yet.</p> : (
        reviews.map((r, i) => (
          <div key={i} style={{ background: "#fff", padding: "10px", borderRadius: "10px", marginTop: "10px" }}>
            <p>{("⭐").repeat(r.rating)}</p>
            <p>{r.comment}</p>
            <small>📅 {new Date(r.created_at).toLocaleDateString()}</small>
          </div>
        ))
      )}
    </section>
  );
}

export default DestinationDetails;
