import * as React from "react";
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
      const response = await fetch("http://localhost:5000/lisaakayttaja", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          kayttajanimi: username,
          salasana: password,
          rooli: selectedRole,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Käyttäjä luotu onnistuneesti!");
        setUsername("");
        setPassword("");
        setSelectedRole("");
      } else {
        setMessage("Käyttäjän luominen epäonnistui.");
        console.error(await response.text());
      }
    } catch (error) {
      setMessage("Käyttäjän luominen epäonnistui. Yritä myöhemmin uudelleen.");
      console.error(error.message);
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