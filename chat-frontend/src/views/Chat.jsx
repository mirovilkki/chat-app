import { Button, TextInput, RadioButton, InlineList, MessageList } from 'components'
import { chatRooms, participants } from 'stores/rooms'
import { participant, sendMessage } from 'stores/participant'

const Chat = () => {
    const name = participant.view('name')
    const message = participant.view('message')
    const currentRoomId = participant.view('currentRoom')

    const findRoom = (roomId) => (rooms) => R.find(R.propEq('id', roomId), rooms)

    const currentRoomMessages = K(currentRoomId, chatRooms, (current, rooms) =>
        R.prop('messages', findRoom(current)(rooms))
    )

    const footerElem = Atom({})
    const topAreaElem = Atom({})
    const layoutElem = Atom({})

    const messageAreaHeight = K(footerElem, topAreaElem, layoutElem,
        (footer, topArea, layout) =>
            Kefir.interval(15, 0).map(() =>
                layout.offsetHeight - footer.offsetHeight - topArea.offsetHeight)
        ).flatMapLatest()

    const enterKeyEvent = Kefir
        .fromEvents(window, 'keypress')
        .filter((e) => R.equals(e.keyCode || e.which, 13))
        .filter(() => !R.or(R.isEmpty(message.get()), R.isEmpty(name.get())))

    enterKeyEvent.onValue(() => sendMessage())

    return (
        <div className="layout" ref={U.refTo(layoutElem)}>
            <div ref={U.refTo(topAreaElem)}>
                <h2 className="margin--top-none padding--top-small" >Choose your name: </h2>
                <div className="margin--bottom-medium" >
                    <TextInput
                        id="loginNameInput"
                        name="name"
                        placeholder="Type Your Name Here"
                        value={name} />
                </div>
                <div className="margin--bottom-medium">
                    <InlineList>
                        {U.map((room) => {
                            const isChecked = U.propEq('id', currentRoomId, room)

                            return (
                                <RadioButton
                                    id={`radio-${room.id}`}
                                    name="chatroom"
                                    checked={isChecked}
                                    value={room.id}
                                    title={room.title}
                                    onChange={(e) => currentRoomId.set(e.target.value)} />
                            )
                        }, chatRooms)}
                    </InlineList>
                </div>
                <div className="padding--bottom-medium">
                    <InlineList>
                        <p className="padding--right-xsmall">{'Participants:'}</p>
                        {U.map((particioner) =>
                            <p className="padding--right-xsmall"><small>{particioner.name}</small></p>
                        , participants)}
                    </InlineList>
                </div>
            </div>
            <MessageList
                messages={currentRoomMessages}
                maxHeight={messageAreaHeight} />
            <div className="padding--top-medium padding--bottom-small" ref={U.refTo(footerElem)} >
                <div className="margin--bottom-medium">
                    <TextInput
                        id="messageInput"
                        name="message"
                        placeholder="Type Your Message Here"
                        value={message} />
                </div>
                <Button
                    id="send-button"
                    type="submit"
                    disabled={U.or(U.isEmpty(message), U.isEmpty(name))}
                    onClick={sendMessage}>
                        Send Message
                </Button>
            </div>
        </div>
    )
}

export default Chat
