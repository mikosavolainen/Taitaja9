import React from "react";
import "../styles/Styles.css";

const Tulostaulu = () => {
  const [school, setSchool] = React.useState("");
  const [checkpoint, setCheckpoint] = React.useState("");

  const handleSchoolChange = (event) => setSchool(event.target.value);
  const handleCheckpointChange = (event) => setCheckpoint(event.target.value);

  return (
    <div className="Tulostaulu-background">
      <div className="Tulostaulu-container">
        <div className="Tulostaulu-select-wrapper">
          <select
            value={school}
            onChange={handleSchoolChange}
            className="Tulostaulu-select"
          >
            <option value="">Koulun vai Rastin mukaan</option>
            <option value="Rasti">Rastin</option>
            <option value="Koulu">Koulun</option>
          </select>
        </div>

        <div className="Tulostaulu-select-wrapper">
          <select
            value={checkpoint}
            onChange={handleCheckpointChange}
            className="Tulostaulu-select"
          >
            <option value="">Lähteen peruskoulu</option>
            <option value="Rasti 1">Rasti 1</option>
            <option value="Rasti 2">Rasti 2</option>
          </select>
        </div>

        <ol className="Tulostaulu-list">
          <li>Team A, Rasti 1, 10:00</li>
          <li>Team B, Rasti 2, 10:15</li>
          <li>Team C, Rasti 3, 10:30</li>
          <li>Team D, Rasti 1, 10:45</li>
          <li>Team E, Rasti 2, 11:00</li>
        </ol>

     
      </div>
    </div>
  );
};

export default Tulostaulu;
