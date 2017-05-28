import styles from './inline-list.scss'

const InlineList = ({ children }) => (
    <div className={styles.inlineList}>
        {children}
    </div>
)

export default InlineList
