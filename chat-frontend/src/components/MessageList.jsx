import styles from './message-list.scss'

const MessageList = ({ messages, maxHeight }) => (
    <div className={styles.messageList} style={{ height: maxHeight }}>
        {U.ifte(U.isEmpty(messages),
            'No Messages to show! Start chat by sending first message',
            U.map((message) => (
                <div className={styles.messageRow} >
                    <div>
                        <strong className={styles.name}>{message.sender}</strong>
                        <small className={styles.time}>{message.timeStamp}</small>
                    </div>
                    <p>{message.text}</p>
                </div>
            ), messages)
        )}
    </div>
)

export default MessageList
