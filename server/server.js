const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMessage', {
      from: 'Admin',
      text: 'Welcome to the chat app',
      createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
     from: 'Admin',
     text: 'New user joined',
     createdAt: new Date().getTime()
   });


  // socket.emit('newMessage', {
  //   from: 'mike',
  //   text: 'Hey.  What is going on.',
  //   createdAt: 123
  // });

  socket.on('createMessage', (message) => {
    console.log('createMessage',message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage', {
    //    from: message.from,
    //    text: message.text,
    //    createdAt: new Date().getTime()
    //  });
  })


  // socket.emit('newEmail', {
  //   from: 'mike@example.com',
  //   text: 'Hey.  What is going on.',
  //   createdAt: 123
  // });

  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail',newEmail);
  // })

  socket.on('disconnect', (socket) => {
    console.log('user disconnected');
  });
});



server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports.app = app;
