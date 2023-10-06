// const express = require('express');
// const http = require('http');
// const socketio = require('socket.io');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();
// const PORT = process.env.PORT || 5000;

// const app = express();

// app.use(cors());

// const rooms = {};

// app.get('/', (req, res) => {
//   res.send('API is running');
// });

// const server = http.createServer(app);

// const io = socketio(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: 'http://localhost:3000',
//   },
// });

// // Log a message when the server starts
// console.log('Server is running on port ' + PORT);

// // Handle socket.io connections
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Create a new room
//   socket.on('createRoom', (roomId) => {
//     if (!rooms[roomId]) {
//       rooms[roomId] = { player1: socket.id, player2: null };
//       socket.join(roomId);
//       socket.emit('roomCreated', roomId);
//     } else {
//       socket.emit('roomExists');
//     }
//   });
//   // Join an existing room
//   socket.on('joinRoom', (roomId) => {
//     const room = rooms[roomId];
//     if (room && !room.player2) {
//       room.player2 = socket.id;
//       socket.join(roomId);
//       io.to(roomId).emit('playerJoined', roomId);
//     } else {
//       socket.emit('roomFull');
//     }
//   });

//   // Handle room creation response on the client side
//   socket.on('roomCreated', (roomId) => {
//     console.log(`Room ${roomId} created! Share this ID with your friend.`);
//   });

//   // Handle player joined response on the client side
//   socket.on('playerJoined', (roomId) => {
//     console.log(`You have joined room ${roomId}.`);
//   });

//   // Handle room exists response on the client side
//   socket.on('roomExists', () => {
//     console.log('The room already exists. Please choose another room or create your own.');
//   });

//   // Handle room full response on the client side
//   socket.on('roomFull', () => {
//     console.log('The room is full. Please choose another room or create your own.');
//   });

//   // Handle disconnections
//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// server.listen(PORT);
