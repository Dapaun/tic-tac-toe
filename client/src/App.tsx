import './App.css';
import Router from './Routes';
import { BrowserRouter } from 'react-router-dom';
import UserContextProvider from './context/userContext';
import { SocketContext, socket } from './context/socketContext';
import GameContextProvider from './context/gameContext';

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <UserContextProvider>
        <GameContextProvider>
          <BrowserRouter>
            <div className="App">
              <Router />
            </div>
          </BrowserRouter>
        </GameContextProvider>
      </UserContextProvider>
    </SocketContext.Provider>
  );
}

export default App;
