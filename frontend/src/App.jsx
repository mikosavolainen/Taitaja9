import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';//
import NotFound from './pages/NotFound';//
import Etusivu from './pages/Etusivu';
import ServerNotFound from './pages/ServerNotFound';//
import Infotaulu from './pages/Infotaulu';
import RastiInput from './pages/RastiInput';//
import AddTeam from './pages/Addteam';
import UusiKilpailu from './pages/UusiKilpailu';//
import VaihdaSalasana from './pages/VaihdaSalasana';//
import AddUser from './pages/AddUser';//
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from 'react-router-dom';
import Joukkuehallinta from "./pages/JoukkueHallinta"
import Login from "./pages/Login"
import { useState } from 'react';
function App() {
	const [logged , Setlogged]= useState(false)
  return (
		<div className="App">
		  <Header logged={logged} />
			<Routes>
				<Route path="/" element={<Etusivu />} />
				<Route
					path="/login"
					element={<Login Setlogged={Setlogged} />}
				/>
				<Route path="/Infotaulu" element={<Infotaulu />} />
				<Route path="/Dashboard" element={<Dashboard />} />
				<Route path="/ServerNotFound" element={<ServerNotFound />} />
				<Route path="/NotFound" element={<NotFound />} />
				<Route path="/RastiInput" element={<RastiInput />} />
				<Route path="/lisaajoukkue" element={<AddTeam />} />
				<Route path="/UusiKilpailu" element={<UusiKilpailu />} />
				<Route path="/VaihdaSalasana" element={<VaihdaSalasana />} />
				<Route path="/lisaakayttaja" element={<AddUser />} />
				<Route path="/logged ? "/dashboard" : "/login"" element={<Joukkuehallinta />} />
			</Routes>
			<Footer />
		</div>
  );
}

export default App;
