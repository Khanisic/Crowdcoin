import React from 'react'
import styles from '../styles/Project.module.css'
import Button from './Button'
import Link from 'next/link';

function Projects({ minimumContribution, address, title }) {
    
    const projectDetails= {
        minimumContribution : minimumContribution,
        address: address,
        title : title
    }

    return (
        <div className={styles.projectOuter}>
            <div className={styles.leftOuter}>
                <div className={styles.leftInner}>
                    <p className={styles.heading}>{title}</p>
                </div>
                <p className={styles.blueText}>Address: <span className={styles.smallBlackText}>{address}</span></p>
            </div>


            <div className={styles.rightOuter}>
                <Link href={{ pathname: '/campaign', query: projectDetails }} >
                    <Button type="fill" text="View Campaign" color="green" />
                </Link>

                <p className={styles.blueText}>Minimum Contribution: <span className={styles.smallBlackText}>{minimumContribution} Wei</span></p>
            </div>
        </div>
    )
}

export default Projects