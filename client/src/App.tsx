import './App.css';
import Router from './Routes';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Router />
      </div>
    </BrowserRouter>

  );
}

export default App;
