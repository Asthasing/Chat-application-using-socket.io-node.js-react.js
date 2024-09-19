const express = require('express');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');
const router = require('./router');

const { addUser , removeUser , getUser , getUsersInRoom} = require ('./users.js');

const app = express();
app.use(cors()); // Enable CORS for all routes

const PORT = process.env.PORT || 5000;

// Create the server using http and express
const server = http.createServer(app);

// Set up Socket.IO on the server, with CORS enabled
const io = new socketio.Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow requests from your frontend
    methods: ['GET', 'POST'], // Allowed methods
  },
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  //console.log('We have a new connection!!!'); // This should appear in the terminal when a client connects

  // Handle the 'join' event
  socket.on('join', ({ name, room } , callback) => {
    const {error , user} = addUser({ id: socket.id , name , room});

    if(error) return callback(error);
    socket.emit('message' , { user: 'admin' , text: `${user.name} , welcome to the room ${user.room}`});
    socket.broadcast.to(user.room).emit('message' , { user: 'admin', text: `${user.name} , has joined!`});
    socket.join(user.room);
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
    //console.log(name, room);

//    const error = true; // Simulating an error condition (adjust as needed)
//      if (error) {
//        callback({ error: 'error' });
//      }

    // Handle further socket logic here

    // Call callback to signal the success or failure of the join
   // callback();
  });

  socket.on('sendMessage' , (message , callback) => {
    const user = getUser(socket.id);


    io.to(user.room).emit('message' , { user: user.name , text: message});
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    callback();

  })

  // Handle disconnection
  socket.on('disconnect', () => {
   // console.log('User has left!!');
   const user = removeUser(socket.id);

   if(user) {
    io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
  }
  });
});

// Call router as middleware
app.use(router);

// Start the server
server.listen(PORT, () => console.log(`Server has started on Port ${PORT}`));
























// const express = require('express');
// const http = require('http');
// const cors = require('cors');
// const socketio = require('socket.io'); // Correct socket.io import
// const router = require('./router');

// const app = express();
// app.use(cors()); // Enable CORS for all routes

// const PORT = process.env.PORT || 5000;

// // Create the server using http and express
// const server = http.createServer(app);

// // Set up Socket.IO on the server, with CORS enabled
// const io = new socketio.Server(server, {
//   cors: {
//     origin: 'http://localhost:3000', // Allow requests from your frontend
//     methods: ['GET', 'POST'], // Allowed methods
//   },
// });

// // Handle Socket.IO connections
// io.on('connection', (socket) => {
//   console.log('We have a new connection!!!');

//   // Handle the 'join' event
//   socket.on('join', ({ name, room }, callback) => {
//     console.log(name, room);

//     // Example error handling
//     const error = false; // You can modify this condition based on your logic
//     if (error) {
//       return callback({ error: 'An error occurred while joining the room.' });
//     }

//     // Emit events or handle other logic here

//     // Call callback to signal the success or failure of the join
//     callback();
//   });

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     console.log('User has left!!');
//   });
// });

// // Call router as middleware (assumes router is defined in './router')
// app.use(router);

// // Start the server
// server.listen(PORT, () => console.log(`Server has started on Port ${PORT}`));









// const express = require('express');
// const socketio = require('socket.io');
// const http = require('http');
// const cors = require('cors');

// const PORT = process.env.PORT || 5000

// const router = require('./router');

// const app = express();
// app.use(cors());
// const server = http.createServer(app);
// const io = socketio(server);

// io.on('connection' , (socket) => {
//     console.log('We have a new connection!!!');

//     socket.on('join', ({name , room} , callback) => {
//      console.log(name , room);

//      const error = true;
//      if(error){
//         callback({error: 'error'});

//      }

     
//     });

//     socket.on('disconnect' , () => {
//         console.log('User had left!!')
//     })

// });

// //call router as a middleware
// app.use(router);

// app.listen(PORT , () => console.log(`Server has started on Port ${PORT}`) );
// const express = require('express');
// const app = express();
// const http = require('http');
// const cors = require('cors');
// const {server} = require("socket.io");
// app.use(cors());
// const socketio = require('socket.io');




// const PORT = process.env.PORT || 5000;

// const router = require('./router');

// // app.use(cors());
//app.use(cors({ origin: 'http://localhost:3000' }));


 // app.options('*', cors());

// const server = http.createServer(app);
// const io = socketio(server , {
//     cors: {

//     }
// });














// const server = http.createServer(app);
// const io = new server(server , {
//     cors: {
//        origin: "http://localhost:3000",
//        methods: ["GET" , "POST"]
//     }
// });

// io.on('connection', (socket) => {
//   console.log('We have a new connection!!!');

//   socket.on('join', ({ name, room }, callback) => {
//     console.log(name, room);

//     const error = true;
//     if (error) {
//       callback({ error: 'error' });
//     }
//   });

//   socket.on('disconnect', () => {
//     console.log('User had left!!');
//   });
// });

// // Call router as a middleware
// app.use(router);

// server.listen(PORT, () => console.log(`Server has started on Port ${PORT}`));
