import './App.css';
import Router from './Routes';
import { BrowserRouter } from 'react-router-dom';
import UserContextProvider from './context/userContext';
import React from 'react';
import { io } from 'socket.io-client';

function App() {
  const [time, setTime] = React.useState('fetching');
  const data = 'test';
  React.useEffect(() => {
    const socket = io('http://localhost:5000')
    socket.on('connect', () => console.log('Your id is: ', socket.id));
    socket.on('connect_error', () => {
      setTimeout(() => socket.connect(), 5000)
    })
    socket.on('time', (data) => setTime(data))
    socket.on('disconnect', () => setTime('server disconnected'))
    socket.emit('send-user-data', data);
  }, []);

  return (
    <>
    <div>The time {time}</div>
      <UserContextProvider>
        <BrowserRouter>
          <div className="App">
            <Router />
          </div>
        </BrowserRouter>
      </UserContextProvider>
    </>
  );
}

export default App;
