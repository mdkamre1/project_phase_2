import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        setError("Invalid username or password");
        return;
      }

      const data = await res.json();
      localStorage.setItem("adminToken", data.token);
      navigate("/admin"); // go to dashboard
    } catch {
      setError("Something went wrong. Try again.");
    }
  }

  return (
    <div className="container" style={{ marginTop: "60px", maxWidth: "400px" }}>
      <h2 style={{ marginBottom: "20px" }}>Admin Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button className="btn primary" type="submit" style={{ width: "100%" }}>
          Login
        </button>
      </form>

      {error && (
        <p style={{ marginTop: 10, color: "red" }}>{error}</p>
      )}
    </div>
  );
}

export default AdminLogin;
