import React, { useState } from "react";
import api from "../api/api";
import SectionTitle from "../components/SectionTitle.jsx";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      await api.post("/enquiries", formData);
      setStatus("Message sent successfully ✔");
      setFormData({ name: "", email: "", message: "" }); // reset form
    } catch (err) {
      setStatus("Failed to send message ❌");
    }
  };

  return (
    <section id="contact" style={{ padding: "50px 20px", textAlign: "center" }}>
      <SectionTitle>Contact Us</SectionTitle>
      <p>Start your journey with MDKC Consulting. Book a consultation or send us a message below.</p>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "500px",
          margin: "30px auto",
          textAlign: "left",
          padding: "25px",
          borderRadius: "10px",
          border: "1px solid #ddd",
          backgroundColor: "#fff"
        }}
      >
        <label>Your Name</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />

        <label>Your Message</label>
        <textarea
          name="message"
          required
          rows="4"
          value={formData.message}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        ></textarea>

        <button
          type="submit"
          style={{
            backgroundColor: "#003366",
            color: "white",
            padding: "10px 16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%"
          }}
        >
          Send Message
        </button>

        {status && (
          <p style={{ marginTop: "12px", fontWeight: "bold", color: status.includes("✔") ? "green" : "red" }}>
            {status}
          </p>
        )}
      </form>
    </section>
  );
};

export default ContactPage;
