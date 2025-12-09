import React, { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle.jsx";
import TestimonialCard from "../components/TestimonialCard.jsx";

function SuccessPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch("http://localhost:4000/api/testimonials");
        const data = await res.json();
        setTestimonials(data);
      } catch {
        // fallback if backend is offline — keeps your UI working
        setTestimonials([
          { id: 1, name: "Riya", testimonial: "A perfect, well organized and professional educational consultancy in town. Really appreciate the support, co-operation and services from entire MKD family. Thank you MKD consulting" },
          { id: 2, name: "Ahmed", testimonial: "The essay coaching and application review were top-tier! Everything was so well-organized, leading directly to my acceptance at a top-tier Canadian university. Thank you, MKD, for the effective support and flawless execution." },
          { id: 3, name: "Maria", testimonial: "They found the perfect engineering program for me in Europe that I never knew existed. Truly expert guidance!" }
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return (
    <section id="testimonials">
      <SectionTitle>Student Success Stories</SectionTitle>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid">
          {testimonials.map((t) => (
            <TestimonialCard
              key={t.id}
              id={t.id}
              name={t.name}
              text={t.testimonial || t.text}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default SuccessPage;
