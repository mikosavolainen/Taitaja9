import React from "react";
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">TAITAJA9</div>
      <div className="buttons">
        <button className="button">Tulostaulu</button>
        <button className="button">Kirjautuminen</button>
      </div>
    </header>
  );
};

export default Header;
