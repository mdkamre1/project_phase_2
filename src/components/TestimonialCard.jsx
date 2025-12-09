import React, { useEffect, useState } from "react";

function TestimonialCard({ id, name, text }) {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");

  // Fetch existing likes & comments
  useEffect(() => {
    // Fetch likes and comments separately
    fetch(`http://localhost:4000/api/testimonials/${id}/comments`)
      .then(res => res.json())
      .then(data => setComments(data));

    fetch(`http://localhost:4000/api/testimonials`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(t => t.id === id);
        if (found) setLikes(found.likes);
      });
  }, [id]);

  // Like handler
  function handleLike() {
    fetch(`http://localhost:4000/api/testimonials/${id}/like`, {
      method: "POST",
    }).then(() => setLikes(likes + 1));
  }

  // Submit Comment
  function submitComment(e) {
    e.preventDefault();
    fetch(`http://localhost:4000/api/testimonials/${id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: commentName, comment: commentText }),
    }).then(() => {
      setComments([{ name: commentName, comment: commentText }, ...comments]);
      setCommentName("");
      setCommentText("");
    });
  }

  return (
    <div className="testi">
      <strong>{name}</strong>
      <p>{text}</p>

      <button onClick={handleLike} className="btn ghost">
        👍 {likes} Likes
      </button>

      <details style={{ marginTop: "10px" }}>
        <summary>💬 Comments ({comments.length})</summary>

        {/* Add Comment Form */}
        <form onSubmit={submitComment} style={{ marginTop: "10px" }}>
          <input
            placeholder="Your name"
            value={commentName}
            onChange={(e) => setCommentName(e.target.value)}
            required
          />
          <textarea
            placeholder="Write comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
          <button type="submit" className="btn primary">
            Add Comment
          </button>
        </form>

        {/* List comments */}
        <ul style={{ marginTop: "10px" }}>
          {comments.map((c, index) => (
            <li key={index}>
              <strong>{c.name}</strong>: {c.comment}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}

export default TestimonialCard;
