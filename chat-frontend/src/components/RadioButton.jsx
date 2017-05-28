import styles from './radio-button.scss'

const RadioButton = ({ id, value, title, name, checked, onChange }) => (
    <div className={styles.radioButton}>
        <input
            id={id}
            name={name}
            type="radio"
            value={value}
            checked={checked}
            onChange={onChange}
            className={styles.hiddenInput} />
        <label htmlFor={id} className={styles.label}>
            {title}
        </label>
    </div>
)

export default RadioButton
