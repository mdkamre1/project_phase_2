import React, { useState } from "react";
import SectionTitle from "../components/SectionTitle.jsx";
import ServiceCard from "../components/ServiceCard.jsx";

// Service Data
const services = [
  {
    title: "University Placement",
    description:
      "We help students find the right program, prepare applications, and connect with top global universities.",
    details:
      "We assist students with program selection, application review, documentation, interview prep, and communication with global universities."
  },
  {
    title: "Visa Assistance",
    description:
      "Guided support through every step of your visa process with document and interview preparation.",
    details:
      "Our experts provide complete visa guidance including DS-160 filling, document verification, embassy appointment, and mock interviews."
  },
  {
    title: "Test Preparation",
    description:
      "IELTS, TOEFL, and other test prep with mock tests and expert feedback.",
    details:
      "We offer personalized coaching, practice papers, mock exams, performance analysis, and expert strategies to improve your score."
  },
  {
    title: "Scholarship Guidance",
    description:
      "Find scholarships and prepare winning applications to fund your education abroad.",
    details:
      "We research scholarships globally, help write winning statements, prepare documentation, and assist in application submissions."
  },
];

function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState(null);

  // Filter Logic
  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="services">
      <SectionTitle>Our Services</SectionTitle>

      {/* Interactive Component #1: Live Search */}
      <input
        type="text"
        placeholder="Search services..."
        className="service-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.title}
            title={service.title}
            description={service.description}
            onLearnMore={() => setSelectedService(service)}  // open modal
          />
        ))}
      </div>

      {/* Interactive Component #2: Popup Modal */}
      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedService.title}</h2>
            <p>{selectedService.details}</p>
            <button className="btn primary" onClick={() => setSelectedService(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ServicesPage;
