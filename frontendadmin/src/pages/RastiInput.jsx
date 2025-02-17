import * as React from "react";
import "../styles/Styles.css";

const RastiInput = () => {
    const [selectedTeamId, setSelectedTeamId] = React.useState(""); // Store team ID
    const [selectedRasti, setSelectedRasti] = React.useState(null); // Store selected checkpoint object
    const [minutes, setMinutes] = React.useState("");
    const [seconds, setSeconds] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [teams, setTeams] = React.useState([]); // State to hold fetched teams
    const [rastis, setRastis] = React.useState([]); // State to hold fetched checkpoints

    // Fetch teams and rastis from the backend on component mount
    React.useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch("http://localhost:5000/joukkueet");
                if (!response.ok) {
                    throw new Error("Failed to fetch teams");
                }
                const data = await response.json();
                setTeams(data); // Store the full team objects
            } catch (error) {
                console.error("Error fetching teams:", error);
                setErrorMessage("Joukkueiden hakeminen epäonnistui.");
            }
        };

        const fetchRastis = async () => {
            try {
                const response = await fetch("http://localhost:5000/rastit");
                if (!response.ok) {
                    throw new Error("Failed to fetch checkpoints");
                }
                const data = await response.json();
                setRastis(data); // Store the fetched checkpoints
            } catch (error) {
                console.error("Error fetching checkpoints:", error);
                setErrorMessage("Rastien hakeminen epäonnistui.");
            }
        };

        fetchTeams();
        fetchRastis();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent form submission

        // Validate inputs
        if (!selectedTeamId || !selectedRasti || !minutes || !seconds) {
            setErrorMessage("Kaikki kentät on täytettävä.");
            setSuccessMessage("");
            return;
        }

        try {
            const maxTimeInSeconds = selectedRasti.maksimi_aika_sekunneissa;
            const enteredMinutes = parseInt(minutes, 10);
            const enteredSeconds = parseInt(seconds, 10);

            // Calculate total time in seconds
            const enteredTimeInSeconds = enteredMinutes * 60 + enteredSeconds;

            if (enteredTimeInSeconds > maxTimeInSeconds) {
                throw new Error(
                    `Aika ylitti rastin ${selectedRasti.rasti_numero} maksimiajan (${maxTimeInSeconds / 60} minuuttia).`
                );
            }

            const response = await fetch("http://localhost:5000/ajankirjaus", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure the token exists
				},
				body: JSON.stringify({
					joukkue_id: selectedTeamId,
					rasti_id: selectedRasti.id,
					suoritusaika_sekunneissa: enteredTimeInSeconds,
				}),
			});

            if (!response.ok) {
                throw new Error("Ajan kirjaus epäonnistui");
            }

            const data = await response.json();
            setSuccessMessage("Aika tallennettu onnistuneesti!");
            setErrorMessage("");

            // Optionally, clear the form fields after successful submission
            setSelectedTeamId("");
            setSelectedRasti(null);
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
                    value={selectedTeamId}
                    onChange={(e) => setSelectedTeamId(e.target.value)}
                >
                    <option value="">Joukkue</option>
                    {teams.length > 0 ? (
                        teams.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.joukkueen_nimi}
                            </option>
                        ))
                    ) : (
                        <option disabled>Ei joukkueita saatavilla</option>
                    )}
                </select>
                <select
                    className="rasti-input"
                    value={selectedRasti?.id || ""}
                    onChange={(e) => {
                        const selectedRastiId = e.target.value;
                        const selectedCheckpoint = rastis.find(
                            (rasti) => rasti.id === parseInt(selectedRastiId)
                        );
                        setSelectedRasti(selectedCheckpoint || null);
                    }}
                >
                    <option value="">Rasti</option>
                    {rastis.length > 0 ? (
                        rastis.map((rasti) => (
                            <option key={rasti.id} value={rasti.id}>
                                Rasti {rasti.rasti_numero} (Max:{" "}
                                {Math.floor(rasti.maksimi_aika_sekunneissa / 60)}:
                                {rasti.maksimi_aika_sekunneissa % 60})
                            </option>
                        ))
                    ) : (
                        <option disabled>Ei rasteja saatavilla</option>
                    )}
                </select>
                <div className="rasti-time-inputs">
                    <input
                        className="rasti-time"
                        type="number"
                        min="0"
                        placeholder="MIN"
                        value={minutes}
                        onChange={(e) => setMinutes(Math.max(0, e.target.value))}
                    />
                    <input
                        className="rasti-time"
                        type="number"
                        min="0"
                        placeholder="SEC"
                        value={seconds}
                        onChange={(e) => setSeconds(Math.max(0, e.target.value))}
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