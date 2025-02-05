import React from "react";
import "../styles/Header.css";
import {redirect, useNavigate} from "react-router-dom";
const Header = () => {
	let navigate = useNavigate();
	return (
		<header className="header">
			<div className="logo">TAITAJA9</div>
			<div className="buttons">
				<button className="button">Tulostaulu</button>
				<button onClick={() => navigate("/login")} className="button">
					Kirjautuminen
				</button>
			</div>
		</header>
	);
};

export default Header;
