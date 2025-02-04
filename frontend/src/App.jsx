import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import Etusivu from './pages/Etusivu';
import ServerNotFound from './pages/ServerNotFound';
import Infotaulu from './pages/Infotaulu';
import RastiInput from './pages/RastiInput';
function App() {
  return (
    <div className="App">
      <Header />
      <RastiInput /> 
      <Footer />   
    </div>
  );
}

export default App;
