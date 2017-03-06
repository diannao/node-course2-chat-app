var socket = io();

socket.on('connect', function () {
  console.log('connected to server');

  // socket.emit('createEmail', {
  //   to: 'jen@example.com',
  //   text: 'Hey this is Andrew.'
  // });

  socket.emit('createMessage', {
    to: 'jen',
    text: 'Hey this is Andrew.'
  });

});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('New message', message);
});


// socket.on('newEmail', function (email) {
//   console.log('New email', email);
// });
