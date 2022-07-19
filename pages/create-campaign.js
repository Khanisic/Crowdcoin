import React, { useContext, useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Box from '../components/Box'
import Button from '../components/Button'
import homeStyles from '../styles/Home.module.css'
import { CampaignContext } from '../context/CampaignContext'
import { useRouter } from 'next/router'

function CreateCampaign() {
    const router = useRouter();
    const { createCampaign } = useContext(CampaignContext);

    const [minimumContribution, setMinimumContribution] = useState('');
    const [title, setTitle] = useState('');
    var address = router.query.address;

    return (

        <>
            <div className={homeStyles.top}>
                <Banner type="outline" />
            </div>
            <div className={homeStyles.formOuter}>
                <Box minimumContribution formField={minimumContribution} setFormField={setMinimumContribution} topText="Enter Minimum contribution" input bottomText="" placeholder="Contribution in wei" />
                <Box title formField={title} setFormField={setTitle} topText="Enter title" input bottomText="" description placeholder="Your campaign's title" />
                {/* <Box formInputs={formInputs} topText="Enter description" input description bottomText="" placeholder="Your campaign's description" /> */}
            </div>
            <div className={homeStyles.leftTop}>
                <Button onClick={(e) => { createCampaign(e, minimumContribution, title, address) }} type="fill" text="Create campaign" color="blue" />
            </div>




        </>

    )
}

export default CreateCampaign