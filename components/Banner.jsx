import React from 'react'
import Image from 'next/image';
import bannerImg from '../assets/bannerImg.svg'
import styles from '../styles/Banner.module.css'

function Banner({ type }) {

    if (type == 'main') {
        return (
            <div className={styles.main}>
                <div className={styles.text}>
                    <div className={styles.gradient}>
                    </div>
                    Crowd's Coin
                </div>
            </div>

        );
    }
    return (
        <div className={styles.outline}>
                <div className={styles.outlineText}>
                    Crowd's Coin
                </div>
            </div>
    )
}

export default Banner