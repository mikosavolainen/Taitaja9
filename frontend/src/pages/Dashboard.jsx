import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Styles.css";

const Dashboard = () => {
	const [userType, setUserType] = useState("admin"); // Change this to "admin" for admin user

	return (
		<div className="login-container">
			<div className="login-content">
				<div className="login-box">
					<div className="links-container">
						{userType === "admin" ? (
							<>
								<Link
									to="/joukkuehallinta"
									className="login-input">
									joukkueiden hallintapaneeli
								</Link>
								<Link
									to="/UusiKilpailu"
									className="login-input">
									Uusi kilpailu
								</Link>
								<Link
									to="/lisaajoukkue"
									className="login-input">
									Lisää joukkueita csv:n avulla
								</Link>
								<Link
									to="/lisaakayttaja"
									className="login-input">
									Tee uusia käyttäjiä
								</Link>
								<Link
									to="/VaihdaSalasana"
									className="login-input">
									Vaihda salasanaa
								</Link>
							</>
						) : (
							<>
								<Link to="/RastiInput" className="login-input">
									Lisää joukkueelle aika
								</Link>
								<Link
									to="/VaihdaSalasana"
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
