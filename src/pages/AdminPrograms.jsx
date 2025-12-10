import React, { useState, useCallback, useEffect } from "react";
import api, { setAuthToken } from "../api/api";
import "../styles/admin.css"; // 👈 import admin styles

const AdminPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    country: "",
    description: "",
    tuition_fee: ""
  });

  // 📌 Fetch Programs From Backend
  const fetchPrograms = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      setAuthToken(token);
      const res = await api.get("/programs");
      setPrograms(res.data);
    } catch {
      alert("Failed to load services");
    }
  }, []);

  // 📌 Delete Program
  const deleteProgram = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      const token = localStorage.getItem("token");
      setAuthToken(token);
      await api.delete(`/programs/${id}`); // ❗ We will create DELETE route later if needed
      fetchPrograms();
    } catch {
      alert("Failed to delete service");
    }
  };

  // 📌 Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📌 Add New Program
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      setAuthToken(token);
      await api.post("/programs", formData);
      setFormData({ title: "", country: "", description: "", tuition_fee: "" });
      fetchPrograms();
    } catch {
      alert("Failed to add service");
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  return (
    <div className="admin-container">
      <h1>📌 Manage Services</h1>
      <p>Add or remove consulting services shown on your website.</p>

      {/* 📍 ADD SERVICE FORM */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Service Title"
          required
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Country/Location"
          required
          value={formData.country}
          onChange={handleChange}
        />
        <input
          type="text"
          name="tuition_fee"
          placeholder="Tuition Fee (e.g. $10,000/year)"
          required
          value={formData.tuition_fee}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Service Description"
          rows="3"
          required
          value={formData.description}
          onChange={handleChange}
        />
        <button type="submit">Add Service</button>
      </form>

      {/* 📍 TABLE VIEW */}
      {programs.length === 0 ? (
        <p>No services added yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Country</th>
              <th>Tuition Fee</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.country}</td>
                <td>{p.tuition_fee}</td>
                <td>{p.description}</td>
                <td>
                  <button
                    className="admin-btn btn-delete"
                    onClick={() => deleteProgram(p.id)}
                  >
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

export default AdminPrograms;
