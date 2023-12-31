import styles from './Button.module.css'

function Button({ children, action, className }) {
    return (
        <button onClick={action} className={`${styles.btn} ${styles[className]}`}>{children}</button >
    )
}

export default Button;