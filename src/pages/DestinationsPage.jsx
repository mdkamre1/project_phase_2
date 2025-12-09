import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StarRating = ({ value, onChange }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div style={{ cursor: "pointer", marginBottom: 8 }}>
      {stars.map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          style={{
            fontSize: "24px",
            color: star <= value ? "#ffb703" : "#ccc",
            marginRight: 4,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

function DestinationDetails() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [editId, setEditId] = useState(null);

  async function loadData() {
    const res = await fetch(`http://localhost:4000/api/destinations/${id}`);
    const data = await res.json();
    setDestination(data);

    const reviewRes = await fetch(`http://localhost:4000/api/reviews/${id}`);
    const reviewData = await reviewRes.json();
    setReviews(reviewData);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function submitReview(e) {
    e.preventDefault();
    if (!rating) return alert("Rating required!");

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:4000/api/reviews/${editId}`
      : `http://localhost:4000/api/reviews`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destination_id: id, rating, comment }),
    });

    setRating(0);
    setComment("");
    setEditId(null);
    loadData();
  }

  async function deleteReview(rid) {
    if (!window.confirm("Delete review?")) return;
    await fetch(`http://localhost:4000/api/reviews/${rid}`, { method: "DELETE" });
    loadData();
  }

  function editReview(r) {
    setEditId(r.id);
    setComment(r.comment);
    setRating(r.rating);
  }

  if (!destination) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <img src={destination.image_url} alt={destination.name} style={{ width: "100%", borderRadius: 10 }} />
      <h1>{destination.name}</h1>
      <p><strong>Region:</strong> {destination.region}</p>
      <p>{destination.description}</p>

      <hr style={{ margin: "20px 0" }} />

      <h2>Reviews ⭐</h2>

      {reviews.map(r => (
        <div key={r.id} style={{ background: "#f1f5f9", padding: 10, borderRadius: 10, marginBottom: 5 }}>
          {"★".repeat(r.rating)} <span>{r.comment}</span>
          <span style={{ float: "right", cursor: "pointer" }} onClick={() => deleteReview(r.id)}>🗑</span>
          <span style={{ float: "right", marginRight: 10, cursor: "pointer" }} onClick={() => editReview(r)}>✏️</span>
        </div>
      ))}

      <form onSubmit={submitReview} style={{ marginTop: 20 }}>
        <StarRating value={rating} onChange={setRating} />
        <textarea
          placeholder="Write a comment…"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ width: "100%", padding: 10, borderRadius: 10 }}
        />
        <button style={{ marginTop: 10, padding: "10px 20px", border: "none", borderRadius: 8, background: "#0077b6", color: "white" }}>
          {editId ? "Update Review" : "Add Review"}
        </button>
      </form>
    </div>
  );
}

export default DestinationDetails;
