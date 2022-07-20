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
    var manager = router.query.manager;

    const [isManager, setIsManager] = useState(false)
    const { getRequests, listOfRequests, currentAccount, approveRequest, finalizeRequest, contributeToCampaign } = useContext(CampaignContext);
    const [isLoading, setIsLoading] = useState(true)
    const [contribution, setContribution] = useState('')
    const [loaderText, setLoaderText] = useState("")
    const [loading, setLoading] = useState(false)
    const [approvers, setApprovers] = useState('')

    useEffect(async () => {
        if (!router.isReady) return;
        if (address) {
            await getRequests(address);
            setIsLoading(false);
        }
        if (!currentAccount) return
        if (manager.toLocaleLowerCase() == currentAccount) {
            setIsManager(true);
        }
        if (!currentAccount) return
            setApprovers(router.query.approvers);
    }, [router.isReady, currentAccount])

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
            <Loader loaderType="loaderOnly" />
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
                <Button type="outline" text="Back" onClick={() => { router.back() }} />
                <Link href={{ pathname: '/create-request', query: { address } }}>
                    <Button type="fill" text="Create request" color="green" />
                </Link>
            </div>

            {
                approvers && listOfRequests.map((request, index) => {
                    return (
                        <div className={styles.requestOuter}>
                            <div className={styles.requests}>
                                <div className={styles.requestNo}><div className={styles.circle} >{index + 1}.</div></div>
                                <div className={styles.requestAddress}><Box topText="To:" bottomText={request.recipient} /></div>
                                <div className={styles.title}><Box topText="Funds Required:" bottomText={ethers.utils.formatUnits(request.value._hex.toString(), 'wei')} /></div>
                                <div className={styles.title}><Box topText="Title:" bottomText={request.description} /></div>
                                <div className={styles.title}><Box topText="No. of approvers" bottomText={`${ethers.utils.formatUnits(request.approvalCount._hex.toString(), 'wei')} / ${approvers}`} /></div>
                                <div className={styles.requestAction}>

                                    {
                                        ethers.utils.formatUnits(request.approvalCount._hex.toString(), 'wei') > approvers / 2  && !request.complete && isManager &&
                                        <Button onClick={(e) => { finalizeRequest(e, address, index) }} text="Finalise request" type="outline" color="red" action />
                                    }
                                    {
                                        request.complete ? <></> : <Button onClick={(e) => { approveRequest(e, address, index, setLoading, setLoaderText) }} text="Approve request" type="outline" color="green" action />
                                    }


                                </div>
                            </div>
                        </div>
                    )
                })
            }

            <div className={homeStyles.leftTop}>
                <Box setFormField={setContribution} input placeholder="Contribution in wei" contribute topText="Enter amount to contribute" bottomText="" />
                <Button onClick={(e) => { contributeToCampaign(address, contribution, setLoading, setLoaderText) }} text="Contribute" type="outline" color="blue" />
            </div>
            {
                (loaderText || loading) &&
                <Loader loaderType="loaderWithText" loading={loading} text={loaderText} />
            }


        </>

    )
}

export default Requests