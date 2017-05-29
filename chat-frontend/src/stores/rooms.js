import socket from 'api'

const chatRooms = Atom([
    { id: 'main', title: 'Main', messages: [] },
    { id: 'random', title: 'Random', messages: [] },
    { id: 'randomest', title: 'Randomest', messages: [] }])

const findRoom = (roomId) => L.find(R.propEq('id', roomId))

socket.on('message', (message) => {
    const selectedRoom = chatRooms.view(findRoom(message.room))

    selectedRoom.modify((room) => {
        const allMessages = { messages: R.prepend(message, room.messages) }
        return R.merge(room, allMessages)
    })
})

socket.on('notification', (notification) =>
    U.mapIndexed((room, idx) =>
        chatRooms.view([idx, 'messages']).modify((messages) =>
            R.prepend(notification, messages))
    , chatRooms.get())
)

export {
    chatRooms
}
