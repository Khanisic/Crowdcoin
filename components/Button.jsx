import React from 'react'
import styles from '../styles/Button.module.css'

function Button({type, text, color, action, onClick}) {

  if(type == 'outline'){
    return(
      <div onClick={onClick} className={`${styles.outline} + ${action && styles.action}`}>
        <p className={`${styles.outlineText} +  ${color === 'blue' ? styles.blueOutline : color ==='red' ? styles.redOutline : color === 'grey' ? styles.greyOutline : styles.greenOutline }`}>{text}</p>
      </div>
    )
  }

  return (
    <div onClick={onClick} className={`${styles.fill} + ${ color === 'blue' ? styles.blueFill : styles.greenFill}`}>
        <p className={styles.fillText}>{text}</p>
      </div>
  )
}

export default Button