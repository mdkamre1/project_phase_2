import React, { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import api from "../api/api";

function ServicesPage() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);

  // 👉 Fetch services (programs) from backend
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await api.get("/programs");
        setServices(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchPrograms();
  }, []);

  // 🔍 Filter logic
  const filteredServices = services.filter((s) =>
    s.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p style={{ padding: "60px", textAlign: "center" }}>Loading services...</p>;

  return (
    <section id="services">
      <SectionTitle>Our Services</SectionTitle>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search services..."
        className="service-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              onLearnMore={() => setSelectedService(service)}
            />
          ))
        ) : (
          <p>No services found.</p>
        )}
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedService.title}</h2>
            <p>{selectedService.description}</p>
            <p><strong>Country:</strong> {selectedService.country}</p>
            <p><strong>Tuition Fee:</strong> {selectedService.tuition_fee}</p>
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
