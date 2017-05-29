import socket from 'api'

const chatRooms = Atom([
    { id: 'main', title: 'Main', messages: [] },
    { id: 'random', title: 'Random', messages: [] },
    { id: 'randomest', title: 'Randomest', messages: [] }])

const allParticipants = Atom([])

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

socket.on('participants', (parts) =>
    allParticipants.set(parts)
)

export const rooms = chatRooms.map((value) => value)
export const participants = allParticipants.map((value) => value)
