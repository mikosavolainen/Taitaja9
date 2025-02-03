import logo from './logo.svg';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import ServerNotFound from './pages/ServerNotFound'
function App() {
  return (
    <div className="App">
      <Header />
      <Footer />
      <NotFound/>
      <ServerNotFound/>
      
    </div>
  );
}

export default App;
