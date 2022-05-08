import React from 'react'
import styles from './Button_Css.css'

const Button = ({value})=>{
    return (
            <button className={styles.button_container}>
                <span>{value}</span>
            </button>
        )
}

export default Button