import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="container">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
