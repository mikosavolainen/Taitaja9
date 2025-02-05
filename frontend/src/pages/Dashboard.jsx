import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Styles.css";

const Dashboard = () => {
	const [userType, setUserType] = useState("normal"); // Change this to "admin" for admin user

	return (
		<div className="login-container">
			<div className="login-content">
				<div className="login-box">
					<div className="links-container">
						{userType === "admin" ? (
							<>
								<Link
									to="/admin-dashboard"
									className="login-input">
									joukkueiden hallintapaneeli
								</Link>
								<Link
									to="/admin-settings"
									className="login-input">
									Kilpailun hallintapaneeli
								</Link>
								<Link
									to="/admin-settings"
									className="login-input">
									Lisää joukkueita csv:n avulla
								</Link>
								<Link
									to="/admin-settings"
									className="login-input">
									Tee uusia käyttäjiä
								</Link>
								<Link
									to="/admin-settings"
									className="login-input">
									Salasananvaihto
								</Link>
							</>
						) : (
							<>
								<Link
									to="/user-dashboard"
									className="login-input">
									Lisää joukkueelle aika
								</Link>
								<Link
									to="/user-settings"
									className="login-input">
									Vaihda salasanaa
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
