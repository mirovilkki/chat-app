const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

io.on('connection', (socket) => {

  io.emit('notification', 'New chatter connected')

  socket.on('message', (message) => {
    io.emit('message', message)
  })

  socket.on('disconnect', () => {
    io.emit('notification', `disconnected`)
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})
