import React, { useState } from "react";
import "../styles/Styles.css";

const AddTeam = () => {
	const [csvFile, setCsvFile] = useState(null);

	const handleCsvChange = (e) => {
		setCsvFile(e.target.files[0]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (csvFile) {
			const formData = new FormData();
			formData.append("file", csvFile);

			try {
				const response = await fetch("http://localhost:5000/lisaajoukkue", {
					method: "POST",
					body: formData,
				});

				if (response.ok) {
					const result = await response.json();
					console.log(result.message); // Success message
				} else {
					const error = await response.json();
					console.error(error.message); // Error message
				}
			} catch (error) {
				console.error("Error uploading file:", error);
			}
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
