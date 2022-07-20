import React, { useContext, useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Box from '../components/Box'
import Button from '../components/Button'
import homeStyles from '../styles/Home.module.css'
import styles from '../styles/Campaign.module.css'
import { CampaignContext } from '../context/CampaignContext'
import { useRouter } from 'next/router';
import Loader from '../components/Loader'
import { ethers } from 'ethers';
import Link from 'next/link'

const campaign = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true)
  const { campaignDetails, getThisCampaignsDetails, contributeToCampaign, walletConnected } = useContext(CampaignContext);
  const [contribution, setContribution] = useState('')
  const [loaderText, setLoaderText] = useState("")
  const [loading, setLoading] = useState(false)
  var address = router.query.address;
  useEffect(async () => {
      await getThisCampaignsDetails(address).then(() => {
        setIsLoading(false);
      })
  }, [walletConnected, address])


  if (isLoading) return (
    <>
      <div className={homeStyles.top}>
        <Banner type="outline" />
      </div>
      <Loader loaderType="loaderOnly" />
    </>

  )

  return (

    <>

      <div className={homeStyles.top}>
        <Banner type="outline" />

      </div>
      <div className={styles.detailsMain}>
        <Button type="outline" text="Back" onClick={()=>{router.back()}}/>
      </div>
      <div className={styles.detailsMain}>

        <div className={styles.detailsLeft}>
          <Box topText="Campaign Address" bottomText={campaignDetails.address} />
          <Box topText="Campaign Title: " bottomText={router.query.title} />
          <Box topText="Manager’s Address" bottomText={campaignDetails.managersAddress} />
        </div>

        <div className={styles.detailsRight}>
          <div className={styles.boxButton}>
            <Box topText="Minimum contribution" bottomText={`${router.query.minimumContribution}` + ` Wei`} />
            <Link href={{ pathname: '/requests', query: { address : address, manager : campaignDetails.managersAddress } }}>
              <Button type="fill" text="View requests" color="green" />
            </Link>
          </div>
          <Box topText="Balance of campaign" bottomText={`${campaignDetails.balance}` + ` Wei`} />
          <div className={styles.boxBox}>
            <Box topText="No. of Requests" bottomText={campaignDetails.requests} />
            <Box topText="No. of approvers" bottomText={campaignDetails.approvers} />
          </div>

        </div>

      </div>
      <div className={homeStyles.leftTop}>
        <Box setFormField={setContribution} input placeholder="Contribution in wei" contribute topText="Enter amount to contribute" bottomText="" />
        <Button onClick={(e) => { contributeToCampaign(address, contribution, setLoading, setLoaderText) }} text="Contribute" type="outline" color="blue" />
      </div>
      {
        ( loaderText || loading ) &&
        <Loader loaderType="loaderWithText" loading={loading} text={loaderText} />
      }
    </>
  )
}

export default campaign