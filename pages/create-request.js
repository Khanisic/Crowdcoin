import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import Banner from '../components/Banner'
import Box from '../components/Box'
import Button from '../components/Button'
import Loader from '../components/Loader'
import { CampaignContext } from '../context/CampaignContext'
import homeStyles from '../styles/Home.module.css'

function CreateRequest() {
    const router = useRouter();
    const [funds, setFunds] = useState('');
    const [title, setTitle] = useState('');
    const [recepient, setRecepient] = useState('');
    const { createRequest } = useContext(CampaignContext);
    const [loaderText, setLoaderText] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    var address = router.query.address;
    return (
        <>
            <div className={homeStyles.top}>
                <Banner type="outline" />
            </div>
            <div className={homeStyles.formOuter}>
                <Box setFormField={setRecepient} topText="Enter recepient’s address" input description bottomText="" placeholder="Address of recepient" />
                <Box setFormField={setTitle} topText="Enter request name" input description bottomText="" placeholder="Name of the request" />
                <Box setFormField={setFunds} topText="Enter funds required" input bottomText="" placeholder="Funds in ether" />
            </div>
            <div className={homeStyles.leftTop}>
                <Button type="outline" text="Back" onClick={() => { router.back() }} />
                <Button onClick={(e) => { createRequest(e, recepient, title, funds, address, setIsLoading, setLoaderText) }} type="fill" text="Create request" color="blue" />
            </div>

            {
                (loaderText || isLoading) &&

                <Loader loading={isLoading} loaderType="loaderWithText" text={loaderText} />
            }


        </>
    )
}

export default CreateRequest