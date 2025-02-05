import * as React from "react";
import "../styles/Styles.css";

const VaihdaSalasana = () => {
  return (
    <div className="salasana-background">
      <div className="salasana-container">
      <h2 className="salasana-title">Vaihda salasana:</h2>

      <input 
        type="password" 
        className="salasana-input" 
        placeholder="Vanha salasana" 
      />
      <input 
        type="password" 
        className="salasana-input" 
        placeholder="Uusi salasana" 
      />
      <input 
        type="password" 
        className="salasana-input" 
        placeholder="Uusi salasana uudelleen" 
      />

      <button className="salasana-button">Vaihda salasana</button>
    </div>
    </div>
  );
};

export default VaihdaSalasana;