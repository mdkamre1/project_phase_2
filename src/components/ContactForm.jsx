import React, { useState } from "react";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null); // "success" or "error"
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setForm(initialForm);
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        required
        value={form.email}
        onChange={handleChange}
      />
      <textarea
        name="message"
        placeholder="Your Message"
        required
        value={form.message}
        onChange={handleChange}
      />
      <button className="btn primary" type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <p style={{ marginTop: 10, color: "green" }}>
          Thank you! We will contact you soon.
        </p>
      )}
      {status === "error" && (
        <p style={{ marginTop: 10, color: "red" }}>
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

export default ContactForm;
