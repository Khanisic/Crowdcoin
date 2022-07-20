import React, { useContext, useEffect, useState } from 'react'
import { CampaignContext } from '../context/CampaignContext';
import styles from '../styles/Transactions.module.css'
import Loader from '../components/Loader';
import { ethers } from 'ethers';

function Transactions() {

    const { transactions, getTransactions } = useContext(CampaignContext);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
            getTransactions();
    }, [])
    
    return (
        <div className={styles.mainOuter}>
            <p>Recent Transactions:</p>
            <div className={styles.mainInner}>
                <div className={styles.mainInnerHeading}>
                    <p>From:</p>
                    <p>To:</p>
                    <p>Amount:</p>
                </div>
                <div className={styles.transactions}>

                    {
                        transactions &&
                            transactions.slice(-5).map((transaction) => {
                                return (
                                    <div className={styles.transactionsBox}>
                                        <p className={styles.transactionsText}>{transaction.from.slice(0,6)}...{transaction.from.slice(-6)}</p>
                                        <p className={styles.transactionsText}>{transaction.to.slice(0,6)}...{transaction.to.slice(-6)}</p>
                                        <p className={styles.transactionsText}>{`${ethers.utils.formatUnits(transaction.amount._hex.toString(), 'wei')} Wei`}</p>
                                    </div>
                                )
                            })
                    
                    }
                    {
                    !transactions.length > 0 &&
                    <div>
                       <Loader loaderType="loaderOnly"/>
                    </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default Transactions