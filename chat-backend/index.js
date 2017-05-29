const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

const participants = []

io.on('connection', (socket) => {

    // const hiddenId =
    var sender = 'Unknown'

    io.emit('notification', { text: 'New chatter connected', sender: sender, timeStamp: new Date().toISOString() })

    socket.on('name', (name) => {
        sender = name
    })

    socket.on('message', (message) => {
        io.emit('message', message)
    })

    socket.on('disconnect', () => {
        io.emit('notification', { text: 'Chatter disconnected', sender: sender, timeStamp: new Date().toISOString() })
    })
})

http.listen(3000, () => {
    console.log('listening on *:3000')
})
