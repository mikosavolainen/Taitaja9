import * as React from "react";
import "../styles/Styles.css";

const Joukkuehallinta = () => {
	const [teams, setTeams] = React.useState([
		{ nimi: "moi", koulu: "salpaus" },
	]);
	const [selectedTeam, setSelectedTeam] = React.useState("");
	const [name, setName] = React.useState("");
	const [school, setSchool] = React.useState("");

	const handleSave = () => {
		if (name.trim() === "" || school.trim() === "") {
			// Optionally handle the error here, e.g. display a message.
			return;
		}

		// Create a new team object and add it to the array.
		const newTeam = { nimi: name, koulu: school };
		setTeams([...teams, newTeam]);

		// Optionally, reset the input fields.
		setName("");
		setSchool("");
	};

	return (
		<div className="rasti-background">
			<div className="rasti-container">
				<h2 className="rasti-title">Ajan kirjaus</h2>
				<select
					className="rasti-input"
					value={selectedTeam}
					onChange={(e) => setSelectedTeam(e.target.value)}>
					<option value="">Joukkue</option>
					{teams.map((team, index) => (
						<option key={index} value={team.nimi}>
							{team.nimi}
						</option>
					))}
				</select>
				<input
					className="login-input"
					type="text"
					placeholder="nimi"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					className="login-input"
					type="text"
					placeholder="Koulu"
					value={school}
					onChange={(e) => setSchool(e.target.value)}
				/>
                <div className="contain">
                    <div>
                    <input type="radio" />
                        DNF
                        </div>
					
					<button className="rasti-button-small">Poista</button>
				</div>

				<button onClick={handleSave} className="rasti-button">
					Lähetä
				</button>
			</div>
		</div>
	);
};

export default Joukkuehallinta;
