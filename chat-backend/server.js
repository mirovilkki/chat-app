const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const R = require('ramda')

let participants = []

const findUserWithID = (id) => (list) => R.findIndex(R.propEq('id', id), list)
const userNameLens = (id) => R.lensPath([id, 'name'])

io.on('connection', (socket) => {

    const hiddenUserID = Math.random().toString(36).substr(2, 9)
    let sender = 'Unknown'
    participants = R.prepend({ id: hiddenUserID, name: sender }, participants)
    const findUser = findUserWithID(hiddenUserID)

    io.emit('notification', { text: 'New chatter connected', sender: sender, timeStamp: new Date().toISOString() })

    socket.on('name', (name) => {
        participants = R.over(userNameLens(findUser(participants)), () => name, participants)
        io.emit('participants', participants)
    })

    socket.on('message', (message) => {
        io.emit('message', message)
    })

    socket.on('disconnect', () => {
        io.emit('notification', { text: 'Chatter disconnected', sender: sender, timeStamp: new Date().toISOString() })
        participants = R.remove(findUser(participants), 1, participants)
        io.emit('participants', participants)
    })
})

http.listen(3000, () => {
    console.log('listening on *:3000')
})
