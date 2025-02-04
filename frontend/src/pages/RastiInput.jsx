import React from "react";
import "../styles/Styles.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RastiInput = () => {
  return (
    <div className="rasti-container">
      <Header />
      <div className="rasti-content">
        <div className="rasti-box">
          <h2 className="rasti-title">AJAN SYÖTTÖ</h2>
          <form className="rasti-form">
            <input
              type="text"
              placeholder="Joukkue"
              className="rasti-input"
            />
            <input
              type="password"
              placeholder="Rasti"
              className="rasti-input"
            />
            <button type="submit" className="rasti-button">
              Tallenna
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RastiInput;