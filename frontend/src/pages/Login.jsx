import React, { useState } from "react";
import "../styles/Styles.css";
import { useNavigate } from "react-router-dom";

const Login = ({ setLogged }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	let navigate = useNavigate();

	const handleLogin = async (event) => {
		event.preventDefault(); // Prevent page reload

		try {
			const response = await fetch("https://your-backend-api.com/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			if (!response.ok) {
				throw new Error("Authentication failed");
			}

			const data = await response.json();
			// Assuming the server returns a token or some kind of success message
			// You might want to store the token in localStorage or context
			localStorage.setItem("token", data.token);

			setLogged(true);
			navigate("/Dashboard");
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="login-container">
			<div className="login-content">
				<div className="login-box">
					<h2 className="login-title">KIRJAUTUMINEN</h2>
					{error && <p className="error-message">{error}</p>}
					<form className="login-form" onSubmit={handleLogin}>
						<input
							type="text"
							placeholder="Käyttäjänimi"
							className="login-input"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<input
							type="password"
							placeholder="Salasana"
							className="login-input"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button type="submit" className="login-button">
							LOGIN
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
