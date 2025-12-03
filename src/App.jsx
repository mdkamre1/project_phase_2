import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import DestinationsPage from "./pages/DestinationsPage.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
