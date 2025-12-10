import React, { useEffect, useState } from "react";
import api, { setAuthToken } from "../api/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAuthToken(token);

    api
      .get("/admin/dashboard")
      .then((res) => setStats(res.data))
      .catch(() => alert("Failed to load dashboard"));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div style={{ padding: "60px" }}>
      <h1>Admin Dashboard</h1>

      <ul>
        <li>Total Enquiries: {stats.enquiries}</li>
        <li>Total Programs: {stats.programs}</li>
        <li>Total Destinations: {stats.destinations}</li>
        <li>Total Testimonials: {stats.testimonials}</li>
      </ul>

      <h2>Latest Enquiries</h2>
      <ul>
        {stats.latestEnquiries.map((e) => (
          <li key={e.id}>
            {e.name} - {e.email} - {e.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
