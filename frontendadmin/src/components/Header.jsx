import React from "react";
import "../styles/Header.css";
import { redirect, useNavigate } from "react-router-dom";
const Header = ({ logged }) => {
	let navigate = useNavigate();
	return (
		<header className="header">
			<a href={logged ? "/dashboard" : "/"} className="logo">
				TAITAJA9
			</a>
			<div className="buttons">
				<button onClick={() => navigate("/")} className="button">
					Kirjautuminen
				</button>
			</div>
		</header>
	);
};

export default Header;
