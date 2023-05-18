import logo from './images/logo.png';
import logo2 from './images/ziral.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="test">
          <img src={logo} className="App-logo" alt="logo" />
          <img src={logo2} className="App-logo2" alt="logo" />
        </div>
      </header>
    </div>
  );
}

export default App;
