import * as React from "react";
import "../styles/Styles.css";

const UusiKilpailu = () => {
  return (
    <div className="kilpailu-background">
      <div className="kilpailu-container">
      <h2 className="kilpailu-title">Luo uusi kilpailu:</h2>

      <input 
        type="text" 
        className="kilpailu-input" 
        placeholder="Kilpailun nimi" 
      />
      <input 
        type="number" 
        className="kilpailu-input" 
        placeholder="Rastien määrä" 
      />
      <input 
        type="number" 
        className="kilpailu-input" 
        placeholder="Maksimi aika" 
      />

      <button className="kilpailu-button">Luo</button>
    </div>
    </div>
  );
};

export default UusiKilpailu;