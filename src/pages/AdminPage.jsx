import React, { useState } from "react";

function AdminPage() {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  // Handle Login Input
  function handleChange(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  // Login Request
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("adminToken", data.token);
        setToken(data.token);
        alert("Login Successful!");
      } else {
        alert("Invalid credentials");
      }
    } finally {
      setLoading(false);
    }
  }

  // Fetch Messages
  async function loadMessages() {
    const res = await fetch("http://localhost:4000/api/admin/messages", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMessages(data);
  }

  // Fetch Enquiries
  async function loadEnquiries() {
    const res = await fetch("http://localhost:4000/api/enquiry-list", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setEnquiries(data);
  }

  // Logout
  function logout() {
    localStorage.removeItem("adminToken");
    setToken("");
  }

  // If not logged in, show login form
  if (!token) {
    return (
      <section className="container">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </section>
    );
  }

  // Dashboard View
  return (
    <section className="container">
      <h2>Admin Dashboard</h2>
      <button className="btn ghost" onClick={logout}>Logout</button>

      {/* ==== CONTACT MESSAGES ==== */}
      <h3>📬 Contact Messages</h3>
      <button className="btn primary" onClick={loadMessages}>
        Load Messages
      </button>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <strong>{msg.name}</strong> ({msg.email})
            <br />
            💬 {msg.message}
            <hr />
          </li>
        ))}
      </ul>

      {/* ==== ENQUIRIES ==== */}
      <h3>📌 Enquiries</h3>
      <button className="btn primary" onClick={loadEnquiries}>
        Load Enquiries
      </button>
      <ul>
        {enquiries.map((enq) => (
          <li key={enq.id}>
            <strong>{enq.full_name}</strong> ({enq.email})
            <br />
            📱 {enq.phone} | 🌍 {enq.nationality}
            <br />
            🎓 <b>Program:</b> {enq.program}
            <br />
            💬 <b>Message:</b> {enq.message}
            <hr />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default AdminPage;
