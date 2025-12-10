import React, { useEffect, useState } from "react";
import api from "../api/api";
import SectionTitle from "../components/SectionTitle.jsx";
import { Link } from "react-router-dom";
import "../styles/public.css";

const DestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        const res = await api.get("/destinations");
        setDestinations(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchDestinations();
  }, []);

  return (
    <section id="destinations">
      <SectionTitle>Study Destinations</SectionTitle>

      <div className="dest-grid">
        {destinations.map((d) => (
          <div className="dest-card" key={d.id}>
            <img src={d.image_url} alt={d.name} />
            <h3>{d.name}</h3>
            <p className="region">{d.region}</p>
            <p>{d.description.substring(0, 80)}...</p>

            <Link to={`/destination/${d.id}`} className="dest-btn">
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DestinationsPage;
