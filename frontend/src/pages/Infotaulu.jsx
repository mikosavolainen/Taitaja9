import React from 'react';
import '../styles/Infotaulu.css';
const Infotaulu = () => {
	return (
		<div>
			<header className="header">
				<div className="keskelle">TAITAJA9 LIVE TILASTOT</div>
			</header>
			<div className="info-container">
				<div className="content">
					<div className="info-box">
						<h1>Kisan tulostaulu</h1>
						<h2>
							<ol>
								<li>Team Name, Koulu, Rasti, Aika</li>
								<li>Team Name, Koulu, Rasti, Aika</li>
								<li>Team Name, Koulu, Rasti, Aika</li>
								<li>Team Name, Koulu, Rasti, Aika</li>
								<li>Team Name, Koulu, Rasti, Aika</li>
								<li>Team Name, Koulu, Rasti, Aika</li>
								<li>Team Name, Koulu, Rasti, Aika</li>
								<li>Team Name, Koulu, Rasti, Aika</li>
							</ol>
						</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Infotaulu;