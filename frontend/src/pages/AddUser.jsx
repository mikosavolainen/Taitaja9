import * as React from "react";
import axios from "axios"; // Axiosia käytetään HTTP-pyyntöjen tekemiseen
import "../styles/Styles.css";

const roles = ["kayttaja", "admin"];

const AddUser = () => {
  const [selectedRole, setSelectedRole] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState(""); // Viesti käyttäjälle

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !selectedRole) {
      setMessage("Kaikki kentät ovat pakollisia!");
      return;
    }

    try {
      const response = await axios.post("/lisaakayttaja", {
        kayttajanimi: username,
        salasana: password,
        rooli: selectedRole,
      });

      if (response.status === 201) {
        setMessage("Käyttäjä luotu onnistuneesti!");
        setUsername("");
        setPassword("");
        setSelectedRole("");
      }
    } catch (error) {
      setMessage("Käyttäjän luominen epäonnistui. Yritä myöhemmin uudelleen.");
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="adduser-background">
      <div className="adduser-container">
        <h2 className="adduser-title">Luo uusi käyttäjä:</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="adduser-input"
            placeholder="Käyttäjänimi"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="adduser-input"
            placeholder="Salasana"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            className="adduser-inputbox"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">Rooli</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <button className="adduser-button" type="submit">
            Tallenna
          </button>
        </form>
        {message && <p className="adduser-message">{message}</p>}
      </div>
    </div>
  );
};

export default AddUser;