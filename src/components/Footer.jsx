import React from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <p>© {year} mdkconsulting. All Rights Reserved.</p>
      <p>
        Follow us{" "}
        <a href="#">Facebook</a> · <a href="#">Instagram</a> · <a href="#">LinkedIn</a>
      </p>
    </footer>
  );
}

export default Footer;
