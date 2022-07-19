import React, { useState } from 'react'
import styles from '../styles/Box.module.css'

function Box({topText, bottomText,input,placeholder, contribute, description, formField, setFormField}) {

  return (
    <div className={`${styles.boxOuter} + ${contribute && styles.contribute } + ${description && styles.description}`}>
        <div className={styles.top}>
            <p className={`${styles.topText} + ${contribute && styles.inputContribute }`}>{topText}</p>
        </div>
        <div className={styles.bottom}>
        {
          !input ? 
          <p className={styles.bottomText}>{bottomText}</p>
          :
          <input onChange={(e) => setFormField(e.target.value)} placeholder={placeholder} className={`${styles.inputMain} + ${styles.bottomText } + ${contribute && styles.inputContribute }`}></input>
        }
            
        </div>
    </div>
  )
}

export default Box