import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import DestinationsPage from "./pages/DestinationsPage.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import AdminDestinations from "./pages/AdminDestinations.jsx";
import DestinationDetails from "./pages/DestinationDetails.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";

// 🔐 Protect Admin Routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destination/:id" element={<DestinationDetails />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        {/* 🔐 Admin Routes (Protected) */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/messages"
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/destinations"
          element={
            <PrivateRoute>
              <AdminDestinations />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
