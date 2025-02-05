import * as React from "react";
import "../styles/Styles.css";

const roles = ["Rooli A", "Rooli B"];

const AddUser = () => {
  const [selectedrole, setSelectedrole] = React.useState("") 
  return (
    <div className="adduser-background">
      <div className="adduser-container">
      <h2 className="adduser-title">Luo uusi käyttäjä:</h2>

      <input 
        type="text" 
        className="adduser-input" 
        placeholder="Käyttäjänimi" 
      />
      <input 
        type="password" 
        className="adduser-input" 
        placeholder="Salasana" 
      />
      <select className="adduser-input" value={selectedrole} onChange={(e) => setSelectedrole(e.target.value)}>
          <option value="">Rooli</option>
          {roles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>

      <button className="adduser-button">Tallenna</button>
    </div>
    </div>
  );
};

export default AddUser;