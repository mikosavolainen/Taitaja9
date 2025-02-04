import React, { useState } from "react";
import "../styles/Styles.css";

const AddTeam = () => {
	const [csvFile, setCsvFile] = useState(null);

	const handleCsvChange = (e) => {
		setCsvFile(e.target.files[0]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (csvFile) {
			const reader = new FileReader();
			reader.onload = (event) => {
				const csvData = event.target.result;
				// Process CSV data here
				console.log(csvData);
			};
			reader.readAsText(csvFile);
		}
	};

	return (
		<div className="addteam-container">
			<div className="addteam-content">
				<div className="addteam-box">
					<h2 className="addteam-title">ADD TEAM</h2>
					<form className="addteam-form" onSubmit={handleSubmit}>
						<label htmlFor="csvFile" className="addteam-input">
							Select .csv File
						</label>
						<input
							type="file"
							accept=".csv"
							id="csvFile"
							style={{ display: "none" }}
							onChange={handleCsvChange}
						/>
						<button type="submit" className="addteam-button">
							SUBMIT
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddTeam;
