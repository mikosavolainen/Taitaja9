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
function App() {
  return (
		<div className="App">
			<Header />
			<Dashboard />
			<Footer />
		</div>
  );
}

export default App;
