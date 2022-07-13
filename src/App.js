
import './App.css';
import Main from './Components/Main';
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'

function App() {
  return (
    <div className="App">
      <Provider store={store} >
        <HashRouter >
          <Main />
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
