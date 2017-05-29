import socket from 'api'

const participant = new Atom({ name: '', message: '', currentRoom: 'main' })
const name = participant.view('name')
const message = participant.view('message')
const currentRoomId = participant.view('currentRoom')

name.onAny((any) => {
    if (!R.isNil(any.value)) {
        socket.emit('name', R.isEmpty(any.value) ? 'Unknown' : any.value)
    }
})

const getMessage = () =>  ({ sender: name.get(), text: message.get(), timeStamp: new Date().toISOString() })

const sendMessage = () => {
    socket.emit('message', R.merge({ room: currentRoomId.get() }, getMessage()))
    message.set('')
}

export {
    participant,
    sendMessage
}
