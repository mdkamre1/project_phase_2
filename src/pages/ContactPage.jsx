import React from "react";
import SectionTitle from "../components/SectionTitle.jsx";
import ContactForm from "../components/ContactForm.jsx";
import EnquiryForm from "../components/EnquiryForm.jsx";

function ContactPage() {
  return (
    <section id="contact">
      <SectionTitle>Contact Us</SectionTitle>

      <div className="contact-grid">
        <div>
          <p>
            Ready to begin your journey? Book a free consultation or send us a message.
          </p>
          <p>
            📍 Janakpur, Nepal <br />
            ✉️ info@mkaconsulting.com <br />
            📞 +977 40 000 0000
          </p>
        </div>

        {/* Simple contact form */}
        <ContactForm />
      </div>

      <br />
      <hr />
      <br />

      <SectionTitle>Free Study Abroad Enquiry</SectionTitle>

      {/* Full enquiry form */}
      <EnquiryForm />
    </section>
  );
}

export default ContactPage;
