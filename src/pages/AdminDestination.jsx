import React, { useState, useCallback, useEffect } from "react";
import api, { setAuthToken } from "../api/api";
import "../styles/admin.css";

const AdminDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    description: "",
    image_url: ""
  });

  // 📌 Fetch Destinations
  const fetchDestinations = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      setAuthToken(token);
      const res = await api.get("/destinations");
      setDestinations(res.data);
    } catch {
      alert("Failed to load destinations");
    }
  }, []);

  // 📌 Delete Destination
  const deleteDestination = async (id) => {
    if (!window.confirm("Delete this destination?")) return;

    try {
      const token = localStorage.getItem("token");
      setAuthToken(token);
      await api.delete(`/destinations/${id}`); // We'll add this backend route
      fetchDestinations();
    } catch {
      alert("Failed to delete destination");
    }
  };

  // 📌 Update Form State
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📌 Add Destination
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      setAuthToken(token);
      await api.post("/destinations", formData);
      setFormData({ name: "", region: "", description: "", image_url: "" });
      fetchDestinations();
    } catch {
      alert("Failed to add destination");
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  return (
    <div className="admin-container">
      <h1>🌍 Manage Destinations</h1>
      <p>Add or remove destinations shown on your website.</p>

      {/* 📌 ADD DESTINATION FORM */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Country/Location" required value={formData.name} onChange={handleChange} />
        <input type="text" name="region" placeholder="Region (e.g. Europe)" required value={formData.region} onChange={handleChange} />
        <input type="text" name="image_url" placeholder="Image URL" required value={formData.image_url} onChange={handleChange} />
        <textarea name="description" placeholder="Description" rows="3" required value={formData.description} onChange={handleChange}></textarea>
        <button type="submit">Add Destination</button>
      </form>

      {/* 📌 TABLE VIEW */}
      {destinations.length === 0 ? (
        <p>No destinations added yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Region</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((d) => (
              <tr key={d.id}>
                <td>
                  <img src={d.image_url} alt={d.name} width="80" style={{ borderRadius: "6px" }} />
                </td>
                <td>{d.name}</td>
                <td>{d.region}</td>
                <td>{d.description}</td>
                <td>
                  <button className="admin-btn btn-delete" onClick={() => deleteDestination(d.id)}>
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

export default AdminDestinations;
