import React from "react";
import SectionTitle from "../components/SectionTitle.jsx";
import ContactForm from "../components/ContactForm.jsx";

function ContactPage() {
  return (
    <section id="contact">
      <SectionTitle>Contact Us</SectionTitle>
      <div className="contact-grid">
        <div>
          <p>
            Ready to begin your journey Book a free consultation or send us a message
            below.
          </p>
          <p>
            📍 Jankpur, Nepal
            <br />
            ✉️ Email info@mdkconsulting.com
            <br />
            📞 Phone +358 40 000 0000
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

export default ContactPage;
