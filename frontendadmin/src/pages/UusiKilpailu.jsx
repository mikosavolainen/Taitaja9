import React from "react";
import "../styles/Styles.css";

const UusiKilpailu = () => {
	// State variables to store input values
	const [kilpailunNimi, setKilpailunNimi] = React.useState("");
	const [rastienMaara, setRastienMaara] = React.useState("");
	const [maksimiAika, setMaksimiAika] = React.useState("");
	const [errorMessage, setErrorMessage] = React.useState(null);
	const [successMessage, setSuccessMessage] = React.useState(null);

	// Function to handle form submission
	const handleSubmit = async (event) => {
		event.preventDefault(); // Prevent the default form submission

		try {
			// Validate inputs
			if (!kilpailunNimi || !rastienMaara || !maksimiAika) {
				setErrorMessage("Kaikki kentät ovat pakollisia.");
				setSuccessMessage(null);
				return;
			}

			// Prepare data to send
			const data = {
				nimi:kilpailunNimi,
        rastien_maara:parseInt(rastienMaara, 10),
				maksimiAika: parseInt(maksimiAika, 10),
			};

			// Send data to the server using fetch
			const response = await fetch("http://localhost:5000/uusikilpailu", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Virhe kilpailun luonnissa.");
			}

			// Clear form fields on success
			setKilpailunNimi("");
			setRastienMaara("");
			setMaksimiAika("");
			setSuccessMessage("Kilpailu luotu onnistuneesti!");
			setErrorMessage(null);
		} catch (error) {
			console.error(error);
			setErrorMessage("Jotain meni pieleen. Yritä myöhemmin uudelleen.");
			setSuccessMessage(null);
		}
	};

	return (
		<div className="kilpailu-background">
			<div className="kilpailu-container">
				<h2 className="kilpailu-title">Luo uusi kilpailu:</h2>
				{errorMessage && (
					<p className="error-message">{errorMessage}</p>
				)}
				{successMessage && (
					<p className="success-message">{successMessage}</p>
				)}
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						className="kilpailu-input"
						placeholder="Kilpailun nimi"
						value={kilpailunNimi}
						onChange={(e) => setKilpailunNimi(e.target.value)}
						required
					/>
					<input
						type="number"
						className="kilpailu-input"
						placeholder="Rastien määrä"
						value={rastienMaara}
						onChange={(e) => setRastienMaara(e.target.value)}
						required
					/>
					<input
						type="number"
						className="kilpailu-input"
						placeholder="Maksimi aika"
						value={maksimiAika}
						onChange={(e) => setMaksimiAika(e.target.value)}
						required
					/>
					<button className="kilpailu-button" type="submit">
						Luo
					</button>
				</form>
			</div>
		</div>
	);
};

export default UusiKilpailu;
