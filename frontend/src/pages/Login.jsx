import React from "react";
import "../styles/Styles.css";
import { redirect, useNavigate } from "react-router-dom";

const Login = () => {
  	let navigate = useNavigate();
  return (
		<div className="login-container">
			<div className="login-content">
				<div className="login-box">
					<h2 className="login-title">KIRJAUTUMINEN</h2>
					<form className="login-form">
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
						<button
							onClick={() => navigate("/Dashboard")}
							type="submit"
							className="login-button">
							LOGIN
						</button>
					</form>
				</div>
			</div>
		</div>
  );
};

export default Login;