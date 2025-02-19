import * as React from "react";
import "../styles/Styles.css";

const Joukkuehallinta = () => {
	const [selectedTeamId, setSelectedTeamId] = React.useState(""); // Selected team ID
	const [name, setName] = React.useState(""); // Team name
	const [school, setSchool] = React.useState(""); // Team school
	const [groupNumber, setGroupNumber] = React.useState(""); // Group number
	const [hasDroppedOut, setHasDroppedOut] = React.useState(false); // Dropout status
	const [teams, setTeams] = React.useState([]); // List of fetched teams
	const [errorMessage, setErrorMessage] = React.useState(""); // Error message

	// Fetch teams from the backend on component mount
	React.useEffect(() => {
		const fetchTeams = async () => {
			try {
				const response = await fetch("http://localhost:5000/joukkueet");
				if (!response.ok) {
					throw new Error("Failed to fetch teams");
				}
				const data = await response.json();
				setTeams(data); // Store the fetched teams in state
			} catch (error) {
				console.error("Error fetching teams:", error);
				setErrorMessage("Joukkueiden hakeminen epäonnistui.");
			}
		};
		fetchTeams();
	}, []);

	// Handle team selection
	const handleTeamSelection = (teamId) => {
		const selectedTeam = teams.find((team) => team.id === parseInt(teamId));
		if (selectedTeam) {
			setName(selectedTeam.joukkueen_nimi);
			setSchool(selectedTeam.koulun_nimi);
			setGroupNumber(selectedTeam.ryhman_numero || ""); // Default to empty string if null
			setHasDroppedOut(!!selectedTeam.keskeyttanyt); // Convert to boolean
			setSelectedTeamId(teamId); // Store the selected team's ID
		}
	};

	// Handle saving changes to the selected team
	const handleSave = async () => {
		if (name.trim() === "" || school.trim() === "") {
			setErrorMessage("Nimi ja koulu ovat pakollisia.");
			return;
		}

		try {
			// Simulate sending the updated team data to the backend
			const updatedTeam = {
				joukkueen_nimi: name,
				koulun_nimi: school,
				ryhman_numero: groupNumber, // Send null if empty
				keskeyttanyt: hasDroppedOut ? 1 : 0, // Convert boolean to 1 or 0
			};

			const response = await fetch(
				`http://localhost:5000/joukkuemuokkaus/${selectedTeamId}`,
				{
					method: "PUT", // Use PUT as per your backend
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(updatedTeam),
				}
			);

			if (!response.ok) {
				throw new Error("Failed to update team");
			}

			// Update the local state with the modified team
			const updatedTeams = teams.map((team) =>
				team.id === parseInt(selectedTeamId)
					? {
							...team,
							joukkueen_nimi: name,
							koulun_nimi: school,
							ryhman_numero: groupNumber ,
							keskeyttanyt: hasDroppedOut ? 1 : 0,
					  }
					: team
			);
			setTeams(updatedTeams);

			// Clear error message
			setErrorMessage("Päivitys onnistuis");
		} catch (error) {
			console.error("Error updating team:", error);
			setErrorMessage("Joukkueen päivitys epäonnistui.");
		}
	};

	return (
		<div className="rasti-background">
			<div className="rasti-container">
				<h2 className="rasti-title">Muokkaa joukkuetta</h2>

				{/* Display error message if present */}
				{errorMessage && (
					<p className="error-message">{errorMessage}</p>
				)}

				{/* Team selection dropdown */}
				<select
					className="rasti-input"
					value={selectedTeamId}
					onChange={(e) => handleTeamSelection(e.target.value)}>
					<option value="">Valitse joukkue</option>
					{teams.map((team) => (
						<option key={team.id} value={team.id}>
							{team.joukkueen_nimi}
						</option>
					))}
				</select>

				{/* Input fields for editing team */}
				<input
					className="login-input"
					type="text"
					placeholder="Nimi"
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
				<input
					className="login-input"
					type="text"
					placeholder="Ryhmän numero"
					value={groupNumber}
					onChange={(e) => setGroupNumber(e.target.value)}
				/>
				<label>
					<input
						type="checkbox"
						checked={hasDroppedOut}
						onChange={(e) => setHasDroppedOut(e.target.checked)}
					/>
					Keskeyttänyt
				</label>

				{/* Save button */}
				<button
					onClick={handleSave}
					className="rasti-button"
					disabled={!selectedTeamId}>
					Tallenna muutokset
				</button>
			</div>
		</div>
	);
};

export default Joukkuehallinta;
