import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import DestinationsPage from "./pages/DestinationsPage.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import AdminDestinations from "./pages/AdminDestinations.jsx";
import DestinationDetails from "./pages/DestinationDetails.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes Wrapped in Main Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destination/:id" element={<DestinationDetails />} /> {/* 🔥 NEW */}
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Admin Routes without Public Layout */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/messages" element={<AdminPage />} />
        <Route path="/admin/destinations" element={<AdminDestinations />} /> {/* 🔥 FIXED */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
