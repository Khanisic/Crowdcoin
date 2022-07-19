import { ethers } from 'ethers'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Box from '../components/Box'
import Button from '../components/Button'
import Loader from '../components/Loader'
import { CampaignContext } from '../context/CampaignContext'
import homeStyles from '../styles/Home.module.css'
import styles from '../styles/Requests.module.css'
function Requests() {
    const router = useRouter();

    var address = router.query.address;
    const [isManager, setIsManager] = useState(true)
    const { getRequests, listOfRequests, getTransactions, approveRequest, finalizeRequest } = useContext(CampaignContext);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(async () => {
        if (address) {
            await getRequests(address);
            setIsLoading(false);
        }
    }, [address])

    if (isLoading) return (
        <>
            <div className={homeStyles.top}>
                <Banner type="outline" />
            </div>
            <div className={homeStyles.leftTop}>
                <Link href={{ pathname: '/create-request', query: { address } }}>
                    <Button type="fill" text="Create request" color="green" />
                </Link>
            </div>
            <Loader color='blue' />
            <div className={homeStyles.leftTop}>
                <Box input contribute topText="Enter amount to contribute" bottomText="" />
                <Button text="Contribute" type="outline" color="blue" />
            </div>
        </>

    )

    return (
        <>
            <div className={homeStyles.top}>
                <Banner type="outline" />
            </div>
            <div className={homeStyles.leftTop}>
                <Link href={{ pathname: '/create-request', query: { address } }}>
                    <Button type="fill" text="Create request" color="green" />
                </Link>
            </div>

            {
                listOfRequests.map((request, index) => {
                    return (
                        <div className={styles.requestOuter}>
                            <div className={styles.requests}>
                                <div className={styles.requestNo}><div className={styles.circle} >{index+1}.</div></div>
                                <div className={styles.requestAddress}><Box topText="To:" bottomText={request.recipient} /></div>
                                <div className={styles.title}><Box topText="Funds Required:" bottomText={ethers.utils.formatUnits(request.value._hex.toString(), 'wei')} /></div>
                                <div className={styles.title}><Box topText="Title:" bottomText={request.description} /></div>
                                <div className={styles.title}><Box topText="No. of approvers" bottomText={ethers.utils.formatUnits(request.approvalCount._hex.toString(), 'wei')} /></div>
                                <div className={styles.requestAction}>

                                    {
                                        !request.complete && isManager &&
                                        <Button onClick={(e)=>{ finalizeRequest (e, address, index )}} text="Finalise request" type="outline" color="red" action />
                                    }
                                    {
                                        request.complete ? <></> : <Button onClick={(e)=>{ approveRequest (e, address, index )}} text="Approve request" type="outline" color="green" action />
                                    }
                                    

                                </div>
                            </div>
                        </div>
                    )
                })
            }

            <div className={homeStyles.leftTop}>
                <Box input contribute topText="Enter amount to contribute" bottomText="" />
                <Button text="Contribute" type="outline" color="blue" />
            </div>


        </>

    )
}

export default Requests