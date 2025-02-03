import React from "react";
import "../styles/NotFound.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <div>
    <Header />
    <div className="not-found-container">
      <div className="content">
        <div className="error-box">
          <h1 className="error-code">404</h1>
          <p className="error-text">Sivustoa ei löytynyt.</p>
          <p className="error-subtext">
            Mekin olemme vain ihmisiä ja emme kaikkeen pysty :C
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default NotFound;
