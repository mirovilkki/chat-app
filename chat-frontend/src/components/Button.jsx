import styles from './button.scss'

const Button = ({ id, onClick, disabled, children }) => (
    <div className={styles.button}>
        <button
            id={`button_${id}`}
            disabled={disabled}
            className={styles.hiddenButton}
            onClick={onClick} />
        <label htmlFor={`button_${id}`} className={styles.label} >
            {children}
        </label>
    </div>
)

export default Button
