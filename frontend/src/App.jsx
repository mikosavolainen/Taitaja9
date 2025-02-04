import logo from './logo.svg';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import Etusivu from './pages/Etusivu';
import ServerNotFound from './pages/ServerNotFound';
import Infotaulu from './pages/Infotaulu';
function App() {
  return (
    <div className="App">
      <Header />
      <Infotaulu />
      <Footer />      
    </div>
  );
}

export default App;
