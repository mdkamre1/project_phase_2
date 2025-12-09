import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function Layout() {
  return (
    <>
      <Header />
      <main className="container">
        <Outlet /> {/* 👈 This will display all pages */}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
