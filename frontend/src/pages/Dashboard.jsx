import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Styles.css";

const Dashboard = () => {
	const [userType, setUserType] = useState("normal"); // Change this to "admin" for admin user

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
						<button type="submit" className="login-button">
							LOGIN
						</button>
					</form>
					<div className="links-container">
						{userType === "admin" ? (
							<>
								<Link
									to="/admin-dashboard"
									className="login-link">
									Admin Dashboard
								</Link>
								<Link
									to="/admin-settings"
									className="login-link">
									Admin Settings
								</Link>
							</>
						) : (
							<>
								<Link
									to="/user-dashboard"
									className="login-link">
									User Dashboard
								</Link>
								<Link
									to="/user-settings"
									className="login-link">
									User Settings
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
