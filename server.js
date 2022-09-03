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

io.on('connection',(socket)=>{
    console.log('client connected: ',socket.id)
    
    socket.join('clock-room') // any room
    
    socket.on('disconnect',(reason)=>{
      console.log(reason)
    });

    socket.on('send-user-data', (data) => {
      console.log('Data ', data);
      socket.data = 'data';
    });

    const sockets = Array.from(io.sockets.sockets).map(socket => socket[0]);
    console.log('Sockets ', sockets);
    // socket.data.user
  });
setInterval(()=>{
    io.to('clock-room').emit('time', new Date());
},1000)

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

// https://medium.com/@raj_36650/integrate-socket-io-with-node-js-express-2292ca13d891


// Too many sockets? Check for unique userNames added on send-user-data,
//  see a list of all users logged in