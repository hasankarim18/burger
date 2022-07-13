
import './App.css';
import Main from './Components/Main';
import { HashRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <HashRouter >
        <Main />
      </HashRouter>

    </div>
  );
}

export default App;
