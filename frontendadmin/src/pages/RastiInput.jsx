import * as React from "react";
import "../styles/Styles.css";

const teams = ["Team A", "Team B", "Team C", "Team D"];
const rastis = ["Rasti 1", "Rasti 2", "Rasti 3", "Rasti 4"];

const RastiInput = () => {
	const [selectedTeam, setSelectedTeam] = React.useState("");
	const [selectedRasti, setSelectedRasti] = React.useState("");
	const [minutes, setMinutes] = React.useState("");
	const [seconds, setSeconds] = React.useState("");
	const [successMessage, setSuccessMessage] = React.useState("");
	const [errorMessage, setErrorMessage] = React.useState("");

	const handleSubmit = async (event) => {
		event.preventDefault(); // Prevent form submission

		// Validate inputs
		if (!selectedTeam || !selectedRasti || !minutes || !seconds) {
			setErrorMessage("Kaikki kentät on täytettävä.");
			setSuccessMessage("");
			return;
		}

		try {
			const response = await fetch(
				"https://your-backend-api.com/record-time",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						team: selectedTeam,
						rasti: selectedRasti,
						time: `${minutes}:${seconds}`,
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Ajan kirjaus epäonnistui");
			}

			const data = await response.json();
			setSuccessMessage("Aika tallennettu onnistuneesti!");
			setErrorMessage("");
			// Optionally, clear the form fields after successful submission
			setSelectedTeam("");
			setSelectedRasti("");
			setMinutes("");
			setSeconds("");
		} catch (err) {
			setErrorMessage(err.message);
			setSuccessMessage("");
		}
	};

	return (
		<div className="rasti-background">
			<div className="rasti-container">
				<h2 className="rasti-title">Ajan kirjaus</h2>

				{successMessage && (
					<p className="success-message">{successMessage}</p>
				)}
				{errorMessage && (
					<p className="error-message">{errorMessage}</p>
				)}

				<select
					className="rasti-input"
					value={selectedTeam}
					onChange={(e) => setSelectedTeam(e.target.value)}>
					<option value="">Joukkue</option>
					{teams.map((team) => (
						<option key={team} value={team}>
							{team}
						</option>
					))}
				</select>

				<select
					className="rasti-input"
					value={selectedRasti}
					onChange={(e) => setSelectedRasti(e.target.value)}>
					<option value="">Rasti</option>
					{rastis.map((rasti) => (
						<option key={rasti} value={rasti}>
							{rasti}
						</option>
					))}
				</select>

				<div className="rasti-time-inputs">
					<input
						className="rasti-time"
						type="number"
						min="0"
						placeholder="MIN"
						value={minutes}
						onChange={(e) =>
							setMinutes(Math.max(0, e.target.value))
						}
					/>
					<input
						className="rasti-time"
						type="number"
						min="0"
						placeholder="SEC"
						value={seconds}
						onChange={(e) =>
							setSeconds(Math.max(0, e.target.value))
						}
					/>
				</div>

				<button className="rasti-button" onClick={handleSubmit}>
					Tallenna
				</button>
			</div>
		</div>
	);
};

export default RastiInput;
