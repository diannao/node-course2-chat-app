const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');



  // socket.emit('newMessage', {
  //   from: 'mike',
  //   text: 'Hey.  What is going on.',
  //   createdAt: 123
  // });

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    console.log(users.getUserList(params.room));
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    // socket.leave('room name');

    // io.emit -> io.to('room name').emit
    // socket.broadcast.emit -> socket.broadcast.to('room name').emit
    // socket.emit

    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined`));

    callback();

  });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage',message);
    var user = users.getUser(socket.id);
    if(user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
    // socket.broadcast.emit('newMessage', {
    //    from: message.from,
    //    text: message.text,
    //    createdAt: new Date().getTime()
    //  });
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    if(user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });


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
    var user = users.removeUser(socket.id);

    if(user) {
      console.log(user.getUserList(user.room));
      io.to(user.room).emit('updateUserList', user.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});



server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

module.exports.app = app;
