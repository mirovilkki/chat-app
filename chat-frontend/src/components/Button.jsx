import styles from './button.scss'

const Button = ({ id, onClick, children }) => (
    <div className={styles.button}>
        <label htmlFor={`button_${id}`} className={styles.label} >
            {children}
        </label>
        <button id={`button_${id}`} className={styles.hiddenButton} onClick={onClick} />
    </div>
)

export default Button
