import React, { useState } from "react";
import SectionTitle from "../components/SectionTitle.jsx";
import DestinationCard from "../components/DestinationCard.jsx";

// IMPORT YOUR IMAGES
import finlandImg from "../assets/finland.jpeg";
import canadaImg from "../assets/canada.jpeg";
import ukImg from "../assets/uk.jpeg";
import usaImg from "../assets/usa.jpeg";

const allDestinations = [
  {
    id: 1,
    region: "Europe",
    name: "Finland",
    image: finlandImg,
    description: "Innovative programs and excellent education system.",
  },
  {
    id: 2,
    region: "Europe",
    name: "United Kingdom",
    image: ukImg,
    description: "Home to globally ranked universities and cultural diversity.",
  },
  {
    id: 3,
    region: "North America",
    name: "Canada",
    image: canadaImg,
    description: "Known for quality education and post-graduation opportunities.",
  },
  {
    id: 4,
    region: "North America",
    name: "USA",
    image: usaImg,
    description: "Study in world-class institutions with research excellence.",
  },
];

function DestinationsPage() {
  const [regionFilter, setRegionFilter] = useState("all");

  const filtered =
    regionFilter === "all"
      ? allDestinations
      : allDestinations.filter((d) => d.region === regionFilter);

  return (
    <section id="destinations">
      <SectionTitle>Top Destinations</SectionTitle>

      <div style={{ marginBottom: 20 }}>
        <label>
          Filter by region{" "}
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
          </select>
        </label>
      </div>

      <div className="grid">
        {filtered.map((dest) => (
          <DestinationCard
            key={dest.id}
            image={dest.image}
            name={dest.name}
            description={dest.description}
          />
        ))}
      </div>
    </section>
  );
}

export default DestinationsPage;
