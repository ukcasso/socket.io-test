const app = require('express')();
const PORT = 4000;
const http = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    Credential: true
  }
});

io.on('connection', socket => {
  socket.on('message', ({name, message, whisper}) => {
    io.emit('message', {name, message, whisper})
  });
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});