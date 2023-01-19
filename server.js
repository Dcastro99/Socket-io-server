const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

app.use(cors());

const PORT = process.env.PORT || 3002;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  },
});

io.on('connection', (socket) => {
  console.log(`user: ${socket.id} connected`);

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('join_room', (data) => {
    console.log('joined room', + data);
    socket.join(data);
  });


  socket.on('send_message', (data) => {
    console.log('message-sent server', data);
    socket.broadcast.emit('receive_message', data);
  });
});


server.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
