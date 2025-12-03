import React from "react";
import SectionTitle from "../components/SectionTitle.jsx";
import ServiceCard from "../components/ServiceCard.jsx";

const services = [
  {
    title: "University Placement",
    description:
      "We help students find the right program, prepare applications, and connect with top global universities.",
  },
  {
    title: "Visa Assistance",
    description:
      "Guided support through every step of your visa process with document and interview preparation.",
  },
  {
    title: "Test Preparation",
    description:
      "IELTS, TOEFL, and other test prep with mock tests and expert feedback.",
  },
  {
    title: "Scholarship Guidance",
    description:
      "Find scholarships and prepare winning applications to fund your education abroad.",
  },
];

function ServicesPage() {
  return (
    <section id="services">
      <SectionTitle>Our Services</SectionTitle>
      <div className="grid">
        {services.map((service) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
}

export default ServicesPage;
