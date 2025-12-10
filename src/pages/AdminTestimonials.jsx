import React, { useState, useCallback, useEffect } from "react";
import api, { setAuthToken } from "../api/api";
import "../styles/admin.css";

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    testimonial: "",
    image_url: ""
  });

  // 📌 Fetch Testimonials
  const fetchTestimonials = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      setAuthToken(token);
      const res = await api.get("/testimonials");
      setTestimonials(res.data);
    } catch {
      alert("Failed to load testimonials");
    }
  }, []);

  // 📌 Delete
  const deleteTestimonial = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;

    try {
      const token = localStorage.getItem("token");
      setAuthToken(token);
      await api.delete(`/testimonials/${id}`); // Backend route below
      fetchTestimonials();
    } catch {
      alert("Failed to delete testimonial");
    }
  };

  // 📌 Add Testimonial
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      setAuthToken(token);
      await api.post("/testimonials", formData);
      setFormData({ name: "", country: "", testimonial: "", image_url: "" });
      fetchTestimonials();
    } catch {
      alert("Failed to add testimonial");
    }
  };

  return (
    <div className="admin-container">
      <h1>⭐ Manage Testimonials</h1>
      <p>Add or remove success stories displayed on your website.</p>

      {/* 📍 Add Testimonial Form */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Full Name" required value={formData.name}
               onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

        <input type="text" name="country" placeholder="Country" required value={formData.country}
               onChange={(e) => setFormData({ ...formData, country: e.target.value })} />

        <input type="text" name="image_url" placeholder="Image URL" required value={formData.image_url}
               onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} />

        <textarea name="testimonial" placeholder="Testimonial" rows="3" required value={formData.testimonial}
                  onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}></textarea>

        <button type="submit">Add Testimonial</button>
      </form>

      {/* 📌 Table View */}
      {testimonials.length === 0 ? (
        <p>No testimonials added yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Country</th>
              <th>Testimonial</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t.id}>
                <td><img src={t.image_url} alt={t.name} width="80" style={{ borderRadius: "6px" }} /></td>
                <td>{t.name}</td>
                <td>{t.country}</td>
                <td>{t.testimonial}</td>
                <td>
                  <button className="admin-btn btn-delete" onClick={() => deleteTestimonial(t.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminTestimonials;
