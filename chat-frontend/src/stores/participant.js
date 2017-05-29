import socket from 'api'

const participant = Atom({ name: 'Unknown', message: '', currentRoom: 'main' })
const name = participant.view('name')
const message = participant.view('message')
const currentRoomId = participant.view('currentRoom')

name.onAny((any) => {
    if (!R.isNil(any.value)) {
        socket.emit('name', any.value)
    }
})

const getMessage = () =>  ({ sender: name.get(), text: message.get(), timeStamp: new Date().toISOString() })
// const prependMessage = (messages) => R.prepend(getMessage(), messages)


const sendMessage = () => {
    /* const findRoom = (id) => L.find(R.propEq('id', id))
    const selectedRoom = chatRooms.view(findRoom(currentRoomId.get()))

    selectedRoom.modify((room) => {
        const allMessages = { messages: prependMessage(room.messages) }
        return R.merge(room, allMessages)
    }) */

    socket.emit('message', R.merge({ room: currentRoomId.get() }, getMessage()))
    message.set('')
}

export {
    participant,
    sendMessage
}
