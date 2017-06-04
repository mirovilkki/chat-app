const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const R = require('ramda')
const U = require('karet.util')

const participants = U.atom([])

const findUserWithID = (id) => (list) => R.findIndex(R.propEq('id', id), list)
const participantsNameLens = (id) => R.lensPath([id, 'name'])

io.on('connection', (socket) => {

    const hiddenUserID = Math.random().toString(36).substr(2, 9)
    const findUserIndex = findUserWithID(hiddenUserID)
    const sender = U.atom('Unknown')
    participants.modify((list) =>
        R.prepend({ id: hiddenUserID, name: sender.get() }, list)
    )

    // Emit new user notification
    io.emit('notification', {
        text: 'New chatter connected',
        sender: sender.get(),
        timeStamp: new Date().toISOString()
    })

    // Listen changes to user name and store it
    socket.on('name', (name) => {
        sender.set(name)

        participants.modify((list) =>
            R.over(participantsNameLens(findUserIndex(list)), () => name, list)
        )
    })

    // Emit all messages
    socket.on('message', (message) => {
        io.emit('message', message)
    })

    // Emit disconnect notifications and remove user from participants list
    socket.on('disconnect', () => {
        io.emit('notification', {
            text: 'Chatter disconnected',
            sender: sender.get(),
            timeStamp: new Date().toISOString()
        })

        participants.modify((list) =>
            R.remove(findUserIndex(list), 1, list)
        )
    })

    // Emit all changes to participants list
    participants.onAny((any) => {
        if (!R.isNil(any.value)) {
            io.emit('participants', any.value)
        }
    })
})

http.listen(3000, () => {
    console.log('listening on *:3000')
})
