const express = require('express');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const http = require('http');


const path = require('path');
const auth = require('./routes/auth');

const config = require("config");

const app = express();

app.use(express.json());

const server = http.createServer(app)

const io = socketIo(server,{ 
    cors: {
      origin: 'http://localhost:3000'
    }
}) //in case server and client run on different urls

let socketArray = [];

io.on('connection',(socket)=> {
    console.log('client connected: ', socket.id)
    // socket.join('clock-room') // any room

    socket.on('disconnect',()=>{
      socketArray = socketArray.filter(element => element.socketId !== socket.id )
      emitOnlineUsersList();
    });

    socket.on('data-update', () => {
      console.log('DATA UPDATE for a single socket');
      io.to(socket.id).emit('send-online-list', socketArray)
    });

    socket.on('send-user-data', (data) => {
      socket.user = data;
      const newSocketPair = {
        socketId: socket.id,
        user: socket.user,
      };
      const shouldAddToArray = socketArray.filter(element => element.user.id === socket.user.id).length;
      if (!shouldAddToArray) {
      socketArray = [...socketArray, newSocketPair];
      emitOnlineUsersList();
      socket.join(`${socket.user.id}`);
    }
    });
    console.log('Room list ',  Array.from(socket.rooms));
    const emitOnlineUsersList = () => {
      // There must be a better way to bind props to sockets
      // Utill I find a better way I will use socketArray to
      // save all the sockets
    return io.sockets.emit('send-online-list', socketArray);
  } 
    socket.on('challenge', (challengedUserRoom, challangerUserRoom, challengerName) => {
      const message = `Player ${challangerUserRoom} (${challengerName}), challenged you - ${challengedUserRoom}`;
      console.log(message);
      socket.to(challengedUserRoom).emit('challenged', message, challangerUserRoom);
    }) 
});

//DB setup
const db = config.get('mongoURI');
mongoose
    .connect(db, { useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to the DB');
    })
    .catch(e => console.log(e));

app.use('/auth', auth);

const port = 5000;
server.listen(port, err=> {
    if(err) console.log(err)
    console.log('Server running on Port ', port)
  })

// basic express + socket 
// https://medium.com/@raj_36650/integrate-socket-io-with-node-js-express-2292ca13d891

//  socket + react
// https://dev.to/bravemaster619/how-to-use-socket-io-client-correctly-in-react-app-o65

// Create a modal after the emit message is recived (need some state and the react component)
// Display modal after the emit, click on accept to start and display the grid
// Two messages when emiiting challenge request, fix to only one
// FInd a better way to track logged users & modify socket props