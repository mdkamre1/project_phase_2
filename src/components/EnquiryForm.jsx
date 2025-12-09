import React, { useState } from "react";

function EnquiryForm() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    nationality: "",
    program: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  // Handle input change
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Submit enquiry form
  async function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:4000/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setSuccess(data.message);
        // Clear form after submission
        setFormData({
          full_name: "",
          email: "",
          phone: "",
          nationality: "",
          program: "",
          message: "",
        });
      })
      .catch(() => setSuccess("Error submitting enquiry!"));
  }

  return (
    <form onSubmit={handleSubmit} className="enquiry-form">
      <div className="grid">
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid">
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nationality"
          placeholder="Nationality"
          value={formData.nationality}
          onChange={handleChange}
          required
        />
      </div>

      <input
        type="text"
        name="program"
        placeholder="Interested Program (e.g. Canada MSc)"
        value={formData.program}
        onChange={handleChange}
        required
      />

      <textarea
        name="message"
        placeholder="Tell us about your academic goals..."
        rows="4"
        value={formData.message}
        onChange={handleChange}
        required
      ></textarea>

      <button type="submit" className="btn primary">
        Submit Enquiry
      </button>

      {success && <p style={{ marginTop: "10px", color: "#0077b6" }}>{success}</p>}
    </form>
  );
}

export default EnquiryForm;
