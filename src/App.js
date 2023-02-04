import './App.css';
import Home from './components/home/Home';
import Weather from './components/home/DummyHome'
const App =() => {
  return (
    <div className="container">
        <Home />
        <Weather />
    </div>
);
}

export default App;
