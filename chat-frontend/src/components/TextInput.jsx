import styles from './text-input.scss'

const TextInput = ({ id, name, value, placeholder }) => (
    <div className={styles.textInput}>
        <input
            id={id}
            name={name}
            {...U.bind({ value })}
            placeholder={placeholder}
            className={styles.input} />
        <div className={styles.underline} />
    </div>
)

export default TextInput
