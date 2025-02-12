import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header"; //
import NotFound from "./pages/NotFound"; //
import Etusivu from "./pages/Etusivu";
import ServerNotFound from "./pages/ServerNotFound"; //
import Infotaulu from "./pages/Infotaulu";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";

import { useState } from "react";
function App() {
	const [logged, Setlogged] = useState(false);
	return (
		<div className="App">
			<Header logged={logged} />
			<Routes>
				<Route path="/" element={<Etusivu />} />
				<Route path="/Infotaulu" element={<Infotaulu />} />
				<Route path="/ServerNotFound" element={<ServerNotFound />} />
				<Route path="/NotFound" element={<NotFound />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
