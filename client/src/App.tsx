import './App.css';
import Router from './Routes';
import { BrowserRouter } from 'react-router-dom';
import UserContextProvider from './context/userContext';

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <div className="App">
          <Router />
        </div>
      </BrowserRouter>
    </UserContextProvider>

  );
}

export default App;
