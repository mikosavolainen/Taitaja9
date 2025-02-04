import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import Etusivu from './pages/Etusivu';
import ServerNotFound from './pages/ServerNotFound';
import Infotaulu from './pages/Infotaulu';
import RastiInput from './pages/RastiInput';
import KilpailuInput from './pages/KilpailunHallinta';
function App() {
  return (
    <div className="App">
      <Header />
      <KilpailuInput /> 
      <Footer />   
    </div>
  );
}

export default App;
