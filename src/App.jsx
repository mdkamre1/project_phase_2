import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import DestinationsPage from "./pages/DestinationsPage.jsx";
import DestinationDetails from "./pages/DestinationDetails.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import AdminPrograms from "./pages/AdminPrograms.jsx";   // 👈 NEW
import AdminDestinations from "./pages/AdminDestinations.jsx";
import AdminTestimonials from "./pages/AdminTestimonials.jsx"; // 👈 NEW

import AdminLayout from "./components/AdminLayout.jsx";  // 👈 NEW WRAPPER

// 🔐 Protect Admin Routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destination/:id" element={<DestinationDetails />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        {/* 🛡️ Admin Area (Wrapped in AdminLayout) */}
        <Route
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/messages" element={<AdminPage />} />
          <Route path="/admin/programs" element={<AdminPrograms />} />  {/* 👈 Services */}
          <Route path="/admin/destinations" element={<AdminDestinations />} />
          <Route path="/admin/testimonials" element={<AdminTestimonials />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
