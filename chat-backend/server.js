const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const R = require('ramda')
const U = require('karet.util')

const participants = U.atom([])

const findUserWithID = (id) => (list) => R.findIndex(R.propEq('id', id), list)
const userNameLens = (id) => R.lensPath([id, 'name'])

io.on('connection', (socket) => {

    const hiddenUserID = Math.random().toString(36).substr(2, 9)
    const sender = U.atom('Unknown')
    participants.modify((list) =>
        R.prepend({ id: hiddenUserID, name: sender.get() }, list)
    )

    const findUser = findUserWithID(hiddenUserID)

    io.emit('notification', {
        text: 'New chatter connected',
        sender: sender.get(),
        timeStamp: new Date().toISOString()
    })

    socket.on('name', (name) => {
        sender.set(name)

        participants.modify((list) =>
            R.over(userNameLens(findUser(list)), () => name, list)
        )
        io.emit('participants', participants.get())
    })

    socket.on('message', (message) => {
        io.emit('message', message)
    })

    socket.on('disconnect', () => {
        io.emit('notification', {
            text: 'Chatter disconnected',
            sender: sender.get(),
            timeStamp: new Date().toISOString()
        })

        participants.modify((list) =>
            R.remove(findUser(list), 1, list)
        )
        io.emit('participants', participants.get())
    })
})

http.listen(3000, () => {
    console.log('listening on *:3000')
})
