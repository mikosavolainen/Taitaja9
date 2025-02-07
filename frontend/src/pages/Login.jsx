import React from "react";
import "../styles/Styles.css";
import { useNavigate } from "react-router-dom";

const Login = ({ Setlogged }) => {
	let navigate = useNavigate();

	const handleLogin = (event) => {
		event.preventDefault(); // Prevent page reload
		Setlogged(true);
		navigate("/Dashboard");
	};

	return (
		<div className="login-container">
			<div className="login-content">
				<div className="login-box">
					<h2 className="login-title">KIRJAUTUMINEN</h2>
					<form className="login-form" onSubmit={handleLogin}>
						<input
							type="text"
							placeholder="Käyttäjänimi"
							className="login-input"
						/>
						<input
							type="password"
							placeholder="Salasana"
							className="login-input"
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
