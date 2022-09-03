import './App.css';
import Router from './Routes';
import { BrowserRouter } from 'react-router-dom';
import UserContextProvider from './context/userContext';
import { SocketContext, socket } from './context/socketContext';

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <UserContextProvider>
        <BrowserRouter>
          <div className="App">
            <Router />
          </div>
        </BrowserRouter>
      </UserContextProvider>
    </SocketContext.Provider>
  );
}

export default App;
