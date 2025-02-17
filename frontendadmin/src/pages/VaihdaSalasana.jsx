import React, { useState } from "react";
import "../styles/Styles.css";

const VaihdaSalasana = () => {
  const [vanhaSalasana, setVanhaSalasana] = useState("");
  const [uusiSalasana, setUusiSalasana] = useState("");
  const [uusiSalasanaUudelleen, setUusiSalasanaUudelleen] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (uusiSalasana !== uusiSalasanaUudelleen) {
      setMessage("Uudet salasanat eivät täsmää!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/vaihdasalasana", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          vanhasalasana: vanhaSalasana,
          uusisalasana: uusiSalasana,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Salasana vaihdettu onnistuneesti!");
      } else {
        setMessage(data.message || "Virhe salasanan vaihdossa.");
      }
    } catch (error) {
      setMessage("Palvelinvirhe, yritä myöhemmin uudelleen.");
    }
  };

  return (
    <div className="salasana-background">
      <div className="salasana-container">
        <h2 className="salasana-title">Vaihda salasana:</h2>

        <input
          type="password"
          className="salasana-input"
          placeholder="Vanha salasana"
          value={vanhaSalasana}
          onChange={(e) => setVanhaSalasana(e.target.value)}
        />
        <input
          type="password"
          className="salasana-input"
          placeholder="Uusi salasana"
          value={uusiSalasana}
          onChange={(e) => setUusiSalasana(e.target.value)}
        />
        <input
          type="password"
          className="salasana-input"
          placeholder="Uusi salasana uudelleen"
          value={uusiSalasanaUudelleen}
          onChange={(e) => setUusiSalasanaUudelleen(e.target.value)}
        />

        <button className="salasana-button" onClick={handleSubmit}>
          Vaihda salasana
        </button>

        {message && <p className="salasana-message">{message}</p>}
      </div>
    </div>
  );
};

export default VaihdaSalasana;
