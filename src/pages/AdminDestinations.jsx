import React, { useState, useEffect } from "react";

function AdminDestinations() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ name: "", region: "", description: "", image_url: "" });
  const token = localStorage.getItem("adminToken");

  // Fetch all destinations
  async function loadData() {
    const res = await fetch("http://localhost:4000/api/destinations");
    const data = await res.json();
    setData(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  // Handle Add destination
  async function submitDest(e) {
    e.preventDefault();
    await fetch("http://localhost:4000/api/destinations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    alert("Added Successfully!");
    loadData();
  }

  // Delete destination
  async function delDest(id) {
    await fetch(`http://localhost:4000/api/destinations/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert("Deleted Successfully!");
    loadData();
  }

  return (
    <section className="container">
      <h2>Manage Destinations</h2>

      <form onSubmit={submitDest}>
        <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Region" onChange={(e) => setForm({ ...form, region: e.target.value })} />
        <textarea placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <input placeholder="Image URL" onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
        <button className="btn primary">Add Destination</button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Region</th>
            <th>Description</th>
            <th>Image URL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.region}</td>
              <td>{d.description}</td>
              <td>{d.image_url}</td>
              <td>
                <button className="btn ghost" onClick={() => delDest(d.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default AdminDestinations;
