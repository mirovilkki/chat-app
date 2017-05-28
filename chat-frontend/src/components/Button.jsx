import styles from './button.scss'

const Button = ({ id, onClick, disabled, type, children }) => (
    <div className={styles.button}>
        <button
            id={`button_${id}`}
            disabled={disabled}
            className={styles.hiddenButton}
            type={type}
            onClick={onClick} />
        <label htmlFor={`button_${id}`} className={styles.label} >
            {children}
        </label>
    </div>
)

export default Button
