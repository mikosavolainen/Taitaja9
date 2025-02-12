import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header"; //
import NotFound from "./pages/NotFound"; //
import ServerNotFound from "./pages/ServerNotFound"; //
import RastiInput from "./pages/RastiInput"; //
import AddTeam from "./pages/Addteam";
import UusiKilpailu from "./pages/UusiKilpailu"; //
import VaihdaSalasana from "./pages/VaihdaSalasana"; //
import AddUser from "./pages/AddUser"; //
import { Routes, Route } from "react-router-dom";
import Joukkuehallinta from "./pages/JoukkueHallinta";
import Login from "./pages/Login";//
import Tulostaulu from './pages/Tulostaulu';//
import Dashboard from "./pages/Dashboard";

import { useState } from "react";
function App() {
	const [logged, Setlogged] = useState(false);
	return (
		<div className="App">
			<Header logged={logged} />
			<Routes>
				<Route path="/" element={<Login Setlogged={Setlogged} />} />
				<Route path="/Dashboard" element={<Dashboard />} />
				<Route path="/ServerNotFound" element={<ServerNotFound />} />
				<Route path="/NotFound" element={<NotFound />} />
				<Route path="/RastiInput" element={<RastiInput />} />
				<Route path="/lisaajoukkue" element={<AddTeam />} />
				<Route path="/UusiKilpailu" element={<UusiKilpailu />} />
				<Route path="/VaihdaSalasana" element={<VaihdaSalasana />} />
				<Route path="/lisaakayttaja" element={<AddUser />} />
				<Route path="/joukkuehallinta" element={<Joukkuehallinta />} />
				<Route path="/Tulostaulu" element={<Tulostaulu />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
