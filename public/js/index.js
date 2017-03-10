var socket = io();

socket.on('connect', function () {
  console.log('connected to server');

  // socket.emit('createEmail', {
  //   to: 'jen@example.com',
  //   text: 'Hey this is Andrew.'
  // });

  // socket.emit('createMessage', {
  //   to: 'jen',
  //   text: 'Hey this is Andrew.'
  // });

});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('New message', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi'
// }, function (data) {
//   console.log('Got server ack', data);
// });

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});

// socket.on('newEmail', function (email) {
//   console.log('New email', email);
// });
