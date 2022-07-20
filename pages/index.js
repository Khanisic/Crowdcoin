import styles from '../styles/Home.module.css'
import { CampaignContext } from '../context/CampaignContext'
import { useContext, useEffect, useState } from 'react';
import Banner from '../components/Banner';
import Button from '../components/Button';
import Box from '../components/Box'
import Projects from '../components/Projects';
import { ethers } from 'ethers';
import Loader from '../components/Loader';
import Link from 'next/link';
import Transactions from '../components/Transactions';

const Home = () => {
  const { getCampaigns, currentAccount, campaignsList, getContributers, getTotalMoney, totalMoney, totalContributers, walletConnected, connectWallet } = useContext(CampaignContext);
  const [isLoading, setIsLoading] = useState(parseInt(1))

  useEffect(  async () => {

       await getCampaigns().then(() => {
        setIsLoading(isLoading++)
      });
      await getContributers().then(() => {
        setIsLoading(isLoading++)
      })
      await getTotalMoney().then(() => {
        setIsLoading(isLoading++)
      })


  }, [])

  return (
    <>
      <div className={styles.top} >
        <Banner type="main" />
        <Button onClick={connectWallet} type="outline" text={`${currentAccount ? "Connected" : "Connect"}`} color="blue" />
      </div>
      <div className={styles.kickMain}>
        <div className={styles.kickLeft}>
          <p className={styles.kickText}>Kickstarter, <br></br>but just better...</p>
        </div>
        <div className={styles.kickRight}>
          {
            <Transactions />
          }

        </div>
      </div>

      <div className={styles.statsOuter}>
        {
          isLoading != 3 && isLoading <= 3 ?
            <Loader loaderType="loaderOnly" />
            :
            <>
              <Box topText="No. of Campaigns" bottomText={campaignsList.length} />
              <Box topText="Total Money Spent" bottomText={`${ethers.utils.formatUnits(totalMoney._hex.toString(), 'wei')} Wei`} />
              <Box topText="No of contributers" bottomText={ethers.utils.formatUnits(totalContributers._hex.toString(), 'wei')} />
            </>
        }

      </div>
      <div className={styles.projectsOuter}>
        <p className={styles.headingDark}>Projects</p>
        <Link href={{ pathname: '/create-campaign' }}>
          <Button type="fill" text="Create a campaign" color="blue" />
        </Link>

      </div>
      <div className={styles.projects}>
        {
          isLoading != 3 && isLoading < 3 &&
          <Loader loaderType="loaderOnly" />
        }
        {

          isLoading >= 3 &&

          campaignsList.map((campaign, index) => {
            return (
              <Projects query={campaign} title={campaign.name} address={campaign.addressOfNewCampaign} minimumContribution={ethers.utils.formatUnits(campaignsList[index].minimumContribution._hex.toString(), 'wei')} />
            )
          })

        }
      </div>
    </>

  )
};

export default Home
